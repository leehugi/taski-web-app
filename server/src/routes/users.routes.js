import express from 'express'
import * as usersController from '../controllers/users.controller.js'

const router = express.Router()

router.get("/getUsers", usersController.getUsers)

router.get("/checkToken", usersController.checkToken)

export {router as usersRoutes}