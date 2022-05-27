import jwt from 'jsonwebtoken'

import { usersDB } from "../app.js"
import {secret} from '../controllers/authorize.controller.js'

export const login = async (user) => {
    try {
        const result = await usersDB.findOne({'userName': user.username, 'password': user.password})
        if(result){
            const token = createToken(result.password)
            return {"userName": result.userName, token}
        } else return result
    } catch (error) {
        console.log("login -> login.service.js")
        console.log(error)
        throw error
    }
}

function createToken(password){
    return jwt.sign(
        {password},
        secret,
        {expiresIn:"2d"}
        )
}