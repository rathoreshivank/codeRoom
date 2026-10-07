import http from "node:http"

import { app } from "./app.js"
import { connectDatabase } from "./db/index.js"
import { env } from "./config/env.js"
import { initSocket } from "./socket/index.js"

const startServer = async () => {
    await connectDatabase(env.mongodbUri())

    const server = http.createServer(app)
    initSocket(server)

    server.listen(env.port, () => {
        console.log(`codeRoom server listening on port: ${env.port}`)
    })

    return server
}

startServer().catch((error) => {
    console.error("Unable to start codeRoom server:", error.message)
    process.exit(1)
})