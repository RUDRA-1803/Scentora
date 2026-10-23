import React from 'react';
import { Sparkles, Heart, Anchor } from 'lucide-react';

export const NotesVisualizer = ({ notes, className = '' }) => {
  if (!notes) return null;

  const tiers = [
    {
      level: 'Top Notes',
      subtitle: 'The Sparkling First Impression (0 - 30 Mins)',
      items: notes.top || [],
      icon: Sparkles,
      color: 'border-brand-gold/60 bg-brand-gold/5',
      badgeColor: 'text-accent',
    },
    {
      level: 'Heart Notes',
      subtitle: 'The Olfactory Signature & Soul (2 - 4 Hours)',
      items: notes.middle || [],
      icon: Heart,
      color: 'border-accent/40 bg-accent/5',
      badgeColor: 'text-brand-charcoal dark:text-brand-gold',
    },
    {
      level: 'Base Notes',
      subtitle: 'The Sensual Long-Lasting Dry-Down (8 - 14+ Hours)',
      items: notes.base || [],
      icon: Anchor,
      color: 'border-themeBorder bg-surface',
      badgeColor: 'text-content-secondary',
    },
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center space-x-2 pb-2 border-b border-themeBorder">
        <Sparkles className="w-4 h-4 text-accent" />
        <h4 className="font-serif text-base font-semibold text-content-primary">
          Olfactory Pyramid &amp; Note Structure
        </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tiers.map((tier) => {
          const Icon = tier.icon;
          return (
            <div
              key={tier.level}
              className={`p-4 rounded-card border ${tier.color} transition-all duration-200`}
            >
              <div className="flex items-center space-x-2 mb-1.5">
                <Icon className={`w-4 h-4 ${tier.badgeColor}`} />
                <span className="font-serif text-sm font-bold text-content-primary">
                  {tier.level}
                </span>
              </div>
              <p className="text-[11px] text-content-secondary mb-3 leading-tight">
                {tier.subtitle}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {tier.items.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-block px-2.5 py-1 text-xs font-medium rounded-full bg-surface border border-themeBorder text-content-primary shadow-subtle"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotesVisualizer;
