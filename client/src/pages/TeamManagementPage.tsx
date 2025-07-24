import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, Mail, Shield, Calendar, Plus } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { authService } from '../auth/authService';
import { CreateTeamRequest, InviteTeamMemberRequest } from '../types/auth';

const TeamManagementPage: React.FC = () => {
  const { user, team, refreshTeam } = useAuth();
  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const [showInviteMember, setShowInviteMember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Create team form state
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');

  // Invite member form state
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'admin' | 'member' | 'viewer'>('member');

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const teamData: CreateTeamRequest = {
        name: teamName,
        description: teamDescription || undefined,
      };
      
      await authService.createTeam(teamData);
      await refreshTeam();
      setShowCreateTeam(false);
      setTeamName('');
      setTeamDescription('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create team');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInviteMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const inviteData: InviteTeamMemberRequest = {
        email: inviteEmail,
        role: inviteRole,
      };
      
      await authService.inviteTeamMember(inviteData);
      await refreshTeam();
      setShowInviteMember(false);
      setInviteEmail('');
      setInviteRole('member');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to invite member');
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-700';
      case 'member':
        return 'bg-blue-100 text-blue-700';
      case 'viewer':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Team Management</h1>
          <p className="text-lg text-gray-600">Manage your team and collaborate on export projects</p>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 max-w-md mx-auto"
          >
            {error}
          </motion.div>
        )}

        {!team ? (
          // No team - show create team option
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8 text-center"
          >
            <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-12 h-12 text-primary-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Create Your Team</h2>
            <p className="text-gray-600 mb-8">
              Start collaborating with your team members on export-import projects
            </p>
            
            {!showCreateTeam ? (
              <button
                onClick={() => setShowCreateTeam(true)}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                <Plus className="w-5 h-5 inline mr-2" />
                Create Team
              </button>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleCreateTeam}
                className="max-w-md mx-auto"
              >
                <div className="space-y-4">
                  <div>
                    <label htmlFor="teamName" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                      Team Name
                    </label>
                    <input
                      id="teamName"
                      type="text"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter team name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="teamDescription" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                      Description (optional)
                    </label>
                    <textarea
                      id="teamDescription"
                      value={teamDescription}
                      onChange={(e) => setTeamDescription(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Describe your team"
                      rows={3}
                    />
                  </div>
                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 font-medium"
                    >
                      {isLoading ? 'Creating...' : 'Create Team'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCreateTeam(false)}
                      className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.form>
            )}
          </motion.div>
        ) : (
          // Has team - show team details and members
          <div className="space-y-8">
            {/* Team Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{team.name}</h2>
                  {team.description && (
                    <p className="text-gray-600 mt-2">{team.description}</p>
                  )}
                  <div className="flex items-center text-sm text-gray-500 mt-2">
                    <Calendar className="w-4 h-4 mr-1" />
                    Created {new Date(team.createdAt).toLocaleDateString()}
                  </div>
                </div>
                {user.role === 'admin' && (
                  <button
                    onClick={() => setShowInviteMember(true)}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                  >
                    <UserPlus className="w-5 h-5 inline mr-2" />
                    Invite Member
                  </button>
                )}
              </div>

              {/* Team Members */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Team Members ({team.members.length})
                </h3>
                <div className="grid gap-4">
                  {team.members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-primary-600 font-semibold">
                            {member.user?.firstName?.charAt(0)}{member.user?.lastName?.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {member.user?.firstName} {member.user?.lastName}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Mail className="w-4 h-4 mr-1" />
                            {member.user?.email}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
                          <Shield className="w-3 h-3 inline mr-1" />
                          {member.role}
                        </span>
                        <div className="text-xs text-gray-500">
                          Joined {new Date(member.joinedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Invite Member Modal */}
            {showInviteMember && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                onClick={() => setShowInviteMember(false)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl p-6 max-w-md w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Invite Team Member</h3>
                  <form onSubmit={handleInviteMember} className="space-y-4">
                    <div>
                      <label htmlFor="inviteEmail" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        id="inviteEmail"
                        type="email"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="member@company.com"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="inviteRole" className="block text-sm font-medium text-gray-700 mb-2">
                        Role
                      </label>
                      <select
                        id="inviteRole"
                        value={inviteRole}
                        onChange={(e) => setInviteRole(e.target.value as 'admin' | 'member' | 'viewer')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="member">Member</option>
                        <option value="admin">Admin</option>
                        <option value="viewer">Viewer</option>
                      </select>
                    </div>
                    <div className="flex space-x-4">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 font-medium"
                      >
                        {isLoading ? 'Inviting...' : 'Send Invite'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowInviteMember(false)}
                        className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamManagementPage;