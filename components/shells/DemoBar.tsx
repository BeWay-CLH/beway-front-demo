import Link from 'next/link';
import { Icon } from '@ds';
import { spaces, type Space } from '@/lib/routes';

/* Barra para presentar la demo: salta entre espacios sin depender de enlaces dentro de las páginas.
   Se oculta con NEXT_PUBLIC_BEWAY_DEMO_BAR=off y desaparece al conectar sesión real (DEC-013). */
export const demoBarEnabled = process.env.NEXT_PUBLIC_BEWAY_DEMO_BAR !== 'off';

export function DemoBar({ space }: { space: Space }) {
  return (
    <div className="border-b border-line-inverse bg-surface-inverse">
      <div className="flex h-10 items-center gap-4 px-4 text-sm md:px-6">
        <span className="flex flex-none items-center gap-2 text-xs font-semibold text-fg-on-inverse-muted">
          <Icon name="presentation" size={14} />
          Demo
        </span>
        <nav aria-label="Espacios de la demo" className="min-w-0 overflow-x-auto">
          <ul className="flex items-center gap-4 whitespace-nowrap">
            {spaces.map((s) => {
              const active = s.id === space;
              return (
                <li key={s.id}>
                  <Link
                    href={s.href}
                    aria-current={active ? 'true' : undefined}
                    className={
                      active
                        ? 'font-semibold text-fg-on-inverse underline decoration-line-accent decoration-2 underline-offset-4'
                        : 'transition-control text-fg-on-inverse-muted hover:text-fg-on-inverse'
                    }
                  >
                    {s.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <span className="ml-auto flex-none text-xs text-fg-on-inverse-muted max-sm:hidden">Datos de ejemplo</span>
      </div>
    </div>
  );
}
