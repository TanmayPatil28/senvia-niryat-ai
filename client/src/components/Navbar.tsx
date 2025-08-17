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
  const [isOpen, setIsOpen] = useState(false)
  const [isMobileView, setIsMobileView] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const searchRef = useRef<HTMLInputElement | null>(null)
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
  if ((isOpen || isSearchOpen) && isMobileView) {
      // lock scroll
      body.style.overflow = 'hidden'
      // focus first focusable element inside menu
      if (isSearchOpen) {
        setTimeout(() => searchRef.current?.focus(), 50)
      } else {
        const focusable = menuRef.current?.querySelectorAll<HTMLElement>("a, button, input, [tabindex]:not([tabindex='-1'])")
        if (focusable && focusable.length) {
          focusable[0].focus()
        }
      }
      // trap focus inside the menu
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsOpen(false)
          return
        }
        if (e.key === 'Tab') {
          const nodes = menuRef.current?.querySelectorAll<HTMLElement>("a, button, input, [tabindex]:not([tabindex='-1'])")
          if (!nodes || nodes.length === 0) return
          const first = nodes[0]
          const last = nodes[nodes.length - 1]
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault()
            last.focus()
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
      document.addEventListener('keydown', handleKey)
      // click outside to close
      const handleClickOutside = (ev: MouseEvent) => {
        // if search overlay is open, close when clicking outside it
        if (isSearchOpen) {
          const searchPanel = document.getElementById('senvia-search-panel')
          if (searchPanel && ev.target instanceof Node && !searchPanel.contains(ev.target as Node)) {
            setIsSearchOpen(false)
          }
        }
        if (!menuRef.current) return
        if (ev.target instanceof Node && !menuRef.current.contains(ev.target as Node)) {
          setIsOpen(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      // cleanup
      return () => {
        body.style.overflow = ''
        document.removeEventListener('keydown', handleKey)
        document.removeEventListener('mousedown', handleClickOutside)
      }
    } else {
      body.style.overflow = ''
    }
    return () => { body.style.overflow = '' }
  }, [isOpen, isMobileView, isSearchOpen])

  // NOTE: removed early return guard to comply with React Hooks rules; duplicates are rare in StrictMode

  // Restore focus to the menu toggle button when closing
  const toggleRef = useRef<HTMLButtonElement | null>(null)
  useEffect(() => {
    if (!isOpen && toggleRef.current) {
      toggleRef.current.focus()
    }
  }, [isOpen])

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/documents', label: 'Documents', icon: FileText },
    { path: '/analytics', label: 'Analytics', icon: TrendingUp },
    { path: '/tracking', label: 'Tracking', icon: MapPin },
  ]

  return (
    <nav id="senvia-navbar" className="fixed inset-x-4 top-4 z-[1200] glass p-3 shadow-lg" role="navigation" aria-label="Main navigation">
  <div className="mx-auto max-w-7xl senvia-grid">
        {/* Left: Logo */}
  <div className="flex items-center flex-shrink-0 gap-4">
          <Link to="/" className="flex items-center gap-3" title="Go to Home">
            <div className="p-2 shadow-lg rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 transform-gpu">
              <Bot className="w-8 h-8 text-primary-700" aria-label="SenviaNiryat.AI logo" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold text-neutral-800 dark:text-neutral-50">Senvia</div>
              <div className="text-xs text-neutral-500 dark:text-neutral-300 -mt-0.5">Niryat AI</div>
            </div>
          </Link>
        </div>

        {/* Center: nav links (desktop) */}
        {!isMobileView && (
            <div className="items-center justify-center hidden min-w-0 md:flex senvia-center">
            <div className="flex items-center px-3 py-1 space-x-1 rounded-full bg-surface/40 dark:bg-transparent glass flex-nowrap senvia-center-pill">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                      isActive ? 'bg-primary-600/10 text-primary-500' : 'text-neutral-700 dark:text-neutral-300 hover:text-primary-600'
                    }`}
                    title={`Go to ${item.label}`}
                  >
                    <Icon className="w-4 h-4" aria-hidden />
                    <span className="hidden md:inline">{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* Right: actions */}
  <div className="flex items-center justify-end min-w-0 gap-3">
          <div className="hidden min-w-0 md:block">
            <input className="input max-w-[18rem] w-full" placeholder="Search trade docs, shipments..." aria-label="Search" />
          </div>

          <Link to="/onboarding" className="hidden btn btn-primary md:inline-flex whitespace-nowrap">
            Get Started
          </Link>
          {/* small compact CTA for very small screens */}
          <Link to="/onboarding" className="px-3 py-2 rounded-lg md:hidden btn btn-primary" aria-label="Get started">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </Link>

          <div className="items-center hidden gap-3 md:flex">
            <div className="flex items-center justify-center text-white rounded-full w-9 h-9 bg-gradient-to-br from-primary-200 to-primary-50">TN</div>
          </div>

          {/* mobile: compact actions (search icon, theme, menu) */}
          <div className="flex items-center gap-2 md:hidden">
            <button onClick={() => setIsSearchOpen(true)} className="p-2 rounded-lg shadow-sm glass" aria-label="Search">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-neutral-800 dark:text-neutral-100" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z" /></svg>
            </button>
            <DarkToggle compact />
            <button
              ref={toggleRef}
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg shadow-md glass dark:bg-transparent"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="w-6 h-6 text-neutral-800 dark:text-neutral-100" /> : <Menu className="w-6 h-6 text-neutral-800 dark:text-neutral-100" />}
            </button>
          </div>
        </div>

        {/* Mobile full-screen overlay menu */}
        {isOpen && isMobileView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1300]"
            aria-hidden={false}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
            <div className="absolute top-12 left-4 right-4 mx-auto max-w-md bg-surface dark:bg-[#071022] rounded-2xl shadow-xl p-6" role="dialog" aria-modal="true" aria-label="Main menu" ref={menuRef}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary-50">
                    <Bot className="w-6 h-6 text-primary-700" />
                  </div>
                  <div className="font-semibold">Senvia Niryat AI</div>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 rounded-md" aria-label="Close menu">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.path
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive ? 'bg-primary-50 text-primary-700' : 'text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/50'}`}
                    >
                      <Icon className="w-5 h-5" aria-hidden />
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
              </div>
              <div className="flex items-center justify-between mt-4">
                <DarkToggle />
                <Link to="/onboarding" className="w-full ml-3 btn btn-primary">Get Started</Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* Mobile search overlay */}
        {isSearchOpen && isMobileView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1350]"
            aria-hidden={false}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsSearchOpen(false)} />
            <div id="senvia-search-panel" className="absolute top-16 left-4 right-4 mx-auto max-w-md bg-surface dark:bg-[#071022] rounded-2xl shadow-xl p-4" role="dialog" aria-modal="true" aria-label="Search" >
              <div className="flex items-center gap-3">
                <input ref={searchRef} className="w-full input" placeholder="Search trade docs, shipments..." aria-label="Search" />
                <button onClick={() => setIsSearchOpen(false)} className="p-2 rounded-md" aria-label="Close search">
                  <X className="w-5 h-5" />
                </button>
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
  className={`p-2 rounded-lg transition glass flex items-center justify-center ${compact ? 'w-9 h-9' : 'px-3 py-2'}`}
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
