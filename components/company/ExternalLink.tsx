import { Icon } from '@ds';
import type { ReactNode } from 'react';

/* Enlace externo: se abre en una pestaña nueva y lo avisa a quien usa lector de pantalla. `relative` mantiene el aviso (sr-only)
   dentro de su contenedor con desplazamiento; si no, sobresale de la página en móvil. */
export function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative inline-flex items-center gap-1 text-sm text-link underline hover:text-link-hover"
    >
      {children}
      <Icon name="external-link" size={14} />
      <span className="sr-only">(se abre en una pestaña nueva)</span>
    </a>
  );
}
