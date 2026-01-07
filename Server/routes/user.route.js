import express from 'express'
import { login, logout, register, updateProfile } from '../controllers/user.controller.js'
import isAuthenticated from '../middleware/isAuthenticated.js'
import { singleUpload } from '../middleware/multer.js'

const router = express.Router()

router.post("/register", singleUpload, register)
router.post("/login", login)
router.post("/logout", logout)
router.patch("/update/profile", isAuthenticated, updateProfile)

export default router
 