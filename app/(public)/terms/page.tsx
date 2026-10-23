import type { Metadata } from 'next';
import { Alert } from '@ds';

export const metadata: Metadata = { title: 'Términos de uso · BeWay' };

/* Estructura de los términos. El texto definitivo lo redacta y revisa el equipo legal (LEGAL_REQUESTS). */
const sections = [
  {
    title: 'Quién puede usar BeWay',
    body: 'Pendiente de texto legal: edad mínima y condiciones de registro (LQ-02).',
  },
  {
    title: 'Tu cuenta',
    body: 'Eres responsable de tu acceso. Pendiente de texto legal sobre seguridad de la cuenta.',
  },
  {
    title: 'Tu perfil',
    body: 'Decides qué muestras y a quién. Un perfil es privado por defecto. Pendiente de texto legal sobre la visibilidad.',
  },
  {
    title: 'Empresas, encuestas y cursos',
    body: 'Las empresas publican fichas, encuestas y cursos. Pendiente de texto legal sobre sus condiciones (L-04).',
  },
  {
    title: 'Cambios en estos términos',
    body: 'Pendiente de texto legal sobre cómo y cuándo se avisa de un cambio.',
  },
];

export default function TermsPage() {
  return (
    <article className="mx-auto flex w-full max-w-275 flex-col gap-8 px-4 py-8 md:px-6 md:py-10">
      <header className="flex flex-col gap-4">
        <h1 className="text-h1 font-heading text-fg-heading">Términos de uso</h1>
        <Alert tone="warning" title="Borrador pendiente de revisión legal">
          Este texto no es definitivo. Lo que aparece aquí describe cómo se ha diseñado la demo.
        </Alert>
      </header>
      <div className="flex max-w-[68ch] flex-col gap-8">
        {sections.map((section) => (
          <section key={section.title} className="flex flex-col gap-3">
            <h2 className="text-h3 font-heading text-fg-heading">{section.title}</h2>
            <p className="text-fg-body">{section.body}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
