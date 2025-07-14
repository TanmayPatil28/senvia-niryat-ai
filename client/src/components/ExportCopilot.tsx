import React, { useState } from 'react'
import { checkCompliance, generateDocument, translateText } from '../api'
import { products, countries } from '../sampleData'

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

  const handleDemo = () => {
    setProduct('spices')
    setCountry('usa')
    setQuery('What certifications are needed for spices export to USA?')
    setLanguage('en')
    setCompliance({
      readinessScore: 0.95,
      requiredCertifications: ['FSSAI', 'FDA'],
      labelingStandards: ['English', 'Batch Number'],
      countryNorms: ['US FDA'],
      checklist: ['Invoice', 'COO', 'Product Declaration']
    })
    setDocument('/documents/sample.pdf')
    setTranslation('FSSAI and FDA certifications are required for spices export to USA.')
  }

  return (
    <div className="max-w-xl mx-auto p-6 card mt-8 bg-white shadow-lg rounded-lg copilot-card copilot-bg">
      <h2 className="text-2xl font-bold mb-6 copilot-title">Export Compliance Copilot</h2>
      <button className="btn-secondary w-full mb-6 copilot-btn" onClick={handleDemo} title="Try demo mode for instant showcase">
        Demo Mode (Auto-fill)
      </button>
      <div className="mb-6">
        <label className="block mb-2 font-medium" htmlFor="product-select">Product <span className="sr-only">Select product for compliance check</span></label>
        <select id="product-select" className="input-field copilot-input" value={product} onChange={e => setProduct(e.target.value)} title="Select product">
          <option value="">Select product</option>
          {products.map(p => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
      </div>
      <div className="mb-6">
        <label className="block mb-2 font-medium" htmlFor="country-select">Destination Country <span className="sr-only">Select destination country</span></label>
        <select id="country-select" className="input-field copilot-input" value={country} onChange={e => setCountry(e.target.value)} title="Select country">
          <option value="">Select country</option>
          {countries.map(c => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>
      <div className="mb-6">
        <button className="btn-primary w-full copilot-btn" onClick={handleCheck} disabled={loading} title="Check export compliance for selected product and country">
          {loading ? 'Checking...' : 'Check Compliance'}
        </button>
        <span className="text-xs text-gray-500">Checks all required certifications, labeling, and country norms.</span>
      </div>
      {compliance && (
        <div className="mb-6">
          <h3 className="font-semibold mb-2 copilot-score">Readiness Score: {compliance.readinessScore}</h3>
          <ul className="list-disc ml-6 text-gray-700">
            <li><strong>Certifications:</strong> {compliance.requiredCertifications.join(', ')}</li>
            <li><strong>Labeling:</strong> {compliance.labelingStandards.join(', ')}</li>
            <li><strong>Country Norms:</strong> {compliance.countryNorms.join(', ')}</li>
            <li><strong>Checklist:</strong> {compliance.checklist.join(', ')}</li>
          </ul>
        </div>
      )}
      <div className="mb-6">
        <button className="btn-secondary w-full copilot-btn" onClick={() => handleGenerate('invoice')} disabled={loading} title="Generate export invoice document">
          {loading ? 'Generating...' : 'Generate Invoice'}
        </button>
        <span className="text-xs text-gray-500">Auto-generates export documents for MSMEs.</span>
      </div>
      {document && (
        <div className="mb-6">
          <a href={document} target="_blank" rel="noopener noreferrer" className="copilot-download underline" title="Download generated document">Download Document</a>
        </div>
      )}
      <div className="mb-6">
        <label className="block mb-2 font-medium" htmlFor="query-input">Ask in English/Hindi/Marathi <span className="sr-only">Type your export query</span></label>
        <input id="query-input" className="input-field mb-2 copilot-input" value={query} onChange={e => setQuery(e.target.value)} placeholder="Type your query..." title="Type your export-related query" />
        <label htmlFor="language-select" className="block mb-2 font-medium">Select Language <span className="sr-only">Choose language for translation</span></label>
        <select id="language-select" className="input-field mb-2 copilot-input" value={language} onChange={e => setLanguage(e.target.value)} title="Select language">
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="mr">Marathi</option>
        </select>
        <button className="btn-primary w-full mt-2 copilot-btn" onClick={handleTranslate} disabled={loading} title="Translate your query">
          {loading ? 'Translating...' : 'Translate'}
        </button>
        <span className="text-xs text-gray-500">Supports multilingual queries for Bharat’s MSMEs.</span>
      </div>
      {translation && (
        <div className="mb-6">
          <h3 className="font-semibold mb-2 copilot-link">Translation:</h3>
          <div className="bg-gray-100 p-3 rounded text-gray-800 copilot-xs">{translation}</div>
        </div>
      )}
    </div>
  )
}

export default ExportCopilot
