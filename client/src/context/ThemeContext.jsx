import React, { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
  setTheme: () => {},
  isDark: false,
});

const STORAGE_KEY = 'scentora-theme';

/**
 * Determines the initial theme based on:
 * 1. Previously stored user preference in localStorage
 * 2. Operating system color scheme preference (prefers-color-scheme)
 * 3. Fallback to 'light'
 */
const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'light';

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  } catch (error) {
    console.warn('Unable to access localStorage or matchMedia for theme:', error);
    return 'light';
  }
};

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(getInitialTheme);

  // Synchronize DOM attributes and localStorage whenever theme changes
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      console.warn('Could not persist theme to localStorage', e);
    }
  }, [theme]);

  // Listen to OS-level theme changes when no explicit stored preference is present
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemChange = (e) => {
      const saved = localStorage.getItem(STORAGE_KEY);
      // Only adapt automatically if user hasn't saved an explicit preference
      if (!saved) {
        setThemeState(e.matches ? 'dark' : 'light');
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemChange);
    } else {
      mediaQuery.addListener(handleSystemChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleSystemChange);
      } else {
        mediaQuery.removeListener(handleSystemChange);
      }
    };
  }, []);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (newTheme) => {
    if (newTheme === 'dark' || newTheme === 'light') {
      setThemeState(newTheme);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        isDark: theme === 'dark',
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
