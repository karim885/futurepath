'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Trophy,
  Target,
  Calendar,
  TrendingUp,
  Award,
  Sparkles,
} from 'lucide-react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import { BADGES, getBadgeById } from '@/lib/badges';

interface QuizResult {
  _id: string;
  completedAt: string;
  pointsEarned: number;
  careerRecommendations: Array<{ title: string }>;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [recentQuizzes, setRecentQuizzes] = useState<QuizResult[]>([]);
  const [stats, setStats] = useState({
    points: 0,
    quizzesTaken: 0,
    badges: [] as string[],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (status === 'authenticated') {
      loadDashboard();
    }
  }, [status]);

  const loadDashboard = async () => {
    try {
      const response = await axios.get('/api/user/dashboard');
      setStats(response.data.stats);
      setRecentQuizzes(response.data.recentQuizzes);
    } catch (error) {
      console.error('Failed to load dashboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Sparkles className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  const userBadges = stats.badges.map((badgeId) => getBadgeById(badgeId)).filter(Boolean);
  const nextMilestone = stats.points < 100 ? 100 : stats.points < 500 ? 500 : 1000;
  const progressToNext = ((stats.points % nextMilestone) / nextMilestone) * 100;

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-5xl font-bold gradient-text mb-2">
              Welcome back, {session?.user?.name}! 👋
            </h1>
            <p className="text-xl text-gray-600">
              Track your progress and achievements
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-effect p-6 rounded-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <Trophy className="w-10 h-10 text-yellow-500" />
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
              <div className="text-4xl font-bold gradient-text mb-1">
                {stats.points}
              </div>
              <div className="text-gray-600">Total Points</div>
              <div className="mt-4">
                <div className="text-xs text-gray-500 mb-1">
                  Next milestone: {nextMilestone} points
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                    style={{ width: `${progressToNext}%` }}
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-effect p-6 rounded-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <Target className="w-10 h-10 text-blue-500" />
              </div>
              <div className="text-4xl font-bold gradient-text mb-1">
                {stats.quizzesTaken}
              </div>
              <div className="text-gray-600">Quizzes Completed</div>
              <button
                onClick={() => router.push('/quiz')}
                className="mt-4 text-blue-600 font-semibold hover:text-purple-600 transition-colors"
              >
                Take Another Quiz →
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-effect p-6 rounded-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <Award className="w-10 h-10 text-purple-500" />
              </div>
              <div className="text-4xl font-bold gradient-text mb-1">
                {stats.badges.length}
              </div>
              <div className="text-gray-600">Badges Earned</div>
              <button
                onClick={() => router.push('/profile')}
                className="mt-4 text-blue-600 font-semibold hover:text-purple-600 transition-colors"
              >
                View All Badges →
              </button>
            </motion.div>
          </div>

          {/* Badges Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Award className="w-8 h-8 text-purple-600" />
              Your Badges
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {BADGES.map((badge) => {
                const earned = stats.badges.includes(badge.id);
                return (
                  <motion.div
                    key={badge.id}
                    whileHover={{ scale: 1.05 }}
                    className={`glass-effect p-4 rounded-xl text-center transition-all ${
                      earned ? 'glow-effect' : 'opacity-50 grayscale'
                    }`}
                  >
                    <div className="text-4xl mb-2">{badge.icon}</div>
                    <div className="text-sm font-bold text-gray-800 mb-1">
                      {badge.name}
                    </div>
                    <div className="text-xs text-gray-600">
                      {badge.description}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Recent Quizzes */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Calendar className="w-8 h-8 text-blue-600" />
              Recent Quizzes
            </h2>
            {recentQuizzes.length === 0 ? (
              <div className="glass-effect p-12 rounded-2xl text-center">
                <Sparkles className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">
                  You haven&apos;t taken any quizzes yet
                </p>
                <button
                  onClick={() => router.push('/quiz')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
                >
                  Take Your First Quiz
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {recentQuizzes.map((quiz, index) => (
                  <motion.div
                    key={quiz._id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    onClick={() => router.push(`/results/${quiz._id}`)}
                    className="glass-effect p-6 rounded-2xl hover:shadow-xl transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Target className="w-5 h-5 text-blue-600" />
                          <h3 className="text-lg font-bold text-gray-800">
                            Career Discovery Quiz
                          </h3>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {quiz.careerRecommendations.slice(0, 3).map((career, i) => (
                            <span
                              key={i}
                              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                            >
                              {career.title}
                            </span>
                          ))}
                        </div>
                        <p className="text-sm text-gray-500">
                          {new Date(quiz.completedAt).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold gradient-text">
                          +{quiz.pointsEarned}
                        </div>
                        <div className="text-sm text-gray-500">points</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

