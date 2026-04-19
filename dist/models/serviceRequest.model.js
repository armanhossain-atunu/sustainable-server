"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRequest = void 0;
const mongoose_1 = require("mongoose");
const serviceRequestSchema = new mongoose_1.Schema({
    userName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    productName: { type: String, required: true, trim: true },
    modelNumber: { type: String, required: true, trim: true },
    problemDescription: { type: String, required: true, trim: true },
    phoneNumber: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
}, {
    timestamps: true,
});
exports.ServiceRequest = (0, mongoose_1.model)('ServiceRequest', serviceRequestSchema);
