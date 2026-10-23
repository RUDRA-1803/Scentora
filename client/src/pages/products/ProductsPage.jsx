import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, X, RotateCcw } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import ProductCard from '../../components/products/ProductCard';
import ProductFilters from '../../components/products/ProductFilters';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

export const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products } = useProducts();

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  // Initialize filters from URL search params
  const [filters, setFilters] = useState({
    search: searchParams.get('q') || searchParams.get('search') || '',
    category: searchParams.get('category') || 'All',
    audience: searchParams.get('audience') || 'All',
    family: searchParams.get('family') || 'All',
    concentration: searchParams.get('concentration') || 'All',
    maxPrice: Number(searchParams.get('maxPrice')) || 20000,
    sort: searchParams.get('sort') || 'recommended',
  });

  // Keep state synced with URL parameters if user navigates via search or category links
  useEffect(() => {
    const q = searchParams.get('q') || searchParams.get('search');
    const cat = searchParams.get('category');
    const fam = searchParams.get('family');
    const aud = searchParams.get('audience');

    if (q !== null || cat !== null || fam !== null || aud !== null) {
      setFilters((prev) => ({
        ...prev,
        search: q || prev.search,
        category: cat || prev.category,
        family: fam || prev.family,
        audience: aud || prev.audience,
      }));
    }
  }, [searchParams]);

  // Real-time client-side filtering and sorting
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Keyword search (name, brand, notes, fragrance family, description)
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.fragranceFamily.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.notes?.top?.some((n) => n.toLowerCase().includes(q)) ||
          p.notes?.middle?.some((n) => n.toLowerCase().includes(q)) ||
          p.notes?.base?.some((n) => n.toLowerCase().includes(q))
      );
    }

    // 2. Audience filter
    if (filters.audience !== 'All') {
      result = result.filter(
        (p) => p.audience.toLowerCase() === filters.audience.toLowerCase()
      );
    }

    // 3. Category filter
    if (filters.category !== 'All') {
      result = result.filter(
        (p) => p.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // 4. Fragrance Family filter
    if (filters.family !== 'All') {
      result = result.filter(
        (p) => p.fragranceFamily.toLowerCase() === filters.family.toLowerCase()
      );
    }

    // 5. Concentration filter
    if (filters.concentration !== 'All') {
      result = result.filter(
        (p) => p.concentration.toLowerCase() === filters.concentration.toLowerCase()
      );
    }

    // 6. Max Price filter
    if (filters.maxPrice < 20000) {
      result = result.filter((p) => p.price <= filters.maxPrice);
    }

    // 7. Sorting
    switch (filters.sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'recommended':
      default:
        result.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return (b.rating || 0) - (a.rating || 0);
        });
        break;
    }

    return result;
  }, [products, filters]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleResetFilters = () => {
    setFilters({
      search: '',
      category: 'All',
      audience: 'All',
      family: 'All',
      concentration: 'All',
      maxPrice: 20000,
      sort: 'recommended',
    });
    setSearchParams({});
  };

  const removeFilter = (key, defaultValue = 'All') => {
    setFilters((prev) => ({ ...prev, [key]: defaultValue }));
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="pb-6 border-b border-themeBorder flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-luxury text-accent font-semibold block mb-1">
            Complete Haute Parfumerie
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-content-primary">
            The Scentora Catalogue
          </h1>
          <p className="text-xs sm:text-sm text-content-secondary mt-1 max-w-xl">
            Browse our complete collection of artisanal extraits, rare attars, and discovery coffrets. Handcrafted in Grasse and Mysore.
          </p>
        </div>

        {/* Mobile Filter Toggle & Count */}
        <div className="flex items-center justify-between sm:justify-end space-x-3">
          <span className="text-xs text-content-secondary font-medium">
            Showing <strong>{displayedProducts.length}</strong> of{' '}
            <strong>{filteredProducts.length}</strong> creations
          </span>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => setMobileDrawerOpen(true)}
            className="lg:hidden flex items-center space-x-2"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </Button>
        </div>
      </div>

      {/* Active Filter Pills Bar */}
      {(filters.search ||
        filters.audience !== 'All' ||
        filters.family !== 'All' ||
        filters.concentration !== 'All' ||
        filters.maxPrice < 20000) && (
        <div className="flex flex-wrap items-center gap-2 p-3 rounded-card bg-surface border border-themeBorder text-xs">
          <span className="font-semibold text-content-secondary mr-1">Active Filters:</span>

          {filters.search && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-hoverSubtle border border-themeBorder text-content-primary">
              Keyword: &ldquo;{filters.search}&rdquo;
              <button
                onClick={() => removeFilter('search', '')}
                className="ml-1.5 hover:text-red-500"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.audience !== 'All' && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-hoverSubtle border border-themeBorder text-content-primary">
              Audience: {filters.audience}
              <button
                onClick={() => removeFilter('audience')}
                className="ml-1.5 hover:text-red-500"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.family !== 'All' && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-hoverSubtle border border-themeBorder text-content-primary">
              Family: {filters.family}
              <button
                onClick={() => removeFilter('family')}
                className="ml-1.5 hover:text-red-500"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.concentration !== 'All' && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-hoverSubtle border border-themeBorder text-content-primary">
              Concentration: {filters.concentration}
              <button
                onClick={() => removeFilter('concentration')}
                className="ml-1.5 hover:text-red-500"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.maxPrice < 20000 && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-hoverSubtle border border-themeBorder text-content-primary">
              Price: ≤ ₹{filters.maxPrice.toLocaleString('en-IN')}
              <button
                onClick={() => removeFilter('maxPrice', 20000)}
                className="ml-1.5 hover:text-red-500"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            onClick={handleResetFilters}
            className="text-xs text-accent hover:underline font-semibold ml-auto flex items-center"
          >
            <RotateCcw className="w-3 h-3 mr-1" /> Clear All
          </button>
        </div>
      )}

      {/* Main Content Layout (Sidebar + Products Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block lg:col-span-1 sticky top-28 bg-surface rounded-card border border-themeBorder p-6 shadow-card">
          <ProductFilters
            filters={filters}
            setFilters={setFilters}
            onReset={handleResetFilters}
            totalResults={filteredProducts.length}
          />
        </div>

        {/* Products Grid Column */}
        <div className="lg:col-span-3 space-y-8">
          {filteredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {displayedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="text-center pt-8 border-t border-themeBorder">
                  <p className="text-xs text-content-secondary mb-3">
                    Viewing {displayedProducts.length} of {filteredProducts.length} products
                  </p>
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={() => setVisibleCount((prev) => prev + 6)}
                  >
                    Load More Creations
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="py-16 text-center rounded-card bg-surface border border-themeBorder p-8 space-y-4">
              <h3 className="font-serif text-xl font-semibold text-content-primary">
                No Fragrances Found
              </h3>
              <p className="text-sm text-content-secondary max-w-md mx-auto">
                No perfumes match your currently active filters. Try broadening your criteria or reset the filters.
              </p>
              <Button variant="primary" size="sm" onClick={handleResetFilters}>
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileDrawerOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-surface border-l border-themeBorder shadow-2xl overflow-y-auto">
            <ProductFilters
              filters={filters}
              setFilters={setFilters}
              onReset={handleResetFilters}
              totalResults={filteredProducts.length}
              isMobileDrawer={true}
              onCloseMobileDrawer={() => setMobileDrawerOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
