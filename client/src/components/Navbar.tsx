import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Home, 
  BarChart3, 
  FileText, 
  TrendingUp, 
  MapPin,
  Menu,
  X,
  Bot,
  Users,
  LogOut,
  User
} from 'lucide-react'
import { useAuth } from '../auth/AuthContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { user, isAuthenticated, logout } = useAuth()

  const publicNavItems = [
    { path: '/', label: 'Home', icon: Home },
  ]

  const authenticatedNavItems = [
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/documents', label: 'Documents', icon: FileText },
    { path: '/analytics', label: 'Analytics', icon: TrendingUp },
    { path: '/tracking', label: 'Tracking', icon: MapPin },
    { path: '/team', label: 'Team', icon: Users },
  ]

  const navItems = isAuthenticated ? authenticatedNavItems : publicNavItems

  const handleLogout = async () => {
    await logout()
    setIsOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2" title="Go to Home">
              <Bot className="h-8 w-8 text-primary-600" aria-label="SenviaNiryat.AI logo" />
              <span className="text-xl font-bold text-gray-900 navbar-title">
                Senvia Niryat AI
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 navbar-link ${
                    isActive 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'text-gray-700 hover:text-primary-700 hover:bg-gray-100'
                  }`}
                  title={`Go to ${item.label}`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}

            {/* Auth Section */}
            <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-200">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <User className="h-4 w-4" />
                    <span>{user?.firstName} {user?.lastName}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    title="Sign Out"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                  title="Sign In"
                >
                  <User className="h-5 w-5" />
                  <span>Sign In</span>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-700 hover:text-primary-700 hover:bg-gray-100"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              title={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden py-6 border-t border-gray-200 bg-white"
          >
            <div className="space-y-3">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-5 py-4 rounded-lg transition-colors duration-200 navbar-link ${
                      isActive 
                        ? 'bg-primary-100 text-primary-700' 
                        : 'text-gray-700 hover:text-primary-700 hover:bg-gray-100'
                    }`}
                    title={`Go to ${item.label}`}
                  >
                    <Icon className="h-6 w-6" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}

              {/* Mobile Auth Section */}
              <div className="pt-4 mt-4 border-t border-gray-200">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center space-x-3 px-5 py-2 text-sm text-gray-600">
                      <User className="h-5 w-5" />
                      <span>{user?.firstName} {user?.lastName}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 px-5 py-4 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 w-full"
                    >
                      <LogOut className="h-6 w-6" />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <Link
                    to="/auth"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 px-5 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                  >
                    <User className="h-6 w-6" />
                    <span>Sign In</span>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
