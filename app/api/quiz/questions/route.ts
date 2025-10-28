import { NextResponse } from 'next/server';
import { generateQuizQuestions } from '@/lib/openai';

export async function GET() {
  try {
    const questions = await generateQuizQuestions();
    return NextResponse.json({ questions });
  } catch (error) {
    console.error('Error generating questions:', error);
    return NextResponse.json(
      { error: 'Failed to generate questions' },
      { status: 500 }
    );
  }
}

