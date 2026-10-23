import mongoose from 'mongoose';
import { toClientJSON } from './plugins/toClientJSON.js';

const productSchema = new mongoose.Schema(
  {
    // String ids (e.g. "sc-01") keep product URLs and order line items stable
    _id: { type: String, default: () => `sc-${Date.now().toString(36)}` },
    name: { type: String, required: [true, 'Product name is required.'], trim: true },
    brand: { type: String, required: [true, 'Brand is required.'], trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { type: String, required: true, lowercase: true, trim: true, default: 'perfumes' },
    audience: { type: String, enum: ['Men', 'Women', 'Unisex'], default: 'Unisex' },
    description: { type: String, required: [true, 'Description is required.'], trim: true },
    price: { type: Number, required: [true, 'Price is required.'], min: [0, 'Price cannot be negative.'] },
    originalPrice: { type: Number, min: 0, default: null },
    images: {
      type: [String],
      validate: [(v) => v.length > 0, 'At least one product image is required.'],
    },
    volume: { type: Number, min: 0, default: 100 },
    concentration: { type: String, trim: true, default: 'Eau de Parfum' },
    fragranceFamily: { type: String, trim: true, default: '' },
    notes: {
      top: { type: [String], default: [] },
      middle: { type: [String], default: [] },
      base: { type: [String], default: [] },
    },
    stock: { type: Number, min: [0, 'Stock cannot be negative.'], default: 0 },
    rating: { type: Number, min: 0, max: 5, default: 5 },
    reviewCount: { type: Number, min: 0, default: 0 },
    featured: { type: Boolean, default: false },
    bestseller: { type: Boolean, default: false },
    newArrival: { type: Boolean, default: false },
    // Free-form attributes so future categories (watches, wallets...) need no schema change
    attributes: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

toClientJSON(productSchema);

export default mongoose.model('Product', productSchema);
