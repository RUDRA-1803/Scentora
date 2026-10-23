import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import ProductImage from '../../components/common/ProductImage';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

export const WishlistPage = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 border-b border-themeBorder gap-3">
        <div>
          <span className="text-[11px] uppercase tracking-luxury text-accent font-semibold block mb-1">
            Personal Registry
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-content-primary">
            My Fragrance Wishlist
          </h1>
          <p className="text-xs text-content-secondary mt-1">
            {wishlist.length} {wishlist.length === 1 ? 'creation' : 'creations'} saved for future consideration.
          </p>
        </div>

        {wishlist.length > 0 && (
          <button
            type="button"
            onClick={clearWishlist}
            className="text-xs text-red-500 hover:underline flex items-center self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5 mr-1" />
            <span>Clear Wishlist</span>
          </button>
        )}
      </div>

      {/* Wishlist Items List or Empty State */}
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product) => {
            const primaryImage = product.images?.[0] || '';

            return (
              <div
                key={product.id}
                className="luxury-card overflow-hidden flex flex-col justify-between group"
              >
                <div className="relative bg-hoverSubtle/30">
                  <Link to={`/products/${product.id}`} className="block">
                    <ProductImage
                      src={primaryImage}
                      alt={product.name}
                      aspectRatio="aspect-[3/4]"
                    />
                  </Link>

                  <button
                    type="button"
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-2.5 right-2.5 p-2 rounded-full bg-surface/90 text-content-secondary hover:text-red-500 border border-themeBorder shadow-subtle"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <span className="text-[10px] uppercase tracking-widest text-accent font-semibold">
                    {product.brand}
                  </span>

                  <Link to={`/products/${product.id}`} className="block mt-1">
                    <h3 className="font-serif text-base font-semibold text-content-primary hover:text-accent transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-xs text-content-secondary mt-0.5 line-clamp-1">
                    {product.concentration} {product.volume ? `• ${product.volume}ml` : ''}
                  </p>

                  <div className="mt-3 pt-3 border-t border-themeBorder/60 flex items-center justify-between">
                    <span className="text-base font-bold text-content-primary">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>

                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleMoveToCart(product)}
                      className="flex items-center space-x-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Cart</span>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-20 text-center rounded-card bg-surface border border-themeBorder p-8 space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto rounded-full bg-hoverSubtle flex items-center justify-center text-accent">
            <Heart className="w-7 h-7" />
          </div>
          <h2 className="font-serif text-2xl font-semibold text-content-primary">
            Your Wishlist is Empty
          </h2>
          <p className="text-xs text-content-secondary leading-relaxed">
            As you explore our collection of artisanal perfumes, tap the heart icon on any creation to save it here for future consideration.
          </p>
          <div className="pt-2">
            <Link to="/products">
              <Button variant="primary" size="md">
                Discover Fragrances
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
