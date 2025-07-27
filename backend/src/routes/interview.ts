import express from 'express';
import { generateInterview, getInterviewById } from '../controllers/interviewController';

const router = express.Router();

// POST /api/interview/generate - Generate a new interview
router.post('/generate', generateInterview);

// GET /api/interview/:id - Get specific interview by ID
router.get('/:id', getInterviewById);

export default router; 