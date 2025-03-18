import db from "../libs/db.js";


export const controller_name = async (req, res) => {
    try {
        //codes
    }catch (err) {
        res.status(500).json({serverError: `Something goes wrong ${err}`})
    }
}

export const profile_info = async (req, res) => {

    const slug = req.params.slug

    try {

        const user = await db.user.findUnique({
            where: {username: slug},
            select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                email: true,
                role: true,
                avatar: true,
                bio: true,
                createdAt: true,
                updatedAt: true,
                _count: {
                    select: {
                        follower: true,
                        following: true,
                        blogs: true
                    }
                },
                follower: {
                    select: { followingId: true }
                }
            }
        })

        if(!user) {
            return res.status(404).json({error: "User not found"})
        }

        res.status(200).json(user)

    }catch (err) {
        res.status(500).json({serverError: `Something goes wrong ${err}`})
    }
}

export const profile_blogs = async (req, res) => {

    const slug = req.params.slug

    try {
        const user = await db.user.findUnique({ where: { username: slug }, select: { id: true } })

        if(!user) return res.status(404).json({error: "User not found"})

        const userBlogs = await db.blog.findMany({ where: { authorId: user.id }, include: {
                author: {
                    select: { id: true, firstName: true, lastName: true }
                }
            } })

        res.status(200).json(userBlogs)

    }catch (err) {
        res.status(500).json({serverError: `Something goes wrong ${err}`})
    }
}

export const liked_blogs = async (req, res) => {

    const slug = req.params.slug

    try {
        const user = await db.user.findUnique({ where: { username: slug }, select: { id: true } })

        if(!user) return res.status(404).json({error: "User not found"})

        const likedBlogs = await db.likeBlog.findMany({ where: { userId: user.id }, select: { blogId: true } })

        const blogs = await db.blog.findMany({
            where: {
                id: { in: likedBlogs.map(blog => blog.blogId) }
            },
            include: {
                author: {
                    select: { id: true, firstName: true, lastName: true }
                }
            }
        })

        res.status(200).json(blogs)

    }catch (err) {
        res.status(500).json({serverError: `Something goes wrong ${err}`})
    }
}