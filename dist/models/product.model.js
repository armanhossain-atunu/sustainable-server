"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const mongoose_1 = require("mongoose");
const eventSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: String },
    endTime: { type: String },
    location: { type: String, required: true },
    venue: { type: String },
    organizer: { type: String, required: true },
    organizerContact: { type: String },
    image: { type: String },
    gallery: [{ type: String }],
    category: { type: String, lowercase: true },
    price: { type: Number, default: 0 },
    isFree: { type: Boolean, default: true },
    capacity: { type: Number },
    attendees: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    status: {
        type: String,
        enum: ["upcoming", "ongoing", "completed", "cancelled"],
        default: "upcoming",
    },
    tags: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
    registrationDeadline: { type: Date },
    ticketTypes: [
        {
            name: { type: String },
            price: { type: Number },
            quantity: { type: Number },
        },
    ],
}, {
    timestamps: true,
});
exports.Event = (0, mongoose_1.model)("Event", eventSchema);
