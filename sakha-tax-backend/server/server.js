import app from './app.js'
import connectDB from './config/db.js'
import env from './config/env.js'

const start = async () => {
  await connectDB()

  const server = app.listen(env.port, () => {
    console.log(`[server] Sakha Tax Consultancy API running on port ${env.port} (${env.nodeEnv})`)
  })

  const shutdown = (signal) => {
    console.log(`[server] ${signal} received. Shutting down gracefully...`)
    server.close(() => {
      console.log('[server] Closed remaining connections.')
      process.exit(0)
    })
  }

  process.on('SIGTERM', () => shutdown('SIGTERM'))
  process.on('SIGINT', () => shutdown('SIGINT'))

  process.on('unhandledRejection', (err) => {
    console.error('[server] Unhandled rejection:', err)
    server.close(() => process.exit(1))
  })
}

start()
