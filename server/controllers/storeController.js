import Inquiry from '../models/Inquiry.js';
import Subscriber from '../models/Subscriber.js';
import { findCoupon } from '../utils/pricing.js';
import { ApiError, asyncHandler, sendSuccess } from '../utils/apiError.js';

/**
 * POST /api/coupons/validate — Body: { code }
 */
export const validateCoupon = (req, res, next) => {
  const coupon = findCoupon(req.body.code);
  if (!coupon) return next(new ApiError(400, 'Invalid or expired promo code. Try SCENT10.'));
  sendSuccess(res, coupon);
};

/**
 * POST /api/contact
 */
export const submitInquiry = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;
  const inquiry = await Inquiry.create({ name, email, subject, message });
  sendSuccess(res, { id: inquiry.id }, 201);
});

/**
 * POST /api/newsletter — idempotent: subscribing twice is not an error
 */
export const subscribeNewsletter = asyncHandler(async (req, res) => {
  const email = String(req.body.email || '').toLowerCase().trim();
  if (!/^\S+@\S+\.\S+$/.test(email)) throw new ApiError(400, 'Please provide a valid email address.');

  await Subscriber.updateOne({ email }, { $setOnInsert: { email } }, { upsert: true });
  sendSuccess(res, { email }, 201);
});
