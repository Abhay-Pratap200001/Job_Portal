import express from 'express'
import isAuthenticated from '../middleware/isAuthenticated.js'
import { getAdminJobs, getAllJobs, getJobById, postJob } from '../controllers/job.controller.js'

const router = express.Router()

router.post("/postjob", isAuthenticated, postJob)
router.get("/getalljobs", isAuthenticated, getAllJobs)
router.get("/getadminjobs", isAuthenticated, getAdminJobs)
router.get("/get/:id", isAuthenticated, getJobById)

export default router
