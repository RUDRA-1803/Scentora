import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Layers, 
  Check, 
  Palette, 
  Type, 
  Sliders, 
  Box, 
  Watch, 
  Glasses, 
  ShoppingBag, 
  ShieldCheck 
} from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import Button from '../common/Button';
import Card, { CardHeader, CardTitle, CardDescription } from '../common/Card';
import Badge from '../common/Badge';
import Input, { Select } from '../common/Input';

export const ThemePreview = () => {
  const { theme, isDark } = useTheme();
  const [sampleInput, setSampleInput] = useState('Oud & Bergamot Noir');
  const [selectedCategory, setSelectedCategory] = useState('perfumes');
  const [agreed, setAgreed] = useState(true);

  // Exact brand colors required by Section 5
  const brandColors = [
    { name: 'Charcoal', hex: '#171717', border: false, text: '#FFFFFF' },
    { name: 'Gold', hex: '#D4AF72', border: false, text: '#171717' },
    { name: 'Ivory', hex: '#F4EFE6', border: true, text: '#171717' },
    { name: 'White', hex: '#FFFFFF', border: true, text: '#171717' },
    { name: 'Accent Gold', hex: '#B68A45', border: false, text: '#FFFFFF' },
  ];

  const futureCategories = [
    { id: 'perfumes', label: 'Fragrances', desc: 'Initial Core Launch', icon: Sparkles },
    { id: 'watches', label: 'Watches', desc: 'Phase 2+ Accessory', icon: Watch },
    { id: 'sunglasses', label: 'Eyewear', desc: 'Phase 2+ Accessory', icon: Glasses },
    { id: 'wallets', label: 'Leather Goods', desc: 'Phase 2+ Accessory', icon: ShoppingBag },
  ];

  return (
    <div className="space-y-12">
      {/* Section 1: Color Palette Tokens */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 pb-2 border-b border-themeBorder">
          <Palette className="w-5 h-5 text-accent" />
          <h2 className="font-serif text-xl font-semibold text-content-primary">
            1. Brand Palette &amp; Theme Tokens
          </h2>
          <Badge variant="gold" size="sm" className="ml-auto">
            Active: {theme.toUpperCase()}
          </Badge>
        </div>

        <p className="text-sm text-content-secondary max-w-2xl">
          Scentora utilizes a strict, centralized luxury token palette. In light mode, accessible darker gold <code className="text-xs px-1 py-0.5 rounded bg-hoverSubtle font-mono text-accent">#B68A45</code> is used for legible accents, while luminous gold <code className="text-xs px-1 py-0.5 rounded bg-hoverSubtle font-mono text-accent">#D4AF72</code> shines against dark surfaces.
        </p>

        {/* Brand Swatches */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-2">
          {brandColors.map((c) => (
            <div
              key={c.name}
              className="p-3.5 rounded-card bg-surface border border-themeBorder flex flex-col justify-between shadow-subtle"
            >
              <div
                className="w-full h-14 rounded-luxury flex items-center justify-center font-mono text-xs font-semibold shadow-inner"
                style={{
                  backgroundColor: c.hex,
                  color: c.text,
                  border: c.border ? '1px solid rgba(0,0,0,0.1)' : 'none',
                }}
              >
                {c.hex}
              </div>
              <div className="mt-2.5">
                <span className="text-xs font-medium text-content-primary block">
                  {c.name}
                </span>
                <span className="text-[10px] text-content-secondary uppercase tracking-wider">
                  Brand Token
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Typography & Editorial Hierarchy */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 pb-2 border-b border-themeBorder">
          <Type className="w-5 h-5 text-accent" />
          <h2 className="font-serif text-xl font-semibold text-content-primary">
            2. Typography System
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editorial Serif */}
          <Card>
            <CardHeader>
              <Badge variant="gold" size="sm">Editorial Font</Badge>
              <CardTitle className="mt-2 text-2xl">Playfair Display (Serif)</CardTitle>
              <CardDescription>
                Conveys heritage, prestige, and timeless perfumery craft.
              </CardDescription>
            </CardHeader>
            <div className="space-y-4">
              <div>
                <span className="text-[11px] uppercase tracking-luxury text-content-secondary block mb-1">
                  Heading 1 / Display
                </span>
                <h1 className="font-serif text-3xl font-semibold text-content-primary">
                  Discover Your Signature Scent.
                </h1>
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-luxury text-content-secondary block mb-1">
                  Heading 2 / Collection Title
                </span>
                <h2 className="font-serif text-2xl font-normal italic text-content-primary">
                  The Midnight Amber Collection
                </h2>
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-luxury text-content-secondary block mb-1">
                  Heading 3 / Product Name
                </span>
                <h3 className="font-serif text-lg font-medium text-content-primary">
                  Royal Santal Extrait de Parfum — 100ml
                </h3>
              </div>
            </div>
          </Card>

          {/* Clean Sans-serif Body & UI */}
          <Card>
            <CardHeader>
              <Badge variant="outline" size="sm">Interface Font</Badge>
              <CardTitle className="mt-2 text-2xl">Plus Jakarta Sans (Sans-serif)</CardTitle>
              <CardDescription>
                High legibility for specifications, prices, navigation, and controls.
              </CardDescription>
            </CardHeader>
            <div className="space-y-4 text-sm font-sans">
              <div>
                <span className="text-[11px] uppercase tracking-luxury text-content-secondary block mb-1">
                  Body Text
                </span>
                <p className="text-content-secondary leading-relaxed">
                  Crafted by master perfumers in Grasse, France. Features top notes of Sicilian bergamot and pink pepper, flowing gracefully into a heart of Florentine iris and aged Turkish rose.
                </p>
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-luxury text-content-secondary block mb-1">
                  Metadata &amp; Spec Labels
                </span>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default" size="sm">Eau de Parfum</Badge>
                  <Badge variant="gold" size="sm">Concentration: 24%</Badge>
                  <Badge variant="outline" size="sm">Batch No: SC-2026</Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Section 3: Interactive Buttons & Actions */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 pb-2 border-b border-themeBorder">
          <Sliders className="w-5 h-5 text-accent" />
          <h2 className="font-serif text-xl font-semibold text-content-primary">
            3. Interactive Buttons &amp; States
          </h2>
        </div>

        <Card>
          <div className="space-y-6">
            <div>
              <span className="text-xs font-medium uppercase tracking-wider text-content-secondary block mb-3">
                Variants (Adapts automatically to {theme} theme)
              </span>
              <div className="flex flex-wrap gap-3 items-center">
                <Button variant="primary">Primary Action</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outline Accent</Button>
                <Button variant="gold">Gold Special</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="primary" disabled>Disabled State</Button>
              </div>
            </div>

            <div className="pt-4 border-t border-themeBorder">
              <span className="text-xs font-medium uppercase tracking-wider text-content-secondary block mb-3">
                Button Scale &amp; Sizing
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" size="sm">Small / Tag</Button>
                <Button variant="primary" size="md">Standard Medium</Button>
                <Button variant="primary" size="lg">Large Featured CTA</Button>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Section 4: Form Controls & Inputs */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 pb-2 border-b border-themeBorder">
          <Box className="w-5 h-5 text-accent" />
          <h2 className="font-serif text-xl font-semibold text-content-primary">
            4. Form Controls &amp; Input Elements
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Text Inputs &amp; Search</CardTitle>
              <CardDescription>
                Crisp borders, theme background adaptation, and gold focus rings.
              </CardDescription>
            </CardHeader>
            <div className="space-y-4">
              <Input
                label="Fragrance Title"
                value={sampleInput}
                onChange={(e) => setSampleInput(e.target.value)}
                helperText="Enter a title for testing input reactivity"
              />

              <Input
                label="Search Collections"
                placeholder="Search woody, amber, floral..."
                icon={Search}
              />

              <Input
                label="Disabled Field"
                value="Auto-generated SKU: SC-99482"
                disabled
              />
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dropdowns &amp; Interactive Controls</CardTitle>
              <CardDescription>
                Accessible selects and tactile checkbox elements.
              </CardDescription>
            </CardHeader>
            <div className="space-y-5">
              <Select
                label="Fragrance Family / Olfactory Profile"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                options={[
                  { value: 'perfumes', label: 'Woody Oriental (Sandalwood, Cedar)' },
                  { value: 'floral', label: 'Floral Fresh (Jasmine, Damask Rose)' },
                  { value: 'citrus', label: 'Citrus Aquatic (Bergamot, Sea Salt)' },
                  { value: 'leather', label: 'Rich Leather & Smoked Amber' },
                ]}
                helperText="Selectable category profile for filtering"
              />

              {/* Accessible Checkbox */}
              <div className="pt-2">
                <label className="flex items-start space-x-3 cursor-pointer select-none">
                  <div
                    onClick={() => setAgreed(!agreed)}
                    className={`
                      mt-0.5 w-5 h-5 rounded-luxury border flex items-center justify-center transition-colors duration-150
                      ${agreed ? 'bg-primary border-primary text-primary-foreground' : 'bg-surface border-themeBorder'}
                    `}
                  >
                    {agreed && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <div>
                    <span className="text-sm font-medium text-content-primary block">
                      Include Luxury Gift Packaging
                    </span>
                    <span className="text-xs text-content-secondary">
                      Signature ivory embossed box with gold foil lettering.
                    </span>
                  </div>
                </label>
              </div>

              {/* State feedback alert */}
              <div className="p-3.5 rounded-luxury bg-hoverSubtle border border-themeBorder text-xs text-content-secondary flex items-center justify-between">
                <span>Selected: <strong className="text-content-primary capitalize">{selectedCategory}</strong></span>
                <Badge variant="gold" size="sm">Valid State</Badge>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Section 5: Scalable Multi-Category Architecture Proof */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 pb-2 border-b border-themeBorder">
          <Layers className="w-5 h-5 text-accent" />
          <h2 className="font-serif text-xl font-semibold text-content-primary">
            5. Future Multi-Category Extensibility
          </h2>
        </div>

        <p className="text-sm text-content-secondary max-w-2xl">
          Scentora is designed to start with perfumes and effortlessly expand into luxury accessories (belts, sunglasses, watches, wallets) without redesigning components or restructuring tokens.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {futureCategories.map((cat) => {
            const Icon = cat.icon;
            const isCurrent = cat.id === 'perfumes';
            return (
              <div
                key={cat.id}
                className={`
                  p-5 rounded-card border transition-all duration-200
                  ${isCurrent 
                    ? 'bg-surface border-accent shadow-subtle ring-1 ring-accent' 
                    : 'bg-surface/60 border-themeBorder hover:bg-surface hover:border-themeBorder'}
                `}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-luxury ${isCurrent ? 'bg-brand-gold/15 text-accent' : 'bg-hoverSubtle text-content-secondary'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {isCurrent ? (
                    <Badge variant="gold" size="sm">Phase 1 Target</Badge>
                  ) : (
                    <Badge variant="outline" size="sm">Future Ready</Badge>
                  )}
                </div>
                <h3 className="font-serif text-base font-semibold text-content-primary">
                  {cat.label}
                </h3>
                <p className="text-xs text-content-secondary mt-1">
                  {cat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default ThemePreview;
