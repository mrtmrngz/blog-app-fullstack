import jwt from 'jsonwebtoken'

export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token) {
        return res.status(401).json({error: "Unauthorized"})
    }

    jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, payload) => {
        if(err) {
            return res.status(403).json({error: "Invalid Token"})
        }

        req.user = {id: payload.id, role: payload.role}

        next()
    })
}