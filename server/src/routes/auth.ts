import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import { db } from '../services/database';
import { CreateUserRequest, LoginRequest, UserResponse } from '../models/User';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// Validation schemas
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  role: Joi.string().valid('admin', 'member', 'viewer').default('member')
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

// Helper function to generate JWT token
const generateToken = (userId: string): string => {
  const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
  return (jwt as any).sign({ userId }, jwtSecret, { expiresIn: '7d' });
};

// Helper function to convert User to UserResponse
const toUserResponse = (user: any): UserResponse => ({
  id: user.id,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  role: user.role,
  teamId: user.teamId,
  createdAt: user.createdAt
});

// Register endpoint
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const { email, password, firstName, lastName, role }: CreateUserRequest = value;

    // Check if user already exists
    const existingUser = await db.getUserByEmail(email);
    if (existingUser) {
      res.status(409).json({ error: 'User already exists with this email' });
      return;
    }

    // Create user
    const user = await db.createUser({
      email,
      password,
      firstName,
      lastName,
      role: role || 'member'
    });

    // Generate token
    const token = generateToken(user.id);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: toUserResponse(user)
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login endpoint
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const { email, password }: LoginRequest = value;

    // Get user by email
    const user = await db.getUserByEmail(email);
    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Verify password
    const isPasswordValid = await db.verifyPassword(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Generate token
    const token = generateToken(user.id);

    res.json({
      message: 'Login successful',
      token,
      user: toUserResponse(user)
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get current user profile
router.get('/me', authenticateToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    const user = await db.getUserById(req.user.id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json({
      user: toUserResponse(user)
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout endpoint (client-side token removal)
router.post('/logout', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  res.json({ message: 'Logout successful' });
});

export default router;