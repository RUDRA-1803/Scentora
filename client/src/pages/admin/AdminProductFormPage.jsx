import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Sparkles, Check, AlertCircle } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import { useProducts } from '../../context/ProductContext';
import Button from '../../components/common/Button';
import Input, { Select } from '../../components/common/Input';

export const AdminProductFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, addProduct, updateProduct } = useProducts();

  const isEditMode = Boolean(id);
  const existingProduct = isEditMode ? getProductById(id) : null;

  const [formData, setFormData] = useState({
    name: '',
    brand: 'Maison Scentora',
    slug: '',
    category: 'perfumes',
    audience: 'Unisex',
    price: '',
    originalPrice: '',
    image1: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80',
    image2: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80',
    volume: '100',
    concentration: 'Extrait de Parfum',
    fragranceFamily: 'Woody Oriental',
    topNotes: 'Calabrian Bergamot, Pink Pepper',
    middleNotes: 'Mysore Sandalwood, Orris Butter',
    baseNotes: 'Warm Amber, White Musk, Tonka',
    description: '',
    stock: '25',
    featured: true,
    bestseller: false,
    newArrival: true,
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isEditMode && existingProduct) {
      setFormData({
        name: existingProduct.name || '',
        brand: existingProduct.brand || 'Maison Scentora',
        slug: existingProduct.slug || '',
        category: existingProduct.category || 'perfumes',
        audience: existingProduct.audience || 'Unisex',
        price: existingProduct.price || '',
        originalPrice: existingProduct.originalPrice || '',
        image1: existingProduct.images?.[0] || '',
        image2: existingProduct.images?.[1] || '',
        volume: existingProduct.volume || '100',
        concentration: existingProduct.concentration || 'Extrait de Parfum',
        fragranceFamily: existingProduct.fragranceFamily || 'Woody Oriental',
        topNotes: existingProduct.notes?.top?.join(', ') || '',
        middleNotes: existingProduct.notes?.middle?.join(', ') || '',
        baseNotes: existingProduct.notes?.base?.join(', ') || '',
        description: existingProduct.description || '',
        stock: existingProduct.stock || '20',
        featured: Boolean(existingProduct.featured),
        bestseller: Boolean(existingProduct.bestseller),
        newArrival: Boolean(existingProduct.newArrival),
      });
    }
  }, [isEditMode, existingProduct]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Fragrance title is required.';
    if (!formData.brand.trim()) newErrors.brand = 'Brand house is required.';
    if (!formData.price || Number(formData.price) <= 0) newErrors.price = 'Valid INR price is required.';
    if (!formData.stock || Number(formData.stock) < 0) newErrors.stock = 'Stock count is required.';
    if (!formData.description.trim()) newErrors.description = 'Description is required.';
    if (!formData.image1.trim()) newErrors.image1 = 'Primary image URL is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Convert comma-separated notes into arrays
    const parseNotes = (str) =>
      str
        ? str
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
        : [];

    const productPayload = {
      name: formData.name.trim(),
      brand: formData.brand.trim(),
      slug:
        formData.slug.trim() ||
        formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: formData.category,
      audience: formData.audience,
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
      images: [formData.image1.trim(), formData.image2.trim()].filter(Boolean),
      volume: Number(formData.volume) || 100,
      concentration: formData.concentration,
      fragranceFamily: formData.fragranceFamily,
      notes: {
        top: parseNotes(formData.topNotes),
        middle: parseNotes(formData.middleNotes),
        base: parseNotes(formData.baseNotes),
      },
      description: formData.description.trim(),
      stock: Number(formData.stock),
      featured: formData.featured,
      bestseller: formData.bestseller,
      newArrival: formData.newArrival,
      // Keep an edited product's existing attributes instead of overwriting them with defaults
      attributes: existingProduct?.attributes || {
        longevity: '10-14 Hours',
        sillage: 'Refined & Lasting',
        occasion: 'All Occasions',
        season: 'All Seasons',
      },
    };

    setSubmitError('');
    setIsSaving(true);
    try {
      if (isEditMode) {
        await updateProduct(existingProduct?.id || id, productPayload);
      } else {
        await addProduct(productPayload);
      }
      navigate('/admin/products');
    } catch (error) {
      setSubmitError(error.message);
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout
      title={isEditMode ? `Edit Fragrance: ${formData.name}` : 'Formulate New Fragrance'}
    >
      <div className="space-y-6 max-w-4xl mx-auto">
        {submitError && (
          <div className="p-3.5 rounded-luxury bg-red-500/10 border border-red-500/20 text-xs text-red-500 font-medium">
            {submitError}
          </div>
        )}
        <div className="flex items-center justify-between pb-4 border-b border-themeBorder">
          <Link
            to="/admin/products"
            className="inline-flex items-center text-xs text-content-secondary hover:text-accent font-medium space-x-1"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            <span>Back to Products</span>
          </Link>

          <span className="text-xs text-content-secondary">
            {isEditMode ? 'Editing Existing Formulation' : 'Creating New Masterwork'}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Card 1: Essential Identity */}
          <div className="rounded-card bg-surface border border-themeBorder p-6 shadow-card space-y-4">
            <h2 className="font-serif text-lg font-semibold text-content-primary pb-3 border-b border-themeBorder">
              1. Brand &amp; Olfactory Identity
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Fragrance Title"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="e.g. Santal Impérial"
              />

              <Input
                label="Brand House"
                name="brand"
                required
                value={formData.brand}
                onChange={handleChange}
                error={errors.brand}
                placeholder="Maison Scentora"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Select
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                options={[
                  { value: 'perfumes', label: 'Perfumes / Flacons' },
                  { value: 'gift-sets', label: 'Curated Gift Sets' },
                ]}
              />

              <Select
                label="Audience"
                name="audience"
                value={formData.audience}
                onChange={handleChange}
                options={[
                  { value: 'Unisex', label: 'Unisex (Genderless)' },
                  { value: 'Men', label: 'Men (For Him)' },
                  { value: 'Women', label: 'Women (For Her)' },
                ]}
              />

              <Select
                label="Concentration"
                name="concentration"
                value={formData.concentration}
                onChange={handleChange}
                options={[
                  { value: 'Extrait de Parfum', label: 'Extrait de Parfum (24-32%)' },
                  { value: 'Eau de Parfum', label: 'Eau de Parfum (15-20%)' },
                  { value: 'Eau de Toilette', label: 'Eau de Toilette (8-12%)' },
                  { value: 'Discovery Wardrobe', label: 'Discovery Wardrobe' },
                ]}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Olfactory Family"
                name="fragranceFamily"
                value={formData.fragranceFamily}
                onChange={handleChange}
                options={[
                  { value: 'Woody Oriental', label: 'Woody Oriental' },
                  { value: 'Smoky Leather', label: 'Smoky Leather' },
                  { value: 'Floral Fresh', label: 'Floral Fresh' },
                  { value: 'Citrus Aquatic', label: 'Citrus Aquatic' },
                  { value: 'Warm Gourmand', label: 'Warm Gourmand' },
                  { value: 'Green Botanical', label: 'Green Botanical' },
                  { value: 'Floral Oriental', label: 'Floral Oriental' },
                ]}
              />

              <Input
                label="Volume (in ml)"
                name="volume"
                type="number"
                value={formData.volume}
                onChange={handleChange}
                placeholder="100"
              />
            </div>
          </div>

          {/* Card 2: Pricing & Stock */}
          <div className="rounded-card bg-surface border border-themeBorder p-6 shadow-card space-y-4">
            <h2 className="font-serif text-lg font-semibold text-content-primary pb-3 border-b border-themeBorder">
              2. Commercial Pricing &amp; Inventory
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Selling Price in INR (₹)"
                name="price"
                type="number"
                required
                value={formData.price}
                onChange={handleChange}
                error={errors.price}
                placeholder="8499"
              />

              <Input
                label="Original Price / MRP in INR (₹)"
                name="originalPrice"
                type="number"
                value={formData.originalPrice}
                onChange={handleChange}
                placeholder="9999 (optional discount)"
              />

              <Input
                label="Stock Units in Atelier"
                name="stock"
                type="number"
                required
                value={formData.stock}
                onChange={handleChange}
                error={errors.stock}
                placeholder="25"
              />
            </div>
          </div>

          {/* Card 3: Olfactory Notes Pyramid */}
          <div className="rounded-card bg-surface border border-themeBorder p-6 shadow-card space-y-4">
            <h2 className="font-serif text-lg font-semibold text-content-primary pb-3 border-b border-themeBorder">
              3. Olfactory Notes (Comma Separated)
            </h2>

            <Input
              label="Top Notes (Opening Accord)"
              name="topNotes"
              value={formData.topNotes}
              onChange={handleChange}
              placeholder="Calabrian Bergamot, Pink Pepper, Cardamom"
            />

            <Input
              label="Heart / Middle Notes (Soul)"
              name="middleNotes"
              value={formData.middleNotes}
              onChange={handleChange}
              placeholder="Mysore Sandalwood, Florentine Orris, Turkish Rose"
            />

            <Input
              label="Base Notes (Dry-Down)"
              name="baseNotes"
              value={formData.baseNotes}
              onChange={handleChange}
              placeholder="Warm Amber, Tonka Bean, Cambodian Oud"
            />
          </div>

          {/* Card 4: Story & Imagery */}
          <div className="rounded-card bg-surface border border-themeBorder p-6 shadow-card space-y-4">
            <h2 className="font-serif text-lg font-semibold text-content-primary pb-3 border-b border-themeBorder">
              4. Description &amp; Visual Photography
            </h2>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium uppercase tracking-widest text-content-secondary">
                Editorial Story &amp; Description
              </label>
              <textarea
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the inspiration, botanical harvesting, and mood of the fragrance..."
                className="w-full px-3.5 py-2.5 rounded-luxury text-sm bg-surface text-content-primary border border-themeBorder focus:outline-none focus:border-accent"
              />
              {errors.description && (
                <p className="text-xs text-red-500">{errors.description}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Primary Bottle Image URL"
                name="image1"
                required
                value={formData.image1}
                onChange={handleChange}
                error={errors.image1}
                placeholder="https://images.unsplash.com/..."
              />

              <Input
                label="Secondary / Lifestyle Image URL"
                name="image2"
                value={formData.image2}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
              />
            </div>

            {/* Showcase Flags */}
            <div className="pt-3 border-t border-themeBorder flex flex-wrap gap-6 text-xs">
              <label className="flex items-center space-x-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="accent-[#D4AF72]"
                />
                <span className="text-content-primary font-medium">Show in Featured Masterworks</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="bestseller"
                  checked={formData.bestseller}
                  onChange={handleChange}
                  className="accent-[#D4AF72]"
                />
                <span className="text-content-primary font-medium">Iconic Bestseller</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="newArrival"
                  checked={formData.newArrival}
                  onChange={handleChange}
                  className="accent-[#D4AF72]"
                />
                <span className="text-content-primary font-medium">New Arrival (2026)</span>
              </label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-2">
            <Link to="/admin/products">
              <Button variant="secondary" size="md">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSaving}
              className="flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>{isEditMode ? 'Update Fragrance' : 'Save & Publish Fragrance'}</span>
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminProductFormPage;
