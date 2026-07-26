import { Router } from 'express'
import { createInquiry } from '../controllers/contactController.js'
import { contactValidationRules } from '../validators/contactValidator.js'
import { validate } from '../middleware/validate.js'
import { contactLimiter } from '../middleware/rateLimiter.js'

const router = Router()

router.post('/', contactLimiter, contactValidationRules, validate, createInquiry)

export default router
