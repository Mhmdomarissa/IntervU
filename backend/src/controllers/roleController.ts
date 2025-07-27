import { Request, Response } from 'express';
import { prisma } from '../server';
import { logger } from '../utils/logger';

export const getAllRoles = async (req: Request, res: Response): Promise<void> => {
  try {
    const roles = await prisma.role.findMany({
      orderBy: { name: 'asc' }
    });

    res.status(200).json({
      success: true,
      roles
    });
  } catch (error) {
    logger.error('Error fetching roles:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch roles'
    });
  }
};

export const createRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, category, techStack } = req.body;

    if (!name || !description || !category) {
      res.status(400).json({
        success: false,
        error: 'Name, description, and category are required'
      });
      return;
    }

    const role = await prisma.role.create({
      data: {
        name,
        description,
        category,
        techStack: techStack || []
      }
    });

    res.status(201).json({
      success: true,
      role
    });
  } catch (error) {
    logger.error('Error creating role:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create role'
    });
  }
};

export const getDefaultRoles = async (req: Request, res: Response): Promise<void> => {
  try {
    // Return predefined roles for the frontend
    const defaultRoles = [
      {
        id: 'frontend-react',
        name: 'Frontend React Developer',
        description: 'React.js frontend development with modern JavaScript/TypeScript',
        category: 'frontend',
        techStack: ['React', 'JavaScript', 'TypeScript', 'CSS', 'HTML', 'Redux', 'Next.js']
      },
      {
        id: 'backend-php',
        name: 'PHP Backend Developer', 
        description: 'PHP backend development with frameworks and databases',
        category: 'backend',
        techStack: ['PHP', 'Laravel', 'MySQL', 'REST APIs', 'Composer', 'PHPUnit']
      },
      {
        id: 'backend-node',
        name: 'Node.js Backend Developer',
        description: 'Node.js backend development with Express and databases',
        category: 'backend', 
        techStack: ['Node.js', 'Express', 'JavaScript', 'TypeScript', 'MongoDB', 'PostgreSQL']
      },
      {
        id: 'devops-engineer',
        name: 'DevOps Engineer',
        description: 'Infrastructure, CI/CD, and cloud platform management',
        category: 'devops',
        techStack: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Linux', 'Terraform', 'Jenkins']
      },
      {
        id: 'fullstack-developer',
        name: 'Full Stack Developer',
        description: 'End-to-end application development',
        category: 'fullstack',
        techStack: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'REST APIs', 'Git']
      },
      {
        id: 'mobile-react-native',
        name: 'React Native Developer',
        description: 'Cross-platform mobile app development',
        category: 'mobile',
        techStack: ['React Native', 'JavaScript', 'TypeScript', 'iOS', 'Android', 'Redux']
      }
    ];

    res.status(200).json({
      success: true,
      roles: defaultRoles
    });
  } catch (error) {
    logger.error('Error fetching default roles:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch default roles'
    });
  }
}; 