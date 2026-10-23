import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  PlusCircle, 
  Search, 
  Edit, 
  Trash2, 
  RotateCcw, 
  Sparkles, 
  AlertTriangle,
  ExternalLink
} from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import { useProducts } from '../../context/ProductContext';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

export const AdminProductsPage = () => {
  const { products, deleteProduct, resetToSeedData } = useProducts();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [productToDelete, setProductToDelete] = useState(null);
  const [notification, setNotification] = useState('');

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.fragranceFamily.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' ||
        p.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const confirmDelete = (product) => {
    setProductToDelete(product);
  };

  const executeDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id);
      setNotification(`Deleted "${productToDelete.name}" from catalogue.`);
      setProductToDelete(null);
      setTimeout(() => setNotification(''), 3000);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset catalogue back to initial 18 seed fragrances?')) {
      resetToSeedData();
      setNotification('Catalogue restored to initial seed dataset.');
      setTimeout(() => setNotification(''), 3000);
    }
  };

  return (
    <AdminLayout title="Fragrance Catalogue Management">
      <div className="space-y-6">
        {notification && (
          <div className="p-3.5 rounded-luxury bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            {notification}
          </div>
        )}

        {/* Action Header & Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-card bg-surface border border-themeBorder shadow-subtle">
          <div className="flex flex-1 flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-content-secondary" />
              <input
                type="text"
                placeholder="Search by name, brand, or family..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-luxury bg-hoverSubtle border border-themeBorder text-content-primary placeholder:text-content-secondary focus:outline-none focus:border-accent"
              />
            </div>

            {/* Category Select */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs px-3 py-2 rounded-luxury bg-hoverSubtle border border-themeBorder text-content-primary focus:outline-none focus:border-accent"
            >
              <option value="All">All Categories</option>
              <option value="perfumes">Perfumes</option>
              <option value="gift-sets">Gift Sets</option>
            </select>
          </div>

          <div className="flex items-center space-x-2.5">
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-2 text-xs rounded-luxury border border-themeBorder text-content-secondary hover:text-content-primary hover:bg-hoverSubtle flex items-center space-x-1"
              title="Reset products to default"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Reset Seed Data</span>
            </button>

            <Link to="/admin/products/new">
              <Button variant="primary" size="sm" className="flex items-center space-x-1.5">
                <PlusCircle className="w-4 h-4" />
                <span>Add New Fragrance</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Products Table */}
        <div className="rounded-card bg-surface border border-themeBorder shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-themeBorder bg-hoverSubtle/40 text-content-secondary uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Fragrance</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Price (INR)</th>
                  <th className="py-3 px-3">Stock Level</th>
                  <th className="py-3 px-3">Flags</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-themeBorder/60">
                {filteredProducts.map((p) => {
                  const isLowStock = p.stock <= 10;
                  const isOutOfStock = p.stock === 0;

                  return (
                    <tr key={p.id} className="hover:bg-hoverSubtle/30 transition-colors">
                      {/* Name & Thumbnail */}
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
                              {p.concentration} {p.volume ? `• ${p.volume}ml` : ''}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category & Audience */}
                      <td className="py-3 px-3">
                        <span className="capitalize font-medium text-content-primary block">
                          {p.category}
                        </span>
                        <span className="text-[11px] text-content-secondary">
                          {p.audience}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-3 px-3 font-bold text-content-primary">
                        ₹{p.price.toLocaleString('en-IN')}
                      </td>

                      {/* Stock */}
                      <td className="py-3 px-3">
                        {isOutOfStock ? (
                          <Badge variant="default" size="sm" className="bg-red-500/10 text-red-500 border-red-500/20">
                            Out of Stock (0)
                          </Badge>
                        ) : isLowStock ? (
                          <Badge variant="outline" size="sm" className="text-amber-600 border-amber-500/30">
                            Low Stock ({p.stock})
                          </Badge>
                        ) : (
                          <Badge variant="success" size="sm">
                            {p.stock} Units
                          </Badge>
                        )}
                      </td>

                      {/* Badges */}
                      <td className="py-3 px-3">
                        <div className="flex flex-wrap gap-1">
                          {p.featured && <Badge variant="gold" size="sm">Featured</Badge>}
                          {p.bestseller && <Badge variant="primary" size="sm">Bestseller</Badge>}
                          {p.newArrival && <Badge variant="default" size="sm">New</Badge>}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Link
                            to={`/products/${p.id}`}
                            target="_blank"
                            title="Preview on Storefront"
                            className="p-1.5 rounded-luxury text-content-secondary hover:text-accent hover:bg-hoverSubtle"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>

                          <Link
                            to={`/admin/products/${p.id}/edit`}
                            title="Edit Product"
                            className="p-1.5 rounded-luxury text-content-secondary hover:text-content-primary hover:bg-hoverSubtle"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Link>

                          <button
                            type="button"
                            onClick={() => confirmDelete(p)}
                            title="Delete Product"
                            className="p-1.5 rounded-luxury text-content-secondary hover:text-red-500 hover:bg-red-500/10"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
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

        {/* Delete Confirmation Modal */}
        {productToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-card bg-surface border border-themeBorder p-6 shadow-2xl space-y-4">
              <div className="flex items-center space-x-2 text-red-500">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="font-serif text-lg font-semibold text-content-primary">
                  Confirm Deletion
                </h3>
              </div>
              <p className="text-xs text-content-secondary leading-relaxed">
                Are you certain you wish to delete &ldquo;
                <strong className="text-content-primary">{productToDelete.name}</strong>&rdquo; from the demonstration catalogue? This will immediately remove it from customer listings.
              </p>
              <div className="pt-2 flex justify-end space-x-3">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setProductToDelete(null)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={executeDelete}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Confirm Delete
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminProductsPage;
