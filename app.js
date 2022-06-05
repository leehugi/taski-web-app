import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { MongoClient } from 'mongodb'
import bearerToken from "express-bearer-token"
import path from 'path';
import {fileURLToPath} from 'url';
import dotenv from 'dotenv';

import { loginRoutes } from './server/src/routes/login.routes.js'
import { taskRoutes } from './server/src/routes/task.routes.js'
import { usersRoutes } from './server/src/routes/users.routes.js'
import { authorize } from './server/src/controllers/authorize.controller.js'

dotenv.config()

export const envValue = process.env

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

const client = new MongoClient(process.env.MONGODB_URI)
await client.connect()
export const usersDB = await client.db('Users').collection('users')
export const tasksDB = await client.db('Tasks').collection('tasks')

app.use(cors())
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/task-manager'));

app.use(bodyParser.json())

app.use('/', loginRoutes)

app.use(bearerToken())

app.use('/', authorize)

app.use('/', taskRoutes)

app.use('/', usersRoutes)

app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname +'/dist/task-manager/index.html' ));
});

app.listen(process.env.PORT || 1000, '0.0.0.0', function(){
    console.log("server is listening on port 1000")
});