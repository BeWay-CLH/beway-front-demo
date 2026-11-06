import Link from 'next/link';
import { Badge, Icon } from '@ds';

/* Pantalla "En proceso" (decisión D5, DEC-041): la ruta y el título existen para revisar la composición,
   pero no hay datos ni acciones que simulen algo. Lista lo que llegará, tomado de la guía de correcciones.
   Ninguna acción de esta pantalla escribe ni envía nada. */
export function InProgressScreen({
  eyebrow,
  title,
  description,
  expects,
  backHref = '/companies',
  backLabel = 'Explorar empresas',
}: {
  eyebrow: string;
  title: string;
  description: string;
  expects: string[];
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <div className="mx-auto flex w-full max-w-narrow flex-col gap-6 px-4 py-8 md:px-6 md:py-12">
      <header className="flex flex-col gap-3">
        <p className="eyebrow m-0 text-fg-muted">{eyebrow}</p>
        <h1 className="text-h2 font-heading text-fg-heading md:text-h1">{title}</h1>
        <p className="max-w-2xl text-fg-muted">{description}</p>
        <div>
          <Badge tone="accent" icon="construction">En proceso</Badge>
        </div>
      </header>

      <section aria-labelledby="expects-title" className="flex flex-col gap-4 rounded-card border border-line-subtle bg-surface-card p-6">
        <h2 id="expects-title" className="text-h3 font-heading text-fg-heading">Lo que verás aquí</h2>
        <ul className="flex flex-col gap-3">
          {expects.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-fg-body">
              <span className="mt-0.5 text-fg-accent">
                <Icon name="check" size={16} />
              </span>
              {item}
            </li>
          ))}
        </ul>
        <p className="m-0 text-sm text-fg-muted">Ningún dato de esta pantalla es real todavía. Desde aquí no se envía nada.</p>
      </section>

      <div>
        <Link
          href={backHref}
          className="inline-flex h-10.5 items-center rounded-control border border-line-control bg-surface-card px-4 text-xs font-[650] text-fg-body transition-control hover:bg-surface-sunken"
        >
          {backLabel}
        </Link>
      </div>
    </div>
  );
}
