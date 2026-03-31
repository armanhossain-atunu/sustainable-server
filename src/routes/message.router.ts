import express from 'express';
const router = express.Router();
import { MessageController } from '../controllers/message.controller';

// Get all messages
router.get('/', MessageController.getMessages);
// Create message
router.post('/', MessageController.createMessage);

export const MessageRoutes = router;