import User from '../models/User.js';
import Order from '../models/Order.js';
import Inquiry from '../models/Inquiry.js';
import { seedCatalogue } from '../seed/seeder.js';
import { asyncHandler, sendSuccess } from '../utils/apiError.js';

const tierFor = (totalSpend) => {
  if (totalSpend >= 30000) return 'Gold Patron';
  if (totalSpend >= 15000) return 'Silver Patron';
  return 'Member';
};

/**
 * GET /api/admin/customers — registered customers with order totals
 */
export const listCustomers = asyncHandler(async (req, res) => {
  const [customers, orderStats] = await Promise.all([
    User.find({ role: 'customer' }).sort({ createdAt: -1 }),
    Order.aggregate([
      { $match: { user: { $ne: null } } },
      { $group: { _id: '$user', ordersCount: { $sum: 1 }, totalSpend: { $sum: '$total' } } },
    ]),
  ]);

  const statsByUser = new Map(orderStats.map((s) => [String(s._id), s]));

  sendSuccess(
    res,
    customers.map((user) => {
      const stats = statsByUser.get(String(user._id)) || { ordersCount: 0, totalSpend: 0 };
      return {
        id: String(user._id),
        name: user.name,
        email: user.email,
        phone: user.phone,
        city: user.address?.city || '',
        state: user.address?.state || '',
        registeredAt: user.createdAt,
        ordersCount: stats.ordersCount,
        totalSpend: stats.totalSpend,
        tier: tierFor(stats.totalSpend),
      };
    })
  );
});

/**
 * GET /api/admin/inquiries — contact-form submissions
 */
export const listInquiries = asyncHandler(async (req, res) => {
  sendSuccess(res, await Inquiry.find().sort({ createdAt: -1 }));
});

/**
 * POST /api/admin/reset-catalogue — restores products and categories to the seed data
 */
export const resetCatalogue = asyncHandler(async (req, res) => {
  sendSuccess(res, await seedCatalogue({ reset: true }));
});
