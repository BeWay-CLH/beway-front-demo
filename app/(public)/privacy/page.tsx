import type { Metadata } from 'next';
import { Alert } from '@ds';

export const metadata: Metadata = { title: 'Política de privacidad · BeWay' };

/* Estructura y datos que cubre la política. El texto definitivo lo redacta y revisa el equipo legal (LEGAL_REQUESTS). */
const sections = [
  {
    title: 'Qué datos recogemos',
    items: ['Nombre, correo y contraseña para tu cuenta.', 'Lo que decides mostrar en tu perfil.', 'Tus respuestas a encuestas, solo si participas.'],
  },
  {
    title: 'Para qué los usamos',
    items: ['Crear y mantener tu cuenta.', 'Mostrar tu perfil según la visibilidad que elijas.', 'Avisarte de lo que hayas activado en notificaciones.'],
  },
  {
    title: 'Quién puede verlos',
    items: ['Por defecto, solo tú. Tu perfil es privado hasta que lo hagas público.', 'Las empresas solo ven lo que tu perfil público muestra.'],
  },
  {
    title: 'Cuánto tiempo los conservamos',
    items: ['Pendiente de texto legal.'],
  },
  {
    title: 'Tus derechos',
    items: ['Pendiente de texto legal: acceso, rectificación, supresión, portabilidad y oposición.'],
  },
];

export default function PrivacyPage() {
  return (
    <article className="mx-auto flex w-full max-w-275 flex-col gap-8 px-4 py-8 md:px-6 md:py-10">
      <header className="flex flex-col gap-4">
        <p className="eyebrow m-0 text-fg-muted uppercase">Política de privacidad</p>
        <h1 className="m-0 font-heading text-[30px] leading-[1.2] font-[700] text-fg-heading md:text-[38px] [letter-spacing:var(--tracking-h1)]">Tu información, con claridad.</h1>
        <Alert tone="warning" title="Borrador pendiente de revisión legal">
          Este texto no es definitivo. Lo que aparece aquí describe cómo se ha diseñado la demo.
        </Alert>
      </header>
      <div className="flex max-w-[68ch] flex-col gap-8">
        {sections.map((section) => (
          <section key={section.title} className="flex flex-col gap-3">
            <h2 className="text-h3 font-heading text-fg-heading">{section.title}</h2>
            <ul className="flex list-disc flex-col gap-2 pl-5 text-fg-body">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </article>
  );
}
