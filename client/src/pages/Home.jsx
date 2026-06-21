import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../config'

function Home() {
    const [roomId, setRoomId] = useState('')
    const navigate = useNavigate()

    const createRoom = async () => {
        const res = await axios.post(`${BASE_URL}/api/room/create`)
        navigate(`/room/${res.data.roomId}`)
    }

    const joinRoom = () => {
        if (roomId.trim()) navigate(`/room/${roomId}`)
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            gap: '16px',
            backgroundColor: '#1e1e1e',
            color: 'white'
        }}>
            <h1>CodeRoom</h1>

            <button onClick={createRoom} style={btnStyle}>
                Create New Room
            </button>

            <p style={{ color: '#888' }}>or join existing</p>

            <input
                placeholder="Enter Room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                style={inputStyle}
            />
            <button onClick={joinRoom} style={btnStyle}>
                Join Room
            </button>
        </div>
    )
}

const btnStyle = {
    padding: '10px 24px',
    backgroundColor: '#6366f1',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px'
}

const inputStyle = {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #444',
    backgroundColor: '#2d2d2d',
    color: 'white',
    fontSize: '16px',
    width: '250px'
}

export default Home