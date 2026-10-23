import React, { useState } from 'react';
import { Layers, Plus, Trash2, Edit, AlertCircle, Check } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import { useProducts } from '../../context/ProductContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';

export const AdminCategoriesPage = () => {
  const { categories, products, addCategory, deleteCategory } = useProducts();

  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newSlug, setNewSlug] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [notification, setNotification] = useState('');

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSlug.trim()) return;

    addCategory({
      title: newTitle.trim(),
      subtitle: newSubtitle.trim() || 'Curated Collection',
      slug: newSlug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: newDescription.trim() || 'Artisanal creations.',
      image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1200&q=80',
      tag: 'New Category',
    });

    setNotification(`Category "${newTitle}" created successfully.`);
    setNewTitle('');
    setNewSubtitle('');
    setNewSlug('');
    setNewDescription('');
    setShowAddForm(false);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Delete category "${title}"?`)) {
      deleteCategory(id);
      setNotification(`Category "${title}" removed.`);
      setTimeout(() => setNotification(''), 3000);
    }
  };

  return (
    <AdminLayout title="Category &amp; Taxonomy Management">
      <div className="space-y-6">
        {notification && (
          <div className="p-3.5 rounded-luxury bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            {notification}
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-card bg-surface border border-themeBorder shadow-subtle">
          <div>
            <h2 className="font-serif text-lg font-semibold text-content-primary">
              Active Storefront Categories ({categories.length})
            </h2>
            <p className="text-xs text-content-secondary">
              Taxonomy driving navigation menus, landing pages, and search filtering.
            </p>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center space-x-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>{showAddForm ? 'Close Category Form' : 'Add New Category'}</span>
          </Button>
        </div>

        {/* Add Category Drawer/Form */}
        {showAddForm && (
          <form
            onSubmit={handleAddCategory}
            className="p-6 rounded-card bg-surface border border-themeBorder shadow-card space-y-4 animate-in fade-in duration-200"
          >
            <h3 className="font-serif text-base font-semibold text-content-primary pb-2 border-b border-themeBorder">
              New Category Specification
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Category Title"
                required
                value={newTitle}
                onChange={(e) => {
                  setNewTitle(e.target.value);
                  if (!newSlug) {
                    setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                  }
                }}
                placeholder="e.g. Leather Accessories"
              />
              <Input
                label="URL Slug"
                required
                value={newSlug}
                onChange={(e) => setNewSlug(e.target.value)}
                placeholder="leather-accessories"
              />
              <Input
                label="Subtitle"
                value={newSubtitle}
                onChange={(e) => setNewSubtitle(e.target.value)}
                placeholder="Italian Craftsmanship"
              />
            </div>
            <Input
              label="Description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Brief description for category landing banner..."
            />
            <div className="flex justify-end space-x-2 pt-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Save Category
              </Button>
            </div>
          </form>
        )}

        {/* Categories Table */}
        <div className="rounded-card bg-surface border border-themeBorder shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-themeBorder bg-hoverSubtle/40 text-content-secondary uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Title &amp; Subtitle</th>
                  <th className="py-3 px-3">Slug Route</th>
                  <th className="py-3 px-3">Description</th>
                  <th className="py-3 px-3">Assigned Products</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-themeBorder/60">
                {categories.map((cat) => {
                  const matchingCount = products.filter(
                    (p) =>
                      p.category?.toLowerCase() === cat.slug?.toLowerCase() ||
                      p.audience?.toLowerCase() === cat.slug?.toLowerCase() ||
                      (cat.slug === 'bestsellers' && p.bestseller) ||
                      (cat.slug === 'new-arrivals' && p.newArrival)
                  ).length;

                  return (
                    <tr key={cat.id || cat.slug} className="hover:bg-hoverSubtle/30 transition-colors">
                      <td className="py-3 px-4">
                        <span className="font-serif text-sm font-semibold text-content-primary block">
                          {cat.title}
                        </span>
                        <span className="text-[11px] text-accent">
                          {cat.subtitle}
                        </span>
                      </td>

                      <td className="py-3 px-3 font-mono text-content-secondary">
                        /category/{cat.slug}
                      </td>

                      <td className="py-3 px-3 text-content-secondary max-w-xs truncate">
                        {cat.description}
                      </td>

                      <td className="py-3 px-3">
                        <Badge variant="default" size="sm">
                          {matchingCount} Products
                        </Badge>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleDelete(cat.id || cat.slug, cat.title)}
                          className="p-1.5 rounded-luxury text-content-secondary hover:text-red-500 hover:bg-red-500/10"
                          title="Delete category"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
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

export default AdminCategoriesPage;
