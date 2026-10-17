import { createContext, useContext, useEffect, useMemo, useState } from 'react';
const ThemeContext = createContext(null);
const startingTheme = () => localStorage.getItem('devfolio_theme') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(startingTheme);
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem('devfolio_theme', theme); }, [theme]);
  const value = useMemo(() => ({ theme, toggleTheme: () => setTheme(t => t === 'light' ? 'dark' : 'light') }), [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
export const useTheme = () => useContext(ThemeContext);
