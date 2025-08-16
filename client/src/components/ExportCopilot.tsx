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

const ExportCopilot: React.FC = () => {
  const [product, setProduct] = useState('')
  const [country, setCountry] = useState('')
  const [language, setLanguage] = useState('en')
  const [compliance, setCompliance] = useState<ComplianceType | null>(null)
  const [document, setDocument] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [translation, setTranslation] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCheck = async () => {
    try {
      setLoading(true)
      const res = await checkCompliance({ product, country })
      setCompliance(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleGenerate = async (type: string) => {
    try {
      setLoading(true)
  const res = await generateDocument({ type, product, country })
  setDocument(res.url ?? null)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleTranslate = async () => {
    try {
      setLoading(true)
      const res = await translateText({ text: query, lang: language })
      setTranslation(res.translated?.[language] ?? '')
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
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
  <div className="max-w-2xl mx-auto p-8 card mt-12 elevate rounded-2xl bg-surface dark:bg-[#0b1220] copilot-card animate-fade-in">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-6 copilot-title tracking-tight flex items-center gap-3">
        <span className="icon-copilot text-primary-700" />
        Export Compliance Copilot
      </h2>

      <button className="btn-ghost w-full mb-6 py-3 rounded-lg" onClick={handleDemo} aria-label="Demo mode">
        Demo Mode (Auto-fill)
      </button>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block mb-2 font-semibold text-sm" htmlFor="product-select">Product</label>
          <select id="product-select" className="input" value={product} onChange={e => setProduct(e.target.value)} aria-label="Select product">
            <option value="">Select product</option>
            {products.map(p => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-semibold text-sm" htmlFor="country-select">Destination Country</label>
          <select id="country-select" className="input" value={country} onChange={e => setCountry(e.target.value)} aria-label="Select country">
            <option value="">Select country</option>
            {countries.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>

        <div>
          <button className="btn-primary w-full py-3 rounded-lg" onClick={handleCheck} disabled={loading} aria-label="Check compliance">
            {loading ? 'Checking...' : 'Check Compliance'}
          </button>
          <p className="text-xs text-neutral-500 mt-2">Checks all required certifications, labeling, and country norms.</p>
        </div>

        {compliance && (
          <div className="p-4 bg-neutral-50 rounded-lg">
            <h3 className="font-semibold mb-2 copilot-score text-lg">Readiness Score: <span className="text-primary-700 font-bold">{typeof compliance.readinessScore === 'number' && compliance.readinessScore <= 1 ? `${Math.round(compliance.readinessScore * 100)}%` : compliance.readinessScore}</span></h3>
            <ul className="list-disc ml-5 text-neutral-700 dark:text-neutral-300 text-sm">
              <li><strong>Certifications:</strong> {compliance.requiredCertifications.join(', ')}</li>
              <li><strong>Labeling:</strong> {compliance.labelingStandards.join(', ')}</li>
              <li><strong>Country Norms:</strong> {compliance.countryNorms.join(', ')}</li>
              <li><strong>Checklist:</strong> {compliance.checklist.join(', ')}</li>
            </ul>
          </div>
        )}

        <div>
          <button className="btn-ghost w-full py-3 rounded-lg" onClick={() => handleGenerate('invoice')} disabled={loading} aria-label="Generate invoice">
            {loading ? 'Generating...' : 'Generate Invoice'}
          </button>
          <p className="text-xs text-neutral-500 mt-2">Auto-generates export documents for MSMEs.</p>
        </div>

        {document && (
          <div>
            <a href={document} target="_blank" rel="noopener noreferrer" className="text-primary-700 font-semibold underline">Download Document</a>
          </div>
        )}

        <div>
          <label className="block mb-2 font-semibold text-sm" htmlFor="query-input">Ask in English/Hindi/Marathi</label>
          <input id="query-input" className="input mb-3" value={query} onChange={e => setQuery(e.target.value)} placeholder="Type your query..." aria-label="Type your export-related query" />
          <label htmlFor="language-select" className="block mb-2 font-semibold text-sm">Select Language</label>
          <select id="language-select" className="input mb-3" value={language} onChange={e => setLanguage(e.target.value)} aria-label="Select language">
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="mr">Marathi</option>
          </select>
          <button className="btn-primary w-full py-3 rounded-lg" onClick={handleTranslate} disabled={loading} aria-label="Translate">
            {loading ? 'Translating...' : 'Translate'}
          </button>
          <p className="text-xs text-neutral-500 mt-2">Supports multilingual queries for Bharat's MSMEs.</p>
        </div>

        {translation && (
          <div>
            <h3 className="font-semibold mb-2 copilot-link text-sm">Translation:</h3>
            <div className="bg-neutral-50 p-3 rounded-md text-neutral-800">{translation}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ExportCopilot
