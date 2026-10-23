import React from 'react';
import ProductCard from './ProductCard';
import { PackageOpen } from 'lucide-react';
import Button from '../common/Button';
import { Link } from 'react-router-dom';

export const ProductGrid = ({
  products = [],
  title,
  subtitle,
  emptyMessage = 'No fragrances match your selected criteria.',
  columns = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  className = '',
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Optional Grid Header */}
      {(title || subtitle) && (
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 border-b border-themeBorder gap-2">
          <div>
            {subtitle && (
              <span className="text-[11px] uppercase tracking-luxury text-accent font-semibold block mb-1">
                {subtitle}
              </span>
            )}
            {title && (
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-content-primary">
                {title}
              </h2>
            )}
          </div>
          <span className="text-xs text-content-secondary font-medium">
            {products.length} {products.length === 1 ? 'Creation' : 'Creations'}
          </span>
        </div>
      )}

      {/* Grid or Empty State */}
      {products.length > 0 ? (
        <div className={`grid gap-6 ${columns}`}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center rounded-card bg-surface border border-themeBorder p-8 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-hoverSubtle flex items-center justify-center text-accent">
            <PackageOpen className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-xl font-semibold text-content-primary">
            No Fragrances Found
          </h3>
          <p className="text-sm text-content-secondary max-w-md mx-auto">
            {emptyMessage}
          </p>
          <div className="pt-2">
            <Link to="/products">
              <Button variant="primary" size="sm">
                Explore Full Collection
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
