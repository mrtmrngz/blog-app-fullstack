import db from "../libs/db.js";
import bcrypt from "bcryptjs";


export const controller_name = async (req, res) => {
    try {
        //codes
    }catch (err) {
        res.status(500).json({serverError: `Something goes wrong ${err}`})
    }
}

export const user_info = async (req, res) => {

    const tokenUser = req.user

    try {

        const user = await db.user.findUnique({
            where: {id: tokenUser.id},
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                avatar: true
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

export const follow_user = async (req, res) => {
    const userId = req.params.id
    const tokenUserId = req.user.id
    try {
        if(userId === tokenUserId) {
            return res.status(400).json({error: "You cannot follow yourself!"})
        }

        const existingFollow = await db.following.findFirst({
            where: {
                followerId: userId,
                followingId: tokenUserId
            }
        });

        if(existingFollow) {
            await db.following.delete({
                where: {id: existingFollow.id}
            })

            return res.status(200).json({message: "Unfollowed!"})
        }else {
            await db.following.create({
                data: {
                    followerId: userId,
                    followingId: tokenUserId
                }
            })

            return res.status(200).json({message: "User followed successfully!"})
        }

    }catch (err) {
        res.status(500).json({serverError: `Something goes wrong ${err}`})
    }
}

export const user_info_edit_get = async (req, res) => {

    const tokenId = req.user.id
    const slug = req.params.slug

    try {
        const user = await db.user.findUnique({
            where: {username: slug},
            select: {
                id: true,
                avatar: true,
                role: true,
                email: true,
                bio: true,
            }
        })

        if(!user || tokenId !== user.id) return res.status(404).json({error: "User not found"})

        res.status(200).json(user)
    }catch (err) {
        res.status(500).json({serverError: `Something goes wrong ${err}`})
    }
}

export const update_user = async (req, res) => {

    const tokenId = req.user.id
    const id = req.params.id
    const {password, avatar, ...inputs} = req.body

    if(tokenId !== id) {
        return res.status(401).json({error: "Unauthorized!"})
    }

    let updatedPassword = null

    try {

        if(password) {
            updatedPassword = await bcrypt.hash(password, 10)
        }

        const updatedUser = await db.user.update({
            where: {id: id},
            data: {
                ...inputs,
                ...(updatedPassword && {password: updatedPassword}),
                ...(avatar && {avatar})
            }
        })

        res.status(200).json({message: "User updated successfully!"})

    }catch (err) {
        res.status(500).json({serverError: `Something goes wrong ${err}`})
    }
}
