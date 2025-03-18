import jwt from 'jsonwebtoken'

export const generateAccessToken = (userId, role) => {
    return jwt.sign({id: userId, role: role}, process.env.JWT_ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
}

export const generateRefreshToken = (userId, role) => {
    return jwt.sign({id: userId, role: role}, process.env.JWT_REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}