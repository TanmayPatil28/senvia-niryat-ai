import React from 'react'
import { Link } from 'react-router-dom'
import { Bot } from 'lucide-react'

const Onboarding = () => (
  <div className="min-h-screen flex flex-col items-center justify-center gradient-bg animate-fade-in">
  <div className="card p-12 max-w-2xl text-center shadow-2xl rounded-2xl bg-surface/90 dark:bg-[#071022]/90 onboarding-card">
      <Bot className="h-16 w-16 text-primary-700 mx-auto mb-6 drop-shadow-md" aria-label="SenviaNiryat.AI logo" />
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 onboarding-title tracking-tight">Welcome to SenviaNiryat.AI</h1>
      <p className="text-lg md:text-xl text-neutral-700 mb-6">
        India's first <span className="font-semibold onboarding-highlight text-primary-700">AI-powered export compliance copilot</span> for MSMEs.
      </p>
      <ul className="text-left mb-6 list-disc ml-6 onboarding-list text-base md:text-lg text-neutral-700">
        <li>Instant export compliance checks</li>
        <li>Auto-generate export documents</li>
        <li>Ask trade queries in English, Hindi, or Marathi</li>
        <li>Works offline as a PWA</li>
        <li>Integration-ready for DGFT, APEDA, ODOP</li>
      </ul>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <Link to="/dashboard" className="btn-primary w-full py-3 rounded-xl font-semibold">Get Started</Link>
        <Link to="/" className="btn-ghost w-full py-3 rounded-xl">Explore Features</Link>
      </div>
    </div>
    <div className="mt-8 text-gray-500 text-sm onboarding-footer">
      <span className="font-semibold onboarding-highlight text-primary-700">Built for hackathon victory.</span> Empowering MSMEs for global trade.
    </div>
  </div>
)

export default Onboarding
