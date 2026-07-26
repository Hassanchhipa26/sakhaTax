import Admin from '../models/Admin.js'
import asyncHandler from '../utils/asyncHandler.js'
import ApiError from '../utils/ApiError.js'
import generateToken from '../utils/generateToken.js'

/**
 * POST /api/auth/login
 * Public — authenticates an admin and returns a JWT.
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const admin = await Admin.findOne({ email }).select('+password')
  if (!admin) {
    throw new ApiError(401, 'Invalid email or password')
  }

  const isMatch = await admin.comparePassword(password)
  if (!isMatch) {
    throw new ApiError(401, 'Invalid email or password')
  }

  const token = generateToken({ id: admin._id.toString() })

  res.json({
    success: true,
    message: 'Logged in successfully',
    data: {
      token,
      admin: { id: admin._id, name: admin.name, email: admin.email },
    },
  })
})

/**
 * GET /api/auth/me
 * Protected — returns the currently authenticated admin.
 */
export const getMe = asyncHandler(async (req, res) => {
  res.json({ success: true, data: req.admin })
})

export default { login, getMe }
