import { Schema, model } from "mongoose";
import { TEvent } from "../types/product.interface";

const eventSchema = new Schema<TEvent>(
  {
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

    category: { type: String , lowercase: true },

    price: { type: Number, default: 0 },
    isFree: { type: Boolean, default: true },

    capacity: { type: Number },
    attendees: [{ type: Schema.Types.ObjectId, ref: "User" }],

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
  },
  {
    timestamps: true,
  }
);

export const Event = model<TEvent>("Event", eventSchema);