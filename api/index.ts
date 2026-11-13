
import type { Request, Response } from 'express'

import { app } from '../src/app.js'
import { connectDB } from '../src/config/db.js'
import { env } from '../src/config/env.js'

export default async function handler(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    // Connect to MongoDB before handling the request
    await connectDB(env.mongoUri)

    // Pass request to Express application
    app(req, res)
  } catch (error) {
    const message =
      error instanceof Error ? error.message : String(error)

    console.error('Vercel Function Error:', message)

    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      })
    }
  }
}
