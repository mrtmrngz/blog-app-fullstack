import db from "../libs/db.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {generateAccessToken, generateRefreshToken} from "../utils/generateTokens.js";

export const register = async (req, res) => {
    const { firstName, lastName, username, email, password } = req.body
    try {

        const checkUserByUsername = await db.user.findUnique({
            where: {username}
        })

        const checkUserByEmail = await db.user.findUnique({
            where: {email}
        })

        if(checkUserByUsername || checkUserByEmail) {
            return res.status(403).json({error: "User already exist!"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await db.user.create({
            data: {
                firstName,
                lastName,
                username,
                email,
                avatar: 'noAvatar.png',
                password: hashedPassword
            }
        })

        return res.status(201).json({message: "User created successfully"})

    }catch (err) {
        res.status(500).json({serverError: `Something goes wrong ${err}`})
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await db.user.findUnique({
            where: {email}
        })

        if(!user) {
            return res.status(404).json({error: "Invalid Credentials!"})
        }

        const comparedPassword = await bcrypt.compare(password, user.password)

        if(!comparedPassword) {
            return res.status(404).json({error: "Invalid Credentials!"})
        }

        const accessToken = generateAccessToken(user.id, user.role)
        const refreshToken = generateRefreshToken(user.id, user.role)

        res.cookie('_session', refreshToken, {
            httpOnly: true,
            secure: true,           //true in production
            sameSite: 'None',     // None in production
            maxAge: 1000 * 60 * 60 * 24 * 7
        }).status(200).json({accessToken, message: "Login successful"})

    }catch (err) {
        res.status(500).json({serverError: `Something goes wrong ${err}`})
    }
}

export const get_token = async (req, res) => {

    const token = req.cookies['_session']

    if(!token) return res.status(401).json({error: "Not authorized!"})

    try {
        jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET, (err, payload) => {
            if(err) return res.status(403).json({error: "Invalid Token!"})

            const newAccessToken = generateAccessToken(payload.id, payload.role)

            res.status(201).json({accessToken: newAccessToken})
        })
    }catch (err) {
        res.status(500).json({serverError: `Something goes wrong ${err}`})
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('_session', {
            httpOnly: true,
            secure: true,           //true in production
            sameSite: 'None',     // None in production
        }).status(200).json({message: "Logout successful"})
    }catch (err) {
        res.status(500).json({serverError: `Something goes wrong ${err}`})
    }
}