import React, { useState } from 'react';
import { ShoppingBag, Search, Calendar, Check, AlertCircle } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import { useOrders } from '../../context/OrderContext';
import Badge from '../../components/common/Badge';

export const AdminOrdersPage = () => {
  const { orders, updateOrderStatus } = useOrders();
  const [filterStatus, setFilterStatus] = useState('All');
  const [search, setSearch] = useState('');
  const [notification, setNotification] = useState('');
  const [actionError, setActionError] = useState('');

  const filteredOrders = orders.filter((o) => {
    const matchesStatus =
      filterStatus === 'All' || o.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer?.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      o.customer?.email?.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = async (orderId, newStatus) => {
    setActionError('');
    try {
      await updateOrderStatus(orderId, newStatus);
      setNotification(`Order ${orderId} updated to status "${newStatus}".`);
      setTimeout(() => setNotification(''), 3000);
    } catch (error) {
      setActionError(error.message);
    }
  };

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
    <AdminLayout title="Order Processing &amp; Fulfillment">
      <div className="space-y-6">
        {actionError && (
          <div className="p-3.5 rounded-luxury bg-red-500/10 border border-red-500/20 text-xs text-red-500 font-medium">
            {actionError}
          </div>
        )}
        {notification && (
          <div className="p-3.5 rounded-luxury bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            {notification}
          </div>
        )}

        {/* Action Bar */}
        <div className="p-4 rounded-card bg-surface border border-themeBorder shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-1 flex-col sm:flex-row gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-content-secondary" />
              <input
                type="text"
                placeholder="Search order ID or customer name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-luxury bg-hoverSubtle border border-themeBorder text-content-primary placeholder:text-content-secondary focus:outline-none focus:border-accent"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="text-xs px-3 py-2 rounded-luxury bg-hoverSubtle border border-themeBorder text-content-primary focus:outline-none focus:border-accent"
            >
              <option value="All">All Order Statuses</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>

          <span className="text-xs text-content-secondary font-medium">
            {filteredOrders.length} {filteredOrders.length === 1 ? 'Order' : 'Orders'} Found
          </span>
        </div>

        {/* Orders Table */}
        <div className="rounded-card bg-surface border border-themeBorder shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-themeBorder bg-hoverSubtle/40 text-content-secondary uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Order Details</th>
                  <th className="py-3 px-3">Customer</th>
                  <th className="py-3 px-3">Items Summary</th>
                  <th className="py-3 px-3">Payment</th>
                  <th className="py-3 px-3">Total Amount</th>
                  <th className="py-3 px-4 text-right">Fulfillment Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-themeBorder/60">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-hoverSubtle/30 transition-colors">
                    {/* Order ID & Date */}
                    <td className="py-3 px-4">
                      <span className="font-mono font-bold text-accent text-sm block">
                        {order.id}
                      </span>
                      <span className="text-[11px] text-content-secondary">
                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </td>

                    {/* Customer */}
                    <td className="py-3 px-3">
                      <span className="font-semibold text-content-primary block">
                        {order.customer?.fullName}
                      </span>
                      <span className="text-[11px] text-content-secondary block">
                        {order.customer?.phone}
                      </span>
                      <span className="text-[11px] text-content-secondary">
                        {order.customer?.city}, {order.customer?.state}
                      </span>
                    </td>

                    {/* Items */}
                    <td className="py-3 px-3 max-w-xs">
                      <span className="font-semibold text-content-primary block">
                        {order.items?.length || 0} Products
                      </span>
                      <span className="text-[11px] text-content-secondary truncate block">
                        {order.items?.map((i) => i.name).join(', ')}
                      </span>
                    </td>

                    {/* Payment */}
                    <td className="py-3 px-3">
                      <span className="text-[11px] font-medium text-content-primary block">
                        {order.paymentMethod}
                      </span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400">
                        Paid / Verified (Demo)
                      </span>
                    </td>

                    {/* Total */}
                    <td className="py-3 px-3 font-bold text-sm text-content-primary">
                      ₹{order.total?.toLocaleString('en-IN')}
                    </td>

                    {/* Status Changer */}
                    <td className="py-3 px-4 text-right">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="text-xs px-2.5 py-1.5 rounded-luxury bg-surface border border-themeBorder text-content-primary focus:outline-none focus:border-accent font-medium"
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
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

export default AdminOrdersPage;
