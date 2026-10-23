import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import ProductImage from '../common/ProductImage';
import Badge from '../common/Badge';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useRequireLogin } from '../../hooks/useRequireLogin';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const requireLogin = useRequireLogin();

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);
  const primaryImage = product.images?.[0] || '';
  const secondaryImage = product.images?.[1] || primaryImage;

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!requireLogin()) return;
    addToCart(product, 1);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!requireLogin()) return;
    toggleWishlist(product);
  };

  return (
    <div className="group relative luxury-card flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-elevated hover:border-accent/80">
      {/* Top Badges & Wishlist Trigger */}
      <div className="relative overflow-hidden bg-hoverSubtle/30">
        <Link to={`/products/${product.id}`} className="block">
          <ProductImage
            src={primaryImage}
            alt={`${product.brand} - ${product.name}`}
            className="group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.bestseller && (
            <Badge variant="gold" size="sm">
              Bestseller
            </Badge>
          )}
          {product.newArrival && (
            <Badge variant="primary" size="sm">
              New
            </Badge>
          )}
          {discountPercent && (
            <Badge variant="default" size="sm" className="bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20">
              {discountPercent}% OFF
            </Badge>
          )}
          {product.stock > 0 && product.stock <= 5 && (
            <Badge variant="outline" size="sm" className="text-amber-600 border-amber-500/40">
              Only {product.stock} Left
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`
            absolute top-2.5 right-2.5 z-10 p-2 rounded-full border
            transition-all duration-200 backdrop-blur-md
            ${
              inWishlist
                ? 'bg-brand-gold text-brand-charcoal border-brand-gold shadow-subtle'
                : 'bg-surface/85 text-content-primary border-themeBorder hover:bg-surface hover:text-accent'
            }
          `}
        >
          <Heart
            className={`w-4 h-4 transition-transform duration-200 ${
              inWishlist ? 'fill-current scale-110' : 'group-hover:scale-110'
            }`}
          />
        </button>

        {/* Quick Add Overlay on Desktop Hover */}
        <div className="absolute inset-x-2.5 bottom-2.5 hidden sm:block opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 z-10">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full py-2.5 px-3 rounded-luxury bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-elevated hover:opacity-95 transition-opacity"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{product.stock === 0 ? 'Out of Stock' : 'Quick Add'}</span>
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Brand & Audience */}
        <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-content-secondary mb-1">
          <span className="font-semibold text-accent truncate">{product.brand}</span>
          <span>{product.audience}</span>
        </div>

        {/* Product Title */}
        <Link to={`/products/${product.id}`} className="block group-hover:text-accent transition-colors">
          <h3 className="font-serif text-base sm:text-lg font-semibold text-content-primary line-clamp-1 leading-snug">
            {product.name}
          </h3>
        </Link>

        {/* Concentration & Volume */}
        <p className="text-xs text-content-secondary mt-1 line-clamp-1">
          {product.concentration} {product.volume ? `• ${product.volume}ml` : ''}
        </p>

        {/* Rating preview */}
        <div className="flex items-center space-x-1.5 mt-2">
          <div className="flex items-center text-brand-gold">
            <Star className="w-3.5 h-3.5 fill-current" />
          </div>
          <span className="text-xs font-medium text-content-primary">
            {product.rating || 4.8}
          </span>
          <span className="text-[11px] text-content-secondary">
            ({product.reviewCount || 42})
          </span>
        </div>

        {/* Pricing in INR */}
        <div className="mt-auto pt-3 flex items-baseline justify-between border-t border-themeBorder/60">
          <div className="flex items-baseline space-x-2">
            <span className="text-base sm:text-lg font-bold text-content-primary">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-content-secondary line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Mobile direct Add button */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            aria-label="Add to cart"
            className="sm:hidden p-2 rounded-luxury bg-primary text-primary-foreground text-xs"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
