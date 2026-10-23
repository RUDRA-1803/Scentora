import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Trash2, 
  Minus, 
  Plus, 
  ArrowRight, 
  ArrowLeft, 
  Tag, 
  ShieldCheck, 
  Sparkles,
  Truck
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import ProductImage from '../../components/common/ProductImage';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

export const CartPage = () => {
  const navigate = useNavigate();
  const {
    items,
    itemCount,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    discountAmount,
    coupon,
    applyCoupon,
    removeCoupon,
    shippingCharge,
    isFreeShipping,
    freeShippingThreshold,
    amountNeededForFreeShipping,
    taxEstimate,
    total,
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState(null);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    setCouponMessage(res);
  };

  if (items.length === 0) {
    return (
      <div className="py-20 text-center rounded-card bg-surface border border-themeBorder p-8 space-y-4 max-w-md mx-auto my-10 shadow-card">
        <div className="w-16 h-16 mx-auto rounded-full bg-hoverSubtle flex items-center justify-center text-accent">
          <ShoppingBag className="w-7 h-7" />
        </div>
        <h1 className="font-serif text-3xl font-semibold text-content-primary">
          Your Cart is Empty
        </h1>
        <p className="text-xs text-content-secondary leading-relaxed">
          You haven&rsquo;t added any fragrances to your shopping bag yet. Explore our artisanal extraits and discovery coffrets.
        </p>
        <div className="pt-3">
          <Link to="/products">
            <Button variant="primary" size="md">
              Explore Fragrance Collection
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const freeShippingPercent = Math.min(
    100,
    Math.round((subtotal / freeShippingThreshold) * 100)
  );

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 border-b border-themeBorder gap-3">
        <div>
          <span className="text-[11px] uppercase tracking-luxury text-accent font-semibold block mb-1">
            Shopping Bag
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-content-primary">
            Review Your Selection
          </h1>
          <p className="text-xs text-content-secondary mt-1">
            {itemCount} {itemCount === 1 ? 'creation' : 'creations'} in your order.
          </p>
        </div>

        <button
          type="button"
          onClick={clearCart}
          className="text-xs text-red-500 hover:underline flex items-center self-start sm:self-auto"
        >
          <Trash2 className="w-3.5 h-3.5 mr-1" />
          <span>Clear Shopping Bag</span>
        </button>
      </div>

      {/* Free Shipping Progress Indicator */}
      <div className="p-4 rounded-card bg-surface border border-themeBorder shadow-subtle space-y-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-1.5 text-content-primary font-medium">
            <Truck className="w-4 h-4 text-accent" />
            {isFreeShipping ? (
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                You have unlocked Complimentary Insured Delivery across India!
              </span>
            ) : (
              <span>
                Add{' '}
                <strong className="text-accent">
                  ₹{amountNeededForFreeShipping.toLocaleString('en-IN')}
                </strong>{' '}
                more to unlock Complimentary Pan-India Delivery.
              </span>
            )}
          </div>
          <span className="font-mono text-xs text-content-secondary font-semibold">
            {freeShippingPercent}%
          </span>
        </div>
        <div className="w-full bg-hoverSubtle rounded-full h-2 overflow-hidden">
          <div
            className="bg-brand-gold h-2 rounded-full transition-all duration-300"
            style={{ width: `${freeShippingPercent}%` }}
          />
        </div>
      </div>

      {/* Main Grid: Cart Items (8 cols) & Summary (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Items List (8 Columns) */}
        <div className="lg:col-span-8 space-y-4">
          {items.map(({ product, quantity }) => {
            const primaryImage = product.images?.[0] || '';
            const lineTotal = product.price * quantity;

            return (
              <div
                key={product.id}
                className="p-4 sm:p-5 rounded-card bg-surface border border-themeBorder shadow-subtle flex flex-col sm:flex-row gap-4 sm:items-center justify-between"
              >
                {/* Product Thumbnail & Details */}
                <div className="flex items-center space-x-4 min-w-0">
                  <Link
                    to={`/products/${product.id}`}
                    className="w-20 h-24 rounded-luxury overflow-hidden border border-themeBorder flex-shrink-0 bg-hoverSubtle"
                  >
                    <ProductImage src={primaryImage} alt={product.name} />
                  </Link>

                  <div className="min-w-0">
                    <span className="text-[10px] uppercase tracking-widest text-accent font-semibold block">
                      {product.brand}
                    </span>
                    <Link
                      to={`/products/${product.id}`}
                      className="font-serif text-base sm:text-lg font-semibold text-content-primary hover:text-accent transition-colors block truncate"
                    >
                      {product.name}
                    </Link>
                    <p className="text-xs text-content-secondary mt-0.5">
                      {product.concentration} {product.volume ? `• ${product.volume}ml` : ''}
                    </p>
                    <span className="text-xs text-content-secondary block mt-1">
                      Unit: ₹{product.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Quantity Stepper & Line Total */}
                <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-themeBorder/60">
                  <div className="flex items-center border border-themeBorder rounded-luxury bg-surface">
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="p-1.5 hover:bg-hoverSubtle text-content-secondary"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center font-mono text-xs font-semibold text-content-primary">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="p-1.5 hover:bg-hoverSubtle text-content-secondary"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="text-base font-bold text-content-primary block">
                      ₹{lineTotal.toLocaleString('en-IN')}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFromCart(product.id)}
                      className="text-[11px] text-red-500 hover:underline mt-0.5 inline-block"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="pt-2">
            <Link
              to="/products"
              className="inline-flex items-center text-xs text-content-secondary hover:text-accent font-medium space-x-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continue Shopping for Fragrances</span>
            </Link>
          </div>
        </div>

        {/* Order Summary Card (4 Columns) */}
        <div className="lg:col-span-4 rounded-card bg-surface border border-themeBorder p-6 shadow-card space-y-6 sticky top-28">
          <h2 className="font-serif text-xl font-semibold text-content-primary pb-3 border-b border-themeBorder">
            Order Summary
          </h2>

          {/* Promo Code Form */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-content-secondary block">
              Promo Privilege Code
            </label>
            {coupon ? (
              <div className="flex items-center justify-between p-2.5 rounded-luxury bg-emerald-500/10 border border-emerald-500/20 text-xs">
                <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
                  <Tag className="w-4 h-4" />
                  <span className="font-bold">{coupon.code} (10% OFF)</span>
                </div>
                <button
                  type="button"
                  onClick={removeCoupon}
                  className="text-[11px] text-red-500 hover:underline font-medium"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Try code SCENT10"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs rounded-luxury bg-hoverSubtle border border-themeBorder text-content-primary placeholder:text-content-secondary focus:outline-none focus:border-accent"
                />
                <Button type="submit" variant="secondary" size="sm">
                  Apply
                </Button>
              </form>
            )}
            {couponMessage && !coupon && (
              <p className="text-[11px] text-red-500">{couponMessage.message}</p>
            )}
          </div>

          {/* Breakdown List */}
          <div className="space-y-3 text-xs pt-3 border-t border-themeBorder">
            <div className="flex justify-between text-content-secondary">
              <span>Subtotal</span>
              <span className="font-semibold text-content-primary">
                ₹{subtotal.toLocaleString('en-IN')}
              </span>
            </div>

            {coupon && (
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                <span>Privilege Discount (10%)</span>
                <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="flex justify-between text-content-secondary">
              <span>Insured Pan-India Delivery</span>
              <span className="font-semibold text-content-primary">
                {shippingCharge === 0 ? (
                  <span className="text-emerald-600 dark:text-emerald-400">FREE</span>
                ) : (
                  `₹${shippingCharge.toLocaleString('en-IN')}`
                )}
              </span>
            </div>

            <div className="flex justify-between text-content-secondary">
              <span>Estimated 18% GST (Included)</span>
              <span className="font-mono">₹{taxEstimate.toLocaleString('en-IN')}</span>
            </div>

            <div className="pt-3 border-t border-themeBorder flex justify-between text-base font-bold text-content-primary">
              <span>Estimated Total (INR)</span>
              <span className="text-xl">₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Checkout CTA */}
          <div className="space-y-3 pt-2">
            <Link to="/checkout" className="block w-full">
              <Button variant="primary" size="lg" className="w-full flex items-center justify-center space-x-2">
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>

            <div className="p-3 rounded-luxury bg-hoverSubtle/50 text-[11px] text-content-secondary flex items-start space-x-2">
              <ShieldCheck className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              <span>
                Demonstration Order &bull; Secure packaging with tamper-evident seal and complimentary 2ml tester.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
