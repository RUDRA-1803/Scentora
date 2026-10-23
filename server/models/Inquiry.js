import mongoose from 'mongoose';
import { toClientJSON } from './plugins/toClientJSON.js';

/**
 * Contact-form inquiries submitted from the Contact page.
 */
const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required.'], trim: true },
    email: { type: String, required: [true, 'Email is required.'], lowercase: true, trim: true },
    subject: { type: String, trim: true, default: '' },
    message: { type: String, required: [true, 'Message is required.'], trim: true, maxlength: 5000 },
  },
  { timestamps: true }
);

toClientJSON(inquirySchema);

export default mongoose.model('Inquiry', inquirySchema);
