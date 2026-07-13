import Room from "../models/Room.js";

// createRoom
export const createRoom = async (req, res) => {
  try {
    const roomId = Math.random().toString(36).substring(2, 8);

    const newRoom = new Room({ roomId });

    await newRoom.save();

    res.status(201).json({ roomId });
  } catch (error) {
    console.error("[createRoom] Error:", error.message);
    res.status(500).json({ error: "Failed to create room" });
  }
};

// ─ getRoom 
export const getRoom = async (req, res) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findOne({ roomId });

    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    res.status(200).json(room);
  } catch (error) {
    console.error("[getRoom] Error:", error.message);
    res.status(500).json({ error: "Failed to fetch room" });
  }
};
