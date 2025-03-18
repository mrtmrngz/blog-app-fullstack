import express from "express";
import {
    add_blog,
    blog_detail,
    delete_blog,
    featured_blogs,
    fetch_blogs, like_blog, most_liked,
    most_readed_blogs, update_blog, update_blog_fetch
} from "../controllers/blog.controller.js";
import {verifyToken} from "../middlewares/verifyToken.js";
import {increaseReader} from "../middlewares/increaseReader.js";

const router = express.Router()

router.get('/', fetch_blogs)
router.get('/featured', featured_blogs)
router.get('/most-readed', most_readed_blogs)
router.get('/most-liked', most_liked)
router.get('/:slug', increaseReader, blog_detail)
router.post('/', verifyToken, add_blog)
router.post('/like/:id', verifyToken, like_blog)
router.delete('/:id', verifyToken, delete_blog)

router.get('/update-fetch/:slug', verifyToken, update_blog_fetch)
router.put('/:id', verifyToken, update_blog)

export default router
