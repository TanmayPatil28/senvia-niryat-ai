import React, { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useDarkMode } from '../AppWrapper'
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
  // Defensive guard: avoid rendering duplicate navbars during dev StrictMode/HMR reloads
  if (typeof document !== 'undefined' && document.getElementById('senvia-navbar')) {
    return null
  }
  const [isOpen, setIsOpen] = useState(false)
  const [isMobileView, setIsMobileView] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const location = useLocation()

  React.useEffect(() => {
    if (typeof window === 'undefined') return
    const onResize = () => setIsMobileView(window.innerWidth < 768)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Manage focus trap and body scroll when mobile menu is open
  React.useEffect(() => {
    const body = document.body
    if (isOpen && isMobileView) {
      // lock scroll
      body.style.overflow = 'hidden'
      // focus first focusable element inside menu
      const focusable = menuRef.current?.querySelector<HTMLElement>("a, button, input, [tabindex]:not([tabindex='-1'])")
      focusable?.focus()
    } else {
      body.style.overflow = ''
    }
    return () => { body.style.overflow = '' }
  }, [isOpen, isMobileView])

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/documents', label: 'Documents', icon: FileText },
    { path: '/analytics', label: 'Analytics', icon: TrendingUp },
    { path: '/tracking', label: 'Tracking', icon: MapPin },
  ]

  return (
  <nav id="senvia-navbar" className="fixed top-4 left-4 right-4 z-[1200] glass p-2" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto flex items-center justify-between relative">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center space-x-3" title="Go to Home">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary-100 to-white shadow-soft-xl glass">
                <Bot className="w-8 h-8 text-primary-700" aria-label="SenviaNiryat.AI logo" />
              </div>
              <span className="text-lg font-extrabold tracking-tight navbar-title">
                Senvia Niryat AI
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="items-center hidden space-x-4 md:flex">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-primary-50 to-white text-primary-800 shadow'
                      : 'text-neutral-700 hover:text-primary-700 hover:bg-primary-50'
                  }`}
                  title={`Go to ${item.label}`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}

            <Link to="/onboarding" className="btn btn-primary hidden md:inline-flex">
              Get Started
            </Link>

            <div className="ml-2 flex items-center space-x-3">
              <div className="relative hidden md:block">
                <input className="input w-56" placeholder="Search" aria-label="Search" />
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-200 to-primary-50 flex items-center justify-center text-white">
                  TN
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-neutral-700 rounded-lg bg-white glass shadow"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-controls="senvia-mobile-menu"
              title={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="ml-2">
              <DarkToggle compact />
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
  {isOpen && isMobileView && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            id="senvia-mobile-menu"
            className="absolute left-0 right-0 top-full mt-3 p-4 bg-white card-shadow rounded-xl md:hidden z-[1300] animate-fade-in-fast"
            ref={menuRef}
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
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-150 ${
                      isActive
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-neutral-700 hover:text-primary-700 hover:bg-neutral-100'
                    }`}
                    title={`Go to ${item.label}`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
              <div className="pt-2">
                <DarkToggle compact />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

function DarkToggle({ compact }: { compact?: boolean } = { compact: false }) {
  const { isDark, setIsDark } = useDarkMode()
  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className={`p-2 rounded-lg transition bg-white/60 dark:bg-transparent backdrop-blur flex items-center justify-center ${compact ? 'w-9 h-9' : 'px-3 py-2'}`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      {isDark ? <Sun className="w-4 h-4 text-yellow-300" /> : <Moon className="w-4 h-4 text-gray-700" />}
    </button>
  )
}

// import icons used in DarkToggle
import { Sun, Moon } from 'lucide-react'

export default Navbar
