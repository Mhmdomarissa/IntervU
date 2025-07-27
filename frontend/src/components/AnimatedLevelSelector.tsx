'use client';

import { motion } from 'framer-motion';
import { ExperienceLevel } from '@intervu/shared';
import { Star, TrendingUp, Award, Crown, Zap, Target, Users, Rocket } from 'lucide-react';

interface AnimatedLevelSelectorProps {
  selectedLevel: ExperienceLevel | '';
  onLevelChange: (level: ExperienceLevel) => void;
}

const levels = [
  {
    level: 'beginner' as ExperienceLevel,
    title: 'Beginner',
    description: 'New to the field, learning fundamentals',
    icon: Star,
    color: 'from-green-400 to-green-600',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-500',
    shadowColor: 'shadow-green-500/25',
    duration: '15-20 min',
    questions: '5-8 questions',
    difficulty: 'Basic concepts',
  },
  {
    level: 'junior' as ExperienceLevel,
    title: 'Junior',
    description: 'Some experience, building core skills',
    icon: TrendingUp,
    color: 'from-blue-400 to-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-500',
    shadowColor: 'shadow-blue-500/25',
    duration: '20-25 min',
    questions: '8-10 questions',
    difficulty: 'Practical skills',
  },
  {
    level: 'mid' as ExperienceLevel,
    title: 'Mid-Level',
    description: 'Experienced, handling complex tasks',
    icon: Award,
    color: 'from-purple-400 to-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    borderColor: 'border-purple-500',
    shadowColor: 'shadow-purple-500/25',
    duration: '25-30 min',
    questions: '10-12 questions',
    difficulty: 'Advanced concepts',
  },
  {
    level: 'senior' as ExperienceLevel,
    title: 'Senior',
    description: 'Expert level, leading and mentoring',
    icon: Crown,
    color: 'from-orange-400 to-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    borderColor: 'border-orange-500',
    shadowColor: 'shadow-orange-500/25',
    duration: '30-40 min',
    questions: '12-15 questions',
    difficulty: 'Expert level',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export default function AnimatedLevelSelector({ selectedLevel, onLevelChange }: AnimatedLevelSelectorProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4"
      >
        Select Experience Level
      </motion.div>
      
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {levels.map((level, index) => {
          const IconComponent = level.icon;
          const isSelected = selectedLevel === level.level;
          
          return (
            <motion.div
              key={level.level}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                y: -5,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onLevelChange(level.level)}
              className={`
                relative cursor-pointer p-6 rounded-xl border-2 transition-all duration-300
                ${isSelected 
                  ? `${level.bgColor} ${level.borderColor} shadow-lg ${level.shadowColor}` 
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
                }
              `}
            >
              {/* Selection Indicator */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center"
                >
                  <Target className="w-4 h-4 text-white" />
                </motion.div>
              )}

              {/* Level Icon */}
              <motion.div
                whileHover={{ rotate: 5 }}
                className={`w-12 h-12 bg-gradient-to-br ${level.color} rounded-lg flex items-center justify-center mb-4`}
              >
                <IconComponent className="w-6 h-6 text-white" />
              </motion.div>

              {/* Level Title */}
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {level.title}
              </h3>

              {/* Level Description */}
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {level.description}
              </p>

              {/* Level Details */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 dark:text-gray-400">Duration:</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">{level.duration}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 dark:text-gray-400">Questions:</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">{level.questions}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 dark:text-gray-400">Difficulty:</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">{level.difficulty}</span>
                </div>
              </div>

              {/* Progress Bar for Visual Appeal */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: isSelected ? '100%' : '60%' }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`h-1 rounded-full mt-4 ${isSelected ? 'bg-gradient-to-r from-green-400 to-blue-500' : 'bg-gray-200 dark:bg-gray-700'}`}
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Experience Level Guide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
      >
        <div className="flex items-center space-x-2 mb-2">
          <Rocket className="w-5 h-5 text-blue-500" />
          <span className="font-medium text-gray-700 dark:text-gray-300">Experience Guide</span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Choose the level that best matches your current experience. Don't worry about getting it perfect - 
          you can always adjust based on your performance!
        </p>
      </motion.div>
    </motion.div>
  );
} 