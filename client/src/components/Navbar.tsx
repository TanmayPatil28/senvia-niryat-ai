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
  Bot
} from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/documents', label: 'Documents', icon: FileText },
    { path: '/analytics', label: 'Analytics', icon: TrendingUp },
    { path: '/tracking', label: 'Tracking', icon: MapPin },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200" style={{ fontSize: '1.08rem' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2" title="Go to Home">
              <Bot className="h-8 w-8 text-primary-600" aria-label="SenviaNiryat.AI logo" />
              <span className="text-xl font-bold text-gray-900" style={{ letterSpacing: '0.02em' }}>
                Senvia Niryat AI
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                    isActive 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'text-gray-700 hover:text-primary-700 hover:bg-gray-100'
                  }`}
                  style={{ fontSize: '1.08rem', fontWeight: 500 }}
                  title={`Go to ${item.label}`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
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
                    className={`flex items-center space-x-3 px-5 py-4 rounded-lg transition-colors duration-200 ${
                      isActive 
                        ? 'bg-primary-100 text-primary-700' 
                        : 'text-gray-700 hover:text-primary-700 hover:bg-gray-100'
                    }`}
                    style={{ fontSize: '1.08rem', fontWeight: 500 }}
                    title={`Go to ${item.label}`}
                  >
                    <Icon className="h-6 w-6" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
