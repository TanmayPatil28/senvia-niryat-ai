import { Router, Response } from 'express';
import Joi from 'joi';
import { db } from '../services/database';
import { CreateTeamRequest, InviteTeamMemberRequest, TeamResponse } from '../models/Team';
import { authenticateToken, AuthenticatedRequest, requireRole } from '../middleware/auth';

const router = Router();

// Validation schemas
const createTeamSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional()
});

const inviteMemberSchema = Joi.object({
  email: Joi.string().email().required(),
  role: Joi.string().valid('admin', 'member', 'viewer').default('member')
});

// Create team
router.post('/', authenticateToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    const { error, value } = createTeamSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const { name, description }: CreateTeamRequest = value;

    // Check if user already has a team
    if (req.user.teamId) {
      res.status(409).json({ error: 'User already belongs to a team' });
      return;
    }

    // Create team
    const team = await db.createTeam({
      name,
      description,
      ownerId: req.user.id
    });

    // Get team with members
    const members = await db.getTeamMembers(team.id);
    const teamResponse: TeamResponse = {
      ...team,
      members
    };

    res.status(201).json({
      message: 'Team created successfully',
      team: teamResponse
    });
  } catch (error) {
    console.error('Create team error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get current user's team
router.get('/my-team', authenticateToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    if (!req.user.teamId) {
      res.status(404).json({ error: 'User is not part of any team' });
      return;
    }

    const team = await db.getTeamById(req.user.teamId);
    if (!team) {
      res.status(404).json({ error: 'Team not found' });
      return;
    }

    const members = await db.getTeamMembers(team.id);
    const teamResponse: TeamResponse = {
      ...team,
      members
    };

    res.json({ team: teamResponse });
  } catch (error) {
    console.error('Get team error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Invite team member
router.post('/invite', authenticateToken, requireRole(['admin']), async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    if (!req.user.teamId) {
      res.status(400).json({ error: 'User is not part of any team' });
      return;
    }

    const { error, value } = inviteMemberSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const { email, role }: InviteTeamMemberRequest = value;

    // Check if user exists
    const invitedUser = await db.getUserByEmail(email);
    if (!invitedUser) {
      res.status(404).json({ error: 'User not found with this email' });
      return;
    }

    // Check if user is already in a team
    if (invitedUser.teamId) {
      res.status(409).json({ error: 'User already belongs to a team' });
      return;
    }

    // Add user to team
    await db.addTeamMember(req.user.teamId, invitedUser.id, role || 'member');

    res.json({
      message: 'User invited to team successfully',
      invitedUser: {
        id: invitedUser.id,
        email: invitedUser.email,
        firstName: invitedUser.firstName,
        lastName: invitedUser.lastName,
        role: role || 'member'
      }
    });
  } catch (error) {
    console.error('Invite member error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get team members
router.get('/members', authenticateToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    if (!req.user.teamId) {
      res.status(400).json({ error: 'User is not part of any team' });
      return;
    }

    const members = await db.getTeamMembers(req.user.teamId);
    res.json({ members });
  } catch (error) {
    console.error('Get members error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;