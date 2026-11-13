
import 'dotenv/config'

function getRequiredEnv(name: string): string {
  const value = process.env[name]

  if (!value || !value.trim()) {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return value.trim()
}

const port = Number(process.env.PORT ?? 5000)

if (!Number.isInteger(port) || port <= 0) {
  throw new Error('PORT must be a positive integer')
}

export const env = {
  port,
  mongoUri: getRequiredEnv('MONGODB_URI'),
  clientUrl: process.env.CLIENT_URL ?? 'http://localhost:5173',
  nodeEnv: process.env.NODE_ENV ?? 'development',
  isProduction: process.env.NODE_ENV === 'production',
  betterAuthSecret: getRequiredEnv('BETTER_AUTH_SECRET'),
  betterAuthUrl:
    process.env.BETTER_AUTH_URL ?? `http://localhost:${port}`,
} as const
