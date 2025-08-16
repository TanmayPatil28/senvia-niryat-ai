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
    <nav className="fixed top-0 left-0 right-0 z-50 text-black bg-white border-b border-gray-100 shadow-xl">
      <div className="px-6 mx-auto max-w-7xl sm:px-10 lg:px-16">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3" title="Go to Home">
              <Bot className="w-10 h-10 text-primary-700 drop-shadow" aria-label="SenviaNiryat.AI logo" />
              <span className="text-2xl font-extrabold tracking-tight text-black navbar-title">
                Senvia Niryat AI
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="items-center hidden space-x-10 md:flex">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 navbar-link ${
                    isActive 
                      ? 'bg-gradient-to-r from-primary-100 to-white text-black shadow' 
                      : 'text-black hover:text-primary-700 hover:bg-gradient-to-r hover:from-white hover:to-primary-50'
                  }`}
                  title={`Go to ${item.label}`}
                >
                  <Icon className="w-6 h-6" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-3 text-black shadow rounded-xl hover:text-primary-700 hover:bg-primary-50"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              title={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="py-8 bg-white border-t border-gray-100 shadow-xl md:hidden rounded-b-2xl"
          >
            <div className="space-y-4">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-4 px-8 py-5 rounded-xl font-semibold transition-all duration-200 navbar-link ${
                      isActive 
                        ? 'bg-gradient-to-r from-primary-100 to-white text-primary-700 shadow' 
                        : 'text-gray-700 hover:text-primary-700 hover:bg-gradient-to-r hover:from-white hover:to-primary-50'
                    }`}
                    title={`Go to ${item.label}`}
                  >
                    <Icon className="h-7 w-7" />
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
