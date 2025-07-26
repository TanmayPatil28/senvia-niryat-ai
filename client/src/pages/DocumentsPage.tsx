import React from 'react'

const DocumentsPage = () => {
  return (
    <div className="min-h-screen gradient-bg py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-12 tracking-tight">Documents</h1>
        <div className="card p-12 text-center shadow-xl glass-effect animate-fade-in">
          <h2 className="text-2xl font-bold mb-6 flex items-center justify-center gap-2">
            <span className="icon-doc text-primary-700" />
            AI Document Processing
          </h2>
          <p className="text-lg text-gray-600 mb-4">Upload and process trade documents with AI</p>
          <button className="btn btn-primary px-8 py-3 rounded-full font-semibold text-lg shadow-lg transition hover:scale-105">Upload Document</button>
        </div>
      </div>
    </div>
  )
}

export default DocumentsPage
