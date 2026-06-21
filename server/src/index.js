const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "http://localhost:5173" },
});

app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error(
    "MONGO_URI is not defined. Make sure the server/.env file exists and contains the MongoDB connection string."
  );
} else {
  mongoose
    .connect(mongoUri)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
}

// AI route
app.use("/api/ai", require("./routes/aiRoutes"));
app.use("/api/room", require("./routes/roomRoutes"));

// Socket.IO connection
// socket is the individual, specific connection between the server and one single user
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // join room
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  // Real-time code synchronization
  // .emit('code-update', code): This is the broadcast command. It fires an event called 'code-update' back to the frontend, carrying the new code payload. The .to(roomId) part ensures that this update is sent only to other users in the same room, excluding the sender. This way, when one user makes a change to the code, all other users in the same room will receive the updated code in real-time, allowing for collaborative coding sessions.
  socket.on("code-change", ({ roomId, code }) => {
    socket.to(roomId).emit("code-update", code);
  });

  socket.on("chat-message", (data) => {
    socket.to(data.roomId).emit("chat-message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// start the server
server.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000");
});
