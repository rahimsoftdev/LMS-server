import type { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import { env } from '../config/env.js'
import { ApiError } from '../utils/ApiError.js'

type ErrorResponse = {
  success: false
  message: string
  stack?: string
}

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response<ErrorResponse>,
  _next: NextFunction,
): void {
  let statusCode = 500
  let message = 'Internal server error'

  if (error instanceof ApiError) {
    statusCode = error.statusCode
    message = error.message
  } else if (error instanceof mongoose.Error.CastError) {
    statusCode = 400
    message = `Invalid ${error.path}: ${error.value}`
  } else if (error instanceof mongoose.Error.ValidationError) {
    statusCode = 400
    message = Object.values(error.errors)
      .map((validationError) => validationError.message)
      .join(', ')
  } else if (error instanceof Error) {
    message = error.message
  }

  if (statusCode >= 500) {
    console.error(error)
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(env.isProduction
      ? {}
      : { stack: error instanceof Error ? error.stack : undefined }),
  })
}
