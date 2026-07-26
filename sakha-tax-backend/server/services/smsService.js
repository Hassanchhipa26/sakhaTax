import twilio from 'twilio'
import env from '../config/env.js'

let client = null

const getClient = () => {
  if (client) return client

  if (!env.twilio.accountSid || !env.twilio.authToken) {
    console.warn('[sms] TWILIO_ACCOUNT_SID/TWILIO_AUTH_TOKEN not configured — SMS sending is disabled.')
    return null
  }

  client = twilio(env.twilio.accountSid, env.twilio.authToken)
  return client
}

/**
 * Sends a short SMS notification to the business owner for a new inquiry.
 * Fails silently (logs a warning) if Twilio is not configured.
 */
export const sendInquiryNotificationSms = async (inquiry) => {
  const twilioClient = getClient()
  if (!twilioClient || !env.twilio.phone || !env.ownerPhone) {
    console.warn('[sms] Skipping inquiry notification SMS — not configured.')
    return { sent: false, reason: 'not_configured' }
  }

  const body = [
    'New Inquiry',
    `Name: ${inquiry.name}`,
    `Phone: ${inquiry.mobile}`,
    `Service: ${inquiry.service}`,
    'Please check dashboard.',
  ].join('\n')

  try {
    await twilioClient.messages.create({
      body,
      from: env.twilio.phone,
      to: env.ownerPhone,
    })
    return { sent: true }
  } catch (err) {
    console.error('[sms] Failed to send inquiry notification:', err.message)
    return { sent: false, reason: err.message }
  }
}

export default sendInquiryNotificationSms
