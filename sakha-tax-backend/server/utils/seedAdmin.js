/**
 * Creates (or updates the password of) the first admin user, for logging into
 * the admin dashboard. Run with: npm run seed:admin
 *
 * Reads from env vars so it can be scripted in CI/deploy pipelines:
 *   SEED_ADMIN_NAME, SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD
 * Falls back to interactive-friendly defaults for local development if unset.
 */
import connectDB from '../config/db.js'
import Admin from '../models/Admin.js'
import mongoose from 'mongoose'

const run = async () => {
  await connectDB()

  const name = process.env.SEED_ADMIN_NAME || 'Sakha Admin'
  const email = process.env.SEED_ADMIN_EMAIL || 'admin@sakhatax.com'
  const password = process.env.SEED_ADMIN_PASSWORD || 'ChangeMe@123'

  if (!process.env.SEED_ADMIN_PASSWORD) {
    console.warn(
      '[seed] SEED_ADMIN_PASSWORD not set — using a default password. Change it immediately after first login.'
    )
  }

  let admin = await Admin.findOne({ email }).select('+password')

  if (admin) {
    admin.password = password
    admin.name = name
    await admin.save()
    console.log(`[seed] Updated existing admin: ${email}`)
  } else {
    admin = await Admin.create({ name, email, password })
    console.log(`[seed] Created admin: ${email}`)
  }

  console.log(`[seed] Login with email: ${email}`)
  await mongoose.disconnect()
  process.exit(0)
}

run().catch((err) => {
  console.error('[seed] Failed:', err)
  process.exit(1)
})
