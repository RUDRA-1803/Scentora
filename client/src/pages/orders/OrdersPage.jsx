import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Calendar, Clock, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useOrders } from '../../context/OrderContext';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

export const OrdersPage = () => {
  const { orders } = useOrders();

  const getStatusBadge = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'delivered':
        return <Badge variant="success" size="sm">Delivered</Badge>;
      case 'shipped':
        return <Badge variant="gold" size="sm">Shipped &bull; In Transit</Badge>;
      case 'processing':
      default:
        return <Badge variant="default" size="sm">Atelier Processing</Badge>;
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="pb-4 border-b border-themeBorder flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <span className="text-[11px] uppercase tracking-luxury text-accent font-semibold block mb-1">
            Client History
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-content-primary">
            My Fragrance Orders
          </h1>
          <p className="text-xs text-content-secondary mt-1">
            Track, re-order, and review your previous olfactory acquisitions.
          </p>
        </div>

        <span className="text-xs text-content-secondary font-medium">
          {orders.length} {orders.length === 1 ? 'Order' : 'Orders'} Recorded
        </span>
      </div>

      {/* Orders List or Empty State */}
      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => {
            const formattedDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            });

            return (
              <div
                key={order.id}
                className="rounded-card bg-surface border border-themeBorder p-6 shadow-card space-y-5"
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-themeBorder">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-sm font-bold text-accent">
                      {order.id}
                    </span>
                    <span className="text-xs text-content-secondary flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1 text-content-secondary" />
                      {formattedDate}
                    </span>
                    {getStatusBadge(order.status)}
                  </div>

                  <div className="text-right sm:text-right">
                    <span className="text-xs text-content-secondary block">Order Total:</span>
                    <span className="font-bold text-base text-content-primary">
                      ₹{order.total?.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Items in Order */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-3 p-3 rounded-luxury bg-hoverSubtle/40 border border-themeBorder/60"
                    >
                      <div className="w-12 h-14 rounded-luxury overflow-hidden border border-themeBorder bg-surface flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="font-serif text-xs font-semibold text-content-primary block truncate">
                          {item.name}
                        </span>
                        <span className="text-[11px] text-content-secondary block">
                          {item.brand} &bull; Qty: {item.quantity}
                        </span>
                        <span className="text-xs font-bold text-content-primary">
                          ₹{item.price?.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Footer Actions */}
                <div className="pt-3 border-t border-themeBorder flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center space-x-2 text-content-secondary">
                    <Truck className="w-3.5 h-3.5 text-accent" />
                    <span>
                      Air Courier Tracking: <strong className="font-mono text-content-primary">{order.trackingNumber}</strong>
                    </span>
                  </div>

                  <Link to={`/order-success/${order.id}`}>
                    <Button variant="secondary" size="sm" className="flex items-center space-x-1">
                      <span>View Order Receipt</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-20 text-center rounded-card bg-surface border border-themeBorder p-8 space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto rounded-full bg-hoverSubtle flex items-center justify-center text-accent">
            <Package className="w-7 h-7" />
          </div>
          <h2 className="font-serif text-2xl font-semibold text-content-primary">
            No Orders on Record
          </h2>
          <p className="text-xs text-content-secondary">
            You haven’t completed any fragrance acquisitions yet. Begin by exploring our curated collections.
          </p>
          <div className="pt-2">
            <Link to="/products">
              <Button variant="primary" size="md">
                Browse Masterworks
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
