import React from 'react';
import { Sparkles, Compass, Shield, ArrowRight, Code } from 'lucide-react';
import ThemePreview from '../components/preview/ThemePreview';
import ApiHealthStatus from '../components/preview/ApiHealthStatus';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';

export const PlaceholderHome = () => {
  return (
    <div className="space-y-12">
      {/* Hero Brand Section */}
      <section className="text-center py-12 md:py-16 border-b border-themeBorder space-y-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-hoverSubtle border border-themeBorder text-xs text-content-secondary">
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <span>Scentora • Luxury E-Commerce Platform</span>
          <span className="text-accent font-semibold">Phase 1 Foundation</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-content-primary max-w-4xl mx-auto leading-tight">
          Discover Your <span className="italic text-accent">Signature Scent</span>.
        </h1>

        <p className="font-sans text-base sm:text-lg text-content-secondary max-w-2xl mx-auto font-normal leading-relaxed">
          Welcome to the foundation of <strong>Scentora</strong>, a premium product-based full-stack MERN application. Phase 1 establishes the unified luxury design system, theme tokens, resilient backend, and multi-category architecture.
        </p>

        <div className="pt-2 flex flex-wrap justify-center items-center gap-4">
          <div className="flex items-center space-x-2 text-xs font-mono px-3.5 py-1.5 rounded-luxury bg-surface border border-themeBorder text-content-secondary shadow-subtle">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Theme Tokens Initialized</span>
          </div>
          <div className="flex items-center space-x-2 text-xs font-mono px-3.5 py-1.5 rounded-luxury bg-surface border border-themeBorder text-content-secondary shadow-subtle">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span>Design System Ready</span>
          </div>
        </div>
      </section>

      {/* Backend API Connectivity Monitor */}
      <section>
        <ApiHealthStatus />
      </section>

      {/* Visual Design System Showcase */}
      <section>
        <ThemePreview />
      </section>

      {/* Architecture Overview for College Project Submission */}
      <section className="bg-surface border border-themeBorder rounded-card p-6 md:p-8 shadow-card">
        <div className="flex items-center space-x-2 pb-4 border-b border-themeBorder mb-6">
          <Code className="w-5 h-5 text-accent" />
          <h2 className="font-serif text-xl font-semibold text-content-primary">
            Phase 1 Architectural Checklist
          </h2>
          <Badge variant="gold" size="sm" className="ml-auto">College Project</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
          <div className="space-y-2">
            <h4 className="font-serif font-semibold text-content-primary flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>Theme Persistence</span>
            </h4>
            <p className="text-content-secondary text-xs leading-relaxed">
              Synchronous inline head script prevents flash of unstyled theme. Stores selection in <code>localStorage</code>, falls back to <code>prefers-color-scheme</code>.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-serif font-semibold text-content-primary flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>Centralized Tokens</span>
            </h4>
            <p className="text-content-secondary text-xs leading-relaxed">
              Hex color values (#171717, #D4AF72, #F4EFE6, #FFFFFF, #B68A45) are centralized into CSS variables and mapped directly to Tailwind utilities.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-serif font-semibold text-content-primary flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>Backend Resilience</span>
            </h4>
            <p className="text-content-secondary text-xs leading-relaxed">
              Express API server with CORS, JSON parsing, error handlers, and <code>GET /api/health</code>. Handles disconnected MongoDB gracefully without crashing.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlaceholderHome;
