import OpenAI from 'openai';
import { ExperienceLevel, Question, QuestionType } from '@intervu/shared';
import { logger } from '../utils/logger';

export class AIService {
  private openai: OpenAI;

  constructor() {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is required');
    }
    
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateInterviewQuestions(
    role: string,
    experienceLevel: ExperienceLevel,
    questionCount: number = 10,
    focusAreas: string[] = []
  ): Promise<Question[]> {
    try {
      const prompt = this.buildPrompt(role, experienceLevel, questionCount, focusAreas);
      
      logger.info('Generating interview questions', { role, experienceLevel, questionCount });

      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an expert technical interviewer. Generate structured interview questions in valid JSON format only. Do not include any text outside the JSON structure.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No content received from OpenAI');
      }

      const questions = JSON.parse(content);
      return this.validateAndFormatQuestions(questions);
      
    } catch (error) {
      logger.error('Error generating interview questions:', error);
      throw new Error('Failed to generate interview questions');
    }
  }

  private buildPrompt(
    role: string,
    experienceLevel: ExperienceLevel,
    questionCount: number,
    focusAreas: string[]
  ): string {
    const focusText = focusAreas.length > 0 ? 
      `Focus particularly on: ${focusAreas.join(', ')}.` : '';

    return `Generate ${questionCount} interview questions for a ${experienceLevel} level ${role} position. ${focusText}

Include a mix of question types:
- 40% Multiple choice questions
- 30% Conceptual questions  
- 20% Coding challenges
- 10% System design (for mid/senior levels)

For each question, provide:
- id: unique identifier
- type: "multiple_choice", "coding", "conceptual", or "system_design"
- question: the question text
- difficulty: experience level
- timeLimit: estimated minutes to answer
- points: scoring weight (1-10)
- options: array of choices (for multiple_choice only)
- correctAnswer: index of correct option (for multiple_choice only)
- codeTemplate: starter code (for coding questions only)
- expectedSolution: sample solution (for coding questions only)
- tags: relevant technology tags

Return ONLY a JSON array of question objects. Ensure questions are appropriate for ${experienceLevel} level and cover ${role} specific skills.`;
  }

  private validateAndFormatQuestions(questions: any[]): Question[] {
    return questions.map((q, index) => ({
      id: q.id || `q_${Date.now()}_${index}`,
      type: q.type as QuestionType,
      question: q.question,
      difficulty: q.difficulty as ExperienceLevel,
      timeLimit: q.timeLimit || this.getDefaultTimeLimit(q.type),
      points: q.points || this.getDefaultPoints(q.type),
      options: q.options,
      correctAnswer: q.correctAnswer,
      codeTemplate: q.codeTemplate,
      expectedSolution: q.expectedSolution,
      tags: q.tags || []
    }));
  }

  private getDefaultTimeLimit(type: QuestionType): number {
    switch (type) {
      case 'multiple_choice': return 2;
      case 'conceptual': return 5;
      case 'coding': return 15;
      case 'system_design': return 20;
      default: return 5;
    }
  }

  private getDefaultPoints(type: QuestionType): number {
    switch (type) {
      case 'multiple_choice': return 2;
      case 'conceptual': return 3;
      case 'coding': return 5;
      case 'system_design': return 8;
      default: return 3;
    }
  }
} 