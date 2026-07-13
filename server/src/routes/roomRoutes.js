import express from 'express'
const router = express.Router()
import { createRoom, getRoom } from '../controllers/roomController.js'

router.post('/', createRoom)
router.get('/:roomId', getRoom)

export default router