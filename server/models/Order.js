import mongoose from 'mongoose';
import { toClientJSON } from './plugins/toClientJSON.js';

export const ORDER_STATUSES = ['Processing', 'Shipped', 'Delivered'];

const orderItemSchema = new mongoose.Schema(
  {
    id: { type: String, required: true }, // product id snapshot
    name: { type: String, required: true },
    brand: { type: String, default: '' },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
    volume: { type: Number, default: null },
    image: { type: String, default: '' },
  },
  { _id: false, id: false }
);

const orderSchema = new mongoose.Schema(
  {
    _id: { type: String }, // e.g. "SC-ORD-48213"
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    customer: {
      fullName: { type: String, required: true, trim: true },
      email: { type: String, required: true, lowercase: true, trim: true },
      phone: { type: String, required: true, trim: true },
      address: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
      state: { type: String, required: true, trim: true },
      postalCode: { type: String, required: true, trim: true },
    },
    items: {
      type: [orderItemSchema],
      validate: [(v) => v.length > 0, 'An order must contain at least one item.'],
    },
    subtotal: { type: Number, required: true, min: 0 },
    discount: { type: Number, default: 0, min: 0 },
    couponCode: { type: String, default: null },
    shipping: { type: Number, default: 0, min: 0 },
    total: { type: Number, required: true, min: 0 },
    paymentMethod: { type: String, required: true },
    giftNote: { type: String, trim: true, default: '' },
    status: { type: String, enum: ORDER_STATUSES, default: 'Processing' },
    trackingNumber: { type: String },
  },
  { timestamps: true }
);

toClientJSON(orderSchema);

export default mongoose.model('Order', orderSchema);
