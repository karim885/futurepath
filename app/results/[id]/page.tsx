'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Target,
  Globe,
  ExternalLink,
  Trophy,
  ArrowRight,
  Share2,
  Sparkles,
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Navbar from '@/components/Navbar';

interface Career {
  title: string;
  description: string;
  matchPercentage: number;
}

interface University {
  name: string;
  country: string;
  ranking: number;
  website: string;
  field: string;
}

export default function ResultsPage() {
  const params = useParams();
  const router = useRouter();
  const [careers, setCareers] = useState<Career[]>([]);
  const [universities, setUniversities] = useState<University[]>([]);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    try {
      const response = await axios.get(`/api/results/${params.id}`);
      setCareers(response.data.careerRecommendations);
      setUniversities(response.data.universityRecommendations);
      setPointsEarned(response.data.pointsEarned);
    } catch (error) {
      toast.error('Failed to load results');
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My FuturePath Results',
        text: 'I just discovered my perfect career path with FuturePath!',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-20 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Success Header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-12"
          >
            <div className="inline-block mb-4">
              <Trophy className="w-20 h-20 text-yellow-500 mx-auto animate-pulse" />
            </div>
            <h1 className="text-5xl font-bold gradient-text mb-4">
              Congratulations! 🎉
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              You&apos;ve earned <span className="font-bold text-blue-600">{pointsEarned} points</span>!
            </p>
            <p className="text-gray-500">
              Here are your personalized career recommendations and top universities
            </p>

            <button
              onClick={handleShare}
              className="mt-6 inline-flex items-center gap-2 glass-effect px-6 py-3 rounded-full hover:shadow-lg transition-all"
            >
              <Share2 className="w-5 h-5" />
              Share Results
            </button>
          </motion.div>

          {/* Career Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-800">
                Your Career Matches
              </h2>
            </div>

            <div className="space-y-4">
              {careers.map((career, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="glass-effect p-6 rounded-2xl hover:shadow-xl transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-2xl font-bold text-gray-800">
                      {career.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="text-3xl font-bold gradient-text">
                          {career.matchPercentage}%
                        </div>
                        <div className="text-xs text-gray-500">Match</div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {career.description}
                  </p>
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${career.matchPercentage}%` }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                        className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* University Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="w-8 h-8 text-purple-600" />
              <h2 className="text-3xl font-bold text-gray-800">
                Recommended Universities
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {universities.map((uni, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="glass-effect p-6 rounded-2xl hover:shadow-xl transition-all group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                        {uni.name}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Globe className="w-4 h-4" />
                          {uni.country}
                        </div>
                        <div className="font-semibold text-blue-600">
                          #{uni.ranking}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      {uni.field}
                    </span>
                  </div>

                  <a
                    href={uni.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-purple-600 font-medium transition-colors"
                  >
                    Visit Website
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-12 text-center"
          >
            <div className="glass-effect p-8 rounded-3xl">
              <h3 className="text-2xl font-bold mb-4 gradient-text">
                What&apos;s Next?
              </h3>
              <p className="text-gray-600 mb-6">
                Explore more universities, take another quiz, or check your
                dashboard
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => router.push('/universities')}
                  className="glass-effect px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all flex items-center gap-2 justify-center"
                >
                  <Globe className="w-5 h-5" />
                  Browse Universities
                </button>
                <button
                  onClick={() => router.push('/quiz')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all flex items-center gap-2 justify-center"
                >
                  Take Another Quiz
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => router.push('/dashboard')}
                  className="glass-effect px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all flex items-center gap-2 justify-center"
                >
                  <Trophy className="w-5 h-5" />
                  View Dashboard
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

