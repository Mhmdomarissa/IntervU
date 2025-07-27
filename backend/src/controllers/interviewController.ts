import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { GenerateInterviewRequest, GenerateInterviewResponse, Interview } from '@intervu/shared';
import { AIService } from '../services/aiService';
import { prisma } from '../server';
import { logger } from '../utils/logger';

const aiService = new AIService();

export const generateInterview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { role, experienceLevel, questionCount = 10, focusAreas = [] }: GenerateInterviewRequest = req.body;

    // Validate required fields
    if (!role || !experienceLevel) {
      res.status(400).json({
        success: false,
        error: 'Role and experience level are required'
      } as GenerateInterviewResponse);
      return;
    }

    // Validate experience level
    const validLevels = ['beginner', 'junior', 'mid', 'senior'];
    if (!validLevels.includes(experienceLevel)) {
      res.status(400).json({
        success: false,
        error: 'Invalid experience level. Must be one of: beginner, junior, mid, senior'
      } as GenerateInterviewResponse);
      return;
    }

    logger.info('Generating interview', { role, experienceLevel, questionCount });

    // Find or create role in database
    let dbRole = await prisma.role.findFirst({
      where: { name: { contains: role, mode: 'insensitive' } }
    });

    if (!dbRole) {
      // Create a basic role entry if it doesn't exist
      dbRole = await prisma.role.create({
        data: {
          name: role,
          description: `${role} position`,
          category: 'general',
          techStack: focusAreas.length > 0 ? focusAreas : [role]
        }
      });
    }

    // Generate questions using AI service
    const questions = await aiService.generateInterviewQuestions(
      role,
      experienceLevel,
      questionCount,
      focusAreas
    );

    // Calculate total points and estimated duration
    const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
    const estimatedDuration = questions.reduce((sum, q) => sum + (q.timeLimit || 5), 0);

    // Create interview object
    const interview: Interview = {
      id: uuidv4(),
      roleId: dbRole.id,
      experienceLevel,
      questions,
      totalPoints,
      estimatedDuration,
      createdAt: new Date()
    };

    // Save interview to database
    await prisma.interview.create({
      data: {
        id: interview.id,
        roleId: interview.roleId,
        experienceLevel: interview.experienceLevel,
        questions: JSON.stringify(interview.questions),
        totalPoints: interview.totalPoints,
        estimatedDuration: interview.estimatedDuration
      }
    });

    logger.info('Interview generated successfully', { 
      interviewId: interview.id, 
      questionCount: questions.length,
      totalPoints,
      estimatedDuration 
    });

    res.status(200).json({
      success: true,
      interview
    } as GenerateInterviewResponse);

  } catch (error) {
    logger.error('Error generating interview:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate interview. Please try again.'
    } as GenerateInterviewResponse);
  }
};

export const getInterviewById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const interview = await prisma.interview.findUnique({
      where: { id },
      include: { role: true }
    });

    if (!interview) {
      res.status(404).json({
        success: false,
        error: 'Interview not found'
      });
      return;
    }

    // Parse questions from JSON
    const parsedInterview: Interview = {
      ...interview,
      questions: JSON.parse(interview.questions as string),
      createdAt: interview.createdAt
    };

    res.status(200).json({
      success: true,
      interview: parsedInterview
    });

  } catch (error) {
    logger.error('Error fetching interview:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch interview'
    });
  }
}; 