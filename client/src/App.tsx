import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import Onboarding from './pages/Onboarding'
import DashboardPage from './pages/DashboardPage'
import DocumentsPage from './pages/DocumentsPage'
import AnalyticsPage from './pages/AnalyticsPage'
import TrackingPage from './pages/TrackingPage'

function App() {
  return (
    <div className="relative flex flex-col min-h-screen overflow-x-hidden">
      {/* Background layers for depth */}
      <div className="absolute inset-0 -z-20 gradient-bg" />
      <div className="absolute -left-20 top-20 w-80 h-80 bg-primary-100 opacity-20 rounded-full animate-float-y -z-10" />

      <Navbar />

      <div className="flex items-center justify-center flex-1 pt-28 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-7xl px-4 mx-auto sm:px-6 lg:px-8"
        >
          <div className="p-8 text-black card card-hero card-muted rounded-2xl">
            <motion.main
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/documents" element={<DocumentsPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/tracking" element={<TrackingPage />} />
              </Routes>
            </motion.main>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default App
