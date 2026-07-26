import { Router } from 'express'
import contactRoutes from './contactRoutes.js'
import authRoutes from './authRoutes.js'
import inquiryRoutes from './inquiryRoutes.js'

const router = Router()

router.get('/health', (req, res) => {
  res.json({ success: true, message: 'Sakha Tax Consultancy API is running', timestamp: new Date().toISOString() })
})

router.use('/contact', contactRoutes)
router.use('/auth', authRoutes)
router.use('/inquiries', inquiryRoutes)

export default router
