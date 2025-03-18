import express from "express";
import {verifyToken} from "../middlewares/verifyToken.js";
import {add_comment, delete_comment} from "../controllers/comment.controller.js";

const router = express.Router()

router.post('/', verifyToken, add_comment)
router.delete('/:id', verifyToken, delete_comment)

export default router
