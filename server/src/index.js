import dotenv from "dotenv";
dotenv.config();

import express from "express";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import { Server } from "socket.io";

import roomRoutes from "./routes/roomRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import socketHandler from "./socket/socketHandler.js";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

//Express middleware

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// REST routes
app.use("/api/room", roomRoutes);
app.use("/api/ai", aiRoutes);

// Simple health-check endpoint
app.get("/health", (req, res) => res.json({ status: "ok" }));

//Register Socket.IO event handlers
socketHandler(io);

//Connect to MongoDB, then start the server
const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
  }

  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`REST API: http://localhost:${PORT}/api/room`);
    console.log(`Health: http://localhost:${PORT}/health`);
  });
};

start();
