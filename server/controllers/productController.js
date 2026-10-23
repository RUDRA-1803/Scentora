import Product from '../models/Product.js';
import { ApiError, asyncHandler, sendSuccess } from '../utils/apiError.js';

// Fields an admin may set; anything else in the body (id, rating, timestamps...) is ignored
const EDITABLE_FIELDS = [
  'name', 'brand', 'slug', 'category', 'audience', 'description', 'price', 'originalPrice',
  'images', 'volume', 'concentration', 'fragranceFamily', 'notes', 'stock', 'featured',
  'bestseller', 'newArrival', 'attributes',
];

const pickEditable = (body) =>
  Object.fromEntries(EDITABLE_FIELDS.filter((f) => body[f] !== undefined).map((f) => [f, body[f]]));

const slugify = (value) =>
  String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

/**
 * GET /api/products — optional ?category=&search=
 */
export const listProducts = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.category) filter.category = String(req.query.category).toLowerCase();
  if (req.query.search) {
    const pattern = new RegExp(String(req.query.search).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    filter.$or = [{ name: pattern }, { brand: pattern }, { fragranceFamily: pattern }];
  }

  const products = await Product.find(filter).sort({ createdAt: -1 });
  sendSuccess(res, products);
});

/**
 * GET /api/products/:id — accepts an id or a slug
 */
export const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ $or: [{ _id: req.params.id }, { slug: req.params.id }] });
  if (!product) throw new ApiError(404, 'Product not found.');
  sendSuccess(res, product);
});

/**
 * POST /api/products (admin)
 */
export const createProduct = asyncHandler(async (req, res) => {
  const fields = pickEditable(req.body);
  fields.slug = slugify(fields.slug || fields.name);
  const product = await Product.create(fields);
  sendSuccess(res, product, 201);
});

/**
 * PUT /api/products/:id (admin) — partial updates are allowed
 */
export const updateProduct = asyncHandler(async (req, res) => {
  const fields = pickEditable(req.body);
  if (fields.slug !== undefined) fields.slug = slugify(fields.slug);

  const product = await Product.findByIdAndUpdate(req.params.id, { $set: fields }, {
    new: true,
    runValidators: true,
  });
  if (!product) throw new ApiError(404, 'Product not found.');
  sendSuccess(res, product);
});

/**
 * DELETE /api/products/:id (admin)
 */
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) throw new ApiError(404, 'Product not found.');
  sendSuccess(res, { id: req.params.id });
});
