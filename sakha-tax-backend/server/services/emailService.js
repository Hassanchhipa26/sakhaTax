import nodemailer from 'nodemailer'
import env from '../config/env.js'

let transporter = null

const getTransporter = () => {
  if (transporter) return transporter

  if (!env.email.host || !env.email.user || !env.email.pass) {
    console.warn('[email] EMAIL_HOST/EMAIL_USER/EMAIL_PASS not configured — email sending is disabled.')
    return null
  }

  transporter = nodemailer.createTransport({
    host: env.email.host,
    port: env.email.port,
    secure: env.email.port === 465,
    auth: {
      user: env.email.user,
      pass: env.email.pass,
    },
    // Some hosts (e.g. Render's free tier) have unreliable/no IPv6 outbound
    // connectivity, which causes ENETUNREACH when Node resolves an IPv6
    // address for smtp.gmail.com first. Forcing IPv4 avoids that.
    family: 4,
  })
  
  return transporter
}

const buildInquiryEmailHtml = (inquiry) => `
  <div style="font-family: 'Poppins', Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #ffffff;">
    <div style="background: #0F4C81; padding: 24px 32px;">
      <h1 style="color: #ffffff; font-size: 18px; margin: 0;">New Customer Inquiry</h1>
      <p style="color: #ffffff; opacity: 0.75; font-size: 12px; margin: 4px 0 0;">Sakha Tax Consultancy</p>
    </div>
    <div style="padding: 28px 32px; color: #0B1F33;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tbody>
          <tr>
            <td style="padding: 10px 0; color: #435168; width: 140px;">Customer Name</td>
            <td style="padding: 10px 0; font-weight: 600;">${inquiry.name}</td>
          </tr>
          <tr style="border-top: 1px solid #E4EAF0;">
            <td style="padding: 10px 0; color: #435168;">Phone</td>
            <td style="padding: 10px 0; font-weight: 600;">${inquiry.mobile}</td>
          </tr>
          <tr style="border-top: 1px solid #E4EAF0;">
            <td style="padding: 10px 0; color: #435168;">Email</td>
            <td style="padding: 10px 0; font-weight: 600;">${inquiry.email}</td>
          </tr>
          <tr style="border-top: 1px solid #E4EAF0;">
            <td style="padding: 10px 0; color: #435168;">Service</td>
            <td style="padding: 10px 0; font-weight: 600;">${inquiry.service}</td>
          </tr>
          <tr style="border-top: 1px solid #E4EAF0;">
            <td style="padding: 10px 0; color: #435168; vertical-align: top;">Message</td>
            <td style="padding: 10px 0;">${inquiry.message ? inquiry.message : '<em style="color:#98A2B3;">No message provided</em>'}</td>
          </tr>
          <tr style="border-top: 1px solid #E4EAF0;">
            <td style="padding: 10px 0; color: #435168;">Date &amp; Time</td>
            <td style="padding: 10px 0; font-weight: 600;">${new Date(inquiry.createdAt || Date.now()).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="background: #F5F8FA; padding: 16px 32px; font-size: 12px; color: #435168;">
      This inquiry was submitted through the Sakha Tax Consultancy website contact form.
    </div>
  </div>
`

/**
 * Sends a "New Customer Inquiry" HTML notification email to the business owner.
 * Fails silently (logs a warning) if email is not configured, so it never blocks
 * the contact form response.
 */
export const sendInquiryNotificationEmail = async (inquiry) => {
  const transport = getTransporter()
  if (!transport || !env.ownerEmail) {
    console.warn('[email] Skipping inquiry notification email — not configured.')
    return { sent: false, reason: 'not_configured' }
  }

  try {
    await transport.sendMail({
      from: `"Sakha Tax Consultancy" <${env.email.user}>`,
      to: env.ownerEmail,
      subject: 'New Customer Inquiry',
      html: buildInquiryEmailHtml(inquiry),
    })
    return { sent: true }
  } catch (err) {
    console.error('[email] Failed to send inquiry notification:', err.message)
    return { sent: false, reason: err.message }
  }
}

export default sendInquiryNotificationEmail
