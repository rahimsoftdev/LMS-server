import { Router } from 'express'
import {
  getCourseById,
  getCourses,
  getLecturesByCourse,
} from '../controllers/course.controller.js'

export const courseRouter = Router()

courseRouter.get('/', getCourses)
courseRouter.get('/:courseId', getCourseById)
courseRouter.get('/:courseId/lectures', getLecturesByCourse)
