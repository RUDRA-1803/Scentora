import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

/**
 * Reusable luxury theme toggle button
 * Features accessible labels, focus rings, and Lucide icons
 */
export const ThemeToggle = ({ className = '', showLabel = false }) => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`
        group relative inline-flex items-center justify-center p-2 rounded-full
        border border-themeBorder bg-surface text-content-primary
        hover:bg-hoverSubtle hover:border-accent
        focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2
        transition-colors duration-200
        ${className}
      `}
    >
      <span className="sr-only">
        {isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      </span>

      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <Sun
            className="w-4 h-4 text-brand-gold transition-transform duration-200 group-hover:rotate-45"
            aria-hidden="true"
          />
        ) : (
          <Moon
            className="w-4 h-4 text-brand-charcoal transition-transform duration-200 group-hover:-rotate-12"
            aria-hidden="true"
          />
        )}
      </div>

      {showLabel && (
        <span className="ml-2 text-xs font-medium uppercase tracking-widest text-content-secondary">
          {isDark ? 'Light' : 'Dark'}
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;
