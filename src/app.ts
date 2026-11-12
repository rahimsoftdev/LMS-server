import express from 'express'
import { getDbState } from './config/db.js'
import { errorHandler } from './middleware/error.middleware.js'
import { notFound } from './middleware/notFound.middleware.js'
import { courseRouter } from './routes/course.routes.js'
import { lectureRouter } from './routes/lecture.routes.js'

export const app = express()

app.use(express.json())

app.get('/', (_req, res) => {
  res.json({ success: true, message: 'Backend is running' })
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
