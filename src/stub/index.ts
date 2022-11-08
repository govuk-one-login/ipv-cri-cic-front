import express from "express"
import { PATH_NAMES } from "../app.constants"
import dotenv from "dotenv"
dotenv.config()

const router = express.Router()

const { callback, fetchBiometricToken, finishBiometricsCheck } = require("./middleware")

module.exports = router
