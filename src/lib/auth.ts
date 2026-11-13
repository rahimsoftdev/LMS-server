
import { betterAuth } from 'better-auth'
import { mongodbAdapter } from '@better-auth/mongo-adapter'
import { MongoClient } from 'mongodb'
import { env } from '../config/env.js'

const mongoClient = new MongoClient(env.mongoUri)

const db = mongoClient.db('datapollex')

export const auth = betterAuth({
  appName: 'LMS',

  baseURL: env.betterAuthUrl,

  secret: env.betterAuthSecret,

  database: mongodbAdapter(db, {
    client: mongoClient,
  }),

  trustedOrigins: [env.clientUrl],

  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      role: {
        type: 'string',
        required: false,
        defaultValue: 'user',
        input: false,
      },
    },
  },

  advanced: {
  useSecureCookies: true,

  defaultCookieAttributes: {
    sameSite: 'none',
    secure: true,
    httpOnly: true,
  },
},
})
