import React from 'react'
import { Link } from 'react-router-dom'
import { Bot } from 'lucide-react'

const Onboarding = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
    <div className="card p-8 max-w-lg text-center shadow-xl">
      <Bot className="h-12 w-12 text-primary-600 mx-auto mb-4" />
      <h1 className="text-3xl font-bold mb-4">Welcome to SenviaNiryat.AI</h1>
      <p className="text-lg text-gray-700 mb-6">
        India’s first AI-powered export compliance copilot for MSMEs.<br />
        Multilingual, offline-first, and designed for Bharat’s global ambitions.
      </p>
      <ul className="text-left mb-6 list-disc ml-6 text-gray-600">
        <li>Instant export compliance checks</li>
        <li>Auto-generate export documents</li>
        <li>Ask trade queries in English, Hindi, or Marathi</li>
        <li>Works offline as a PWA</li>
        <li>Integration-ready for DGFT, APEDA, ODOP</li>
      </ul>
      <Link to="/dashboard" className="btn-primary w-full mb-2">Get Started</Link>
      <Link to="/" className="btn-secondary w-full">Explore Features</Link>
    </div>
    <div className="mt-8 text-gray-500 text-sm">
      Built for hackathon victory. Empowering MSMEs for global trade.
    </div>
  </div>
)

export default Onboarding
