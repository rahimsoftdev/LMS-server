import 'dotenv/config'

function getRequiredEnv(name: string): string {
  const value = process.env[name]

  if (!value || !value.trim()) {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return value
}

const port = Number(process.env.PORT ?? 5000)

if (!Number.isInteger(port) || port <= 0) {
  throw new Error('PORT must be a positive integer')
}

export const env = {
  port,
  mongoUri: getRequiredEnv('MONGODB_URI'),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  isProduction: process.env.NODE_ENV === 'production',
} as const
