import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar.tsx'
import HomePage from './pages/HomePage.tsx'
import Onboarding from './pages/Onboarding.tsx'
import DashboardPage from './pages/DashboardPage.tsx'
import DocumentsPage from './pages/DocumentsPage.tsx'
import AnalyticsPage from './pages/AnalyticsPage.tsx'
import TrackingPage from './pages/TrackingPage.tsx'

function App() {
  return (
    <div className="relative flex flex-col min-h-screen overflow-x-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10 animate-gradient bg-gradient-to-br from-blue-200 via-white to-blue-400" />
      <Navbar />
      <div className="flex items-center justify-center flex-1 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-6xl px-2 mx-auto sm:px-6 lg:px-12"
        >
            <div className="flex flex-col gap-8 p-8 text-black bg-white border border-blue-200 shadow-2xl md:p-14 rounded-3xl">
            <motion.main
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className=""
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
