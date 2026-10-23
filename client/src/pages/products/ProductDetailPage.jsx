import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Star, 
  Heart, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  Gift, 
  Droplets, 
  Minus, 
  Plus, 
  Check, 
  ChevronRight,
  Share2
} from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useRequireLogin } from '../../hooks/useRequireLogin';
import ProductImage from '../../components/common/ProductImage';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import NotesVisualizer from '../../components/products/NotesVisualizer';
import ProductCard from '../../components/products/ProductCard';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, products } = useProducts();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const requireLogin = useRequireLogin();

  const product = getProductById(id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('notes'); // 'notes' | 'details' | 'shipping'
  const [copiedLink, setCopiedLink] = useState(false);

  // Reset active image when product changes
  useEffect(() => {
    setActiveImageIndex(0);
    setQuantity(1);
    window.scrollTo(0, 0);
  }, [id]);

  // Invalid Product ID Not Found Fallback
  if (!product) {
    return (
      <div className="py-20 text-center rounded-card bg-surface border border-themeBorder p-8 space-y-4 max-w-xl mx-auto">
        <h2 className="font-serif text-3xl font-semibold text-content-primary">
          Fragrance Not Found
        </h2>
        <p className="text-sm text-content-secondary">
          The requested fragrance identifier &ldquo;{id}&rdquo; does not exist in the Scentora library or may have been retired.
        </p>
        <div className="pt-4">
          <Link to="/products">
            <Button variant="primary" size="md">
              Return to Fragrance Catalogue
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const images = product.images && product.images.length > 0 ? product.images : [''];
  const activeImage = images[activeImageIndex] || images[0];

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  const handleAddToCart = () => {
    if (!requireLogin()) return;
    addToCart(product, quantity);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Related products from the same family or audience
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.fragranceFamily === product.fragranceFamily || p.audience === product.audience))
    .slice(0, 4);

  return (
    <div className="space-y-16">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-xs text-content-secondary">
        <Link to="/" className="hover:text-accent">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/products" className="hover:text-accent">Shop</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to={`/category/${product.category}`} className="hover:text-accent capitalize">
          {product.category}
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-content-primary font-medium truncate max-w-[200px]">
          {product.name}
        </span>
      </nav>

      {/* Main Product Showcase (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left: Gallery (6 Columns) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Active Main Image */}
          <div className="rounded-card overflow-hidden border border-themeBorder bg-surface relative shadow-card">
            <ProductImage
              src={activeImage}
              alt={`${product.brand} - ${product.name}`}
              aspectRatio="aspect-[4/5]"
            />
            {discountPercent && (
              <div className="absolute top-4 left-4 z-10">
                <Badge variant="default" size="sm" className="bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20 font-bold">
                  {discountPercent}% SAVINGS
                </Badge>
              </div>
            )}
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`
                    w-20 h-24 rounded-luxury overflow-hidden border-2 transition-all flex-shrink-0
                    ${
                      activeImageIndex === idx
                        ? 'border-accent ring-2 ring-accent/30'
                        : 'border-themeBorder opacity-70 hover:opacity-100'
                    }
                  `}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Specifications & Actions (6 Columns) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Brand & Audience */}
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-luxury text-accent font-semibold">
              {product.brand} &bull; {product.audience}
            </span>
            <button
              type="button"
              onClick={handleShare}
              className="text-xs text-content-secondary hover:text-accent flex items-center space-x-1"
              title="Share link"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>

          {/* Title */}
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-content-primary leading-tight">
            {product.name}
          </h1>

          {/* Concentration & Volume Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="gold" size="sm">
              {product.concentration}
            </Badge>
            {product.volume && (
              <Badge variant="outline" size="sm">
                Volume: {product.volume}ml Flacon
              </Badge>
            )}
            <Badge variant="default" size="sm">
              {product.fragranceFamily}
            </Badge>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex text-brand-gold">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating || 5)
                      ? 'fill-current'
                      : 'text-themeBorder fill-current'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-content-primary">
              {product.rating || 4.8} / 5.0
            </span>
            <span className="text-xs text-content-secondary">
              ({product.reviewCount || 42} verified connoisseur reviews)
            </span>
          </div>

          {/* Pricing in INR */}
          <div className="p-4 rounded-luxury bg-hoverSubtle/50 border border-themeBorder flex items-baseline justify-between">
            <div>
              <span className="text-2xl sm:text-3xl font-bold text-content-primary">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="ml-3 text-sm text-content-secondary line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              Inclusive of all taxes &bull; Free Pan-India Shipping
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-content-secondary leading-relaxed font-sans">
            {product.description}
          </p>

          {/* Extensible Attribute Highlights */}
          {product.attributes && (
            <div className="grid grid-cols-2 gap-3 p-4 rounded-luxury bg-surface border border-themeBorder text-xs">
              {product.attributes.longevity && (
                <div>
                  <span className="text-[10px] uppercase text-content-secondary tracking-wider block">
                    Longevity
                  </span>
                  <span className="font-semibold text-content-primary">
                    {product.attributes.longevity}
                  </span>
                </div>
              )}
              {product.attributes.sillage && (
                <div>
                  <span className="text-[10px] uppercase text-content-secondary tracking-wider block">
                    Sillage
                  </span>
                  <span className="font-semibold text-content-primary">
                    {product.attributes.sillage}
                  </span>
                </div>
              )}
              {product.attributes.occasion && (
                <div>
                  <span className="text-[10px] uppercase text-content-secondary tracking-wider block">
                    Best Occasion
                  </span>
                  <span className="font-semibold text-content-primary">
                    {product.attributes.occasion}
                  </span>
                </div>
              )}
              {product.attributes.season && (
                <div>
                  <span className="text-[10px] uppercase text-content-secondary tracking-wider block">
                    Ideal Season
                  </span>
                  <span className="font-semibold text-content-primary">
                    {product.attributes.season}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Stock & Quantity Selector & Purchase CTAs */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center space-x-4">
              <span className="text-xs uppercase tracking-wider font-semibold text-content-secondary">
                Quantity:
              </span>
              <div className="flex items-center border border-themeBorder rounded-luxury bg-surface">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 hover:bg-hoverSubtle text-content-secondary"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center font-mono text-xs font-semibold text-content-primary">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2 hover:bg-hoverSubtle text-content-secondary"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <span className="text-xs text-content-secondary">
                {product.stock > 0 ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                    &bull; In Stock ({product.stock} flacons available)
                  </span>
                ) : (
                  <span className="text-red-500 font-medium">&bull; Out of Stock</span>
                )}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add {quantity > 1 ? `(${quantity})` : ''} to Cart</span>
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={() => requireLogin() && toggleWishlist(product)}
                className={`flex items-center justify-center space-x-2 ${
                  inWishlist ? 'border-brand-gold text-accent' : ''
                }`}
              >
                <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current text-brand-gold' : ''}`} />
                <span>{inWishlist ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
              </Button>
            </div>
          </div>

          {/* Complimentary Discovery Box Guarantee */}
          <div className="p-4 rounded-luxury bg-hoverSubtle/40 border border-themeBorder space-y-2 text-xs">
            <div className="flex items-center space-x-2 text-accent font-semibold">
              <Gift className="w-4 h-4" />
              <span>Complimentary 2ml Pre-Test Sample Included</span>
            </div>
            <p className="text-content-secondary leading-relaxed">
              Every 50ml, 75ml, and 100ml flacon arrives with a complimentary matching 2ml atomizer. Test the sample before opening the sealed master box for full return flexibility.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Section: Olfactory Pyramid, Craftsmanship, Delivery */}
      <section className="space-y-6 pt-6 border-t border-themeBorder">
        <div className="flex border-b border-themeBorder gap-6 text-sm">
          <button
            type="button"
            onClick={() => setActiveTab('notes')}
            className={`pb-3 font-semibold transition-colors relative ${
              activeTab === 'notes'
                ? 'text-accent border-b-2 border-accent'
                : 'text-content-secondary hover:text-content-primary'
            }`}
          >
            Olfactory Notes Structure
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('details')}
            className={`pb-3 font-semibold transition-colors relative ${
              activeTab === 'details'
                ? 'text-accent border-b-2 border-accent'
                : 'text-content-secondary hover:text-content-primary'
            }`}
          >
            Artisanal Craftsmanship &bull; Grasse
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('shipping')}
            className={`pb-3 font-semibold transition-colors relative ${
              activeTab === 'shipping'
                ? 'text-accent border-b-2 border-accent'
                : 'text-content-secondary hover:text-content-primary'
            }`}
          >
            Delivery, Returns &amp; Authenticity
          </button>
        </div>

        <div>
          {activeTab === 'notes' && (
            <NotesVisualizer notes={product.notes} />
          )}

          {activeTab === 'details' && (
            <div className="space-y-4 text-xs sm:text-sm text-content-secondary max-w-3xl leading-relaxed">
              <h4 className="font-serif text-lg font-semibold text-content-primary">
                Formulation &amp; Aging Process
              </h4>
              <p>
                Each creation in the Scentora library undergoes a minimum 180-day maturation process in controlled temperature rooms in Grasse, France. Natural botanicals are blended at high extrait concentrations (24% to 32%), allowing alcohol to naturally bond with essential oils without artificial stabilizers.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-luxury bg-surface border border-themeBorder">
                  <span className="font-serif font-bold text-content-primary block mb-1">
                    Cruelty-Free
                  </span>
                  <span>Never tested on animals, IFRA certified.</span>
                </div>
                <div className="p-4 rounded-luxury bg-surface border border-themeBorder">
                  <span className="font-serif font-bold text-content-primary block mb-1">
                    Direct Sourcing
                  </span>
                  <span>Pure flower absolutes and wild harvested resins.</span>
                </div>
                <div className="p-4 rounded-luxury bg-surface border border-themeBorder">
                  <span className="font-serif font-bold text-content-primary block mb-1">
                    Numbered Batch
                  </span>
                  <span>Individually inspected and stamped by our master nose.</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-4 text-xs sm:text-sm text-content-secondary max-w-3xl leading-relaxed">
              <h4 className="font-serif text-lg font-semibold text-content-primary">
                White-Glove Insured Delivery Across India
              </h4>
              <p>
                All orders are packaged in shock-resistant temperature-shielded boxes and dispatched via expedited air transit (Bluedart / Delhivery). Delivery timelines are 2-3 business days for metropolitan centers (Mumbai, Delhi NCR, Bengaluru, Hyderabad) and 3-5 days for other regions.
              </p>
              <p>
                Unsealed products with unbroken safety seals are eligible for 7-day complimentary return or exchange.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Related Masterworks Section */}
      {relatedProducts.length > 0 && (
        <section className="pt-8 border-t border-themeBorder space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-luxury text-accent font-semibold block mb-1">
                Curated Recommendations
              </span>
              <h2 className="font-serif text-2xl font-semibold text-content-primary">
                Complementary Olfactory Works
              </h2>
            </div>
            <Link to="/products" className="text-xs font-semibold text-accent hover:underline">
              View All Fragrances &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailPage;
