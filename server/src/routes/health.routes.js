import { Router } from "express"
import mongoose from "mongoose"

import { ApiResponse } from "../utils/ApiResponse.js"

const healthRouter = Router()

healthRouter.get("/", (req, res) => {
    const databaseReady = mongoose.connection.readyState === 1
    const statusCode = databaseReady ? 200 : 503

    res.status(statusCode).json(new ApiResponse(statusCode, {
        service: "codeRoom-server",
        database: databaseReady ? "up" : "down",
        uptime: process.uptime()
    }, databaseReady ? "Service is healthy" : "Service is not ready"))
})

export default healthRouter