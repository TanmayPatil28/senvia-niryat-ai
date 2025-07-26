import { Router } from 'express'

const router = Router()

// Multilingual support: English, Hindi, Marathi
router.post('/translate', (req, res) => {
  // Realistic demo logic: simple translation mock
  const { text, lang } = req.body
  let translated = {
    en: text,
    hi: 'यह एक डेमो हिंदी अनुवाद है',
    mr: 'हा एक डेमो मराठी अनुवाद आहे'
  }
  res.json({
    status: 'success',
    original: text,
    translated
  })
})

export default router
