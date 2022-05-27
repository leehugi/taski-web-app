import { usersDB } from "../app.js";

export const getUsers = async (req, res, next) => {
    try {
        const result = await usersDB.find({}).project({userName:1,_id:0}).toArray();
        if(result){
            res.send({status: 200, msg: result})
        } else{
            res.status(400).send('Something went wrong')
        }
    } catch (error) {
        console.log(error)
    }
}

export const checkToken = async (req, res, next) => {
    res.send({status: 200, msg: "OK"})
}