// Core domain types
export interface Role {
  id: string;
  name: string;
  description: string;
  category: string; // 'frontend', 'backend', 'devops', 'mobile', etc.
  techStack: string[];
}

export type ExperienceLevel = 'beginner' | 'junior' | 'mid' | 'senior';

export type QuestionType = 'multiple_choice' | 'coding' | 'conceptual' | 'system_design';

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  difficulty: ExperienceLevel;
  timeLimit?: number; // in minutes
  points: number;
  // Type-specific fields
  options?: string[]; // for multiple_choice
  correctAnswer?: string | number; // for multiple_choice
  codeTemplate?: string; // for coding questions
  expectedSolution?: string; // for coding questions
  tags: string[];
}

export interface Interview {
  id: string;
  roleId: string;
  experienceLevel: ExperienceLevel;
  questions: Question[];
  totalPoints: number;
  estimatedDuration: number; // in minutes
  createdAt: Date;
}

// API Request/Response types
export interface GenerateInterviewRequest {
  role: string;
  experienceLevel: ExperienceLevel;
  questionCount?: number;
  focusAreas?: string[]; // optional focus on specific topics
}

export interface GenerateInterviewResponse {
  success: boolean;
  interview?: Interview;
  error?: string;
}

// User and Session types
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSession {
  id: string;
  userId: string;
  interviewId: string;
  answers: UserAnswer[];
  score?: number;
  completedAt?: Date;
  startedAt: Date;
}

export interface UserAnswer {
  questionId: string;
  answer: string;
  timeSpent: number; // in seconds
  isCorrect?: boolean;
  points?: number;
}

// Configuration types
export interface AIProviderConfig {
  provider: 'openai' | 'gemini';
  apiKey: string;
  model: string;
  maxTokens?: number;
}

export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
} 