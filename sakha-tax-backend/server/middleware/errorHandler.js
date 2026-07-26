import ApiError from '../utils/ApiError.js'

export const notFound = (req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`))
}

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500
  let message = err.message || 'Internal Server Error'
  let details = err.details || null

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    statusCode = 400
    message = 'Validation failed'
    details = Object.values(err.errors).map((e) => e.message)
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    statusCode = 409
    message = 'Duplicate entry'
    details = err.keyValue
  }

  // Mongoose invalid ObjectId
  if (err.name === 'CastError') {
    statusCode = 400
    message = `Invalid value for ${err.path}`
  }

  if (statusCode === 500) {
    console.error('[error]', err)
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(details ? { details } : {}),
    ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {}),
  })
}

export default errorHandler
