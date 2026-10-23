import React, { useState, useEffect } from 'react';
import { Users, Search, Mail, Phone, MapPin, Calendar, Award } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import Badge from '../../components/common/Badge';
import { adminApi } from '../../services/scentoraApi';

export const AdminCustomersPage = () => {
  const [search, setSearch] = useState('');

  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    adminApi
      .customers()
      .then(setCustomers)
      .catch((error) => setLoadError(error.message))
      .finally(() => setIsLoading(false));
  }, []);

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout title="Client Connoisseur Registry">
      <div className="space-y-6">
        {loadError && (
          <div className="p-3.5 rounded-luxury bg-red-500/10 border border-red-500/20 text-xs text-red-500 font-medium">
            {loadError}
          </div>
        )}

        {/* Top bar */}
        <div className="p-4 rounded-card bg-surface border border-themeBorder shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-content-secondary" />
            <input
              type="text"
              placeholder="Search patron name, email, or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-luxury bg-hoverSubtle border border-themeBorder text-content-primary placeholder:text-content-secondary focus:outline-none focus:border-accent"
            />
          </div>

          <span className="text-xs text-content-secondary font-medium">
            {isLoading ? 'Loading patrons…' : `${filtered.length} Patrons Registered`}
          </span>
        </div>

        {/* Table */}
        <div className="rounded-card bg-surface border border-themeBorder shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-themeBorder bg-hoverSubtle/40 text-content-secondary uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Patron Name</th>
                  <th className="py-3 px-3">Contact Email &amp; Phone</th>
                  <th className="py-3 px-3">Location</th>
                  <th className="py-3 px-3">Member Tier</th>
                  <th className="py-3 px-3">Orders</th>
                  <th className="py-3 px-4 text-right">Lifetime Spend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-themeBorder/60">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-hoverSubtle/30 transition-colors">
                    <td className="py-3 px-4 font-semibold text-content-primary">
                      {c.name}
                    </td>
                    <td className="py-3 px-3">
                      <span className="block text-content-primary">{c.email}</span>
                      <span className="text-[11px] text-content-secondary">{c.phone}</span>
                    </td>
                    <td className="py-3 px-3 text-content-secondary">
                      {c.city}, {c.state}
                    </td>
                    <td className="py-3 px-3">
                      <Badge variant="gold" size="sm">
                        {c.tier}
                      </Badge>
                    </td>
                    <td className="py-3 px-3 font-semibold text-content-primary">
                      {c.ordersCount} Orders
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-sm text-content-primary">
                      ₹{c.totalSpend.toLocaleString('en-IN')}
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

export default AdminCustomersPage;
