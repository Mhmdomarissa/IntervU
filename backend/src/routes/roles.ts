import express from 'express';
import { getAllRoles, createRole, getDefaultRoles } from '../controllers/roleController';

const router = express.Router();

// GET /api/roles - Get all roles
router.get('/', getAllRoles);

// GET /api/roles/defaults - Get predefined role options
router.get('/defaults', getDefaultRoles);

// POST /api/roles - Create a new role
router.post('/', createRole);

export default router; 