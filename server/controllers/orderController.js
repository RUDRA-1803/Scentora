import Order, { ORDER_STATUSES } from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import { computeTotals, findCoupon } from '../utils/pricing.js';
import { ApiError, asyncHandler, sendSuccess } from '../utils/apiError.js';

const CUSTOMER_FIELDS = ['fullName', 'email', 'phone', 'address', 'city', 'state', 'postalCode'];

const randomDigits = (length) =>
  String(Math.floor(10 ** (length - 1) + Math.random() * 9 * 10 ** (length - 1)));

const generateOrderId = async () => {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const id = `SC-ORD-${randomDigits(5)}`;
    if (!(await Order.exists({ _id: id }))) return id;
  }
  return `SC-ORD-${Date.now().toString(36).toUpperCase()}`;
};

const releaseStock = (reserved) =>
  Promise.all(reserved.map(({ id, quantity }) => Product.updateOne({ _id: id }, { $inc: { stock: quantity } })));

/**
 * Atomically decrements stock for each line, rolling back earlier lines if one fails.
 * Returns the product documents as they were priced at purchase time.
 */
const reserveStock = async (lines) => {
  const reserved = [];
  const products = [];

  for (const { id, quantity } of lines) {
    const product = await Product.findOneAndUpdate(
      { _id: id, stock: { $gte: quantity } },
      { $inc: { stock: -quantity } },
      { new: true }
    );

    if (!product) {
      await releaseStock(reserved);
      const existing = await Product.findById(id);
      throw new ApiError(
        existing ? 409 : 404,
        existing
          ? `Only ${existing.stock} unit(s) of "${existing.name}" are in stock.`
          : `Product "${id}" is no longer available.`
      );
    }

    reserved.push({ id, quantity });
    products.push(product);
  }

  return { reserved, products };
};

/**
 * Collapses duplicate product ids and validates quantities.
 */
const normalizeLines = (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    throw new ApiError(400, 'Your cart is empty.');
  }

  const quantities = new Map();
  for (const item of items) {
    const quantity = Number(item?.quantity);
    if (!item?.id || !Number.isInteger(quantity) || quantity < 1) {
      throw new ApiError(400, 'Each order item needs a product id and a positive whole quantity.');
    }
    quantities.set(String(item.id), (quantities.get(String(item.id)) || 0) + quantity);
  }
  return [...quantities].map(([id, quantity]) => ({ id, quantity }));
};

const canView = (order, user) =>
  user?.role === 'admin' || !order.user || (user && String(order.user) === String(user._id));

/**
 * POST /api/orders — works for signed-in customers and guests.
 * Prices, discount and shipping are computed here, never trusted from the client.
 */
export const createOrder = asyncHandler(async (req, res) => {
  const { customer = {}, items, couponCode, paymentMethod, giftNote } = req.body;

  const missing = CUSTOMER_FIELDS.filter((f) => !String(customer[f] || '').trim());
  if (missing.length) throw new ApiError(400, `Missing delivery details: ${missing.join(', ')}.`);
  if (!paymentMethod) throw new ApiError(400, 'Payment method is required.');

  const coupon = couponCode ? findCoupon(couponCode) : null;
  if (couponCode && !coupon) throw new ApiError(400, 'Invalid or expired promo code.');

  const lines = normalizeLines(items);
  const { reserved, products } = await reserveStock(lines);

  try {
    const orderItems = products.map((product, index) => ({
      id: product._id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      quantity: lines[index].quantity,
      volume: product.volume,
      image: product.images?.[0] || '',
    }));

    const order = await Order.create({
      _id: await generateOrderId(),
      user: req.user?._id || null,
      customer: Object.fromEntries(CUSTOMER_FIELDS.map((f) => [f, customer[f]])),
      items: orderItems,
      ...computeTotals(orderItems, coupon),
      couponCode: coupon?.code || null,
      paymentMethod,
      giftNote: giftNote || '',
      trackingNumber: `SC-EXP-${randomDigits(6)}`,
    });

    if (req.user) await User.updateOne({ _id: req.user._id }, { $set: { cart: [] } });

    sendSuccess(res, order, 201);
  } catch (error) {
    await releaseStock(reserved);
    throw error;
  }
});

/**
 * GET /api/orders/mine
 */
export const listMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  sendSuccess(res, orders);
});

/**
 * GET /api/orders (admin)
 */
export const listAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  sendSuccess(res, orders);
});

/**
 * GET /api/orders/:id — owner, admin, or anyone holding a guest order's id
 */
export const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id.toUpperCase());
  if (!order || !canView(order, req.user)) throw new ApiError(404, 'Order not found.');
  sendSuccess(res, order);
});

/**
 * PATCH /api/orders/:id/status (admin)
 */
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  if (!ORDER_STATUSES.includes(status)) {
    throw new ApiError(400, `Status must be one of: ${ORDER_STATUSES.join(', ')}.`);
  }

  const order = await Order.findByIdAndUpdate(req.params.id, { $set: { status } }, { new: true });
  if (!order) throw new ApiError(404, 'Order not found.');
  sendSuccess(res, order);
});

/**
 * DELETE /api/orders/:id (admin)
 */
export const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order) throw new ApiError(404, 'Order not found.');
  sendSuccess(res, { id: req.params.id });
});
