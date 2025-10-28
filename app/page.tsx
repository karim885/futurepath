'use client';

import { motion } from 'framer-motion';
import {
  Sparkles,
  GraduationCap,
  Target,
  Globe,
  ArrowRight,
  Users,
  Trophy,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function HomePage() {
  const features = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'AI-Powered Quiz',
      description:
        'Answer personalized questions and let AI understand your passions and goals.',
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Career Discovery',
      description:
        'Get tailored career recommendations based on your unique profile.',
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: 'Top Universities',
      description:
        'Discover the best universities worldwide matching your field and preferences.',
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: 'Gamification',
      description:
        'Earn points, unlock badges, and track your progress as you explore.',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Start the Quiz',
      description: 'Answer AI-generated questions about your interests and goals.',
    },
    {
      number: '02',
      title: 'AI Analysis',
      description: 'Our AI analyzes your responses to understand you better.',
    },
    {
      number: '03',
      title: 'Get Results',
      description:
        'Receive personalized career paths and university recommendations.',
    },
    {
      number: '04',
      title: 'Explore & Earn',
      description: 'Continue exploring, earn points, and unlock achievements.',
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-40 left-1/2 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '4s' }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-block mb-6"
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                <Zap className="w-4 h-4" />
                AI-Powered Career Discovery
              </div>
            </motion.div>

            <h1 className="text-6xl md:text-7xl font-bold mb-6 gradient-text">
              Discover Your Future.
              <br />
              Find Your Path.
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto">
              Let AI guide you to your dream career and the perfect university.
              Answer questions, earn points, and unlock your potential.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quiz">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all flex items-center gap-2 justify-center glow-effect"
                >
                  Start Now <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass-effect px-8 py-4 rounded-full text-lg font-semibold text-gray-700 transition-all flex items-center gap-2 justify-center"
                >
                  <Users className="w-5 h-5" />
                  View Dashboard
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {[
              { label: 'Universities', value: '1000+', icon: <Globe /> },
              { label: 'Career Paths', value: '200+', icon: <Target /> },
              { label: 'Students Helped', value: '10K+', icon: <Users /> },
            ].map((stat, index) => (
              <div
                key={index}
                className="glass-effect p-6 rounded-2xl text-center"
              >
                <div className="text-blue-600 flex justify-center mb-2">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold gradient-text">
                  {stat.value}
                </div>
                <div className="text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Why Choose FuturePath?
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to plan your future, all in one place.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="glass-effect p-8 rounded-2xl text-center"
              >
                <div className="text-blue-600 flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Your journey to the future in 4 simple steps.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="glass-effect p-8 rounded-2xl h-full">
                  <div className="text-6xl font-bold gradient-text mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-gray-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto glass-effect p-12 rounded-3xl text-center glow-effect"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Ready to Discover Your Path?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of students who have found their direction with
            FuturePath.
          </p>
          <Link href="/quiz">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-full text-xl font-semibold shadow-xl hover:shadow-2xl transition-all inline-flex items-center gap-3"
            >
              Start Your Journey <Sparkles className="w-6 h-6" />
            </motion.button>
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}

