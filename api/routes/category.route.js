import express from "express";
import {all_categories, footer_categories, home_categories} from "../controllers/category.controller.js";

const router = express.Router()

router.get('/', all_categories)
router.get('/home', home_categories)
router.get('/footer', footer_categories)

export default router
