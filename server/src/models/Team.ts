export interface Team {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTeamRequest {
  name: string;
  description?: string;
}

export interface InviteTeamMemberRequest {
  email: string;
  role: 'admin' | 'member' | 'viewer';
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

export interface TeamResponse {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  createdAt: Date;
  members: TeamMember[];
}