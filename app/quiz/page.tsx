'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Sparkles,
  ArrowLeft,
  Loader2,
  CheckCircle,
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Navbar from '@/components/Navbar';

interface Message {
  type: 'bot' | 'user';
  content: string;
}

export default function QuizPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [answers, setAnswers] = useState<{ question: string; answer: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [guestId] = useState(() => Math.random().toString(36).substring(7));
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadQuestions();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadQuestions = async () => {
    try {
      const response = await axios.get('/api/quiz/questions');
      setQuestions(response.data.questions);
      setMessages([
        {
          type: 'bot',
          content: `Hi there! 👋 I'm your AI career guide. I'll ask you ${response.data.questions.length} questions to help discover your perfect career path and universities. Ready to begin?`,
        },
        {
          type: 'bot',
          content: response.data.questions[0],
        },
      ]);
    } catch (error) {
      toast.error('Failed to load quiz');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const answer = userInput.trim();
    setUserInput('');
    setIsLoading(true);

    // Add user message
    setMessages((prev) => [...prev, { type: 'user', content: answer }]);

    // Save answer
    const newAnswers = [
      ...answers,
      { question: questions[currentQuestionIndex], answer },
    ];
    setAnswers(newAnswers);

    // Simulate AI thinking
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (currentQuestionIndex < questions.length - 1) {
      // Next question
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setMessages((prev) => [
        ...prev,
        {
          type: 'bot',
          content: `Great! Question ${nextIndex + 1} of ${questions.length}:`,
        },
        { type: 'bot', content: questions[nextIndex] },
      ]);
      setIsLoading(false);
    } else {
      // Quiz complete
      setMessages((prev) => [
        ...prev,
        {
          type: 'bot',
          content:
            'Excellent! 🎉 You\'ve completed all questions. Let me analyze your answers and find the perfect career paths and universities for you...',
        },
      ]);
      await submitQuiz(newAnswers);
    }
  };

  const submitQuiz = async (finalAnswers: { question: string; answer: string }[]) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post('/api/quiz/submit', {
        answers: finalAnswers,
        guestId,
      });

      if (response.data.success) {
        toast.success(`Quiz completed! You earned ${response.data.pointsEarned} points! 🎉`);
        router.push(`/results/${response.data.resultId}`);
      }
    } catch (error) {
      toast.error('Failed to submit quiz');
      setIsSubmitting(false);
    }
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-20 pb-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </button>

            <div className="glass-effect p-4 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Question {Math.min(currentQuestionIndex + 1, questions.length)} of {questions.length}
                </span>
                <span className="text-sm font-medium text-blue-600">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
                />
              </div>
            </div>
          </div>

          {/* Chat Container */}
          <div className="glass-effect rounded-3xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">AI Career Guide</h2>
                  <p className="text-sm text-white/80">
                    Discovering your perfect path...
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-[500px] overflow-y-auto p-6 space-y-4">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex ${
                      message.type === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                          : 'bg-white border border-gray-200'
                      }`}
                    >
                      <p className="text-sm md:text-base">{message.content}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white border border-gray-200 p-4 rounded-2xl">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                      <span className="text-sm text-gray-600">Thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {isSubmitting && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-center"
                >
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3" />
                    <p className="font-semibold">Analyzing your answers...</p>
                    <p className="text-sm text-white/80 mt-1">
                      Finding the perfect careers and universities for you
                    </p>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            {!isSubmitting && (
              <form
                onSubmit={handleSubmit}
                className="p-6 border-t border-gray-200"
              >
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type your answer here..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    disabled={isLoading || isSubmitting}
                  />
                  <button
                    type="submit"
                    disabled={!userInput.trim() || isLoading || isSubmitting}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-6 h-6" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Info Card */}
          {!session && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 glass-effect p-4 rounded-xl text-center"
            >
              <p className="text-sm text-gray-600">
                💡 <strong>Tip:</strong> Sign in to save your progress and earn points!
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

