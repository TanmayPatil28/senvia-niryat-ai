import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Team } from '../types/auth';
import { authService } from './authService';

interface AuthContextType {
  user: User | null;
  team: Team | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  refreshTeam: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    if (authService.isAuthenticated()) {
      try {
        const userData = await authService.getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error('Failed to load user:', error);
        // If token is invalid, clear it
        await logout();
      }
    }
  };

  const refreshTeam = async () => {
    if (authService.isAuthenticated() && user?.teamId) {
      try {
        const teamData = await authService.getMyTeam();
        setTeam(teamData);
      } catch (error) {
        console.error('Failed to load team:', error);
        setTeam(null);
      }
    } else {
      setTeam(null);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      if (authService.isAuthenticated()) {
        await refreshUser();
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  useEffect(() => {
    if (user) {
      refreshTeam();
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    const response = await authService.login({ email, password });
    setUser(response.user);
  };

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    const response = await authService.register({ 
      email, 
      password, 
      firstName, 
      lastName 
    });
    setUser(response.user);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setTeam(null);
  };

  const value: AuthContextType = {
    user,
    team,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    refreshUser,
    refreshTeam,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};