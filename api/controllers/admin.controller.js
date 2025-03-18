import db from "../libs/db.js";
import {generateSlug} from "../libs/generateSlug.js";
import bcrypt from "bcryptjs";

export const controller_name = async (req, res) => {
    try {
        //codes
    } catch (err) {
        res.status(500).json({serverError: `Something goes wrong ${err}`})
    }
}

export const create_category = async (req, res) => {

    const {title} = req.body

    try {
        const slug = await generateSlug(title, db.category)

        await db.category.create({
            data: {
                title: title,
                slug: slug
            }
        })

        res.status(201).json({message: "Category Created Successfully!"})
    } catch (err) {
        res.status(500).json({serverError: `Something goes wrong ${err}`})
    }
}

export const get_categories = async (req, res) => {
    try {
        const categories = await db.category.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

        res.status(200).json(categories)
    } catch (err) {
        res.status(500).json({serverError: `Something goes wrong ${err}`})
    }
}

export const get_category = async (req, res) => {

    const {slug} = req.params

    try {
        const cat = await db.category.findUnique({
            where: {slug: slug}
        })

        if (!cat) return res.status(404).json({error: "Category Not Found!"})

        res.status(200).json(cat)
    } catch (err) {
        res.status(500).json({serverError: `Something goes wrong ${err}`})
    }
}

export const update_category = async (req, res) => {

    const {slug} = req.params
    const {title} = req.body

    try {

        const newSlug = await generateSlug(title, db.category)

        const updatedCat = await db.category.update({
            where: {slug: slug},
            data: {
                title: title,
                slug: newSlug
            }
        })

        if (!updatedCat) {
            return res.status(404).json({error: "Category not found!"})
        }

        res.status(200).json({message: "Category updated successfully!"})

    } catch (err) {
        res.status(500).json({serverError: `Something goes wrong ${err}`})
    }
}

export const delete_category = async (req, res) => {

    const {id} = req.params

    try {

        const category = await db.category.findUnique({
            where: {id: id}
        })

        if (!category) return res.status(404).json({error: "Category not found!"})

        await db.category.delete({where: {id: id}})

        res.status(200).json({message: "Category deleted successfully!"})

    } catch (err) {
        res.status(500).json({serverError: `Something goes wrong ${err}`})
    }
}

export const dashboard = async (req, res) => {
    try {
        const [categoryCount, categoryHasMostBlog, blogCount, mostReadedBlog, bestAuthor, firstUser, lastUser, userCount] = await Promise.all([
            db.category.count(),
            db.category.findMany({
                select: {
                    id: true,
                    title: true,
                    _count: {
                        select: {blogs: true},
                    },
                },
                orderBy: {
                    blogs: {
                        _count: "desc",
                    },
                },
                take: 1,
            }),
            db.blog.count(),
            db.blog.findMany({
                orderBy: {readers: {_count: 'desc'}},
                select: {
                    id: true,
                    title: true,
                    _count: {
                        select: {readers: true}
                    }
                }
            }),
            db.user.findMany({
                orderBy: {blogs: {_count: 'desc'}},
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    username: true,
                    _count: {
                        select: {blogs: true}
                    }
                }
            }),
            db.user.findFirst({
                orderBy: {createdAt: 'asc'},
                select: {id: true, firstName: true, lastName: true, username: true}
            }),
            db.user.findFirst({
                orderBy: {createdAt: 'desc'},
                select: {id: true, firstName: true, lastName: true, username: true}
            }),
            db.user.count()
        ])
        res.status(200).json({
            categoryCount,
            categoryHasMostBlog: categoryHasMostBlog[0],
            blogCount,
            mostReadedBlog: mostReadedBlog[0],
            bestAuthor: bestAuthor[0],
            firstUser,
            lastUser,
            userCount
        })
    } catch (err) {
        res.status(500).json({serverError: `Something goes wrong ${err}`})
    }
}

export const admin_blogs = async (req, res) => {
    try {
        const blogs = await db.blog.findMany({
            include: {
                author: { select: { id: true, firstName: true, lastName: true} },
                category: { select: { id: true, title: true } },
            }
        })

        res.status(200).json(blogs)

    } catch (err) {
        res.status(500).json({serverError: `Something goes wrong ${err}`})
    }
}

export const user_list = async (req, res) => {
    try {
        const users = await db.user.findMany({
            select: {
                id: true,
                username: true,
                firstName: true,
                lastName: true,
                createdAt: true,
                role: true,
                avatar: true,
                email: true
            }
        })

        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({serverError: `Something goes wrong ${err}`})
    }
}

export const admin_fetch_single_user = async (req, res) => {

    const username = req.params.username

    try {
        const user = await db.user.findUnique({
            where: { username },
            select: {
                id: true,
                avatar: true,
                email: true,
                password: true,
                role: true
            }
        })

        if(!user) return res.status(404).json({error: "User not found!"})

        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({serverError: `Something goes wrong ${err}`})
    }
}

export const admin_update_user = async (req, res) => {

    const id = req.params.id
    const {password, avatar, role, email} = req.body

    let updatedPassword = null

    try {
        if(password) {
            updatedPassword = await bcrypt.hash(password, 10)
        }

        const user = await db.user.findUnique({ where: { id } })

        if(!user) {
            return res.status(404).json({error: "User not found"})
        }

        await db.user.update({
            where: {id: user.id},
            data: {
                email,
                role,
                ...(avatar && { avatar }),
                ...(updatedPassword && { password: updatedPassword })
            }
        })

        res.status(200).json({message: "User updated successfully"})

    } catch (err) {
        res.status(500).json({serverError: `Something goes wrong ${err}`})
    }
}

export const delete_user = async (req, res) => {

    const tokenUserId = req.user.id
    const id = req.params.id

    if(id === tokenUserId) {
        return res.status(403).json({error: "You cant delete yourself!!"})
    }

    try {
        const user = await db.user.findUnique({ where: {id} })

        if(!user) {
            return res.status(404).json({error: "User not found"})
        }

        await db.user.delete({ where: {id: user.id} })

        res.status(200).json({message: "User deleted successfully"})

    } catch (err) {
        res.status(500).json({serverError: `Something goes wrong ${err}`})
    }
}

