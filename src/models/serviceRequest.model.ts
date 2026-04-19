import { model, Schema } from 'mongoose';
import { TServiceRequest } from '../types/serviceRequest.interface';

const serviceRequestSchema = new Schema<TServiceRequest>(
  {
    userName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    productName: { type: String, required: true, trim: true },
    modelNumber: { type: String, required: true, trim: true },
    problemDescription: { type: String, required: true, trim: true },
    phoneNumber: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);

export const ServiceRequest = model<TServiceRequest>(
  'ServiceRequest',
  serviceRequestSchema
);
