import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Filter } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import ProductGrid from '../../components/products/ProductGrid';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

export const CategoryPage = () => {
  const { category: rawCategory } = useParams();
  const categorySlug = (rawCategory || '').toLowerCase();
  const { products, categories } = useProducts();

  const [sort, setSort] = useState('recommended');

  // Find metadata for current category
  const categoryMeta = categories.find(
    (c) => c.slug === categorySlug || c.id === categorySlug
  ) || {
    title: categorySlug.replace(/-/g, ' ').toUpperCase(),
    subtitle: 'Curated Olfactory Collection',
    description: 'Explore our hand-blended extraits and precious compositions.',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1200&q=80',
    tag: 'Haute Parfumerie',
  };

  // Filter products matching this category
  const categoryProducts = useMemo(() => {
    let list = [...products];

    switch (categorySlug) {
      case 'men':
        list = list.filter((p) => p.audience?.toLowerCase() === 'men');
        break;
      case 'women':
        list = list.filter((p) => p.audience?.toLowerCase() === 'women');
        break;
      case 'unisex':
        list = list.filter((p) => p.audience?.toLowerCase() === 'unisex');
        break;
      case 'bestsellers':
        list = list.filter((p) => p.bestseller === true);
        break;
      case 'new-arrivals':
        list = list.filter((p) => p.newArrival === true);
        break;
      case 'gift-sets':
        list = list.filter((p) => p.category?.toLowerCase() === 'gift-sets');
        break;
      case 'perfumes':
      default:
        // Shows all perfumes
        list = list.filter((p) => p.category?.toLowerCase() !== 'accessories');
        break;
    }

    // Apply sorting
    switch (sort) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'rating':
        list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'recommended':
      default:
        list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
    }

    return list;
  }, [products, categorySlug, sort]);

  return (
    <div className="space-y-12">
      {/* Category Hero Banner */}
      <section className="relative rounded-card overflow-hidden border border-themeBorder bg-surface shadow-card">
        <div className="relative min-h-[280px] sm:min-h-[340px] flex items-center p-8 sm:p-14 overflow-hidden">
          {/* Background image with luxury overlay */}
          <img
            src={categoryMeta.image}
            alt={categoryMeta.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

          {/* Banner Text */}
          <div className="relative z-10 max-w-2xl text-white space-y-4">
            <Link
              to="/products"
              className="inline-flex items-center text-xs font-semibold text-brand-gold hover:underline space-x-1 uppercase tracking-widest"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              <span>All Collections</span>
            </Link>

            <div>
              <span className="text-[11px] uppercase tracking-luxury text-brand-gold font-semibold block mb-1">
                {categoryMeta.subtitle}
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-brand-ivory leading-tight">
                {categoryMeta.title}
              </h1>
            </div>

            <p className="text-xs sm:text-sm text-brand-ivory/80 leading-relaxed max-w-xl">
              {categoryMeta.description}
            </p>
          </div>
        </div>
      </section>

      {/* Sorting & Filter Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-themeBorder gap-4">
        <div className="flex items-center space-x-2">
          <Badge variant="gold" size="sm">
            {categoryMeta.tag}
          </Badge>
          <span className="text-xs text-content-secondary font-medium">
            {categoryProducts.length} {categoryProducts.length === 1 ? 'Creation' : 'Creations'} Available
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <label className="text-xs text-content-secondary whitespace-nowrap">
            Sort by:
          </label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-luxury bg-surface border border-themeBorder text-content-primary focus:outline-none focus:border-accent"
          >
            <option value="recommended">Recommended</option>
            <option value="newest">Newest Arrivals</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Category Products Grid */}
      <ProductGrid
        products={categoryProducts}
        emptyMessage={`No fragrances found in the ${categoryMeta.title} category.`}
      />
    </div>
  );
};

export default CategoryPage;
