import express from 'express'
import { login, logout, register, updateProfile } from '../controllers/user.controller.js'
import isAuthenticated from '../middleware/isAuthenticated.js'

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.patch("/update/profile", isAuthenticated, updateProfile)

export default router
