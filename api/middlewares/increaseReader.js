import db from "../libs/db.js";
import jwt from "jsonwebtoken";

export const increaseReader = async (req, res, next) => {
    const slug = req.params.slug
    const authHeader = req.headers['authorization']

    if(!authHeader) {
        return next()
    }

    const token = authHeader.split(' ')[1]
    let tokenUserId;

    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET)
        tokenUserId = decoded?.id
    }catch (err) {
        res.status(500).json({serverError: "Something goes wrong"})
    }

    if(tokenUserId) {
        try {
            const blog = await db.blog.findUnique({ where: {slug: slug} })

            if(!blog) {
                return res.status(404).json({error: "Blog not found!"})
            }

            const existingUser = await db.blogReader.findUnique({
                where: {
                    userId_blogId: {
                        userId: tokenUserId,
                        blogId: blog.id
                    }
                }
            })

            if(!existingUser) {
                await db.blogReader.create({
                    data: {
                        userId: tokenUserId,
                        blogId: blog.id
                    }
                })

                await db.blog.update({
                    where: { id: blog.id },
                    data: {
                        readerCount: {
                            increment: 1
                        }
                    }
                })
            }


        }catch (err) {
            res.status(500).json({serverError: "Something goes wrong"})
        }
    }

    next()
}
