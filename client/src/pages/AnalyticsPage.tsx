import React from 'react'

const AnalyticsPage = () => {
  return (
    <div className="min-h-screen gradient-bg py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-black mb-8 tracking-tight">Analytics</h1>
        <div className="card p-10 text-center elevate animate-fade-in">
          <h2 className="text-2xl font-semibold mb-4 flex items-center justify-center gap-3 text-black">
            <span className="icon-analytics text-primary-700" />
            Predictive Analytics
          </h2>
          <p className="text-base text-neutral-700 mb-6">AI-powered market insights and forecasting to help you make smarter trade decisions.</p>
          <button className="btn-primary px-8 py-3 rounded-xl font-semibold text-lg">View Insights</button>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPage
