'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { ExperienceLevel } from '@intervu/shared';
import { interviewAPI } from '@/utils/api';
import RoleSelector from '@/components/RoleSelector';
import LevelSelector from '@/components/LevelSelector';
import { Loader2, Play, Target, Clock, Brain } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<ExperienceLevel | ''>('');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateInterview = async () => {
    if (!selectedRole || !selectedLevel) {
      toast.error('Please select both role and experience level');
      return;
    }

    setIsLoading(true);
    try {
      const response = await interviewAPI.generateInterview({
        role: selectedRole,
        experienceLevel: selectedLevel as ExperienceLevel,
        questionCount
      });

      if (response.success && response.interview) {
        toast.success('Interview generated successfully!');
        router.push(`/interview/${response.interview.id}`);
      } else {
        toast.error(response.error || 'Failed to generate interview');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      console.error('Error generating interview:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          Ace Your Technical Interview
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Get personalized mock interviews with AI-generated questions tailored to your target role and experience level.
          Practice makes perfect!
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="card p-6 text-center">
          <Target className="w-12 h-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Role-Specific</h3>
          <p className="text-gray-600">Questions tailored to your target position and tech stack</p>
        </div>
        <div className="card p-6 text-center">
          <Brain className="w-12 h-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered</h3>
          <p className="text-gray-600">Advanced AI generates realistic interview scenarios</p>
        </div>
        <div className="card p-6 text-center">
          <Clock className="w-12 h-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Results</h3>
          <p className="text-gray-600">Get your personalized interview in seconds</p>
        </div>
      </div>

      {/* Interview Setup Form */}
      <div className="card p-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Start Your Mock Interview
        </h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Your Target Role
            </label>
            <RoleSelector 
              selectedRole={selectedRole}
              onRoleChange={setSelectedRole}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Experience Level
            </label>
            <LevelSelector 
              selectedLevel={selectedLevel}
              onLevelChange={setSelectedLevel}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Number of Questions
            </label>
            <select 
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              className="input-field"
            >
              <option value={5}>5 Questions (Quick)</option>
              <option value={10}>10 Questions (Standard)</option>
              <option value={15}>15 Questions (Comprehensive)</option>
              <option value={20}>20 Questions (Extensive)</option>
            </select>
          </div>

          <button
            onClick={handleGenerateInterview}
            disabled={isLoading || !selectedRole || !selectedLevel}
            className="w-full btn-primary py-3 text-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generating Interview...</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                <span>Generate Interview</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
} 