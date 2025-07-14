import React from 'react'
import { Link } from 'react-router-dom'
import { Bot } from 'lucide-react'

const Onboarding = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
    <div className="card p-10 max-w-lg text-center shadow-2xl rounded-lg bg-white onboarding-card">
      <Bot className="h-14 w-14 text-primary-600 mx-auto mb-6" aria-label="SenviaNiryat.AI logo" />
      <h1 className="text-4xl font-bold mb-6 onboarding-title">Welcome to SenviaNiryat.AI</h1>
      <p className="text-xl text-gray-700 mb-8">
        India’s first <span className="font-semibold onboarding-highlight">AI-powered export compliance copilot</span> for MSMEs.<br />
        Multilingual, offline-first, and designed for Bharat’s global ambitions.
      </p>
      <ul className="text-left mb-8 list-disc ml-8 onboarding-list">
        <li>Instant export compliance checks</li>
        <li>Auto-generate export documents</li>
        <li>Ask trade queries in English, Hindi, or Marathi</li>
        <li>Works offline as a PWA</li>
        <li>Integration-ready for DGFT, APEDA, ODOP</li>
      </ul>
      <Link to="/dashboard" className="btn-primary w-full mb-4 copilot-btn-lg" title="Start using SenviaNiryat.AI">Get Started</Link>
      <Link to="/" className="btn-secondary w-full copilot-btn-lg" title="Explore app features">Explore Features</Link>
    </div>
    <div className="mt-10 text-gray-500 text-base onboarding-footer">
      <span className="font-semibold onboarding-highlight">Built for hackathon victory.</span> Empowering MSMEs for global trade.
    </div>
  </div>
)

export default Onboarding
