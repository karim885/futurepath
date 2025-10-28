import mongoose, { Schema, Model } from 'mongoose';

export interface IQuizResult {
  _id?: string;
  userId?: string;
  guestId?: string;
  answers: {
    question: string;
    answer: string;
  }[];
  careerRecommendations: {
    title: string;
    description: string;
    matchPercentage: number;
  }[];
  universityRecommendations: {
    name: string;
    country: string;
    ranking?: number;
    website?: string;
    field: string;
  }[];
  pointsEarned: number;
  completedAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const QuizResultSchema = new Schema<IQuizResult>(
  {
    userId: {
      type: String,
      required: false,
    },
    guestId: {
      type: String,
      required: false,
    },
    answers: [
      {
        question: String,
        answer: String,
      },
    ],
    careerRecommendations: [
      {
        title: String,
        description: String,
        matchPercentage: Number,
      },
    ],
    universityRecommendations: [
      {
        name: String,
        country: String,
        ranking: Number,
        website: String,
        field: String,
      },
    ],
    pointsEarned: {
      type: Number,
      default: 0,
    },
    completedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const QuizResult: Model<IQuizResult> =
  mongoose.models.QuizResult ||
  mongoose.model<IQuizResult>('QuizResult', QuizResultSchema);

export default QuizResult;

