
import type { Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'
import { z } from 'zod'

import { CourseModel } from '../models/course.model.js'
import { LectureModel } from '../models/lecture.model.js'
import { ApiError } from '../utils/ApiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const courseSchema = z.object({
  title: z.string().trim().min(3, 'Title must be at least 3 characters'),
  description: z.string().trim().min(10, 'Description must be at least 10 characters'),
  price: z.coerce.number().min(0, 'Price cannot be negative'),
  thumbnailUrl: z.string().trim().url('Enter a valid thumbnail URL'),
})

const updateCourseSchema = courseSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: 'At least one field is required' },
)

// Create Course
export const createCourse = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const result = courseSchema.safeParse(req.body)

    if (!result.success) {
      throw new ApiError(400, result.error.issues[0]?.message || 'Invalid course data')
    }

    const course = await CourseModel.create(result.data)

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: course,
    })
  },
)

// Update Course
export const updateCourse = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { courseId } = req.params

    if (!isValidObjectId(courseId)) {
      throw new ApiError(400, 'Invalid course id')
    }

    const result = updateCourseSchema.safeParse(req.body)

    if (!result.success) {
      throw new ApiError(400, result.error.issues[0]?.message || 'Invalid course data')
    }

    const course = await CourseModel.findByIdAndUpdate(
      courseId,
      { $set: result.data },
      {
        new: true,
        runValidators: true,
      },
    )

    if (!course) {
      throw new ApiError(404, 'Course not found')
    }

    res.json({
      success: true,
      message: 'Course updated successfully',
      data: course,
    })
  },
)

// Delete Course
export const deleteCourse = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { courseId } = req.params

    if (!isValidObjectId(courseId)) {
      throw new ApiError(400, 'Invalid course id')
    }

    const course = await CourseModel.findByIdAndDelete(courseId)

    if (!course) {
      throw new ApiError(404, 'Course not found')
    }

    // Delete all lectures associated with this course
    await LectureModel.deleteMany({ courseId: course._id })

    res.json({
      success: true,
      message: 'Course and its lectures deleted successfully',
    })
  },
)
