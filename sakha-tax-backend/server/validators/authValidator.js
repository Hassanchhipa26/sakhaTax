import { body } from 'express-validator'

export const loginValidationRules = [
  body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Enter a valid email address').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
]
