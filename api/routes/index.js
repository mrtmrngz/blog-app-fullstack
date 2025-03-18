import express from "express";
import categoryRoute from "./category.route.js";
import userRoute from "./user.route.js";
import authRoute from "./auth.route.js";
import blogRoute from "./blog.route.js";
import profileRoute from "./profile.route.js";
import mediaRoute from "./media.route.js";
import adminRoute from "./admin.route.js";
import commentRoute from "./comment.route.js";

const router = express.Router()

router.use("/auth", authRoute)
router.use("/users", userRoute)
router.use("/profile", profileRoute)
router.use("/categories", categoryRoute)
router.use("/blogs", blogRoute)
router.use("/upload-auth", mediaRoute)
router.use("/admin", adminRoute)
router.use('/comments', commentRoute)

export default router
