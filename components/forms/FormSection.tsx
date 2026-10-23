import type { ReactNode } from 'react';

/* Sección de ajustes, formularios y perfil: título y explicación a la izquierda (4 columnas, 356 px),
   contenido a la derecha (8 columnas, 728 px). Separadas por una línea fina con 32 px de aire.
   12 × 77 + 11 × 16 = 1100 px: la rejilla de la página cierra exacta (DESIGN.md). */
export function FormSection({
  id,
  title,
  description,
  children,
}: {
  id?: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="grid gap-4 border-t border-line-subtle py-8 first:border-t-0 first:pt-0 md:grid-cols-12">
      <div className="flex flex-col gap-2 md:col-span-4">
        <h2 className="text-h3 font-heading text-fg-heading">{title}</h2>
        {description ? <p className="text-sm text-fg-muted">{description}</p> : null}
      </div>
      <div className="flex min-w-0 flex-col gap-5 md:col-span-8">{children}</div>
    </section>
  );
}
