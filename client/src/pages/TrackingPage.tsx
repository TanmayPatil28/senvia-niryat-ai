import React from 'react'

const TrackingPage = () => {
  return (
    <div className="min-h-screen gradient-bg py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
  <h1 className="text-4xl lg:text-5xl font-extrabold text-neutral-900 dark:text-neutral-50 mb-8 tracking-tight">Tracking</h1>
        <div className="card p-10 text-center elevate animate-fade-in">
          <h2 className="text-2xl font-semibold mb-4 flex items-center justify-center gap-3 text-neutral-900 dark:text-neutral-50">
            <span className="icon-tracking text-primary-700" />
            Real-time Tracking
          </h2>
          <p className="text-base text-neutral-700 mb-6">Track your shipments with AI-powered insights and ETA predictions.</p>
          <button className="btn-primary px-8 py-3 rounded-xl font-semibold text-lg">Track Shipment</button>
        </div>
      </div>
    </div>
  )
}

export default TrackingPage
