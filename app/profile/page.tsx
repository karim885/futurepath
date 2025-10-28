'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Trophy,
  Target,
  Award,
  Calendar,
  Sparkles,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { BADGES, getBadgeById } from '@/lib/badges';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Sparkles className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!session) return null;

  const userBadges = (session.user.badges || [])
    .map((badgeId) => getBadgeById(badgeId))
    .filter(Boolean);

  const allBadges = BADGES.map((badge) => ({
    ...badge,
    earned: session.user.badges?.includes(badge.id) || false,
  }));

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-20 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect p-8 rounded-3xl mb-8"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || ''}
                    className="w-24 h-24 rounded-full"
                  />
                ) : (
                  session.user.name?.charAt(0).toUpperCase()
                )}
              </div>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-bold gradient-text mb-2">
                  {session.user.name}
                </h1>
                <div className="flex items-center gap-2 text-gray-600 justify-center md:justify-start">
                  <Mail className="w-5 h-5" />
                  <span>{session.user.email}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 text-center">
                <div className="glass-effect p-4 rounded-xl">
                  <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold gradient-text">
                    {session.user.points || 0}
                  </div>
                  <div className="text-xs text-gray-600">Points</div>
                </div>
                <div className="glass-effect p-4 rounded-xl">
                  <Target className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold gradient-text">
                    {session.user.quizzesTaken || 0}
                  </div>
                  <div className="text-xs text-gray-600">Quizzes</div>
                </div>
                <div className="glass-effect p-4 rounded-xl">
                  <Award className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold gradient-text">
                    {session.user.badges?.length || 0}
                  </div>
                  <div className="text-xs text-gray-600">Badges</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Badges Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Award className="w-8 h-8 text-purple-600" />
              Badges & Achievements
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Earned Badges */}
              <div className="glass-effect p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  Earned Badges ({userBadges.length})
                </h3>
                {userBadges.length > 0 ? (
                  <div className="space-y-4">
                    {userBadges.map((badge, index) => (
                      <motion.div
                        key={badge.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl"
                      >
                        <div className="text-4xl">{badge.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800">
                            {badge.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {badge.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">
                    Complete quizzes to earn badges!
                  </p>
                )}
              </div>

              {/* All Badges */}
              <div className="glass-effect p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  All Badges
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {allBadges.map((badge, index) => (
                    <motion.div
                      key={badge.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className={`p-3 rounded-xl text-center transition-all ${
                        badge.earned
                          ? 'bg-gradient-to-r from-blue-50 to-purple-50 glow-effect'
                          : 'bg-gray-100 opacity-50 grayscale'
                      }`}
                    >
                      <div className="text-3xl mb-1">{badge.icon}</div>
                      <div className="text-xs font-bold text-gray-800">
                        {badge.name}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-center glass-effect p-8 rounded-3xl"
          >
            <h3 className="text-2xl font-bold mb-4 gradient-text">
              Keep Exploring!
            </h3>
            <p className="text-gray-600 mb-6">
              Take more quizzes to earn points and unlock new badges
            </p>
            <button
              onClick={() => router.push('/quiz')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all inline-flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Take a Quiz
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

