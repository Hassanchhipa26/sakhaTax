import { body, param } from 'express-validator'
import { INQUIRY_STATUS_VALUES } from '../models/Inquiry.js'

export const inquiryIdParamRules = [param('id').isMongoId().withMessage('Invalid inquiry id')]

export const updateStatusRules = [
  ...inquiryIdParamRules,
  body('status')
    .trim()
    .notEmpty()
    .withMessage('Status is required')
    .isIn(INQUIRY_STATUS_VALUES)
    .withMessage(`Status must be one of: ${INQUIRY_STATUS_VALUES.join(', ')}`),
]
