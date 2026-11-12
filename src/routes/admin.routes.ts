
import { Router } from 'express'

import { getAdminOverview } from '../controllers/admin.controller.js'
import {
  createCourse,
  updateCourse,
  deleteCourse,
} from '../controllers/admin-course.controller.js'
import { createLecture ,deleteLecture} from '../controllers/admin-lecture.controller.js'


export const adminRouter = Router()

// Admin Overview
adminRouter.get('/overview', getAdminOverview)

// Course Management
adminRouter.post('/courses', createCourse)
adminRouter.patch('/courses/:courseId', updateCourse)
adminRouter.delete('/courses/:courseId', deleteCourse)
adminRouter.post('/courses/:courseId/lectures', createLecture)

adminRouter.delete(
  '/courses/:courseId/lectures/:lectureId',
  deleteLecture,
)