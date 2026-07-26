import { validationResult } from 'express-validator'
import ApiError from '../utils/ApiError.js'

/**
 * Runs after any express-validator rule chain; throws a 400 ApiError with
 * a structured `details` array if validation failed.
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new ApiError(
      400,
      'Validation failed',
      errors.array().map((e) => ({ field: e.path, message: e.msg }))
    )
  }
  next()
}

export default validate
