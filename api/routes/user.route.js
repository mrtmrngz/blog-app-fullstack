import express from "express";
import {follow_user, update_user, user_info, user_info_edit_get} from "../controllers/user.controller.js";
import {verifyToken} from "../middlewares/verifyToken.js";

const router = express.Router()

router.get('/user-info', verifyToken, user_info)
router.post('/follow-user/:id', verifyToken, follow_user)
router.get('/user-info-edit/:slug', verifyToken, user_info_edit_get)
router.put('/update-user/:id', verifyToken, update_user)

export default router
