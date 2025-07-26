import React from 'react'

const AnalyticsPage = () => {
  return (
    <div className="min-h-screen gradient-bg py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-12 tracking-tight">Analytics</h1>
        <div className="card p-12 text-center shadow-xl glass-effect animate-fade-in">
          <h2 className="text-2xl font-bold mb-6 flex items-center justify-center gap-2">
            <span className="icon-analytics text-primary-700" />
            Predictive Analytics
          </h2>
          <p className="text-lg text-gray-600 mb-4">AI-powered market insights and forecasting</p>
          <button className="btn btn-primary px-8 py-3 rounded-full font-semibold text-lg shadow-lg transition hover:scale-105">View Insights</button>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPage
