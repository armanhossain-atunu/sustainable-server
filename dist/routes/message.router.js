"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRoutes = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const message_controller_1 = require("../controllers/message.controller");
// Get all messages
router.get('/', message_controller_1.MessageController.getMessages);
// Create message
router.post('/', message_controller_1.MessageController.createMessage);
// Delete message
router.delete('/:id', message_controller_1.MessageController.deleteMessage);
exports.MessageRoutes = router;
