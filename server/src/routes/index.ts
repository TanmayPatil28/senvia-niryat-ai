import { Router } from 'express'

const router = Router()

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Export compliance endpoints
router.use('/compliance', require('./compliance').default)
// Document generation endpoints
router.use('/documents', require('./documents').default)
// Multilingual support endpoints
router.use('/language', require('./language').default)
// Integration endpoints
router.use('/integration', require('./integration').default)

export default router
