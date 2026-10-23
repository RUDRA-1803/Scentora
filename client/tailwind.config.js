/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Semantic Theme Tokens (mapped to CSS variables)
        page: 'var(--color-page-bg)',
        surface: {
          DEFAULT: 'var(--color-surface)',
          elevated: 'var(--color-surface-elevated)',
        },
        content: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
        },
        primary: {
          DEFAULT: 'var(--color-btn-primary-bg)',
          foreground: 'var(--color-btn-primary-text)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
        },
        themeBorder: {
          DEFAULT: 'var(--color-border)',
        },
        hoverSubtle: {
          DEFAULT: 'var(--color-hover-subtle)',
        },
        // Brand Base Tokens
        brand: {
          charcoal: '#171717',
          gold: '#D4AF72',
          goldDark: '#B68A45',
          ivory: '#F4EFE6',
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        luxury: '4px',
        card: '8px',
      },
      boxShadow: {
        subtle: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
        elevated: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.04)',
      },
      letterSpacing: {
        luxury: '0.15em',
        widest: '0.2em',
      },
    },
  },
  plugins: [],
};
