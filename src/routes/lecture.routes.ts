import { Router } from 'express'
import { getLectureById } from '../controllers/lecture.controller.js'

export const lectureRouter = Router()

lectureRouter.get('/:lectureId', getLectureById)
