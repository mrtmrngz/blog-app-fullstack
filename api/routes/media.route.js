import express from "express";
import {upload_auth} from "../controllers/media.controller.js";

const router = express.Router()

router.get("/", upload_auth)

export default router
