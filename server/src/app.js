import cookieParser from "cookie-parser"
import cors from "cors"
import express from "express"

import { env } from "./config/env.js"
import { errorHandler, notFoundHandler } from "./middlewares/error.js"
import healthRouter from "./routes/health.routes.js"

const app = express()

app.use(cors({
	origin: env.corsOrigin,
	credentials: true
}))
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cookieParser())

app.use("/api/health", healthRouter)

app.use(notFoundHandler)
app.use(errorHandler)

export { app }
