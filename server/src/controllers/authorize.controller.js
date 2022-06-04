import jwt from 'jsonwebtoken'

import { envValue } from '../app.js'

export const authorize = (req, res, next) => {
    try {
        const decoded = jwt.verify(req.token, envValue.SECRET)
        next()
    } catch (error) {
        res.status(401).send("Need to login")
    }
}