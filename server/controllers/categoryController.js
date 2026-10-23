import Category from '../models/Category.js';
import { ApiError, asyncHandler, sendSuccess } from '../utils/apiError.js';

const EDITABLE_FIELDS = ['title', 'subtitle', 'description', 'image', 'tag'];

const pickEditable = (body) =>
  Object.fromEntries(EDITABLE_FIELDS.filter((f) => body[f] !== undefined).map((f) => [f, body[f]]));

/**
 * GET /api/categories
 */
export const listCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ createdAt: 1 });
  sendSuccess(res, categories);
});

/**
 * POST /api/categories (admin)
 */
export const createCategory = asyncHandler(async (req, res) => {
  const slug = String(req.body.slug || req.body.title || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  if (!slug) throw new ApiError(400, 'Category slug is required.');

  const category = await Category.create({ ...pickEditable(req.body), slug });
  sendSuccess(res, category, 201);
});

/**
 * PUT /api/categories/:id (admin) — the slug is immutable because it is the id
 */
export const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, { $set: pickEditable(req.body) }, {
    new: true,
    runValidators: true,
  });
  if (!category) throw new ApiError(404, 'Category not found.');
  sendSuccess(res, category);
});

/**
 * DELETE /api/categories/:id (admin)
 */
export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) throw new ApiError(404, 'Category not found.');
  sendSuccess(res, { id: req.params.id });
});
