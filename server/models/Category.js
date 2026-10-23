import mongoose from 'mongoose';
import { toClientJSON } from './plugins/toClientJSON.js';

const categorySchema = new mongoose.Schema(
  {
    // The slug doubles as the id, matching /category/:slug routes on the client
    _id: { type: String },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    title: { type: String, required: [true, 'Category title is required.'], trim: true },
    subtitle: { type: String, trim: true, default: 'Curated Collection' },
    description: { type: String, trim: true, default: '' },
    image: { type: String, trim: true, default: '' },
    tag: { type: String, trim: true, default: '' },
  },
  { timestamps: true }
);

categorySchema.pre('validate', function setIdFromSlug(next) {
  if (!this._id) this._id = this.slug;
  next();
});

toClientJSON(categorySchema);

export default mongoose.model('Category', categorySchema);
