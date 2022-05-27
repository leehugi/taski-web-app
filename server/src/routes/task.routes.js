import express from 'express'
import * as taskController from '../controllers/task.controller.js'

const router = express.Router()

router.post("/getTasks", taskController.getTasks)
router.post("/addTasks", taskController.addTask)
router.post("/deleteTask", taskController.deleteTask)
router.post("/updateTask", taskController.updateTask)

export {router as taskRoutes}