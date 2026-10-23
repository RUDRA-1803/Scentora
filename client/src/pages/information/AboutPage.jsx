import React from 'react';
import { Sparkles, Compass, ShieldCheck, Heart, Award } from 'lucide-react';
import Badge from '../../components/common/Badge';

export const AboutPage = () => {
  return (
    <div className="space-y-16 max-w-4xl mx-auto">
      {/* Editorial Header */}
      <div className="text-center space-y-4 py-8 border-b border-themeBorder">
        <Badge variant="gold" size="sm">
          Brand Heritage &bull; Est. 2026
        </Badge>
        <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-content-primary leading-tight">
          The Scentora Story
        </h1>
        <p className="text-sm sm:text-base text-content-secondary max-w-2xl mx-auto leading-relaxed">
          Discover Your Signature Scent. We believe that true luxury is not mass produced, but patiently composed through rare botanicals, natural maceration, and artisanal precision.
        </p>
      </div>

      {/* Hero Narrative Image */}
      <div className="rounded-card overflow-hidden border border-themeBorder bg-surface shadow-card aspect-[21/9] relative">
        <img
          src="https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=1600&q=85"
          alt="Lavender and rose fields in Southern France"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-6 sm:p-10">
          <p className="text-white font-serif text-lg sm:text-xl italic">
            &ldquo;A fragrance is the most intense form of memory.&rdquo;
          </p>
        </div>
      </div>

      {/* Sourcing & Philosophy Sections */}
      <div className="space-y-12 text-sm text-content-secondary leading-relaxed">
        <div className="space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-content-primary">
            Born Between Grasse and the East
          </h2>
          <p>
            Scentora was founded on a singular premise: modern commercial perfumery had become homogenous, prioritizing synthetic fixatives over natural botanical poetry. We envisioned an atelier bridging centuries of French distillation with the hypnotic, regal depth of Indian and Middle Eastern perfumery.
          </p>
          <p>
            Our master perfumers work with fourth-generation estates in Grasse, France to harvest Centifolia rose and orange blossom at sunrise. Simultaneously, we sustainably source aged Mysore sandalwood, Omani frankincense, and wild Cambodian oud aged in dark subterranean cellars.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="luxury-card p-6 space-y-2">
            <Sparkles className="w-5 h-5 text-accent" />
            <h3 className="font-serif text-lg font-semibold text-content-primary">
              Extrait Concentrations
            </h3>
            <p className="text-xs text-content-secondary">
              Formulated at 24% to 32% pure perfume oils, our extraits remain vibrant on the skin for over 14 hours.
            </p>
          </div>

          <div className="luxury-card p-6 space-y-2">
            <Compass className="w-5 h-5 text-accent" />
            <h3 className="font-serif text-lg font-semibold text-content-primary">
              Multi-Category Future
            </h3>
            <p className="text-xs text-content-secondary">
              Engineered as an expansive lifestyle architecture to support luxury watches, eyewear, and leather goods.
            </p>
          </div>

          <div className="luxury-card p-6 space-y-2">
            <ShieldCheck className="w-5 h-5 text-accent" />
            <h3 className="font-serif text-lg font-semibold text-content-primary">
              Responsible Ethos
            </h3>
            <p className="text-xs text-content-secondary">
              100% cruelty-free, recyclable heavy-weight glass flacons, and fair-trade botanical cooperatives.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
