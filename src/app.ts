
import cors from 'cors'
import express from 'express'
import { toNodeHandler } from 'better-auth/node'

import { auth } from './lib/auth.js'
import { getDbState } from './config/db.js'
import { env } from './config/env.js'
import { errorHandler } from './middleware/error.middleware.js'
import { notFound } from './middleware/notFound.middleware.js'
import { courseRouter } from './routes/course.routes.js'
import { lectureRouter } from './routes/lecture.routes.js'

export const app = express()

app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  }),
)

// Better Auth handler must be before express.json()
app.all('/api/auth/*splat', toNodeHandler(auth))

app.use(express.json())

app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'Backend is running',
  })
})

app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    message: 'Backend is running',
    database: getDbState(),
  })
})

app.use('/api/courses', courseRouter)
app.use('/api/lectures', lectureRouter)

app.use(notFound)
app.use(errorHandler)
