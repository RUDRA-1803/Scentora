import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Package, 
  Truck, 
  ArrowRight, 
  ShoppingBag, 
  ShieldCheck,
  Calendar,
  MapPin
} from 'lucide-react';
import { useOrders } from '../../context/OrderContext';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

export const OrderSuccessPage = () => {
  const { id } = useParams();
  const { getOrderById, fetchOrderById } = useOrders();

  const cachedOrder = getOrderById(id);
  const [fetchedOrder, setFetchedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(!cachedOrder);

  // Deep link or page refresh: the order is not in memory, so ask the server
  useEffect(() => {
    if (cachedOrder) return undefined;
    let cancelled = false;
    setIsLoading(true);
    fetchOrderById(id)
      .then((order) => !cancelled && setFetchedOrder(order))
      .catch(() => !cancelled && setFetchedOrder(null))
      .finally(() => !cancelled && setIsLoading(false));
    return () => {
      cancelled = true;
    };
  }, [id, cachedOrder]);

  const order = cachedOrder || fetchedOrder;

  if (isLoading && !order) {
    return (
      <div className="py-20 text-center text-xs uppercase tracking-luxury text-content-secondary">
        Retrieving your order…
      </div>
    );
  }

  if (!order) {
    return (
      <div className="py-20 text-center rounded-card bg-surface border border-themeBorder p-8 max-w-md mx-auto my-10 space-y-4 shadow-card">
        <h2 className="font-serif text-2xl font-semibold text-content-primary">
          Order Record Not Found
        </h2>
        <p className="text-xs text-content-secondary">
          No order matching &ldquo;{id}&rdquo; was found for your account.
        </p>
        <Link to="/products">
          <Button variant="primary" size="md">
            Explore Fragrances
          </Button>
        </Link>
      </div>
    );
  }

  const steps = [
    { label: 'Order Placed', desc: 'Received & verified', completed: true },
    { label: 'Atelier Preparation', desc: 'Batch inspection & bottling', completed: true },
    { label: 'Express Dispatch', desc: 'Insured air courier', completed: false },
    { label: 'Doorstep Delivery', desc: 'Complimentary unwrapping', completed: false },
  ];

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      {/* Confirmation Hero Card */}
      <div className="p-8 sm:p-12 rounded-card bg-surface border border-themeBorder shadow-card text-center space-y-5">
        <div className="w-16 h-16 rounded-full bg-brand-gold/20 text-accent flex items-center justify-center mx-auto border border-brand-gold/40 shadow-subtle">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <Badge variant="gold" size="sm">
            Order Confirmed
          </Badge>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-content-primary">
            Thank You for Your Patronage
          </h1>
          <p className="text-xs sm:text-sm text-content-secondary max-w-lg mx-auto leading-relaxed">
            Your fragrance selection has been received by our atelier. A confirmation summary has been registered under your order ID.
          </p>
        </div>

        {/* Order Identifier Pill */}
        <div className="inline-flex items-center space-x-3 px-5 py-2.5 rounded-luxury bg-hoverSubtle border border-themeBorder text-xs">
          <span className="text-content-secondary font-medium">Order Number:</span>
          <span className="font-mono font-bold text-accent text-sm tracking-wider">
            {order.id}
          </span>
          <span className="text-themeBorder">|</span>
          <span className="text-content-secondary">
            Tracking: <strong className="font-mono text-content-primary">{order.trackingNumber}</strong>
          </span>
        </div>
      </div>

      {/* Order Progress Timeline */}
      <div className="p-6 rounded-card bg-surface border border-themeBorder shadow-subtle space-y-4">
        <h3 className="font-serif text-base font-semibold text-content-primary pb-3 border-b border-themeBorder">
          Fulfillment Timeline
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {steps.map((step, idx) => (
            <div
              key={step.label}
              className={`p-3 rounded-luxury border text-xs space-y-1 ${
                step.completed
                  ? 'border-accent bg-brand-gold/10 text-content-primary'
                  : 'border-themeBorder bg-hoverSubtle/30 text-content-secondary'
              }`}
            >
              <div className="flex items-center space-x-1.5 font-bold">
                <span className="w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center">
                  {idx + 1}
                </span>
                <span>{step.label}</span>
              </div>
              <p className="text-[11px] text-content-secondary">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Details Grid: Summary & Shipping */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Purchased Items */}
        <div className="p-6 rounded-card bg-surface border border-themeBorder shadow-subtle space-y-4">
          <h3 className="font-serif text-base font-semibold text-content-primary pb-2 border-b border-themeBorder">
            Creations in Order ({order.items.length})
          </h3>
          <div className="space-y-3">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-3 text-xs">
                <div className="w-12 h-14 rounded-luxury overflow-hidden border border-themeBorder bg-hoverSubtle flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-serif font-semibold text-content-primary block truncate">
                    {item.name}
                  </span>
                  <span className="text-content-secondary">
                    {item.brand} &bull; Qty: {item.quantity}
                  </span>
                </div>
                <span className="font-mono font-bold text-content-primary">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-themeBorder space-y-1.5 text-xs text-content-secondary">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-semibold text-content-primary">
                ₹{order.subtotal?.toLocaleString('en-IN')}
              </span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Discount:</span>
                <span>- ₹{order.discount?.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery:</span>
              <span>{order.shipping === 0 ? 'FREE' : `₹${order.shipping}`}</span>
            </div>
            <div className="pt-2 border-t border-themeBorder flex justify-between text-sm font-bold text-content-primary">
              <span>Total Paid:</span>
              <span className="text-base text-accent">
                ₹{order.total?.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Shipping & Payment Destination */}
        <div className="p-6 rounded-card bg-surface border border-themeBorder shadow-subtle space-y-4">
          <h3 className="font-serif text-base font-semibold text-content-primary pb-2 border-b border-themeBorder">
            Delivery &amp; Payment Details
          </h3>
          <div className="space-y-3 text-xs">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-content-secondary block">
                Recipient
              </span>
              <span className="font-semibold text-content-primary">
                {order.customer.fullName}
              </span>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-wider text-content-secondary block">
                Destination Address
              </span>
              <p className="text-content-primary leading-relaxed">
                {order.customer.address}, {order.customer.city},{' '}
                {order.customer.state} — {order.customer.postalCode}
              </p>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-wider text-content-secondary block">
                Contact Phone &amp; Email
              </span>
              <p className="text-content-primary">
                {order.customer.phone} &bull; {order.customer.email}
              </p>
            </div>

            <div className="pt-2 border-t border-themeBorder">
              <span className="text-[10px] uppercase tracking-wider text-content-secondary block">
                Payment Method
              </span>
              <span className="font-semibold text-content-primary">
                {order.paymentMethod}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Next Actions Navigation */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
        <Link to="/orders">
          <Button variant="primary" size="md" className="flex items-center space-x-2">
            <Package className="w-4 h-4" />
            <span>View All My Orders</span>
          </Button>
        </Link>
        <Link to="/products">
          <Button variant="secondary" size="md" className="flex items-center space-x-2">
            <span>Continue Exploring Scentora</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
