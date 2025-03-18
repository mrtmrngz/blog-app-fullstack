import db from "../libs/db.js";
import {generateSlug} from "../libs/generateSlug.js";


export const controller_name = async (req, res) => {
    try {
        //codes
    } catch (err) {
        res.status(500).json({serverError: `Something goes wrong ${err}`})
    }
}

export const add_blog = async (req, res) => {

    const tokenId = req.user.id
    const {image, title, description, content, categoryId} = req.body

    try {

        const slug = await generateSlug(title, db.blog)

        const newBlog = await db.blog.create({
            data: {
                title,
                slug: slug,
                image,
                description,
                content,
                category: {connect: {id: categoryId}},
                author: {connect: {id: tokenId}}
            },
            select: {slug: true}
        })

        res.status(200).json({message: "Blog created successfully", newBlog})
    } catch (err) {
        res.status(500).json({serverError: `Something goes wrong ${err}`})
    }
}

export const fetch_blogs = async (req, res) => {

    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 2
    const skip = (page - 1) * limit

    const {cat, search, sort} = req.query;

    try {

        const where = {}
        if (cat && cat !== 'undefined') {
            const category = await db.category.findUnique({
                where: {slug: cat},
                select: {id: true}
            })

            if (category) {
                where.categoryId = category.id
            }
        }

        if (search && search !== "undefined" && search.trim() !== "") {
            where.OR = [
                {title: {contains: search, mode: 'insensitive'}},
                {content: {contains: search, mode: 'insensitive'}}
            ]
        }

        let orderBy = {}

        if (sort && sort !== "undefined") {
            switch (sort) {
                case "newest":
                    orderBy = {createdAt: 'desc'}
                    break;
                case 'oldest':
                    orderBy = {createdAt: 'asc'}
                    break;
                case 'popular':
                    orderBy = {readers: { _count: 'desc' }}
                    break;
                default:
                    break;
            }
        }

        const blog = await db.blog.findMany({
            where,
            include: {
                author: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        avatar: true,
                        username: true
                    }
                },
                category: {
                    select: {
                        id: true,
                        title: true,
                        slug: true
                    }
                },
                likes: {
                    select: {
                        userId: true,
                        blogId: true
                    }
                }
            },
            take: limit,
            skip: skip,
            orderBy
        })

        const countBlogs = await db.blog.count({where})

        const hasMore = page * limit < countBlogs

        res.status(200).json({blog, hasMore})
    } catch (err) {
        res.status(500).json({serverError: `Something goes wrong ${err}`})
    }
}

export const blog_detail = async (req, res) => {

    const slug = req.params.slug

    try {
        const blog = await db.blog.findUnique({
            where: {slug: slug},
            include: {
                author: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        avatar: true,
                        username: true
                    }
                },
                category: {
                    select: {
                        id: true,
                        title: true,
                        slug: true
                    }
                },
                likes: {
                    select: {
                        userId: true,
                        blogId: true
                    }
                },
                comments: {
                    select: {
                        user: {
                            select: {id: true, firstName: true, lastName: true, avatar: true, username: true}
                        },
                        review: true,
                        id: true,
                        comment: true,
                        blogId: true,
                        createdAt: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            },
        })

        if (!blog) {
            return res.status(404).json({error: "Blog not found!"})
        }

        const [readerCount, likeCount] = await Promise.all([
            db.blogReader.count({
                where: {blogId: blog.id}
            }),
            db.likeBlog.count({
                where: {blogId: blog.id}
            })
        ])

        res.status(200).json({...blog, readerCount: readerCount, likeCount: likeCount})
    } catch (err) {
        res.status(500).json({serverError: `Something goes wrong ${err}`})
    }
}

export const delete_blog = async (req, res) => {

    const tokenUserId = req.user.id
    const blogId = req.params.id

    try {
        const blog = await db.blog.findUnique({where: {id: blogId}})

        if (!blog) {
            return res.status(404).json({error: "Blog not found"})
        }

        if (blog.authorId === tokenUserId || req.user.role === "admin") {
            await db.blog.delete({
                where: {id: blogId}
            })
            return res.status(200).json({message: "Blog deleted successfully"})
        } else {
            return res.status(401).json({error: "Unauthorized"})
        }

    } catch (err) {
        res.status(500).json({serverError: `Something goes wrong ${err}`})
    }
}

export const featured_blogs = async (req, res) => {
    try {
        const blogs = await db.blog.findMany({
            orderBy: { readerCount: 'desc' },
            include: {
                category: {
                    select: {id: true, slug: true, title: true}
                },
                likes: {
                    select: {
                        userId: true,
                        blogId: true
                    }
                },
            },
            take: 4
        })

        res.status(200).json(blogs)
    } catch (err) {
        res.status(500).json({serverError: `Something goes wrong ${err}`})
    }
}

export const most_readed_blogs = async (req, res) => {
    try {
        const mostReaded = await db.blog.findMany({
            orderBy: {
                readers: { _count: 'desc' }
            },
            take: 10,
            include: {
                author: {
                    select: {id: true, avatar: true, firstName: true, lastName: true, username: true}
                },
                category: {
                    select: {id: true, title: true, slug: true}
                },
                likes: {
                    select: {
                        userId: true,
                        blogId: true
                    }
                },
            }
        })

        res.status(200).json(mostReaded)
    } catch (err) {
        res.status(500).json({serverError: `Something goes wrong ${err}`})
    }
}

export const like_blog = async (req, res) => {

    const tokenUserId = req.user.id
    const id = req.params.id

    try {

        const blog = await db.blog.findUnique({where: {id}})

        if (!blog) {
            return res.status(404).json({error: "Blog not found"})
        }

        const existingLike = await db.likeBlog.findUnique({
            where: {
                userId_blogId: {
                    userId: tokenUserId,
                    blogId: blog.id
                }
            }
        })

        if (existingLike) {
            await db.likeBlog.delete({
                where: {
                    userId_blogId: {
                        userId: tokenUserId,
                        blogId: blog.id
                    }
                }
            })
            res.status(200).json({message: "Blog unliked", isLiked: false})
        } else {
            await db.likeBlog.create({
                data: {
                    userId: tokenUserId,
                    blogId: blog.id
                }
            })
            res.status(200).json({message: "Blog liked", isLiked: true})
        }

    } catch (err) {
        res.status(500).json({serverError: `Something goes wrong ${err}`})
    }
}

export const most_liked = async (req, res) => {
    try {


        const mostLikedBlog = await db.blog.findFirst({
            orderBy: {
                likes: {
                    _count: 'desc',
                },
            },
            include: {
                author: {
                    select: {id: true, avatar: true, firstName: true, lastName: true, username: true}
                },
                category: {
                    select: {id: true, title: true, slug: true}
                },
                likes: {
                    select: {
                        userId: true,
                        blogId: true
                    }
                },
            },
        });

        res.status(200).json(mostLikedBlog)
    } catch (err) {
        res.status(500).json({serverError: `Something goes wrong ${err}`})
    }
}

export const update_blog_fetch = async (req, res) => {

    const slug = req.params.slug

    try {
        const blog = await db.blog.findUnique({
            where: {slug},
            select: {
                id: true,
                title: true,
                image: true,
                description: true,
                categoryId: true,
                content: true
            }
        })

        if (!blog) return res.status(404).json({error: "Blog not found"})

        res.status(200).json(blog)
    } catch (err) {
        res.status(500).json({serverError: `Something goes wrong ${err}`})
    }
}

export const update_blog = async (req, res) => {

    const {image, title, description, content, categoryId} = req.body
    const id = req.params.id
    const tokenUserId = req.user.id

    let newSlug;

    try {
        const blog = await db.blog.findUnique({where: {id}})

        if (!blog) return res.status(404).json({error: "Blog not found"})

        if (blog.authorId !== tokenUserId) {
            return res.status(401).json({error: "Unauthorized"})
        }

        newSlug = await generateSlug(title, db.blog)

        const updatedBlog = await db.blog.update({
            where: {id: blog.id},
            data: {
                title,
                description,
                content,
                categoryId,
                image,
                slug: newSlug
            },
            select: {slug: true}
        })

        res.status(200).json({message: "Blog updated successfully", updatedBlog})

    } catch (err) {
        res.status(500).json({serverError: `Something goes wrong ${err}`})
    }
}