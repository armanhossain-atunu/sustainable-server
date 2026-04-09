import { Types } from "mongoose";

export interface TProduct {
  title: string;
  slug: string;
  description: string;
  date: Date;

  startTime?: string;
  endTime?: string;

  location: string;
  venue?: string;

  organizer: string;
  organizerContact?: string;

  image: string;
  gallery: string[];

  category: string; 
  price: number;
  discountPrice?: number;
  isFree?: boolean;

  capacity?: number;
  attendees?: Types.ObjectId[];

  status?: "upcoming" | "ongoing" | "completed" | "cancelled";

  tags?: string[];

  isFeatured?: boolean;
  registrationDeadline?: Date;

  ticketTypes?: {
    name: string;
    price: number;
    quantity: number;
  }[];

  // createdAt?: Date;
  // updatedAt?: Date;
}