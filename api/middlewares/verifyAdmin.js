

const verifyAdmin = async (req, res, next) => {
    if(req.user && req.user.role === "admin") {
        next()
    }else {
        return res.status(403).json({error: "Access Denied: Admins Only"})
    }
}

export default verifyAdmin