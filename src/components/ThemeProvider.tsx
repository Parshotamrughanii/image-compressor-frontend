'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Always default to dark mode to match DeepAI theme
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    // Apply the theme class to the document element
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    
    // Add particles to the body for the DeepAI-like background effect
    if (theme === 'dark' && typeof document !== 'undefined') {
      // Only add particles if they don't already exist
      if (!document.querySelector('.particle-container')) {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-container';
        particleContainer.style.position = 'fixed';
        particleContainer.style.top = '0';
        particleContainer.style.left = '0';
        particleContainer.style.width = '100%';
        particleContainer.style.height = '100%';
        particleContainer.style.overflow = 'hidden';
        particleContainer.style.zIndex = '-1';
        particleContainer.style.pointerEvents = 'none';
        
        // Create particles
        for (let i = 1; i <= 3; i++) {
          const particle = document.createElement('div');
          particle.className = `particle particle-${i}`;
          particleContainer.appendChild(particle);
        }
        
        document.body.appendChild(particleContainer);
      }
    } else {
      // Remove particles if switching to light mode
      const particleContainer = document.querySelector('.particle-container');
      if (particleContainer) {
        particleContainer.remove();
      }
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
