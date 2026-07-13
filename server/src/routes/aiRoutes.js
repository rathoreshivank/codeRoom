import express from 'express'
const router = express.Router()
import { explainCode } from '../controllers/aiController.js'

router.post('/explain', explainCode)

export default router
