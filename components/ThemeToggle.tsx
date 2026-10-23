'use client';

import { useEffect, useState } from 'react';
import { IconButton } from '@ds';

/* Alterna data-theme en <html> y recuerda la elección. El script de app/layout.tsx
   aplica el tema antes de pintar para evitar el parpadeo. */
export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('beway-theme', next); } catch {}
    setTheme(next);
  };

  return (
    <IconButton
      icon={theme === 'dark' ? 'sun' : 'moon'}
      label={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
      variant="ghost"
      onClick={toggle}
    />
  );
}
