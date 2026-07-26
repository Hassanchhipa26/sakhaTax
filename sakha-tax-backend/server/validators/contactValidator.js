import { body } from 'express-validator'

export const contactValidationRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .escape(),

  body('mobile')
    .trim()
    .notEmpty()
    .withMessage('Mobile number is required')
    .matches(/^(?:(?:\+91|91)[-\s]?)?[6-9]\d{9}$/)
    .withMessage('Enter a valid Indian mobile number'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Enter a valid email address')
    .normalizeEmail(),

  body('service')
    .trim()
    .notEmpty()
    .withMessage('Service is required')
    .isLength({ max: 120 })
    .withMessage('Service must be under 120 characters')
    .escape(),

  body('message')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 800 })
    .withMessage('Message must be under 800 characters')
    .escape(),
]

