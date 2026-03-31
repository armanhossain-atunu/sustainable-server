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

export const MessageController = { createMessage, getMessages };