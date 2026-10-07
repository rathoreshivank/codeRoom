import { Server } from "socket.io"

import { env } from "../config/env.js"

const initSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: env.corsOrigin,
            credentials: true
        }
    })

    io.on("connection", (socket) => {
        console.log(`socket connected: ${socket.id}`)

        socket.on("join-room", (roomId, ack) => {
            // validate roomId, join the room, log it, and reply via ack
            const id = typeof roomId === "string" ? roomId.trim() : ""
            if (!id || id.length > 64) {
                return ack?.({
                    success: false,
                    message: "Invalid roomId"
                })
            }
            socket.join(id)
            console.log(`socket ${socket.id} joined room ${id}`)
            ack?.({ success: true, roomId: id })

        })

        socket.on("disconnect", (reason) => {
            console.log(`socket disconnected: ${socket.id} (${reason})`)
        })
    })

    return io
}

export { initSocket }
