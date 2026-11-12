import type { Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'
import { LectureModel } from '../models/lecture.model.js'
import { ApiError } from '../utils/ApiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const getLectureById = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { lectureId } = req.params

    if (!isValidObjectId(lectureId)) {
      throw new ApiError(400, 'Invalid lecture id')
    }

    const lecture = await LectureModel.findById(lectureId).lean()

    if (!lecture) {
      throw new ApiError(404, 'Lecture not found')
    }

    res.json({
      success: true,
      message: 'Lecture fetched successfully',
      data: lecture,
    })
  },
)
