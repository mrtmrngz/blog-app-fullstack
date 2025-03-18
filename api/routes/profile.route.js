import express from "express";
import {liked_blogs, profile_blogs, profile_info} from "../controllers/profile.controller.js";
import {verifyToken} from "../middlewares/verifyToken.js";

const router = express.Router()

router.get('/:slug', profile_info)
router.get('/blogs/:slug', profile_blogs)
router.get('/liked-blogs/:slug', liked_blogs)

export default router
