import { Router } from 'express'
import { login, getMe } from '../controllers/authController.js'
import { loginValidationRules } from '../validators/authValidator.js'
import { validate } from '../middleware/validate.js'
import { loginLimiter } from '../middleware/rateLimiter.js'
import protect from '../middleware/auth.js'

const router = Router()

router.post('/login', loginLimiter, loginValidationRules, validate, login)
router.get('/me', protect, getMe)

export default router
