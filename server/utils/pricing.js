/**
 * Server-side pricing rules. These mirror the rules the client cart displays,
 * but the server's numbers are the ones saved on an order.
 */
export const COUPONS = {
  SCENT10: { code: 'SCENT10', discountPercent: 10 },
};

export const FREE_SHIPPING_THRESHOLD = 3000;
export const SHIPPING_CHARGE = 250;

export const findCoupon = (code) => COUPONS[(code || '').trim().toUpperCase()] || null;

/**
 * @param {{price: number, quantity: number}[]} items
 * @param {{discountPercent: number} | null} coupon
 */
export const computeTotals = (items, coupon) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = coupon ? Math.round((subtotal * coupon.discountPercent) / 100) : 0;
  const shipping = subtotal > 0 && subtotal < FREE_SHIPPING_THRESHOLD ? SHIPPING_CHARGE : 0;
  const total = Math.max(0, subtotal - discount + shipping);
  return { subtotal, discount, shipping, total };
};
