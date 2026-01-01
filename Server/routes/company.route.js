import express from 'express'
import isAuthenticated from '../middleware/isAuthenticated.js'
import { getCompanies, getCompanyById, registerCompany, updateCompany } from '../controllers/company.controller.js'

const router = express.Router()

router.post("/register", isAuthenticated,registerCompany)
router.get("/get", isAuthenticated, getCompanies)
router.get("/getById/:id", isAuthenticated,getCompanyById)
router.put("/update/:id", isAuthenticated, updateCompany)

export default router
