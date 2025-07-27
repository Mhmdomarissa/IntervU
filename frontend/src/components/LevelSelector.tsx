'use client';

import { ExperienceLevel } from '@intervu/shared';
import { User, Users, Crown, Star } from 'lucide-react';

interface LevelSelectorProps {
  selectedLevel: ExperienceLevel | '';
  onLevelChange: (level: ExperienceLevel) => void;
}

const levels = [
  {
    value: 'beginner' as ExperienceLevel,
    label: 'Beginner',
    description: 'New to the field, basic concepts',
    icon: User,
    years: '0-1 years',
    color: 'green'
  },
  {
    value: 'junior' as ExperienceLevel,
    label: 'Junior',
    description: 'Some experience, learning fundamentals',
    icon: Users,
    years: '1-3 years',
    color: 'blue'
  },
  {
    value: 'mid' as ExperienceLevel,
    label: 'Mid-Level',
    description: 'Solid experience, can work independently',
    icon: Crown,
    years: '3-5 years',
    color: 'purple'
  },
  {
    value: 'senior' as ExperienceLevel,
    label: 'Senior',
    description: 'Expert level, leadership and architecture',
    icon: Star,
    years: '5+ years',
    color: 'orange'
  }
];

const colorMap = {
  green: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    selectedBg: 'bg-green-100',
    selectedBorder: 'border-green-400',
    icon: 'text-green-600',
    text: 'text-green-700'
  },
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    selectedBg: 'bg-blue-100',
    selectedBorder: 'border-blue-400',
    icon: 'text-blue-600',
    text: 'text-blue-700'
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    selectedBg: 'bg-purple-100',
    selectedBorder: 'border-purple-400',
    icon: 'text-purple-600',
    text: 'text-purple-700'
  },
  orange: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    selectedBg: 'bg-orange-100',
    selectedBorder: 'border-orange-400',
    icon: 'text-orange-600',
    text: 'text-orange-700'
  }
};

export default function LevelSelector({ selectedLevel, onLevelChange }: LevelSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {levels.map((level) => {
        const isSelected = selectedLevel === level.value;
        const colors = colorMap[level.color as keyof typeof colorMap];
        const Icon = level.icon;

        return (
          <button
            key={level.value}
            onClick={() => onLevelChange(level.value)}
            className={`
              p-4 rounded-lg border-2 text-left transition-all duration-200 hover:shadow-md
              ${isSelected 
                ? `${colors.selectedBg} ${colors.selectedBorder} shadow-md` 
                : `${colors.bg} ${colors.border} hover:${colors.selectedBg}`
              }
            `}
          >
            <div className="flex items-start space-x-3">
              <Icon className={`w-6 h-6 mt-0.5 ${colors.icon}`} />
              <div className="flex-1">
                <div className={`font-semibold ${colors.text}`}>
                  {level.label}
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  {level.description}
                </div>
                <div className={`text-xs font-medium ${colors.text}`}>
                  {level.years}
                </div>
              </div>
              {isSelected && (
                <div className={`w-3 h-3 rounded-full ${colors.icon.replace('text-', 'bg-')}`} />
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
} 