import { Router } from 'express'

const router = Router()

// Instant export document drafting
router.post('/generate', (req, res) => {
  // Realistic demo logic: generate document URL based on type
  const { type } = req.body
  let url = '/documents/sample.pdf'
  if (type === 'invoice') url = '/documents/invoice-demo.pdf'
  if (type === 'coo') url = '/documents/coo-demo.pdf'
  res.json({
    status: 'success',
    message: 'Document generated',
    documentType: type || 'invoice',
    url
  })
})

export default router
