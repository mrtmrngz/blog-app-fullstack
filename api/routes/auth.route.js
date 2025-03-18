import express from "express";
import {login, register, logout, get_token} from "../controllers/auth.controller.js";

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/get-token', get_token)
router.post('/logout', logout)

export default router
