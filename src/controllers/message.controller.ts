import { Request, Response } from "express";
import { Message } from "../models/message.model";

// Create message
const createMessage = async (req: Request, res: Response) => {
    try {
        const savedMessage = await Message.create(req.body);
        res.status(201).json({
            success: true,
            message: 'message created successfully',
            data: savedMessage,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: 'Failed to create message',
            error: err.message,
        });
    }
};
// Get all messages
const getMessages = async (req: Request, res: Response) => {
    try {
        const messages = await Message.find();
        res.status(200).json({
            success: true,
            message: 'message fetched successfully',
            data: messages,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch message',
            error: err.message,
        });
    }
};
// delete message
const deleteMessage = async (req: Request, res: Response) => {
    try {
        const deletedMessage = await Message.findByIdAndDelete(req.params.id);
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
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete message',
            error: err.message,
        });
    }
};

export const MessageController = { createMessage, getMessages, deleteMessage };