
import type { Request, Response } from 'express'
import mongoose from 'mongoose'
import { CourseModel } from '../models/course.model.js'
import { LectureModel } from '../models/lecture.model.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const getAdminOverview = asyncHandler(
  async (_req: Request, res: Response): Promise<void> => {
    const [totalCourses, totalLectures, totalStudents, recentCourses] =
      await Promise.all([
        CourseModel.countDocuments(),
        LectureModel.countDocuments(),

        // Better Auth-এর default MongoDB user collection
        mongoose.connection.collection('user').countDocuments({
          role: 'user',
        }),

        CourseModel.find()
          .sort({ createdAt: -1 })
          .limit(5)
          .lean(),
      ])

    res.json({
      success: true,
      message: 'Admin overview fetched successfully',
      data: {
        statistics: {
          totalCourses,
          totalLectures,
          totalStudents,
        },
        recentCourses,
      },
    })
  },
)
