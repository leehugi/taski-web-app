import jwt from 'jsonwebtoken'


export const authorize = (req, res, next) => {
    try {
        const decoded = jwt.verify(req.token, secret)
        next()
    } catch (error) {
        res.status(401).send("Need to login")
    }
}