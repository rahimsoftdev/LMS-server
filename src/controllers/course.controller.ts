import type { Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'
import { CourseModel } from '../models/course.model.js'
import { LectureModel } from '../models/lecture.model.js'
import { ApiError } from '../utils/ApiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const getCourses = asyncHandler(
  async (_req: Request, res: Response): Promise<void> => {
    const courses = await CourseModel.aggregate([
      { $sort: { createdAt: -1 } },
      {
        $lookup: {
          from: 'lectures',
          localField: '_id',
          foreignField: 'courseId',
          as: 'lectureDocs',
        },
      },
      { $addFields: { lectureCount: { $size: '$lectureDocs' } } },
      { $project: { lectureDocs: 0 } },
    ])

    res.json({
      success: true,
      message: 'Courses fetched successfully',
      data: courses,
    })
  },
)

export const getCourseById = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { courseId } = req.params

    if (!isValidObjectId(courseId)) {
      throw new ApiError(400, 'Invalid course id')
    }

    const course = await CourseModel.findById(courseId).lean()

    if (!course) {
      throw new ApiError(404, 'Course not found')
    }

    res.json({
      success: true,
      message: 'Course fetched successfully',
      data: course,
    })
  },
)

export const getLecturesByCourse = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { courseId } = req.params

    if (!isValidObjectId(courseId)) {
      throw new ApiError(400, 'Invalid course id')
    }

    const courseExists = await CourseModel.exists({ _id: courseId })

    if (!courseExists) {
      throw new ApiError(404, 'Course not found')
    }

    const lectures = await LectureModel.find({ courseId })
      .sort({ createdAt: 1 })
      .lean()

    res.json({
      success: true,
      message: 'Lectures fetched successfully',
      data: lectures,
    })
  },
)
