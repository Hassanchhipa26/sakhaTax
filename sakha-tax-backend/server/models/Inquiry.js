import mongoose from 'mongoose'

const { Schema } = mongoose

const INQUIRY_STATUSES = ['New', 'Pending', 'Completed']

const inquirySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name must be under 100 characters'],
    },
    mobile: {
      type: String,
      required: [true, 'Mobile number is required'],
      trim: true,
      // Accepts optional +91/91 prefix followed by a 10-digit number starting 6-9
      match: [/^(?:(?:\+91|91)[-\s]?)?[6-9]\d{9}$/, 'Enter a valid Indian mobile number'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Enter a valid email address'],
    },
    service: {
      type: String,
      required: [true, 'Service is required'],
      trim: true,
      maxlength: [120, 'Service must be under 120 characters'],
    },
    message: {
      type: String,
      trim: true,
      maxlength: [800, 'Message must be under 800 characters'],
      default: '',
    },
    status: {
      type: String,
      enum: INQUIRY_STATUSES,
      default: 'New',
    },
    // Used for lightweight duplicate/spam protection
    ipAddress: {
      type: String,
      select: false,
    },
  },
  { timestamps: true } // adds createdAt (CreatedAt) and updatedAt (UpdatedAt)
)

inquirySchema.index({ createdAt: -1 })
inquirySchema.index({ status: 1 })
inquirySchema.index({ mobile: 1, createdAt: -1 })
inquirySchema.index({ name: 'text', email: 'text', service: 'text' })

export const INQUIRY_STATUS_VALUES = INQUIRY_STATUSES
export default mongoose.model('Inquiry', inquirySchema)
