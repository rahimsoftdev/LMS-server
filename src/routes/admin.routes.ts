
import { Router } from 'express'
import { getAdminOverview } from '../controllers/admin.controller.js'
import { requireAdmin } from '../middleware/admin.middleware.js'

export const adminRouter = Router()

adminRouter.get('/overview', requireAdmin, getAdminOverview)
