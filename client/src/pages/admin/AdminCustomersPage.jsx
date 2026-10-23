import React, { useState } from 'react';
import { Users, Search, Mail, Phone, MapPin, Calendar, Award } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import Badge from '../../components/common/Badge';

export const AdminCustomersPage = () => {
  const [search, setSearch] = useState('');

  const sampleCustomers = [
    {
      id: 'cust-01',
      name: 'Aaditya Sharma',
      email: 'aaditya.sharma@example.com',
      phone: '+91 98765 43210',
      city: 'Mumbai',
      state: 'Maharashtra',
      registeredAt: '2026-01-15',
      ordersCount: 4,
      totalSpend: 36800,
      tier: 'Gold Patron',
    },
    {
      id: 'cust-02',
      name: 'Natasha Singhal',
      email: 'natasha.s@example.com',
      phone: '+91 98112 34567',
      city: 'New Delhi',
      state: 'Delhi',
      registeredAt: '2026-02-01',
      ordersCount: 3,
      totalSpend: 24200,
      tier: 'Silver Patron',
    },
    {
      id: 'cust-03',
      name: 'Vikramaditya Roy',
      email: 'vikram.roy@example.com',
      phone: '+91 97412 88990',
      city: 'Bengaluru',
      state: 'Karnataka',
      registeredAt: '2026-02-18',
      ordersCount: 2,
      totalSpend: 21700,
      tier: 'Silver Patron',
    },
    {
      id: 'cust-04',
      name: 'Meera Chawla',
      email: 'meera.chawla@example.com',
      phone: '+91 94220 11223',
      city: 'Pune',
      state: 'Maharashtra',
      registeredAt: '2026-03-01',
      ordersCount: 1,
      totalSpend: 8499,
      tier: 'Member',
    },
  ];

  const filtered = sampleCustomers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout title="Client Connoisseur Registry">
      <div className="space-y-6">
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
            {filtered.length} Patrons Registered
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
