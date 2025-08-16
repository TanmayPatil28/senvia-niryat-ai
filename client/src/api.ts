import axios from 'axios'
import type {
  ComplianceRequest,
  CheckComplianceResult,
  GenerateDocumentRequest,
  GenerateDocumentResult,
  TranslateRequest,
  TranslateResult,
} from './types/api'

const API_BASE = '/api'

export const checkCompliance = async (payload: ComplianceRequest): Promise<CheckComplianceResult> => {
  const res = await axios.post(`${API_BASE}/compliance/check`, payload)
  return res.data
}

export const generateDocument = async (payload: GenerateDocumentRequest): Promise<GenerateDocumentResult> => {
  const res = await axios.post(`${API_BASE}/documents/generate`, payload)
  return res.data
}

export const translateText = async (payload: TranslateRequest): Promise<TranslateResult> => {
  const res = await axios.post(`${API_BASE}/language/translate`, payload)
  return res.data
}

export const fetchIntegrationData = async (source: string): Promise<any> => {
  const res = await axios.get(`${API_BASE}/integration/${source}`)
  return res.data
}
