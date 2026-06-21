import { useState, useEffect } from 'react'
import socket from '../socket'

function Chat({ roomId }) {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    socket.on('chat-message', (data) => {
      setMessages(prev => [...prev, data])
    })

    return () => socket.off('chat-message')
  }, [])

  const sendMessage = () => {
    if (!message.trim()) return

    const data = { roomId, message, sender: socket.id }
    socket.emit('chat-message', data)
    setMessages(prev => [...prev, { ...data, self: true }])
    setMessage('')
  }

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%',
      padding: '12px',
      gap: '8px'
    }}>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            alignSelf: msg.self ? 'flex-end' : 'flex-start',
            backgroundColor: msg.self ? '#6366f1' : '#2d2d2d',
            padding: '8px 12px',
            borderRadius: '8px',
            fontSize: '13px',
            maxWidth: '80%'
          }}>
            {msg.message}
          </div>
        ))}
      </div>

      {/* Input */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
          style={{ 
            flex: 1, 
            padding: '8px', 
            borderRadius: '6px',
            border: '1px solid #444',
            backgroundColor: '#2d2d2d',
            color: 'white',
            fontSize: '13px'
          }}
        />
        <button onClick={sendMessage} style={{
          padding: '8px 12px',
          backgroundColor: '#6366f1',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
          Send
        </button>
      </div>
    </div>
  )
}

export default Chat