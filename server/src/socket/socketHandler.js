export default (io) => {

  io.on('connection', (socket) => {
    console.log(`[socket] Client connected: ${socket.id}`)

    // join-room 
    socket.on('join-room', (roomId) => {
      socket.join(roomId)
      console.log(`[socket] ${socket.id} joined room: ${roomId}`)
    })

    // code-change 
    socket.on('code-change', ({ roomId, code }) => {
      socket.to(roomId).emit('code-update', code)
    })

    // chat-message 
    socket.on('chat-message', ({ roomId, message, username }) => {
      socket.to(roomId).emit('chat-message', { message, username })
    })

    // disconnect 
    socket.on('disconnect', () => {
      console.log(`[socket] Client disconnected: ${socket.id}`)
    })
  })
}
