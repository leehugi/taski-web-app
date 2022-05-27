import * as loginService from "../services/login.service.js"

export const login = async (req, res, next) => {
    try {
        const result = await loginService.login(req.body)
        if(result){
            res.send({status: 200, msg: result})
        } else{
            res.status(400).send('No user')
        }
    } catch (error) {
        console.log(error)
    }
}