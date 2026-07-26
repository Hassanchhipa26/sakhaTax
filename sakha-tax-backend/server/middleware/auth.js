import jwt from 'jsonwebtoken'
import asyncHandler from '../utils/asyncHandler.js'
import ApiError from '../utils/ApiError.js'
import env from '../config/env.js'
import Admin from '../models/Admin.js'

export const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new ApiError(401, 'Not authorized. Please log in.')
  }

  const token = authHeader.split(' ')[1]

  let decoded
  try {
    decoded = jwt.verify(token, env.jwtSecret)
  } catch (err) {
    throw new ApiError(401, 'Session expired or invalid. Please log in again.')
  }

  const admin = await Admin.findById(decoded.id)
  if (!admin) {
    throw new ApiError(401, 'Admin account no longer exists.')
  }

  req.admin = { id: admin._id.toString(), email: admin.email, name: admin.name }
  next()
})

export default protect
