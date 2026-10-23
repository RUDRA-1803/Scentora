import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Droplets, 
  Gift, 
  Truck, 
  Compass, 
  Star, 
  Check 
} from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import ProductGrid from '../../components/products/ProductGrid';
import { useProducts } from '../../context/ProductContext';
import { FRAGRANCE_FAMILIES, BRAND_VALUES, TESTIMONIALS } from '../../data/editorial';

export const HomePage = () => {
  const { products } = useProducts();

  // Featured sections filtered from live product store
  const featuredFragrances = products.filter((p) => p.featured).slice(0, 4);
  const bestsellers = products.filter((p) => p.bestseller).slice(0, 4);
  const newArrivals = products.filter((p) => p.newArrival).slice(0, 4);

  return (
    <div className="space-y-20 md:space-y-28">
      {/* 1. Hero Banner */}
      <section className="relative rounded-card overflow-hidden border border-themeBorder bg-surface shadow-card">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px] lg:min-h-[640px]">
          {/* Hero Editorial Text (7 columns) */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-6 z-10">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-hoverSubtle border border-themeBorder text-xs text-content-secondary w-fit">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>Haute Parfumerie &bull; Spring Collection 2026</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-content-primary leading-[1.1]">
              Discover Your <br />
              <span className="italic text-accent font-normal">Signature Scent</span>.
            </h1>

            <p className="text-sm sm:text-base text-content-secondary max-w-xl leading-relaxed font-sans">
              Handcrafted extraits and artisanal harmonies distilled from the world’s rarest flower blooms, aged ouds, and golden resins. Designed to transcend ordinary fragrance into personal identity.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link to="/products">
                <Button variant="primary" size="lg" className="flex items-center space-x-2">
                  <span>Shop Collection</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link to="/category/bestsellers">
                <Button variant="secondary" size="lg">
                  Explore Bestsellers
                </Button>
              </Link>
            </div>

            <div className="pt-6 border-t border-themeBorder/70 grid grid-cols-3 gap-4 text-center sm:text-left">
              <div>
                <span className="font-serif text-xl sm:text-2xl font-bold text-content-primary">
                  100%
                </span>
                <p className="text-[11px] uppercase tracking-wider text-content-secondary mt-0.5">
                  Rare Essences
                </p>
              </div>
              <div>
                <span className="font-serif text-xl sm:text-2xl font-bold text-content-primary">
                  14+ Hrs
                </span>
                <p className="text-[11px] uppercase tracking-wider text-content-secondary mt-0.5">
                  Long Longevity
                </p>
              </div>
              <div>
                <span className="font-serif text-xl sm:text-2xl font-bold text-content-primary">
                  Pan-India
                </span>
                <p className="text-[11px] uppercase tracking-wider text-content-secondary mt-0.5">
                  Insured Delivery
                </p>
              </div>
            </div>
          </div>

          {/* Hero Image Presentation (5 columns) */}
          <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-full bg-hoverSubtle overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1200&q=85"
              alt="Scentora Signature Luxury Flacon"
              className="w-full h-full object-cover object-center lg:absolute lg:inset-0 hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:hidden" />
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-luxury bg-surface/90 backdrop-blur-md border border-themeBorder text-xs text-content-primary flex items-center justify-between">
              <div>
                <span className="font-serif font-bold block">Santal Impérial Extrait</span>
                <span className="text-[10px] text-content-secondary uppercase">Mysore Sandalwood &bull; ₹8,499</span>
              </div>
              <Link to="/products/sc-01">
                <Badge variant="gold" size="sm">Discover</Badge>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Shop By Category Pill Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-themeBorder">
          <div>
            <span className="text-[11px] uppercase tracking-luxury text-accent font-semibold block mb-1">
              Curated Profiles
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-content-primary">
              Shop by Category
            </h2>
          </div>
          <Link to="/products" className="text-xs font-semibold text-accent hover:underline flex items-center">
            View All Categories <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {[
            { label: 'For Him', path: '/category/men', count: 'Men' },
            { label: 'For Her', path: '/category/women', count: 'Women' },
            { label: 'Genderless', path: '/category/unisex', count: 'Unisex' },
            { label: 'Bestsellers', path: '/category/bestsellers', count: 'Top Rated' },
            { label: 'New Releases', path: '/category/new-arrivals', count: '2026' },
            { label: 'Gift Sets', path: '/category/gift-sets', count: 'Coffrets' },
          ].map((cat) => (
            <Link
              key={cat.path}
              to={cat.path}
              className="luxury-card p-4 text-center hover:border-accent hover:-translate-y-1 transition-all duration-200 group flex flex-col justify-center"
            >
              <span className="text-[10px] uppercase tracking-luxury text-content-secondary block mb-1 group-hover:text-accent">
                {cat.count}
              </span>
              <h3 className="font-serif text-base font-semibold text-content-primary group-hover:text-accent transition-colors">
                {cat.label}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Featured Masterworks */}
      <section>
        <ProductGrid
          products={featuredFragrances}
          title="Featured Masterworks"
          subtitle="Atelier Selection"
        />
      </section>

      {/* 4. Fragrance Families Interactive Section */}
      <section className="space-y-8 rounded-card bg-surface border border-themeBorder p-6 sm:p-10 shadow-card">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] uppercase tracking-luxury text-accent font-semibold">
            Olfactory Taxonomy
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-content-primary">
            Explore Fragrance Families
          </h2>
          <p className="text-xs sm:text-sm text-content-secondary leading-relaxed">
            Every signature scent belongs to an olfactory genealogy. Select your preferred profile to find fragrances that reflect your spirit.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {FRAGRANCE_FAMILIES.map((fam) => (
            <Link
              key={fam.name}
              to={`/products?family=${encodeURIComponent(fam.name)}`}
              className="p-5 rounded-luxury bg-hoverSubtle/40 border border-themeBorder hover:border-accent hover:bg-hoverSubtle transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="gold" size="sm">
                    {fam.name}
                  </Badge>
                  <ArrowRight className="w-4 h-4 text-content-secondary group-hover:text-accent group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-xs text-content-secondary leading-relaxed mb-3">
                  {fam.description}
                </p>
              </div>
              <div className="pt-3 border-t border-themeBorder/60 text-[11px] font-mono text-accent">
                {fam.sampleNotes}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Iconic Bestsellers */}
      <section>
        <ProductGrid
          products={bestsellers}
          title="The Iconic Bestsellers"
          subtitle="Most Coveted Signatures"
        />
      </section>

      {/* 6. Editorial Storytelling: "The Art of Fragrance" */}
      <section className="rounded-card overflow-hidden border border-themeBorder bg-surface shadow-card">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative min-h-[360px] lg:min-h-full">
            <img
              src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=80"
              alt="Artisanal perfume flacons in workshop"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-5">
            <span className="text-[11px] uppercase tracking-luxury text-accent font-semibold">
              The Atelier Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-content-primary leading-tight">
              The Art of Fragrance: <br />
              <span className="italic font-normal">From Grasse to Bottle</span>
            </h2>
            <p className="text-xs sm:text-sm text-content-secondary leading-relaxed font-sans">
              True luxury lies in the uncompromising purity of the extraction. We partner with fourth-generation distilleries in the hills of Grasse for dewy May roses, extract Mysore sandalwood sustainably, and age Cambodian agarwood for decades in cool subterranean cellars.
            </p>
            <p className="text-xs sm:text-sm text-content-secondary leading-relaxed font-sans">
              Each flacon is blended by master noses and aged for six months before being hand-bottled and polished with our signature gold seal.
            </p>
            <div className="pt-2">
              <Link to="/about">
                <Button variant="secondary" size="md">
                  Read The Scentora Story
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. New Arrivals */}
      <section>
        <ProductGrid
          products={newArrivals}
          title="New Arrivals for 2026"
          subtitle="Just Released"
        />
      </section>

      {/* 8. Promotional Gift-Set Banner */}
      <section className="rounded-card bg-brand-charcoal text-white p-8 sm:p-12 border border-brand-gold/30 shadow-elevated relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-4">
          <Badge variant="gold" size="sm">
            Curated Gifting
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-brand-ivory leading-tight">
            The Discovery Wardrobe: <br />
            Five Coveted Extraits in Gilded Coffret
          </h2>
          <p className="text-xs sm:text-sm text-brand-ivory/80 leading-relaxed max-w-xl">
            The ideal introduction to Scentora. Features five 10ml travel flacons including Santal Impérial, Oud Noir, and Rose Éthérée with complimentary luxury monogram gift wrapping.
          </p>
          <div className="pt-3 flex flex-wrap gap-3">
            <Link to="/products/sc-16">
              <Button variant="gold" size="md">
                Order Discovery Coffret &bull; ₹5,200
              </Button>
            </Link>
            <Link to="/category/gift-sets">
              <Button variant="outline" size="md" className="border-brand-gold text-brand-gold hover:bg-brand-gold/10">
                Explore All Gift Sets
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Why Shop With Scentora? */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] uppercase tracking-luxury text-accent font-semibold">
            The Scentora Promise
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-content-primary">
            Why Discerning Clients Choose Us
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BRAND_VALUES.map((val) => (
            <div
              key={val.title}
              className="luxury-card p-6 text-center sm:text-left space-y-3"
            >
              <div className="w-10 h-10 rounded-luxury bg-brand-gold/15 text-accent flex items-center justify-center mx-auto sm:mx-0">
                <Check className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base font-semibold text-content-primary">
                {val.title}
              </h3>
              <p className="text-xs text-content-secondary leading-relaxed">
                {val.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 10. Client Testimonials */}
      <section className="rounded-card bg-surface border border-themeBorder p-8 sm:p-12 shadow-card space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[11px] uppercase tracking-luxury text-accent font-semibold">
            Connoisseur Reviews
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-content-primary">
            Loved Across India
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-card bg-hoverSubtle/40 border border-themeBorder flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex text-brand-gold">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-content-secondary italic leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
              <div className="pt-3 border-t border-themeBorder/60">
                <span className="text-xs font-semibold text-content-primary block">
                  {t.author}
                </span>
                <span className="text-[10px] text-content-secondary uppercase">
                  {t.city} &bull; Verified Connoisseur
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
