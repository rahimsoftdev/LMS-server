import express from 'express'
import { connectDB, disconnectDB, getDbState } from './config/db.js'
import { env } from './config/env.js'

const app = express()

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

async function start(): Promise<void> {
  try {
    await connectDB(env.mongoUri)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error(`Failed to connect to MongoDB: ${message}`)
    process.exit(1)
  }

  app.listen(env.port, () => {
    console.log(`Server running on http://localhost:${env.port}`)
  })
}

let shuttingDown = false

async function shutdown(signal: string): Promise<void> {
  if (shuttingDown) return
  shuttingDown = true

  console.log(`\n${signal} received. Closing MongoDB connection...`)

  try {
    await disconnectDB()
    process.exit(0)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error(`Failed to close MongoDB connection: ${message}`)
    process.exit(1)
  }
}

process.on('SIGINT', () => {
  void shutdown('SIGINT')
})

process.on('SIGTERM', () => {
  void shutdown('SIGTERM')
})

void start()
