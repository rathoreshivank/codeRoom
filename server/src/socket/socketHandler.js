// Socket handler: all real-time event logic lives here.
// Exported as a function that accepts `io` (the Socket.IO server instance).
// This pattern is called "dependency injection" — index.js creates `io` and passes it in,
// so this file never needs to import or create the server itself.

export default (io) => {
  // io.on('connection') fires every time a new browser tab connects.
  // `socket` represents THAT specific client's connection — think of it as
  // a dedicated phone line between the server and one user.
  io.on('connection', (socket) => {
    console.log(`[socket] Client connected: ${socket.id}`)

    // ── join-room ────────────────────────────────────────────────────────────
    // The client emits this event right after opening the /room/:roomId page.
    // socket.join(roomId) adds this socket to a named group called roomId.
    // After joining, any emit targeted at that room reaches this socket too.
    socket.on('join-room', (roomId) => {
      socket.join(roomId)
      console.log(`[socket] ${socket.id} joined room: ${roomId}`)
    })

    // ── code-change ──────────────────────────────────────────────────────────
    // Fires whenever the user types in the Monaco editor.
    // The client sends { roomId, code } — the full current code string.
    //
    // socket.to(roomId).emit(...) sends to everyone in `roomId` EXCEPT the sender.
    // Why exclude the sender? They already have the latest code locally — sending
    // it back would cause a cursor-jump flicker or even an infinite update loop.
    socket.on('code-change', ({ roomId, code }) => {
      socket.to(roomId).emit('code-update', code)
    })

    // ── chat-message ─────────────────────────────────────────────────────────
    // Fires when a user sends a chat message.
    // The client sends { roomId, message, username }.
    // We broadcast the full object to the room (excluding sender),
    // so every other client can display it in their chat panel.
    socket.on('chat-message', ({ roomId, message, username }) => {
      socket.to(roomId).emit('chat-message', { message, username })
    })

    // ── disconnect ───────────────────────────────────────────────────────────
    // Socket.IO fires this automatically when the client closes the tab,
    // loses internet, or the browser navigates away.
    // socket.rooms is automatically cleaned up by Socket.IO — no manual leave needed.
    socket.on('disconnect', () => {
      console.log(`[socket] Client disconnected: ${socket.id}`)
    })
  })
}
