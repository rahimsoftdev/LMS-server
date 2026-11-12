import type { Server } from 'node:http'
import { app } from './app.js'
import { connectDB, disconnectDB } from './config/db.js'
import { env } from './config/env.js'

let server: Server | undefined
let shuttingDown = false

async function start(): Promise<void> {
  try {
    await connectDB(env.mongoUri)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error(`Failed to connect to MongoDB: ${message}`)
    process.exit(1)
  }

  server = app.listen(env.port, () => {
    console.log(`Server running on http://localhost:${env.port}`)
  })

  server.on('error', (error) => {
    console.error(`Server error: ${error.message}`)
    process.exit(1)
  })
}

async function shutdown(signal: string): Promise<void> {
  if (shuttingDown) return
  shuttingDown = true

  console.log(`\n${signal} received. Shutting down...`)

  try {
    if (server) {
      await new Promise<void>((resolve, reject) => {
        server?.close((error) => {
          if (error) {
            reject(error)
            return
          }

          resolve()
        })
      })
    }

    await disconnectDB()
    process.exit(0)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error(`Failed to shut down cleanly: ${message}`)
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
