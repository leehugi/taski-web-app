import express from 'express'
import * as loginController from '../controllers/login.controller.js'

const router = express.Router()

router.post("/login", loginController.login)

export {router as loginRoutes}