import express from "express";
import {
    admin_blogs, admin_fetch_single_user, admin_update_user,
    create_category, dashboard,
    delete_category, delete_user,
    get_categories,
    get_category,
    update_category, user_list
} from "../controllers/admin.controller.js";
import {verifyToken} from "../middlewares/verifyToken.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";
import {add_blog, delete_blog, update_blog, update_blog_fetch} from "../controllers/blog.controller.js";

const router = express.Router()

router.post("/categories", [verifyToken, verifyAdmin], create_category)
router.get("/categories", [verifyToken, verifyAdmin], get_categories)
router.get("/categories/:slug", [verifyToken, verifyAdmin], get_category)
router.put("/categories/:slug", [verifyToken, verifyAdmin], update_category)
router.delete("/categories/:id", [verifyToken, verifyAdmin], delete_category)

router.get('/dashboard', [verifyToken, verifyAdmin], dashboard)

router.get('/blogs', [verifyToken, verifyAdmin], admin_blogs)
router.post('/blogs', [verifyToken, verifyAdmin], add_blog)
router.get('/blogs/:slug', [verifyToken, verifyAdmin], update_blog_fetch)
router.put('/blogs/:id', [verifyToken, verifyAdmin], update_blog)
router.delete('/blogs/:id', [verifyToken, verifyAdmin], delete_blog)

router.get('/users', [verifyToken, verifyAdmin], user_list)
router.get('/users/:username', [verifyToken, verifyAdmin], admin_fetch_single_user)
router.put('/users/:id', [verifyToken, verifyAdmin], admin_update_user)
router.delete('/users/:id', [verifyToken, verifyAdmin], delete_user)

export default router
