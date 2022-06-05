import { tasksDB } from "../../../app.js"
import {ObjectId} from 'mongodb'

export const getTasks = async (req, res, next) => {
    try {
        const result = await findTasks({'userName': req.body.username});
        responseData(res, result);
    } catch (error) {
        console.log(error)
    }
}

export const addTask = async (req, res, next) => {
    try {
        // TODO: find the new task and return the id of the task
        tasksDB.insertOne(req.body.newTask, async function(err, resu){
            if(err) throw err;
            const result = await findTasks({'userName': req.body.newTask.userName});
            responseData(res, result);
        })
    } catch (error) {
        console.log(error)
    }
}

export const deleteTask = async (req, res, next) => {
    try {
        const resu = await tasksDB.deleteOne({'_id': ObjectId(req.body._id)});
        var result = undefined;
        if(resu.deletedCount > 0)
            result = await findTasks({'userName': req.body.userName});
        responseData(res, result);
    } catch (error) {
        console.log(error)
    }
}

export const updateTask = async (req, res, next) => {
    try {
        var myquery = {"_id": ObjectId(req.body._id)};
        var newvalues = { $set: {
            userName: req.body.userName,
            title: req.body.title,
            description: req.body.description,
            finishDate: req.body.finishDate,
            priority: req.body.priority,
            table: req.body.table
            } 
        };
        tasksDB.updateOne(myquery, newvalues, async function(err, resu) {
            if (err) throw err;
            const result = await findTasks({"_id": ObjectId(req.body._id)});
            responseData(res, result);
          });
    } catch (error) {
        console.log(error)
    }
}

function responseData(res, result){
    if(result){
        res.send({status: 200, msg: result})
    } else{
        res.status(400).send('Something went wrong')
    }
}

async function findTasks(findObj){
    const result = await tasksDB.find(findObj).toArray();
    return result;
}