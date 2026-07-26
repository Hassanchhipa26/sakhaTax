import Inquiry from '../models/Inquiry.js'
import asyncHandler from '../utils/asyncHandler.js'
import ApiError from '../utils/ApiError.js'
import { sendInquiryNotificationEmail } from '../services/emailService.js'
import { sendInquiryNotificationSms } from '../services/smsService.js'

const DUPLICATE_WINDOW_MS = 5 * 60 * 1000 // 5 minutes

/**
 * POST /api/contact
 * Public endpoint — creates a new inquiry from the website contact form,
 * then fires (non-blocking) email + SMS notifications to the business owner.
 */
export const createInquiry = asyncHandler(async (req, res) => {
  const { name, mobile, email, service, message } = req.body

  // Basic duplicate/spam protection: same mobile number submitting again
  // within a short window is treated as a duplicate, not a new lead.
  const recentDuplicate = await Inquiry.findOne({
    mobile,
    createdAt: { $gte: new Date(Date.now() - DUPLICATE_WINDOW_MS) },
  })

  if (recentDuplicate) {
    throw new ApiError(429, 'We already received your inquiry. Our team will contact you shortly.')
  }

  const inquiry = await Inquiry.create({
    name,
    mobile,
    email,
    service,
    message,
    status: 'New',
    ipAddress: req.ip,
  })

  // Fire-and-forget notifications — a slow or failed email/SMS provider must
  // never delay or break the customer-facing response.
  sendInquiryNotificationEmail(inquiry).catch(() => {})
  sendInquiryNotificationSms(inquiry).catch(() => {})

  res.status(201).json({
    success: true,
    message: 'Thank you for contacting Sakha Tax Consultancy. Our team has received your inquiry.',
    data: {
      id: inquiry._id,
      name: inquiry.name,
      status: inquiry.status,
      createdAt: inquiry.createdAt,
    },
  })
})

export default { createInquiry }
