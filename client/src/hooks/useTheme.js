import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

/**
 * Custom hook to easily consume the ThemeContext
 * @returns {{ theme: 'light' | 'dark', toggleTheme: () => void, setTheme: (theme: string) => void, isDark: boolean }}
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
