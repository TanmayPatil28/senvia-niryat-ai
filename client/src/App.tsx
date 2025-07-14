import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar.tsx'
import HomePage from './pages/HomePage.tsx'
import DashboardPage from './pages/DashboardPage.tsx'
import DocumentsPage from './pages/DocumentsPage.tsx'
import AnalyticsPage from './pages/AnalyticsPage.tsx'
import TrackingPage from './pages/TrackingPage.tsx'

function App() {
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
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/tracking" element={<TrackingPage />} />
        </Routes>
      </motion.main>
    </div>
  )
}

export default App
