const express = require("express");
const router = express.Router();
const Room = require("../models/Room.js");

// Create a new room
router.post('/create', async (req, res) => {
    try{
        const roomId = Math.random().toString(36).substring(2, 8); // Generate a random room ID
        const newRoom = new Room({ roomId }); // Create a new Room document with the generated roomId
        await newRoom.save();
        res.status(201).json({ roomId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// GET /api/room/:roomId — get existing room
router.get('/:roomId', async (req, res) => {
    try {
        const room = await Room.findOne({ roomId: req.params.roomId });
        if (!room) {
            return res.status(404).json({ error: "Room not found" });
        }
        res.status(200).json(room);

    } catch (error) {
        res.status(500).json({ error: "Failed to fetch room" });
    }
})

module.exports = router