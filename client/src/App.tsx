import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AuthProvider, useAuth } from './auth/AuthContext'
import Navbar from './components/Navbar.tsx'
import HomePage from './pages/HomePage.tsx'
import Onboarding from './pages/Onboarding.tsx'
import DashboardPage from './pages/DashboardPage.tsx'
import DocumentsPage from './pages/DocumentsPage.tsx'
import AnalyticsPage from './pages/AnalyticsPage.tsx'
import TrackingPage from './pages/TrackingPage.tsx'
import AuthPage from './pages/AuthPage.tsx'
import TeamManagementPage from './pages/TeamManagementPage.tsx'

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />
  }

  return <>{children}</>
}

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}

function AppContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-16"
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/auth" element={
            <PublicRoute>
              <AuthPage />
            </PublicRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/documents" element={
            <ProtectedRoute>
              <DocumentsPage />
            </ProtectedRoute>
          } />
          <Route path="/analytics" element={
            <ProtectedRoute>
              <AnalyticsPage />
            </ProtectedRoute>
          } />
          <Route path="/tracking" element={
            <ProtectedRoute>
              <TrackingPage />
            </ProtectedRoute>
          } />
          <Route path="/team" element={
            <ProtectedRoute>
              <TeamManagementPage />
            </ProtectedRoute>
          } />
        </Routes>
      </motion.main>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
