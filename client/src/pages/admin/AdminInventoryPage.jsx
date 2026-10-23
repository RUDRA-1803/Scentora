import React, { useState } from 'react';
import { Boxes, AlertTriangle, Search, Plus, Minus, Check } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import { useProducts } from '../../context/ProductContext';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

export const AdminInventoryPage = () => {
  const { products, updateProduct } = useProducts();
  const [search, setSearch] = useState('');
  const [onlyLowStock, setOnlyLowStock] = useState(false);
  const [updatedNotification, setUpdatedNotification] = useState('');
  const [actionError, setActionError] = useState('');

  // updateProduct applies the change immediately and reverts it if the server rejects it
  const saveStock = (product, stock) =>
    updateProduct(product.id, { stock }).catch((error) =>
      setActionError(`Could not update "${product.name}": ${error.message}`)
    );

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase());
    const matchesLowStock = onlyLowStock ? p.stock <= 10 : true;
    return matchesSearch && matchesLowStock;
  });

  const handleAdjustStock = (product, delta) => {
    const newStock = Math.max(0, (product.stock || 0) + delta);
    setActionError('');
    saveStock(product, newStock);
    setUpdatedNotification(`Updated stock for "${product.name}" to ${newStock} units.`);
    setTimeout(() => setUpdatedNotification(''), 2500);
  };

  const handleSetStock = (product, value) => {
    const num = Math.max(0, parseInt(value, 10) || 0);
    saveStock(product, num);
  };

  return (
    <AdminLayout title="Atelier Inventory &amp; Stock Levels">
      <div className="space-y-6">
        {actionError && (
          <div className="p-3.5 rounded-luxury bg-red-500/10 border border-red-500/20 text-xs text-red-500 font-medium">
            {actionError}
          </div>
        )}
        {updatedNotification && (
          <div className="p-3.5 rounded-luxury bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            {updatedNotification}
          </div>
        )}

        {/* Action Header */}
        <div className="p-4 rounded-card bg-surface border border-themeBorder shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-1 flex-col sm:flex-row gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-content-secondary" />
              <input
                type="text"
                placeholder="Search fragrance to adjust stock..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-luxury bg-hoverSubtle border border-themeBorder text-content-primary placeholder:text-content-secondary focus:outline-none focus:border-accent"
              />
            </div>

            <label className="flex items-center space-x-2 text-xs text-content-primary font-medium cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyLowStock}
                onChange={(e) => setOnlyLowStock(e.target.checked)}
                className="accent-[#D4AF72]"
              />
              <span className="flex items-center space-x-1 text-amber-600 dark:text-amber-400">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Show Only Low Stock (&le; 10 units)</span>
              </span>
            </label>
          </div>

          <span className="text-xs text-content-secondary font-medium">
            {filteredProducts.length} Items Displayed
          </span>
        </div>

        {/* Inventory Table */}
        <div className="rounded-card bg-surface border border-themeBorder shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-themeBorder bg-hoverSubtle/40 text-content-secondary uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Fragrance Formulation</th>
                  <th className="py-3 px-3">Price (INR)</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Current Stock</th>
                  <th className="py-3 px-4 text-right">Quick Stock Adjustment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-themeBorder/60">
                {filteredProducts.map((p) => {
                  const isLow = p.stock <= 10;
                  const isOut = p.stock === 0;

                  return (
                    <tr key={p.id} className="hover:bg-hoverSubtle/30 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-12 rounded-luxury overflow-hidden border border-themeBorder bg-hoverSubtle flex-shrink-0">
                            <img
                              src={p.images?.[0] || ''}
                              alt={p.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-accent font-semibold block">
                              {p.brand}
                            </span>
                            <span className="font-serif text-sm font-semibold text-content-primary block">
                              {p.name}
                            </span>
                            <span className="text-[11px] text-content-secondary">
                              {p.concentration} &bull; {p.volume}ml
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-3 font-bold text-content-primary">
                        ₹{p.price.toLocaleString('en-IN')}
                      </td>

                      <td className="py-3 px-3">
                        {isOut ? (
                          <Badge variant="default" size="sm" className="bg-red-500/10 text-red-500 border-red-500/20">
                            Out of Stock
                          </Badge>
                        ) : isLow ? (
                          <Badge variant="outline" size="sm" className="text-amber-600 border-amber-500/30">
                            Low Supply ({p.stock})
                          </Badge>
                        ) : (
                          <Badge variant="success" size="sm">
                            Ample ({p.stock})
                          </Badge>
                        )}
                      </td>

                      <td className="py-3 px-3">
                        <input
                          type="number"
                          min="0"
                          value={p.stock}
                          onChange={(e) => handleSetStock(p, e.target.value)}
                          className="w-16 px-2 py-1 rounded text-center text-xs font-mono font-bold bg-hoverSubtle border border-themeBorder text-content-primary focus:outline-none focus:border-accent"
                        />
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          <button
                            type="button"
                            onClick={() => handleAdjustStock(p, -5)}
                            disabled={p.stock < 5}
                            className="px-2 py-1 rounded-luxury border border-themeBorder bg-surface text-content-secondary hover:bg-hoverSubtle disabled:opacity-30 text-[11px]"
                            title="Decrease 5"
                          >
                            -5
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAdjustStock(p, -1)}
                            disabled={p.stock <= 0}
                            className="p-1 rounded-luxury border border-themeBorder bg-surface text-content-secondary hover:bg-hoverSubtle disabled:opacity-30"
                            title="Decrease 1"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAdjustStock(p, 1)}
                            className="p-1 rounded-luxury border border-themeBorder bg-surface text-content-secondary hover:bg-hoverSubtle"
                            title="Increase 1"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAdjustStock(p, 5)}
                            className="px-2 py-1 rounded-luxury border border-themeBorder bg-surface text-content-secondary hover:bg-hoverSubtle text-[11px]"
                            title="Increase 5"
                          >
                            +5
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminInventoryPage;
