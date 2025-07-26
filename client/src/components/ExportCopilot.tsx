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
    <div className="max-w-2xl mx-auto p-12 card mt-12 glass-effect gradient-bg shadow-2xl rounded-3xl copilot-card copilot-bg animate-fade-in">
      <h2 className="text-4xl font-extrabold mb-10 copilot-title tracking-tight flex items-center gap-3">
        <span className="icon-copilot text-primary-700" />
        Export Compliance Copilot
      </h2>
      <button className="btn-secondary w-full mb-8 copilot-btn transition hover:scale-105" onClick={handleDemo} title="Try demo mode for instant showcase">
        <span className="icon-demo mr-2" />Demo Mode (Auto-fill)
      </button>
      <div className="mb-8">
        <label className="block mb-3 font-semibold text-lg" htmlFor="product-select">Product</label>
        <select id="product-select" className="input-field copilot-input text-lg px-4 py-3 rounded-xl" value={product} onChange={e => setProduct(e.target.value)} title="Select product">
          <option value="">Select product</option>
          {products.map(p => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
      </div>
      <div className="mb-8">
        <label className="block mb-3 font-semibold text-lg" htmlFor="country-select">Destination Country</label>
        <select id="country-select" className="input-field copilot-input text-lg px-4 py-3 rounded-xl" value={country} onChange={e => setCountry(e.target.value)} title="Select country">
          <option value="">Select country</option>
          {countries.map(c => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>
      <div className="mb-8">
        <button className="btn-primary w-full copilot-btn text-lg py-3 rounded-xl transition hover:scale-105" onClick={handleCheck} disabled={loading} title="Check export compliance for selected product and country">
          {loading ? 'Checking...' : 'Check Compliance'}
        </button>
        <span className="text-xs text-gray-500 block mt-2">Checks all required certifications, labeling, and country norms.</span>
      </div>
      {compliance && (
        <div className="mb-8">
          <h3 className="font-semibold mb-3 copilot-score text-xl">Readiness Score: <span className="text-primary-700 font-bold">{compliance.readinessScore}</span></h3>
          <ul className="list-disc ml-6 text-gray-700 text-lg">
            <li><strong>Certifications:</strong> {compliance.requiredCertifications.join(', ')}</li>
            <li><strong>Labeling:</strong> {compliance.labelingStandards.join(', ')}</li>
            <li><strong>Country Norms:</strong> {compliance.countryNorms.join(', ')}</li>
            <li><strong>Checklist:</strong> {compliance.checklist.join(', ')}</li>
          </ul>
        </div>
      )}
      <div className="mb-8">
        <button className="btn-secondary w-full copilot-btn text-lg py-3 rounded-xl transition hover:scale-105" onClick={() => handleGenerate('invoice')} disabled={loading} title="Generate export invoice document">
          {loading ? 'Generating...' : 'Generate Invoice'}
        </button>
        <span className="text-xs text-gray-500 block mt-2">Auto-generates export documents for MSMEs.</span>
      </div>
      {document && (
        <div className="mb-8">
          <a href={document} target="_blank" rel="noopener noreferrer" className="copilot-download underline text-primary-700 font-semibold text-lg" title="Download generated document">Download Document</a>
        </div>
      )}
      <div className="mb-8">
        <label className="block mb-3 font-semibold text-lg" htmlFor="query-input">Ask in English/Hindi/Marathi</label>
        <input id="query-input" className="input-field mb-3 copilot-input text-lg px-4 py-3 rounded-xl" value={query} onChange={e => setQuery(e.target.value)} placeholder="Type your query..." title="Type your export-related query" />
        <label htmlFor="language-select" className="block mb-3 font-semibold text-lg">Select Language</label>
        <select id="language-select" className="input-field mb-3 copilot-input text-lg px-4 py-3 rounded-xl" value={language} onChange={e => setLanguage(e.target.value)} title="Select language">
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="mr">Marathi</option>
        </select>
        <button className="btn-primary w-full mt-2 copilot-btn text-lg py-3 rounded-xl transition hover:scale-105" onClick={handleTranslate} disabled={loading} title="Translate your query">
          {loading ? 'Translating...' : 'Translate'}
        </button>
        <span className="text-xs text-gray-500 block mt-2">Supports multilingual queries for Bharat’s MSMEs.</span>
      </div>
      {translation && (
        <div className="mb-8">
          <h3 className="font-semibold mb-3 copilot-link text-lg">Translation:</h3>
          <div className="bg-gray-100 p-4 rounded-xl text-gray-800 copilot-xs text-lg">{translation}</div>
        </div>
      )}
    </div>
  )
}

export default ExportCopilot
