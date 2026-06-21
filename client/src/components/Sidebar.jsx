import { useState } from 'react'
import Chat from './Chat'
import AiPanel from './AiPanel'

function Sidebar({ roomId }) {
  const [tab, setTab] = useState('chat')

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      color: 'white'
    }}>

      {/* Tab buttons */}
      <div style={{ display: 'flex', borderBottom: '1px solid #333' }}>
        <button 
          onClick={() => setTab('chat')}
          style={{ 
            ...tabBtn, 
            borderBottom: tab === 'chat' ? '2px solid #6366f1' : 'none' 
          }}>
          Chat
        </button>
        <button 
          onClick={() => setTab('ai')}
          style={{ 
            ...tabBtn, 
            borderBottom: tab === 'ai' ? '2px solid #6366f1' : 'none' 
          }}>
          AI Assistant
        </button>
      </div>

      {/* Tab content */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {tab === 'chat' ? <Chat roomId={roomId} /> : <AiPanel />}
      </div>

    </div>
  )
}

const tabBtn = {
  flex: 1,
  padding: '12px',
  backgroundColor: 'transparent',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  fontSize: '14px'
}

export default Sidebar