import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const accentColors = {
  cyan:   { name: 'Cyan',   value: '#22d3ee', shadow: 'rgba(34,211,238,0.4)' },
  purple: { name: 'Purple', value: '#a855f7', shadow: 'rgba(168,85,247,0.4)' },
  green:  { name: 'Green',  value: '#22c55e', shadow: 'rgba(34,197,94,0.4)'  },
  orange: { name: 'Orange', value: '#f97316', shadow: 'rgba(249,115,22,0.4)' },
  pink:   { name: 'Pink',   value: '#ec4899', shadow: 'rgba(236,72,153,0.4)' },
  red:    { name: 'Red',    value: '#ef4444', shadow: 'rgba(239,68,68,0.4)'  },
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('mode') !== 'light';
  });

  const [accent, setAccent] = useState(() => {
    return localStorage.getItem('accent') || 'cyan';
  });

  useEffect(() => {
    localStorage.setItem('mode', isDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-mode', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem('accent', accent);
    const color = accentColors[accent];
    document.documentElement.style.setProperty('--accent', color.value);
    document.documentElement.style.setProperty('--accent-shadow', color.shadow);
  }, [accent]);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark, accent, setAccent }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);