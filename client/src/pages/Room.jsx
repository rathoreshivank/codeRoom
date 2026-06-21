import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import socket from '../socket'
import Editor from '../components/Editor'
import Sidebar from '../components/Sidebar'

function Room() {
  const { roomId } = useParams()

  useEffect(() => {
    socket.emit('join-room', roomId)
  }, [roomId])

  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh',
      backgroundColor: '#1e1e1e'
    }}>
      <div style={{ width: '70%' }}>
        <Editor roomId={roomId} />
      </div>
      <div style={{ width: '30%', borderLeft: '1px solid #333' }}>
        <Sidebar roomId={roomId} />
      </div>
    </div>
  )
}

export default Room