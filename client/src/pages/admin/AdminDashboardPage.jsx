import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  ShoppingBag, 
  TrendingUp, 
  AlertTriangle, 
  PlusCircle, 
  Boxes, 
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import { useProducts } from '../../context/ProductContext';
import { useOrders } from '../../context/OrderContext';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

export const AdminDashboardPage = () => {
  const { products } = useProducts();
  const { orders } = useOrders();

  // Compute metrics
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const lowStockItems = products.filter((p) => p.stock <= 10);

  // Status badge helper
  const getStatusBadge = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'delivered':
        return <Badge variant="success" size="sm">Delivered</Badge>;
      case 'shipped':
        return <Badge variant="gold" size="sm">Shipped</Badge>;
      case 'processing':
      default:
        return <Badge variant="default" size="sm">Processing</Badge>;
    }
  };

  return (
    <AdminLayout title="Atelier Executive Dashboard">
      <div className="space-y-8">
        {/* Metric Cards (4 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Total Products */}
          <div className="p-5 rounded-card bg-surface border border-themeBorder shadow-card flex items-center justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-content-secondary font-semibold block">
                Catalogue Size
              </span>
              <span className="font-serif text-2xl font-bold text-content-primary mt-1 block">
                {totalProducts} Masterworks
              </span>
              <span className="text-[11px] text-accent">Active in store</span>
            </div>
            <div className="p-3 rounded-luxury bg-hoverSubtle text-accent border border-themeBorder">
              <Package className="w-5 h-5" />
            </div>
          </div>

          {/* Total Orders */}
          <div className="p-5 rounded-card bg-surface border border-themeBorder shadow-card flex items-center justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-content-secondary font-semibold block">
                Total Orders
              </span>
              <span className="font-serif text-2xl font-bold text-content-primary mt-1 block">
                {totalOrders} Orders
              </span>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400">Customer orders</span>
            </div>
            <div className="p-3 rounded-luxury bg-hoverSubtle text-emerald-600 border border-themeBorder">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>

          {/* Revenue */}
          <div className="p-5 rounded-card bg-surface border border-themeBorder shadow-card flex items-center justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-content-secondary font-semibold block">
                Simulated Revenue
              </span>
              <span className="font-serif text-2xl font-bold text-content-primary mt-1 block">
                ₹{totalRevenue.toLocaleString('en-IN')}
              </span>
              <span className="text-[11px] text-content-secondary font-mono">INR Currency</span>
            </div>
            <div className="p-3 rounded-luxury bg-hoverSubtle text-accent border border-themeBorder">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>

          {/* Low Stock Warning */}
          <div className="p-5 rounded-card bg-surface border border-themeBorder shadow-card flex items-center justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-content-secondary font-semibold block">
                Low Stock Alerts
              </span>
              <span className="font-serif text-2xl font-bold text-content-primary mt-1 block">
                {lowStockItems.length} Products
              </span>
              <span className="text-[11px] text-amber-600 dark:text-amber-400">&le; 10 units remaining</span>
            </div>
            <div className="p-3 rounded-luxury bg-amber-500/10 text-amber-600 border border-amber-500/30">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Quick Action Bar */}
        <div className="p-4 rounded-card bg-surface border border-themeBorder shadow-subtle flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-xs text-content-secondary">
            <Sparkles className="w-4 h-4 text-accent" />
            <span>Fast administrative shortcuts for catalogue &amp; supply chain</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link to="/admin/products/new">
              <Button variant="primary" size="sm" className="flex items-center space-x-1.5">
                <PlusCircle className="w-4 h-4" />
                <span>Add Fragrance</span>
              </Button>
            </Link>

            <Link to="/admin/inventory">
              <Button variant="secondary" size="sm" className="flex items-center space-x-1.5">
                <Boxes className="w-4 h-4" />
                <span>Manage Stock</span>
              </Button>
            </Link>

            <Link to="/admin/orders">
              <Button variant="secondary" size="sm" className="flex items-center space-x-1.5">
                <ShoppingBag className="w-4 h-4" />
                <span>View Orders</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="rounded-card bg-surface border border-themeBorder p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-themeBorder">
            <h2 className="font-serif text-lg font-semibold text-content-primary">
              Recent Customer Orders
            </h2>
            <Link to="/admin/orders" className="text-xs text-accent hover:underline font-semibold flex items-center">
              View All Orders <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-themeBorder text-content-secondary uppercase tracking-wider">
                  <th className="py-2.5 px-3">Order ID</th>
                  <th className="py-2.5 px-3">Customer</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Items</th>
                  <th className="py-2.5 px-3">Total</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-themeBorder/60">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-hoverSubtle/40 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-accent">
                      {order.id}
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-semibold text-content-primary block">
                        {order.customer?.fullName}
                      </span>
                      <span className="text-[11px] text-content-secondary">
                        {order.customer?.city}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-content-secondary">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </td>
                    <td className="py-3 px-3">
                      {order.items?.length || 0} items
                    </td>
                    <td className="py-3 px-3 font-bold text-content-primary">
                      ₹{order.total?.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-3">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <Link
                        to="/admin/orders"
                        className="text-xs text-accent hover:underline font-medium"
                      >
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;
