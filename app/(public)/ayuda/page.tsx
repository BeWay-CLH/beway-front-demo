import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@ds';

export const metadata: Metadata = { title: 'Ayuda · BeWay' };

/* Ayuda (guía de correcciones, ficha 37): cuatro preguntas frecuentes en acordeón y el canal de ayuda. El texto es
   provisional y se marca como tal: lo aprueban los fundadores antes de publicar. */
const faqs = [
  {
    q: '¿Qué es Beway?',
    a: 'Un ecosistema que conecta talento con empresas a través de programas: certificaciones, challenges, miniproyectos y encuestas.',
  },
  {
    q: '¿Qué diferencia hay entre una certificación y una credencial?',
    a: 'Una certificación es un programa que puedes seguir. Una credencial es el registro de un programa completado y emitido por su emisor.',
  },
  {
    q: '¿Quién puede ver mi perfil?',
    a: 'Tu perfil es privado hasta que lo hagas visible en Ajustes. Lo que compartes en una vista previa no se publica.',
  },
  {
    q: '¿Qué pasa cuando respondo una encuesta?',
    a: 'En la demo las respuestas no se envían a ninguna empresa. Con el backend, cada encuesta indicará quién verá tus respuestas antes de empezar.',
  },
];

export default function HelpPage() {
  return (
    <div className="mx-auto flex w-full max-w-[760px] flex-col gap-8 px-4 pt-10 pb-16 md:px-6">
      <header className="flex flex-col gap-3">
        <p className="eyebrow m-0 text-fg-muted uppercase">Ayuda</p>
        <h1 className="m-0 font-heading text-[30px] leading-[1.2] font-[700] text-fg-heading md:text-[38px] [letter-spacing:var(--tracking-h1)]">
          Aquí para ayudarte.
        </h1>
        <p className="m-0 text-sm text-fg-muted">Textos provisionales: se revisan antes de publicarse.</p>
      </header>

      <div className="flex flex-col gap-3">
        {faqs.map((f) => (
          <details key={f.q} className="group rounded-card border border-line-subtle bg-surface-card p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-[650] text-fg-heading">
              {f.q}
              <Icon name="chevron-right" size={16} />
            </summary>
            <p className="m-0 mt-3 text-sm leading-[1.6] text-fg-body">{f.a}</p>
          </details>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4 rounded-card border border-line-subtle bg-surface-card p-6">
        <span className="flex-1 text-sm text-fg-body">¿No encuentras lo que buscas?</span>
        <Link href="/contact" className="inline-flex h-[42px] items-center rounded-control border border-line-control bg-surface-card px-4 text-xs font-[650] text-fg-body hover:bg-surface-sunken">
          Ver canal de ayuda
        </Link>
      </div>
    </div>
  );
}
