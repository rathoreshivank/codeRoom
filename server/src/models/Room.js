const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: true,
        unique: true,
    },
    code: {
        type: String,
        default: "// Start coding here...",
    },
    language: {
        type: String,
        default: "javascript",
    }
}, { timestamps: true });

module.exports = mongoose.model("Room", RoomSchema);