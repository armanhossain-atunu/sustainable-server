"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
const message_model_1 = require("../models/message.model");
// Create message
const createMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const savedMessage = yield message_model_1.Message.create(req.body);
        res.status(201).json({
            success: true,
            message: 'message created successfully',
            data: savedMessage,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to create message',
            error: err.message,
        });
    }
});
// Get all messages
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messages = yield message_model_1.Message.find();
        res.status(200).json({
            success: true,
            message: 'message fetched successfully',
            data: messages,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch message',
            error: err.message,
        });
    }
});
// delete message
const deleteMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedMessage = yield message_model_1.Message.findByIdAndDelete(req.params.id);
        if (!deletedMessage) {
            return res.status(404).json({
                success: false,
                message: 'message not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'message deleted successfully',
            data: null,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete message',
            error: err.message,
        });
    }
});
exports.MessageController = { createMessage, getMessages, deleteMessage };
