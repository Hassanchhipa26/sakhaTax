import Inquiry, { INQUIRY_STATUS_VALUES } from '../models/Inquiry.js'
import asyncHandler from '../utils/asyncHandler.js'
import ApiError from '../utils/ApiError.js'
import { inquiriesToCsv } from '../utils/csvExport.js'

/**
 * GET /api/inquiries/stats
 * Protected — dashboard summary cards: total, today's, pending, completed.
 */
export const getStats = asyncHandler(async (req, res) => {
  const startOfToday = new Date()
  startOfToday.setHours(0, 0, 0, 0)

  const [total, today, pending, completed] = await Promise.all([
    Inquiry.countDocuments(),
    Inquiry.countDocuments({ createdAt: { $gte: startOfToday } }),
    Inquiry.countDocuments({ status: 'Pending' }),
    Inquiry.countDocuments({ status: 'Completed' }),
  ])

  res.json({
    success: true,
    data: { total, today, pending, completed },
  })
})

/**
 * GET /api/inquiries
 * Protected — paginated, searchable, filterable list of inquiries.
 * Query params: page, limit, search, status
 */
export const getInquiries = asyncHandler(async (req, res) => {
  const page = Math.max(Number(req.query.page) || 1, 1)
  const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100)
  const { search, status } = req.query

  const filter = {}

  if (status && INQUIRY_STATUS_VALUES.includes(status)) {
    filter.status = status
  }

  if (search) {
    const term = String(search).trim()
    filter.$or = [
      { name: { $regex: term, $options: 'i' } },
      { email: { $regex: term, $options: 'i' } },
      { mobile: { $regex: term, $options: 'i' } },
      { service: { $regex: term, $options: 'i' } },
    ]
  }

  const [inquiries, totalCount] = await Promise.all([
    Inquiry.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Inquiry.countDocuments(filter),
  ])

  res.json({
    success: true,
    data: inquiries,
    pagination: {
      page,
      limit,
      totalCount,
      totalPages: Math.ceil(totalCount / limit) || 1,
    },
  })
})

/**
 * PATCH /api/inquiries/:id/status
 * Protected — update an inquiry's status (New / Pending / Completed).
 */
export const updateInquiryStatus = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { status } = req.body

  const inquiry = await Inquiry.findByIdAndUpdate(id, { status }, { new: true, runValidators: true })

  if (!inquiry) {
    throw new ApiError(404, 'Inquiry not found')
  }

  res.json({ success: true, message: 'Status updated', data: inquiry })
})

/**
 * DELETE /api/inquiries/:id
 * Protected — delete an inquiry.
 */
export const deleteInquiry = asyncHandler(async (req, res) => {
  const { id } = req.params

  const inquiry = await Inquiry.findByIdAndDelete(id)

  if (!inquiry) {
    throw new ApiError(404, 'Inquiry not found')
  }

  res.json({ success: true, message: 'Inquiry deleted' })
})

/**
 * GET /api/inquiries/export
 * Protected — export all (optionally filtered) inquiries as CSV.
 */
export const exportInquiries = asyncHandler(async (req, res) => {
  const { status } = req.query
  const filter = status && INQUIRY_STATUS_VALUES.includes(status) ? { status } : {}

  const inquiries = await Inquiry.find(filter).sort({ createdAt: -1 })
  const csv = inquiriesToCsv(inquiries)

  res.setHeader('Content-Type', 'text/csv')
  res.setHeader('Content-Disposition', `attachment; filename="inquiries-${Date.now()}.csv"`)
  res.status(200).send(csv)
})

export default { getStats, getInquiries, updateInquiryStatus, deleteInquiry, exportInquiries }
