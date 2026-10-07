import { io } from "socket.io-client"

const serverUrl = process.env.SERVER_URL || "http://localhost:8000"
const roomId = process.argv[2] ?? "room-123"

const socket = io(serverUrl)

socket.on("connect", () => {
    console.log(`connected as ${socket.id}, joining "${roomId}"...`)

    socket.emit("join-room", roomId, (response) => {
        console.log("server replied:", response)
        socket.disconnect()
    })
})

socket.on("connect_error", (error) => {
    console.error("could not connect:", error.message)
    process.exit(1)
})
