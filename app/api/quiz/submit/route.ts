import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import QuizResult from '@/models/QuizResult';
import { analyzeQuizAnswers } from '@/lib/openai';
import { checkBadges } from '@/lib/badges';

export async function POST(request: Request) {
  try {
    const { answers, guestId } = await request.json();
    const session = await getServerSession(authOptions);

    if (!answers || !Array.isArray(answers)) {
      return NextResponse.json(
        { error: 'Invalid answers format' },
        { status: 400 }
      );
    }

    // Analyze answers with AI
    const aiResponse = await analyzeQuizAnswers(answers);
    const careers = aiResponse.careers || [];
    const confidence = aiResponse.confidence || 'high';
    const notes = aiResponse.notes || '';

    // Extract preferred countries from answers
    const countryAnswer = answers.find((a) =>
      a.question.toLowerCase().includes('countries')
    );
    const preferredCountries = countryAnswer
      ? countryAnswer.answer
          .split(',')
          .map((c: string) => c.trim())
          .filter((c: string) => c.length > 0)
      : [];

    // Fetch universities from Hipolabs API
    let recommendedUniversities: any[] = [];
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

    async function fetchHipolabs(country?: string, limit = 100) {
      try {
        const endpoint = new URL(`${baseUrl}/api/universities`);
        if (country) endpoint.searchParams.set('country', country);
        endpoint.searchParams.set('limit', limit.toString());
        const res = await fetch(endpoint.toString(), { cache: 'no-store' });
        if (!res.ok) return [] as any[];
        const json = await res.json();
        return (json.universities || []) as any[];
      } catch (err) {
        console.error('Failed to fetch from Hipolabs:', err);
        return [] as any[];
      }
    }

    if (preferredCountries.length > 0) {
      // Fetch from user's preferred countries
      const promises = preferredCountries.slice(0, 3).map((c: string) => 
        fetchHipolabs(c, 50)
      );
      const lists = await Promise.all(promises);
      recommendedUniversities = lists.flat();
    } else {
      // Global diverse set
      recommendedUniversities = await fetchHipolabs(undefined, 100);
    }

    // De-duplicate
    const seen = new Set<string>();
    recommendedUniversities = recommendedUniversities.filter((u: any) => {
      const key = `${u.name}|${u.country}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    // Sort and limit, then enhance with career-based description
    recommendedUniversities = recommendedUniversities.slice(0, 30).map((u: any) => ({
      name: u.name,
      country: u.country,
      ranking: undefined,
      website: u.website || `https://www.google.com/search?q=${encodeURIComponent(u.name)}`,
      field: careers?.[0]?.title || 'General Studies',
      city: u.city || null,
      description: careers?.[0]
        ? `Strong programs in ${careers[0].title} and related fields. Consider researching their specific departments.`
        : 'Reputable institution with diverse academic programs. Research their specific programs for your interests.',
    }));

    // Calculate points
    const pointsPerQuestion = 10;
    const pointsEarned = answers.length * pointsPerQuestion;

    await dbConnect();

    // Save quiz result
    const quizResult = await QuizResult.create({
      userId: session?.user?.id || undefined,
      guestId: !session ? guestId : undefined,
      answers,
      careerRecommendations: { careers, confidence, notes },
      universityRecommendations: recommendedUniversities,
      pointsEarned,
      completedAt: new Date(),
    });

    // Update user if logged in
    let updatedUser = null;
    if (session?.user?.id) {
      const user = await User.findById(session.user.id);
      if (user) {
        user.points += pointsEarned;
        user.quizzesTaken += 1;
        user.badges = checkBadges(user.points, user.quizzesTaken);
        await user.save();
        updatedUser = {
          points: user.points,
          quizzesTaken: user.quizzesTaken,
          badges: user.badges,
        };
      }
    }

    return NextResponse.json({
      success: true,
      resultId: quizResult._id,
      careers,
      universities: recommendedUniversities,
      pointsEarned,
      user: updatedUser,
    });
  } catch (error) {
    console.error('Quiz submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit quiz' },
      { status: 500 }
    );
  }
}

