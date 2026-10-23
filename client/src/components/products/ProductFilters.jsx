import React from 'react';
import { X, RotateCcw, Filter, Search } from 'lucide-react';
import Button from '../common/Button';

export const ProductFilters = ({
  filters,
  setFilters,
  onReset,
  totalResults = 0,
  isMobileDrawer = false,
  onCloseMobileDrawer,
}) => {
  const audiences = ['All', 'Men', 'Women', 'Unisex'];
  const families = [
    'All',
    'Woody Oriental',
    'Smoky Leather',
    'Floral Fresh',
    'Citrus Aquatic',
    'Warm Gourmand',
    'Green Botanical',
    'Floral Oriental',
  ];
  const concentrations = [
    'All',
    'Extrait de Parfum',
    'Eau de Parfum',
    'Eau de Toilette',
    'Discovery Wardrobe',
  ];

  const sortOptions = [
    { value: 'recommended', label: 'Recommended' },
    { value: 'newest', label: 'Newest Arrivals' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
  ];

  const handleAudienceChange = (aud) => {
    setFilters((prev) => ({ ...prev, audience: aud }));
  };

  const handleFamilyChange = (fam) => {
    setFilters((prev) => ({ ...prev, family: fam }));
  };

  const handleConcentrationChange = (conc) => {
    setFilters((prev) => ({ ...prev, concentration: conc }));
  };

  const handleSortChange = (e) => {
    setFilters((prev) => ({ ...prev, sort: e.target.value }));
  };

  const handleSearchChange = (e) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }));
  };

  const handlePriceChange = (e) => {
    setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }));
  };

  const activeFilterCount =
    (filters.audience !== 'All' ? 1 : 0) +
    (filters.family !== 'All' ? 1 : 0) +
    (filters.concentration !== 'All' ? 1 : 0) +
    (filters.search ? 1 : 0) +
    (filters.maxPrice < 20000 ? 1 : 0);

  return (
    <div className={`space-y-6 ${isMobileDrawer ? 'p-6' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-themeBorder">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-accent" />
          <h3 className="font-serif text-lg font-semibold text-content-primary">
            Filter &amp; Refine
          </h3>
          {activeFilterCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-gold text-brand-charcoal">
              {activeFilterCount}
            </span>
          )}
        </div>

        {isMobileDrawer && (
          <button
            type="button"
            onClick={onCloseMobileDrawer}
            className="p-1.5 rounded-full hover:bg-hoverSubtle text-content-secondary"
            aria-label="Close filters"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Search Filter */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-content-secondary block">
          Keyword Search
        </label>
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-content-secondary" />
          <input
            type="text"
            placeholder="Fragrance or note..."
            value={filters.search || ''}
            onChange={handleSearchChange}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-luxury bg-surface border border-themeBorder text-content-primary placeholder:text-content-secondary/60 focus:outline-none focus:border-accent"
          />
          {filters.search && (
            <button
              onClick={() => setFilters((prev) => ({ ...prev, search: '' }))}
              className="absolute right-2.5 top-2.5 text-content-secondary hover:text-content-primary"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Sort By */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-content-secondary block">
          Sort By
        </label>
        <select
          value={filters.sort}
          onChange={handleSortChange}
          className="w-full px-3 py-2 text-xs rounded-luxury bg-surface border border-themeBorder text-content-primary focus:outline-none focus:border-accent"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Audience Filter */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-content-secondary block">
          Audience
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {audiences.map((aud) => (
            <button
              key={aud}
              type="button"
              onClick={() => handleAudienceChange(aud)}
              className={`
                px-3 py-1.5 rounded-luxury text-xs text-center border transition-all duration-150
                ${
                  filters.audience === aud
                    ? 'bg-primary text-primary-foreground border-primary font-medium shadow-subtle'
                    : 'bg-surface border-themeBorder text-content-secondary hover:border-accent'
                }
              `}
            >
              {aud}
            </button>
          ))}
        </div>
      </div>

      {/* Max Price Slider */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <label className="font-semibold uppercase tracking-wider text-content-secondary">
            Price Range
          </label>
          <span className="font-bold text-content-primary">
            Up to ₹{Number(filters.maxPrice).toLocaleString('en-IN')}
          </span>
        </div>
        <input
          type="range"
          min="4000"
          max="20000"
          step="500"
          value={filters.maxPrice}
          onChange={handlePriceChange}
          className="w-full accent-[#D4AF72] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-content-secondary font-mono">
          <span>₹4,000</span>
          <span>₹20,000</span>
        </div>
      </div>

      {/* Fragrance Families */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-content-secondary block">
          Olfactory Family
        </label>
        <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
          {families.map((fam) => (
            <label
              key={fam}
              className={`
                flex items-center space-x-2.5 px-2.5 py-1.5 rounded-luxury text-xs cursor-pointer select-none transition-colors
                ${
                  filters.family === fam
                    ? 'bg-hoverSubtle text-content-primary font-semibold'
                    : 'hover:bg-hoverSubtle/50 text-content-secondary'
                }
              `}
            >
              <input
                type="radio"
                name="family"
                checked={filters.family === fam}
                onChange={() => handleFamilyChange(fam)}
                className="accent-[#D4AF72]"
              />
              <span className="truncate">{fam}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Concentrations */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-content-secondary block">
          Concentration
        </label>
        <div className="space-y-1">
          {concentrations.map((conc) => (
            <label
              key={conc}
              className={`
                flex items-center space-x-2.5 px-2.5 py-1.5 rounded-luxury text-xs cursor-pointer select-none transition-colors
                ${
                  filters.concentration === conc
                    ? 'bg-hoverSubtle text-content-primary font-semibold'
                    : 'hover:bg-hoverSubtle/50 text-content-secondary'
                }
              `}
            >
              <input
                type="radio"
                name="concentration"
                checked={filters.concentration === conc}
                onChange={() => handleConcentrationChange(conc)}
                className="accent-[#D4AF72]"
              />
              <span className="truncate">{conc}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Reset & Apply */}
      <div className="pt-4 border-t border-themeBorder space-y-2">
        {activeFilterCount > 0 && (
          <Button
            variant="secondary"
            size="sm"
            onClick={onReset}
            className="w-full flex items-center justify-center space-x-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </Button>
        )}

        {isMobileDrawer && (
          <Button
            variant="primary"
            size="md"
            onClick={onCloseMobileDrawer}
            className="w-full"
          >
            Show {totalResults} Results
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductFilters;
