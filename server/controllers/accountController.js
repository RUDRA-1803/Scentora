import User from '../models/User.js';
import Product from '../models/Product.js';
import { ApiError, asyncHandler, sendSuccess } from '../utils/apiError.js';

const PROFILE_FIELDS = ['name', 'email', 'phone', 'address', 'preferences'];

/**
 * PUT /api/account/profile
 */
export const updateProfile = asyncHandler(async (req, res) => {
  const updates = Object.fromEntries(
    PROFILE_FIELDS.filter((f) => req.body[f] !== undefined).map((f) => [f, req.body[f]])
  );

  if (updates.email) {
    const email = String(updates.email).toLowerCase().trim();
    if (await User.exists({ email, _id: { $ne: req.user._id } })) {
      throw new ApiError(409, 'Another account already uses this email address.');
    }
  }

  req.user.set(updates);
  await req.user.save();
  sendSuccess(res, req.user.toJSON());
});

const loadCart = async (userId) => {
  const user = await User.findById(userId).populate('cart.product');
  // Drop lines whose product was deleted from the catalogue
  return user.cart
    .filter((line) => line.product)
    .map((line) => ({ product: line.product.toJSON(), quantity: line.quantity }));
};

const loadWishlist = async (userId) => {
  const user = await User.findById(userId).populate('wishlist');
  return user.wishlist.filter(Boolean).map((product) => product.toJSON());
};

/**
 * Keeps only ids that exist in the catalogue.
 */
const existingProductIds = async (ids) => {
  const found = await Product.find({ _id: { $in: ids } }).select('_id');
  return new Set(found.map((p) => p._id));
};

/**
 * GET /api/account/cart
 */
export const getCart = asyncHandler(async (req, res) => {
  sendSuccess(res, await loadCart(req.user._id));
});

/**
 * PUT /api/account/cart — replaces the cart. Body: { items: [{ productId, quantity }] }
 */
export const replaceCart = asyncHandler(async (req, res) => {
  const items = Array.isArray(req.body.items) ? req.body.items : [];
  const valid = await existingProductIds(items.map((i) => String(i.productId)));

  const quantities = new Map();
  for (const { productId, quantity } of items) {
    const id = String(productId);
    const qty = Math.max(1, Math.floor(Number(quantity)) || 1);
    if (valid.has(id)) quantities.set(id, (quantities.get(id) || 0) + qty);
  }

  await User.updateOne(
    { _id: req.user._id },
    { $set: { cart: [...quantities].map(([product, quantity]) => ({ product, quantity })) } }
  );
  sendSuccess(res, await loadCart(req.user._id));
});

/**
 * GET /api/account/wishlist
 */
export const getWishlist = asyncHandler(async (req, res) => {
  sendSuccess(res, await loadWishlist(req.user._id));
});

/**
 * PUT /api/account/wishlist — replaces the wishlist. Body: { productIds: [] }
 */
export const replaceWishlist = asyncHandler(async (req, res) => {
  const ids = [...new Set((Array.isArray(req.body.productIds) ? req.body.productIds : []).map(String))];
  const valid = await existingProductIds(ids);

  await User.updateOne({ _id: req.user._id }, { $set: { wishlist: ids.filter((id) => valid.has(id)) } });
  sendSuccess(res, await loadWishlist(req.user._id));
});
