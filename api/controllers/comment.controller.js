import db from "../libs/db.js";

export const controller_name = async (req, res) => {
    try {
        //codes
    }catch (err) {
        res.status(500).json({serverError: `Something goes wrong ${err}`})
    }
}

export const add_comment = async (req, res) => {

    const {comment, review, blogId} = req.body
    const tokenUserId = req.user.id

    try {
        const blog = await db.blog.findUnique({ where: {id: blogId} })

        if(!blog) return res.status(404).json({error: "Blog not found"})

        const newCommentData = await db.comment.create({
            data: {
                comment,
                review,
                blog: {connect: {id: blogId}},
                user: { connect: { id: tokenUserId } },
                createdAt: new Date()
            },
            include: {
                user: {
                    select: { avatar: true, id: true, username: true, firstName: true, lastName: true }
                }
            }
        })

        const {userId, ...newComment} = newCommentData

        res.status(201).json({message: "Comment created successfully", newComment, isAddSuccess: true})

    }catch (err) {
        res.status(500).json({serverError: `Something goes wrong ${err}`})
    }
}

export const delete_comment = async (req, res) => {

    const tokenUserId = req.user.id
    const id = req.params.id

    try {

        const comment = await db.comment.findUnique({ where: { id } })

        if(!comment) return res.status(404).json({error: "Comment not found!"})

        if(tokenUserId === comment.userId || req.user.role === "admin") {
            const deletedComment = await db.comment.delete({ where: {id: comment.id}, select: { id: true } })

            return  res.status(200).json({message: "Comment deleted successfully", deletedComment, isDeleteSuccess: true})
        }else {
            return res.status(401).json({error: "Unauthorized"})
        }

    }catch (err) {
        res.status(500).json({serverError: `Something goes wrong ${err}`})
    }
}