import React from 'react'
import { Link } from 'react-router-dom'
import { Bot } from 'lucide-react'

const Onboarding = () => (
  <div className="min-h-screen flex flex-col items-center justify-center gradient-bg glass-effect animate-fade-in">
    <div className="card p-16 max-w-2xl text-center shadow-2xl rounded-3xl bg-white/80 onboarding-card glass-effect animate-fade-in">
      <Bot className="h-20 w-20 text-primary-700 mx-auto mb-8 drop-shadow-lg" aria-label="SenviaNiryat.AI logo" />
      <h1 className="text-5xl font-extrabold mb-10 onboarding-title tracking-tight">Welcome to SenviaNiryat.AI</h1>
      <p className="text-2xl text-gray-700 mb-10">
        India’s first <span className="font-semibold onboarding-highlight text-primary-700">AI-powered export compliance copilot</span> for MSMEs.<br />
        Multilingual, offline-first, and designed for Bharat’s global ambitions.
      </p>
      <ul className="text-left mb-10 list-disc ml-10 onboarding-list text-lg">
        <li>Instant export compliance checks</li>
        <li>Auto-generate export documents</li>
        <li>Ask trade queries in English, Hindi, or Marathi</li>
        <li>Works offline as a PWA</li>
        <li>Integration-ready for DGFT, APEDA, ODOP</li>
      </ul>
      <Link to="/dashboard" className="btn-primary w-full mb-6 copilot-btn-lg text-xl py-4 rounded-xl transition hover:scale-105" title="Start using SenviaNiryat.AI">Get Started</Link>
      <Link to="/" className="btn-secondary w-full copilot-btn-lg text-xl py-4 rounded-xl transition hover:scale-105" title="Explore app features">Explore Features</Link>
    </div>
    <div className="mt-12 text-gray-500 text-lg onboarding-footer animate-fade-in">
      <span className="font-semibold onboarding-highlight text-primary-700">Built for hackathon victory.</span> Empowering MSMEs for global trade.
    </div>
  </div>
)

export default Onboarding
