import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  AlertCircle, 
  Lock, 
  ArrowLeft,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useOrders } from '../../context/OrderContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, subtotal, discountAmount, coupon, shippingCharge, total, clearCart } = useCart();
  const { createOrder } = useOrders();
  const { user } = useAuth();

  // Pre-fill form from authenticated user or sensible defaults
  const [formData, setFormData] = useState({
    fullName: user?.name || 'Aaditya Sharma',
    email: user?.email || 'aaditya.sharma@example.com',
    phone: user?.phone || '+91 98765 43210',
    street: user?.address?.street || '42 Marine Drive, Nariman Point',
    city: user?.address?.city || 'Mumbai',
    state: user?.address?.state || 'Maharashtra',
    postalCode: user?.address?.postalCode || '400021',
    paymentMethod: 'Cash on Delivery (Demo)',
    giftNote: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <div className="py-20 text-center rounded-card bg-surface border border-themeBorder p-8 max-w-md mx-auto my-10 space-y-4 shadow-card">
        <h2 className="font-serif text-2xl font-semibold text-content-primary">
          Your Shopping Bag is Empty
        </h2>
        <p className="text-xs text-content-secondary">
          Please add items to your cart before proceeding to checkout.
        </p>
        <Link to="/products">
          <Button variant="primary" size="md">
            Explore Fragrances
          </Button>
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required.';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = 'Valid Email Address is required.';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone Number is required for delivery updates.';
    if (!formData.street.trim()) newErrors.street = 'Delivery address is required.';
    if (!formData.city.trim()) newErrors.city = 'City is required.';
    if (!formData.state.trim()) newErrors.state = 'State is required.';
    if (!formData.postalCode.trim() || formData.postalCode.length < 6) {
      newErrors.postalCode = '6-digit PIN Code is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError('');

    // Build order object — the server re-prices items and re-checks stock
    const orderPayload = {
      customer: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.street,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
      },
      items: items.map((i) => ({
        id: i.product.id,
        quantity: i.quantity,
      })),
      couponCode: coupon?.code || null,
      paymentMethod: formData.paymentMethod,
      giftNote: formData.giftNote,
    };

    try {
      const createdOrder = await createOrder(orderPayload);
      navigate(`/order-success/${createdOrder.id}`);
      clearCart();
    } catch (error) {
      setSubmitError(error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Demo Disclaimer Banner */}
      <div className="p-4 rounded-card bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs flex items-start space-x-3">
        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold block">
            Demonstration Checkout
          </strong>
          <span>
            This is a simulated checkout interface for college project review. No real payment gateway or credit card charge will occur. Submitting saves your order to the Scentora server and reserves stock; signed-in customers can view it in their Orders history.
          </span>
        </div>
      </div>

      {/* Header */}
      <div className="pb-4 border-b border-themeBorder flex items-center justify-between">
        <div>
          <span className="text-[11px] uppercase tracking-luxury text-accent font-semibold block mb-1">
            Secure Atelier Checkout
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-content-primary">
            Shipping &amp; Order Finalization
          </h1>
        </div>
        <Link
          to="/cart"
          className="text-xs text-content-secondary hover:text-accent flex items-center"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          <span>Return to Bag</span>
        </Link>
      </div>

      {/* Checkout Grid */}
      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Input Details Form (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Section 1: Contact Information */}
          <div className="rounded-card bg-surface border border-themeBorder p-6 shadow-card space-y-4">
            <h2 className="font-serif text-xl font-semibold text-content-primary pb-3 border-b border-themeBorder">
              1. Recipient Information
            </h2>
            <div className="space-y-4">
              <Input
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                error={errors.fullName}
                placeholder="e.g. Aaditya Sharma"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Email Address (For Order Updates)"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  placeholder="aaditya@example.com"
                />
                <Input
                  label="Phone Number (SMS Tracking)"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Shipping Destination */}
          <div className="rounded-card bg-surface border border-themeBorder p-6 shadow-card space-y-4">
            <h2 className="font-serif text-xl font-semibold text-content-primary pb-3 border-b border-themeBorder">
              2. Delivery Address in India
            </h2>
            <div className="space-y-4">
              <Input
                label="Street Address / Residence / Landmark"
                name="street"
                value={formData.street}
                onChange={handleChange}
                error={errors.street}
                placeholder="Flat / House No., Apartment, Street"
              />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  error={errors.city}
                  placeholder="Mumbai"
                />
                <Input
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  error={errors.state}
                  placeholder="Maharashtra"
                />
                <Input
                  label="PIN Code"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  error={errors.postalCode}
                  placeholder="400021"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Payment Method Selection */}
          <div className="rounded-card bg-surface border border-themeBorder p-6 shadow-card space-y-4">
            <h2 className="font-serif text-xl font-semibold text-content-primary pb-3 border-b border-themeBorder">
              3. Payment Selection (Demo)
            </h2>
            <div className="space-y-3">
              {[
                {
                  id: 'Cash on Delivery (Demo)',
                  label: 'Cash on Delivery (COD Demo)',
                  desc: 'Pay safely upon doorstep physical delivery with tamper-evident seal.',
                },
                {
                  id: 'UPI / QR (Demo)',
                  label: 'UPI / Instant QR Payment (Demo)',
                  desc: 'Google Pay, PhonePe, Paytm, or BHIM UPI instant simulation.',
                },
                {
                  id: 'Credit / Debit Card (Demo)',
                  label: 'Credit or Debit Card (Demo)',
                  desc: 'Simulated Visa, Mastercard, or RuPay card processing.',
                },
              ].map((method) => (
                <label
                  key={method.id}
                  className={`
                    flex items-start space-x-3 p-4 rounded-luxury border cursor-pointer select-none transition-all
                    ${
                      formData.paymentMethod === method.id
                        ? 'border-accent bg-hoverSubtle/60 ring-1 ring-accent'
                        : 'border-themeBorder bg-surface hover:bg-hoverSubtle/30'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={formData.paymentMethod === method.id}
                    onChange={handleChange}
                    className="accent-[#D4AF72] mt-1"
                  />
                  <div>
                    <span className="text-sm font-semibold text-content-primary block">
                      {method.label}
                    </span>
                    <span className="text-xs text-content-secondary block mt-0.5">
                      {method.desc}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Order Summary Sidebar (5 cols) */}
        <div className="lg:col-span-5 space-y-6 sticky top-28">
          <div className="rounded-card bg-surface border border-themeBorder p-6 shadow-card space-y-6">
            <h2 className="font-serif text-xl font-semibold text-content-primary pb-3 border-b border-themeBorder">
              Items in Order ({items.length})
            </h2>

            {/* Items Mini List */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center space-x-3 text-xs">
                  <div className="w-12 h-14 rounded-luxury overflow-hidden border border-themeBorder bg-hoverSubtle flex-shrink-0">
                    <img
                      src={product.images?.[0] || ''}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-serif font-semibold text-content-primary block truncate">
                      {product.name}
                    </span>
                    <span className="text-content-secondary">
                      Qty: {quantity} &bull; ₹{product.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <span className="font-bold text-content-primary font-mono">
                    ₹{(product.price * quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2.5 text-xs pt-3 border-t border-themeBorder">
              <div className="flex justify-between text-content-secondary">
                <span>Subtotal</span>
                <span className="font-semibold text-content-primary">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                  <span>Privilege Discount</span>
                  <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-content-secondary">
                <span>Delivery (Insured Express)</span>
                <span className="font-semibold text-content-primary">
                  {shippingCharge === 0 ? (
                    <span className="text-emerald-600 dark:text-emerald-400">FREE</span>
                  ) : (
                    `₹${shippingCharge.toLocaleString('en-IN')}`
                  )}
                </span>
              </div>
              <div className="pt-3 border-t border-themeBorder flex justify-between text-base font-bold text-content-primary">
                <span>Total Amount Due (INR)</span>
                <span className="text-xl">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {submitError && (
              <div className="p-3 rounded-luxury bg-red-500/10 border border-red-500/20 text-xs text-red-500 font-medium">
                {submitError}
              </div>
            )}

            {/* Place Order CTA Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center space-x-2"
            >
              <Lock className="w-4 h-4" />
              <span>
                {isSubmitting ? 'Placing Demo Order...' : `Place Demo Order (₹${total.toLocaleString('en-IN')})`}
              </span>
            </Button>

            <div className="text-[11px] text-content-secondary text-center space-y-1">
              <p>🛡️ Dispatched with insured tamper-evident luxury seals.</p>
              <p>Includes complimentary 2ml matching sample.</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
