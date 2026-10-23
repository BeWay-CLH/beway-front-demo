'use client';

import { useEffect, useId, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { IconButton } from '@ds';

/* Menú desplegable para móvil. El panel se coloca bajo la cabecera, que debe tener posición
   (sticky o relative). Se cierra al navegar y con Escape. Patrón nuevo: ver DEC-007. */
export function MobileMenu({ label, children }: { label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <IconButton
        icon={open ? 'x' : 'menu'}
        label={open ? 'Cerrar menú' : label}
        variant="ghost"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
      />
      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full z-40 border-b border-line-subtle bg-surface-card px-4 py-4 shadow-raised"
      >
        {children}
      </div>
    </>
  );
}
