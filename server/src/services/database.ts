import { User } from '../models/User';
import { Team, TeamMember } from '../models/Team';
import bcrypt from 'bcryptjs';

// Simple in-memory database (in production, use PostgreSQL)
class DatabaseService {
  private users: Map<string, User> = new Map();
  private teams: Map<string, Team> = new Map();
  private teamMembers: Map<string, TeamMember> = new Map();
  private emailToUserId: Map<string, string> = new Map();

  // User methods
  async createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const id = this.generateId();
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const user: User = {
      ...userData,
      id,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.users.set(id, user);
    this.emailToUserId.set(userData.email, id);
    return user;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const userId = this.emailToUserId.get(email);
    if (!userId) return null;
    return this.users.get(userId) || null;
  }

  async getUserById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    const user = this.users.get(id);
    if (!user) return null;

    const updatedUser = { ...user, ...updates, updatedAt: new Date() };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Team methods
  async createTeam(teamData: Omit<Team, 'id' | 'createdAt' | 'updatedAt'>): Promise<Team> {
    const id = this.generateId();
    const team: Team = {
      ...teamData,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.teams.set(id, team);
    
    // Add owner as admin member
    await this.addTeamMember(id, teamData.ownerId, 'admin');
    
    return team;
  }

  async getTeamById(id: string): Promise<Team | null> {
    return this.teams.get(id) || null;
  }

  async addTeamMember(teamId: string, userId: string, role: 'admin' | 'member' | 'viewer'): Promise<TeamMember> {
    const memberId = this.generateId();
    const member: TeamMember = {
      id: memberId,
      userId,
      teamId,
      role,
      joinedAt: new Date()
    };

    this.teamMembers.set(memberId, member);
    
    // Update user's teamId
    const user = this.users.get(userId);
    if (user) {
      this.users.set(userId, { ...user, teamId });
    }

    return member;
  }

  async getTeamMembers(teamId: string): Promise<TeamMember[]> {
    const members: TeamMember[] = [];
    
    for (const member of this.teamMembers.values()) {
      if (member.teamId === teamId) {
        const user = this.users.get(member.userId);
        if (user) {
          members.push({
            ...member,
            user: {
              id: user.id,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName
            }
          });
        }
      }
    }
    
    return members;
  }

  async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}

export const db = new DatabaseService();