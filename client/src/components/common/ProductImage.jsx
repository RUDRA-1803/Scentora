import React, { useState } from 'react';

/**
 * Resilient ProductImage component with skeleton loading and branded luxury SVG fallback
 */
export const ProductImage = ({
  src,
  alt = 'Scentora Luxury Fragrance',
  className = '',
  aspectRatio = 'aspect-[3/4]',
  objectFit = 'object-cover',
}) => {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-hoverSubtle/40 ${aspectRatio} ${className}`}>
      {/* Skeleton shimmer while loading */}
      {loading && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-hoverSubtle/20 via-hoverSubtle to-hoverSubtle/20 animate-pulse" />
      )}

      {/* Branded Fallback SVG if image failed to load or is missing */}
      {hasError || !src ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-surface border border-themeBorder text-center select-none">
          <svg
            className="w-16 h-16 text-accent/60 mb-2"
            viewBox="0 0 64 64"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <rect x="24" y="6" width="16" height="8" rx="2" stroke="currentColor" fill="none" />
            <path d="M28 14V18 M36 14V18" stroke="currentColor" />
            <path
              d="M18 24C18 20.6863 20.6863 18 24 18H40C43.3137 18 46 20.6863 46 24V54C46 56.2091 44.2091 58 42 58H22C19.7909 58 18 56.2091 18 54V24Z"
              stroke="currentColor"
              fill="none"
            />
            <circle cx="32" cy="38" r="8" stroke="currentColor" strokeDasharray="2 2" />
            <path d="M32 34V42 M28 38H36" stroke="currentColor" />
          </svg>
          <span className="font-serif text-xs font-semibold tracking-wider text-content-primary">
            SCENTORA
          </span>
          <span className="text-[10px] uppercase tracking-widest text-content-secondary mt-0.5">
            Haute Parfumerie
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setHasError(true);
          }}
          className={`
            w-full h-full ${objectFit} transition-opacity duration-300
            ${loading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
          `}
        />
      )}
    </div>
  );
};

export default ProductImage;
