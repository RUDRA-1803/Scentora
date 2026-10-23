import mongoose from 'mongoose';
import { toClientJSON } from './plugins/toClientJSON.js';

/**
 * Newsletter subscribers from the footer sign-up ribbon.
 */
const subscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address.'],
    },
  },
  { timestamps: true }
);

toClientJSON(subscriberSchema);

export default mongoose.model('Subscriber', subscriberSchema);
