import axios from 'axios'

const API_BASE = '/api'

export const checkCompliance = async (payload) => {
  const res = await axios.post(`${API_BASE}/compliance/check`, payload)
  return res.data
}

export const generateDocument = async (payload) => {
  const res = await axios.post(`${API_BASE}/documents/generate`, payload)
  return res.data
}

export const translateText = async (payload) => {
  const res = await axios.post(`${API_BASE}/language/translate`, payload)
  return res.data
}

export const fetchIntegrationData = async (source) => {
  const res = await axios.get(`${API_BASE}/integration/${source}`)
  return res.data
}
