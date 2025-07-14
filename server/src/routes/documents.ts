import { Router } from 'express'

const router = Router()

// Instant export document drafting
router.post('/generate', (req, res) => {
  // TODO: Integrate with PDF automation service
  res.json({
    status: 'success',
    message: 'Document generated',
    documentType: req.body.type || 'invoice',
    url: '/documents/sample.pdf'
  })
})

export default router
