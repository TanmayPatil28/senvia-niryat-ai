import { 
  User, 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse, 
  Team, 
  CreateTeamRequest, 
  InviteTeamMemberRequest 
} from '../types/auth';

const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:6060/api';

class AuthService {
  private token: string | null = null;

  constructor() {
    // Load token from localStorage on initialization
    this.token = localStorage.getItem('auth_token');
  }

  private async apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers: any = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await this.apiCall<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    this.token = response.token;
    localStorage.setItem('auth_token', response.token);
    return response;
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await this.apiCall<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    this.token = response.token;
    localStorage.setItem('auth_token', response.token);
    return response;
  }

  async logout(): Promise<void> {
    if (this.token) {
      try {
        await this.apiCall('/auth/logout', { method: 'POST' });
      } catch (error) {
        // Ignore logout errors
        console.warn('Logout API error:', error);
      }
    }
    
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  async getCurrentUser(): Promise<User> {
    const response = await this.apiCall<{ user: User }>('/auth/me');
    return response.user;
  }

  async createTeam(data: CreateTeamRequest): Promise<Team> {
    const response = await this.apiCall<{ team: Team }>('/teams/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.team;
  }

  async getMyTeam(): Promise<Team> {
    const response = await this.apiCall<{ team: Team }>('/teams/my-team');
    return response.team;
  }

  async inviteTeamMember(data: InviteTeamMemberRequest): Promise<void> {
    await this.apiCall('/teams/invite', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getTeamMembers(): Promise<Team['members']> {
    const response = await this.apiCall<{ members: Team['members'] }>('/teams/members');
    return response.members;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  getToken(): string | null {
    return this.token;
  }
}

export const authService = new AuthService();