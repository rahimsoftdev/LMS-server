
import type { Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'
import { z } from 'zod'

import { CourseModel } from '../models/course.model.js'
import { LectureModel } from '../models/lecture.model.js'
import { ApiError } from '../utils/ApiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const createLectureSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'Title must be at least 3 characters'),

  description: z
    .string()
    .trim()
    .min(10, 'Description must be at least 10 characters'),

  videoUrl: z
    .string()
    .trim()
    .url('Enter a valid video URL'),
})

// Create Lecture
export const createLecture = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { courseId } = req.params

    // Validate course ID
    if (!isValidObjectId(courseId)) {
      throw new ApiError(400, 'Invalid course id')
    }

    // Validate request body
    const result = createLectureSchema.safeParse(req.body)

    if (!result.success) {
      throw new ApiError(
        400,
        result.error.issues[0]?.message || 'Invalid lecture data',
      )
    }

    // Check whether course exists
    const course = await CourseModel.findById(courseId)

    if (!course) {
      throw new ApiError(404, 'Course not found')
    }

    // Create lecture under selected course
    const lecture = await LectureModel.create({
      ...result.data,
      courseId: course._id,
    })

    res.status(201).json({
      success: true,
      message: 'Lecture created successfully',
      data: lecture,
    })
  },
)

export const deleteLecture = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { courseId, lectureId } = req.params

    // Validate Course ID
    if (!isValidObjectId(courseId)) {
      throw new ApiError(400, 'Invalid course id')
    }

    // Validate Lecture ID
    if (!isValidObjectId(lectureId)) {
      throw new ApiError(400, 'Invalid lecture id')
    }

    // Find lecture under the specified course
    const lecture = await LectureModel.findOne({
      _id: lectureId,
      courseId,
    })

    if (!lecture) {
      throw new ApiError(404, 'Lecture not found in this course')
    }

    // Delete lecture
    await lecture.deleteOne()

    res.status(200).json({
      success: true,
      message: 'Lecture deleted successfully',
    })
  },
)