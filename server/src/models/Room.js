import mongoose from 'mongoose'

const roomSchema = new mongoose.Schema({
  // roomId: a short, user-shareable string like "abc123".
  roomId: {
    type: String,
    required: true,
    unique: true,
  },

  // code: the current contents of the shared editor.
  code: {
    type: String,
    default: '// start typing...',
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('Room', roomSchema)