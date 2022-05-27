import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { MongoClient } from 'mongodb'
import bearerToken from "express-bearer-token"

import { loginRoutes } from './routes/login.routes.js'
import { taskRoutes } from './routes/task.routes.js'
import { usersRoutes } from './routes/users.routes.js'
import { authorize } from './controllers/authorize.controller.js'

const client = new MongoClient(process.env.MONGODB_URI)
await client.connect()
export const usersDB = await client.db('Users').collection('users')
export const tasksDB = await client.db('Tasks').collection('tasks')

const app = express()

app.use(cors())

app.use(bodyParser.json())

app.use('/', loginRoutes)

app.use(bearerToken())

app.use('/', authorize)

app.use('/', taskRoutes)

app.use('/', usersRoutes)

app.listen("1000", 'localhost', function(){
    console.log("server is listening on port 1000")
});