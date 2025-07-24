export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'member' | 'viewer';
  teamId?: string;
  createdAt: Date;
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  createdAt: Date;
  members: TeamMember[];
}

export interface TeamMember {
  id: string;
  userId: string;
  teamId: string;
  role: 'admin' | 'member' | 'viewer';
  joinedAt: Date;
  user?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: 'admin' | 'member' | 'viewer';
}

export interface CreateTeamRequest {
  name: string;
  description?: string;
}

export interface InviteTeamMemberRequest {
  email: string;
  role: 'admin' | 'member' | 'viewer';
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}