import mongoose from 'mongoose'

type MongooseCache = {
  promise: Promise<typeof mongoose> | null
}

const globalForMongoose = globalThis as typeof globalThis & {
  __mongooseCache?: MongooseCache
}

const cache = (globalForMongoose.__mongooseCache ??= { promise: null })

const CONNECTION_STATES = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting',
  99: 'uninitialized',
} as const

export async function connectDB(uri: string): Promise<typeof mongoose> {
  if (mongoose.connection.readyState === 1) {
    return mongoose
  }

  if (!cache.promise) {
    cache.promise = mongoose
      .connect(uri, {
        serverSelectionTimeoutMS: 10_000,
        maxPoolSize: 10,
      })
      .catch((error) => {
        cache.promise = null
        throw error
      })
  }

  await cache.promise

  console.log(
    `MongoDB connected: ${mongoose.connection.name || 'unknown database'}`,
  )

  return mongoose
}

export async function disconnectDB(): Promise<void> {
  await mongoose.disconnect()
  cache.promise = null
}

export function getDbState(): string {
  return CONNECTION_STATES[mongoose.connection.readyState]
}
