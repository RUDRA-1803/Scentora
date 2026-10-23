import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Sparkles, X, ArrowRight } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import ProductGrid from '../../components/products/ProductGrid';
import Button from '../../components/common/Button';

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || searchParams.get('search') || '';
  const [inputVal, setInputVal] = useState(initialQuery);

  const { products } = useProducts();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (inputVal.trim()) {
      setSearchParams({ q: inputVal.trim() });
    } else {
      setSearchParams({});
    }
  };

  const handleSuggestionClick = (keyword) => {
    setInputVal(keyword);
    setSearchParams({ q: keyword });
  };

  const currentQuery = searchParams.get('q') || searchParams.get('search') || '';

  // Filter products matching search query
  const searchResults = useMemo(() => {
    if (!currentQuery.trim()) return [];

    const q = currentQuery.toLowerCase().trim();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.fragranceFamily.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.audience.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.notes?.top?.some((n) => n.toLowerCase().includes(q)) ||
        p.notes?.middle?.some((n) => n.toLowerCase().includes(q)) ||
        p.notes?.base?.some((n) => n.toLowerCase().includes(q))
    );
  }, [products, currentQuery]);

  const suggestions = [
    'Sandalwood',
    'Oud',
    'Grasse Rose',
    'Bergamot',
    'Bourbon Vanilla',
    'Tuscan Leather',
    'Discovery Set',
  ];

  return (
    <div className="space-y-12">
      {/* Search Header Banner */}
      <section className="rounded-card bg-surface border border-themeBorder p-8 sm:p-12 shadow-card space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[11px] uppercase tracking-luxury text-accent font-semibold">
            Olfactory Discovery
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-content-primary">
            Search The Scentora Library
          </h1>
          <p className="text-xs sm:text-sm text-content-secondary">
            Find fragrances by name, perfumery house, olfactory notes, or mood.
          </p>
        </div>

        {/* Large Search Input */}
        <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto relative flex gap-2">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-4 top-3.5 text-content-secondary" />
            <input
              type="text"
              placeholder="Search by perfume name, brand, or note (e.g. Sandalwood, Rose)..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="w-full pl-12 pr-10 py-3 rounded-luxury text-sm bg-hoverSubtle/50 border border-themeBorder text-content-primary placeholder:text-content-secondary focus:outline-none focus:border-accent"
            />
            {inputVal && (
              <button
                type="button"
                onClick={() => {
                  setInputVal('');
                  setSearchParams({});
                }}
                className="absolute right-3.5 top-3.5 text-content-secondary hover:text-content-primary"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <Button type="submit" variant="primary" size="md">
            Search
          </Button>
        </form>

        {/* Popular Olfactory Suggestions */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
          <span className="text-content-secondary font-medium mr-1">Trending Notes:</span>
          {suggestions.map((sug) => (
            <button
              key={sug}
              type="button"
              onClick={() => handleSuggestionClick(sug)}
              className="px-3 py-1 rounded-full bg-hoverSubtle border border-themeBorder text-content-primary hover:border-accent hover:text-accent transition-colors"
            >
              {sug}
            </button>
          ))}
        </div>
      </section>

      {/* Results Header & Grid */}
      {currentQuery ? (
        <section className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-themeBorder">
            <div>
              <span className="text-xs text-content-secondary font-medium">
                Results for keyword:
              </span>
              <h2 className="font-serif text-2xl font-semibold text-content-primary">
                &ldquo;{currentQuery}&rdquo;
              </h2>
            </div>
            <span className="text-xs text-content-secondary font-medium">
              {searchResults.length} {searchResults.length === 1 ? 'Creation' : 'Creations'} Matched
            </span>
          </div>

          <ProductGrid
            products={searchResults}
            emptyMessage={`No perfumes match the query "${currentQuery}". Try searching for notes such as Sandalwood, Oud, Vanilla, or Rose.`}
          />
        </section>
      ) : (
        <section className="space-y-6">
          <div className="pb-3 border-b border-themeBorder">
            <h2 className="font-serif text-2xl font-semibold text-content-primary">
              Popular Fragrances to Explore
            </h2>
          </div>
          <ProductGrid products={products.slice(0, 4)} />
        </section>
      )}
    </div>
  );
};

export default SearchPage;
