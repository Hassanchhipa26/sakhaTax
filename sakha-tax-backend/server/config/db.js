import mongoose from 'mongoose'
import env from './env.js'

let isConnected = false

export const connectDB = async () => {
  if (isConnected) return mongoose.connection

  mongoose.set('strictQuery', true)

  try {
    await mongoose.connect(env.mongodbUri)
    isConnected = true
    console.log(`[db] MongoDB connected: ${mongoose.connection.host}/${mongoose.connection.name}`)
  } catch (err) {
    console.error('[db] MongoDB connection failed:', err.message)
    process.exit(1)
  }

  mongoose.connection.on('disconnected', () => {
    console.warn('[db] MongoDB disconnected')
    isConnected = false
  })

  return mongoose.connection
}

export default connectDB
