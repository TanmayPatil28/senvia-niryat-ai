export type ComplianceRequest = {
  product?: string
  country?: string
}

export type ComplianceResponse = {
  readinessScore: number
  requiredCertifications: string[]
  labelingStandards: string[]
  countryNorms: string[]
  checklist: string[]
}

export type CheckComplianceResult = {
  status: 'success' | 'error'
  message?: string
  data: ComplianceResponse
}

export type GenerateDocumentRequest = { type?: string; product?: string; country?: string }
export type GenerateDocumentResult = {
  status: 'success' | 'error'
  message?: string
  documentType?: string
  url?: string
}

export type TranslateRequest = { text: string; lang: string }
export type TranslateResult = {
  status: 'success' | 'error'
  original?: string
  translated?: Record<string, string>
}
