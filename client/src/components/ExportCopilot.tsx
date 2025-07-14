import React, { useState } from 'react'
import { checkCompliance, generateDocument, translateText } from '../api'

type ComplianceType = {
  readinessScore: number
  requiredCertifications: string[]
  labelingStandards: string[]
  countryNorms: string[]
  checklist: string[]
}

const ExportCopilot = () => {
  const [product, setProduct] = useState('')
  const [country, setCountry] = useState('')
  const [language, setLanguage] = useState('en')
  const [compliance, setCompliance] = useState<ComplianceType | null>(null)
  const [document, setDocument] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [translation, setTranslation] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCheck = async () => {
    setLoading(true)
    const res = await checkCompliance({ product, country })
    setCompliance(res.data)
    setLoading(false)
  }

  const handleGenerate = async (type) => {
    setLoading(true)
    const res = await generateDocument({ type, product, country })
    setDocument(res.url)
    setLoading(false)
  }

  const handleTranslate = async () => {
    setLoading(true)
    const res = await translateText({ text: query, lang: language })
    setTranslation(res.translated[language])
    setLoading(false)
  }

  return (
    <div className="max-w-xl mx-auto p-6 card mt-8">
      <h2 className="text-2xl font-bold mb-4">Export Compliance Copilot</h2>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Product</label>
        <input className="input-field" value={product} onChange={e => setProduct(e.target.value)} placeholder="e.g. Spices" />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Destination Country</label>
        <input className="input-field" value={country} onChange={e => setCountry(e.target.value)} placeholder="e.g. USA" />
      </div>
      <div className="mb-4">
        <button className="btn-primary w-full" onClick={handleCheck} disabled={loading}>
          {loading ? 'Checking...' : 'Check Compliance'}
        </button>
      </div>
      {compliance && (
        <div className="mb-4">
          <h3 className="font-semibold">Readiness Score: {compliance.readinessScore}</h3>
          <ul className="list-disc ml-6">
            <li>Certifications: {compliance.requiredCertifications.join(', ')}</li>
            <li>Labeling: {compliance.labelingStandards.join(', ')}</li>
            <li>Country Norms: {compliance.countryNorms.join(', ')}</li>
            <li>Checklist: {compliance.checklist.join(', ')}</li>
          </ul>
        </div>
      )}
      <div className="mb-4">
        <button className="btn-secondary w-full" onClick={() => handleGenerate('invoice')} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Invoice'}
        </button>
      </div>
      {document && (
        <div className="mb-4">
          <a href={document} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Download Document</a>
        </div>
      )}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Ask in English/Hindi/Marathi</label>
        <input className="input-field" value={query} onChange={e => setQuery(e.target.value)} placeholder="Type your query..." />
        <label htmlFor="language-select" className="block mb-1 font-medium">Select Language</label>
        <select id="language-select" className="input-field mt-2" value={language} onChange={e => setLanguage(e.target.value)} title="Select language">
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="mr">Marathi</option>
        </select>
        <button className="btn-primary w-full mt-2" onClick={handleTranslate} disabled={loading}>
          {loading ? 'Translating...' : 'Translate'}
        </button>
      </div>
      {translation && (
        <div className="mb-4">
          <h3 className="font-semibold">Translation:</h3>
          <div className="bg-gray-100 p-2 rounded">{translation}</div>
        </div>
      )}
    </div>
  )
}

export default ExportCopilot
