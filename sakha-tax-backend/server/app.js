import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import env from './config/env.js'
import routes from './routes/index.js'
import mongoSanitize from './middleware/sanitize.js'
import { apiLimiter } from './middleware/rateLimiter.js'
import { notFound, errorHandler } from './middleware/errorHandler.js'

const app = express()
app.set('trust proxy', 1)

// Security headers
app.use(helmet())

// CORS — restrict to the configured frontend origin
app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  })
)

// Body parsing
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))

// Response compression
app.use(compression())

// Request logging
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'))

// Sanitize req.body/params/query against NoSQL injection (Express 5 safe)
app.use(mongoSanitize)

// General rate limiting on all API routes
app.use('/api', apiLimiter)

// Routes
app.use('/api', routes)

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Sakha Tax Consultancy API' })
})

// 404 + centralized error handler
app.use(notFound)
app.use(errorHandler)

export default app
