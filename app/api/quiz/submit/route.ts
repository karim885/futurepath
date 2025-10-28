import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import QuizResult from '@/models/QuizResult';
import { analyzeQuizAnswers, recommendUniversities } from '@/lib/openai';
import { checkBadges } from '@/lib/badges';
import universities from '@/data/universities.json';

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

    // Recommend universities
    const careerTitles = careers.map((c: any) => c.title);
    const recommendedUniversities = await recommendUniversities(
      careerTitles,
      preferredCountries,
      universities
    );

    // Calculate points
    const pointsPerQuestion = 10;
    const pointsEarned = answers.length * pointsPerQuestion;

    await dbConnect();

    // Save quiz result
    const quizResult = await QuizResult.create({
      userId: session?.user?.id || undefined,
      guestId: !session ? guestId : undefined,
      answers,
      careerRecommendations: careers,
      universityRecommendations: recommendedUniversities.map((uni) => ({
        name: uni.name,
        country: uni.country,
        ranking: uni.ranking,
        website: uni.website,
        field: uni.fields[0],
      })),
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

