'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Interview, Question, QuestionType } from '@intervu/shared';
import { interviewAPI } from '@/utils/api';
import { Clock, Code, FileText, Layers, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const questionTypeIcons: Record<QuestionType, any> = {
  multiple_choice: CheckCircle,
  coding: Code,
  conceptual: FileText,
  system_design: Layers
};

const questionTypeColors: Record<QuestionType, string> = {
  multiple_choice: 'bg-green-100 text-green-800',
  coding: 'bg-blue-100 text-blue-800',
  conceptual: 'bg-purple-100 text-purple-800',
  system_design: 'bg-orange-100 text-orange-800'
};

export default function InterviewPage() {
  const params = useParams();
  const router = useRouter();
  const [interview, setInterview] = useState<Interview | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInterview = async () => {
      if (!params.id) return;

      setIsLoading(true);
      try {
        const response = await interviewAPI.getInterview(params.id as string);
        if (response.success && response.interview) {
          setInterview(response.interview);
        } else {
          setError(response.error || 'Failed to load interview');
          toast.error('Failed to load interview');
        }
      } catch (error) {
        setError('Something went wrong while loading the interview');
        toast.error('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInterview();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your interview...</p>
        </div>
      </div>
    );
  }

  if (error || !interview) {
    return (
      <div className="text-center space-y-4">
        <div className="text-red-600 text-lg font-medium">
          {error || 'Interview not found'}
        </div>
        <button
          onClick={() => router.push('/')}
          className="btn-primary"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const currentQuestion = interview.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / interview.questions.length) * 100;

  const nextQuestion = () => {
    if (currentQuestionIndex < interview.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const QuestionIcon = questionTypeIcons[currentQuestion.type];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => router.push('/')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
          <div className="text-sm text-gray-500">
            Question {currentQuestionIndex + 1} of {interview.questions.length}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Mock Interview</h1>
            <p className="text-gray-600 capitalize">
              {interview.experienceLevel} Level • {interview.estimatedDuration} minutes total
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 mb-1">Progress</div>
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="card p-8">
        <div className="flex items-center space-x-3 mb-6">
          <QuestionIcon className="w-6 h-6 text-primary-600" />
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${questionTypeColors[currentQuestion.type]}`}>
            {currentQuestion.type.replace('_', ' ').toUpperCase()}
          </span>
          <div className="flex items-center space-x-1 text-gray-500 text-sm">
            <Clock className="w-4 h-4" />
            <span>{currentQuestion.timeLimit || 5} min</span>
          </div>
          <div className="text-sm text-gray-500">
            {currentQuestion.points} points
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Multiple Choice Options */}
          {currentQuestion.type === 'multiple_choice' && currentQuestion.options && (
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 border-2 border-gray-300 rounded-full flex items-center justify-center text-sm font-medium">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-gray-800">{option}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Code Template for Coding Questions */}
          {currentQuestion.type === 'coding' && currentQuestion.codeTemplate && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Code Template:
              </label>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{currentQuestion.codeTemplate}</code>
              </pre>
            </div>
          )}

          {/* Answer Area for Conceptual/System Design */}
          {(currentQuestion.type === 'conceptual' || currentQuestion.type === 'system_design') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Answer:
              </label>
              <textarea
                className="w-full h-40 input-field resize-y"
                placeholder="Type your answer here..."
              />
            </div>
          )}

          {/* Code Editor for Coding Questions */}
          {currentQuestion.type === 'coding' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Solution:
              </label>
              <textarea
                className="w-full h-60 input-field font-mono text-sm resize-y"
                placeholder="Write your code here..."
              />
            </div>
          )}

          {/* Tags */}
          {currentQuestion.tags && currentQuestion.tags.length > 0 && (
            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">Topics:</div>
              <div className="flex flex-wrap gap-2">
                {currentQuestion.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={prevQuestion}
          disabled={currentQuestionIndex === 0}
          className="btn-secondary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <div className="flex space-x-2">
          {interview.questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestionIndex(index)}
              className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                index === currentQuestionIndex
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          onClick={nextQuestion}
          disabled={currentQuestionIndex === interview.questions.length - 1}
          className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Next</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
} 