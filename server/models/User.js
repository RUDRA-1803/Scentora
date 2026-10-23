import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { toClientJSON } from './plugins/toClientJSON.js';

const addressSchema = new mongoose.Schema(
  {
    street: { type: String, trim: true, default: '' },
    city: { type: String, trim: true, default: '' },
    state: { type: String, trim: true, default: '' },
    postalCode: { type: String, trim: true, default: '' },
  },
  { _id: false }
);

const cartItemSchema = new mongoose.Schema(
  {
    product: { type: String, ref: 'Product', required: true },
    quantity: { type: Number, min: 1, default: 1 },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required.'], trim: true },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address.'],
    },
    passwordHash: { type: String, required: true, select: false },
    phone: { type: String, trim: true, default: '' },
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
    address: { type: addressSchema, default: () => ({}) },
    preferences: {
      fragranceFamily: { type: String, default: 'All Families' },
      newsletter: { type: Boolean, default: true },
    },
    cart: { type: [cartItemSchema], default: [] },
    wishlist: { type: [{ type: String, ref: 'Product' }], default: [] },
  },
  { timestamps: true }
);

userSchema.methods.setPassword = async function setPassword(password) {
  this.passwordHash = await bcrypt.hash(password, 10);
};

userSchema.methods.verifyPassword = function verifyPassword(password) {
  return bcrypt.compare(password, this.passwordHash);
};

toClientJSON(userSchema, { hide: ['passwordHash', 'cart', 'wishlist'] });

export const MIN_PASSWORD_LENGTH = 6;

export default mongoose.model('User', userSchema);
