import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@ds';
import { NavButton } from '@/components/NavButton';
import { courseMeta, startText } from '@/components/course/course-labels';
import { formatDate } from '@/lib/format';
import { requireSession } from '@/lib/session';
import { getCourses } from '@/lib/services/courses';
import { AccreditationDialog } from '@/components/credentials/AccreditationDialog';
import { getCredentials } from '@/lib/services/credentials';

export const metadata: Metadata = { title: 'Credenciales · BeWay', robots: { index: false } };

/* Credenciales obtenidas (E-07). Solo se listan las que ya existen en el fixture: la pantalla nunca emite una (DEC-010) y
   no lleva sello de "verificada": muestra emisor y fecha (DEC-021). A la derecha, los cursos abiertos que otorgan una:
   es el camino para tener la siguiente y llena la pantalla con algo útil, también cuando no hay ninguna. */
export default async function CredentialsPage() {
  const session = await requireSession();
  const [credentials, openCourses] = await Promise.all([getCredentials(session.userId), getCourses({ status: 'open' })]);
  const latest = credentials[0];
  const withCredential = openCourses.filter((c) => c.grantsCredential);

  return (
    <div className="mx-auto flex w-full max-w-275 flex-col gap-8 px-4 py-8 md:px-6 md:py-10">
      <header className="flex flex-col gap-3">
        <h1 className="text-h2 font-heading text-fg-heading md:text-h1">Credenciales</h1>
        <p className="text-fg-muted">
          {latest
            ? `Tienes ${credentials.length} ${credentials.length === 1 ? 'credencial' : 'credenciales'}. La última es ${latest.title}, de ${latest.issuer}, el ${formatDate(latest.issuedAt)}.`
            : 'Todavía no tienes credenciales.'}
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-12">
        <section
          aria-labelledby="list-title"
          className="flex flex-col gap-6 rounded-card border border-line-subtle bg-surface-card p-6 md:col-span-7"
        >
          <div className="flex flex-col gap-1">
            <h2 id="list-title" className="text-h3 font-heading text-fg-heading">Tus logros</h2>
            <p className="text-sm text-fg-muted">
              Cada credencial dice quién la emitió y cuándo. BeWay no las emite desde esta pantalla.
            </p>
          </div>

          {credentials.length > 0 ? (
            <ul className="flex flex-col">
              {credentials.map((c) => (
                <li
                  key={c.id}
                  className="grid grid-cols-[auto_1fr] items-start gap-x-4 gap-y-2 border-t border-line-subtle py-4 first:border-t-0 first:pt-0"
                >
                  <span className="mt-0.5 flex-none text-fg-muted"><Icon name="award" size={20} /></span>
                  <div className="flex min-w-0 flex-col gap-1">
                    <span className="font-semibold text-fg-heading">{c.title}</span>
                    <span className="text-sm text-fg-muted">{`Emitida por ${c.issuer}, el ${formatDate(c.issuedAt)}`}</span>
                    {c.courseSlug && c.courseTitle ? (
                      <span className="text-sm text-fg-body">
                        {'Viene del curso '}
                        <Link href={`/talent/courses/${c.courseSlug}`} className="font-semibold text-fg-heading hover:text-fg-accent">
                          {c.courseTitle}
                        </Link>
                      </span>
                    ) : null}
                    <AccreditationDialog credential={c} holderName={session.displayName} />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-start gap-4">
              <p className="text-fg-body">
                Aún no tienes credenciales. Una credencial es un logro que emite una empresa o un centro cuando terminas lo que
                te pidió. Cuando exista, la verás aquí con su emisor y su fecha.
              </p>
              <NavButton href="/talent/courses" variant="secondary" iconAfter="arrow-right">
                Ver cursos
              </NavButton>
            </div>
          )}
        </section>

        <section
          aria-labelledby="next-title"
          className="flex flex-col gap-4 rounded-card border border-line-subtle bg-surface-card p-6 md:col-span-5"
        >
          <div className="flex flex-col gap-1">
            <h2 id="next-title" className="text-h3 font-heading text-fg-heading">Cursos que otorgan credencial</h2>
            <p className="text-sm text-fg-muted">Abiertos ahora.</p>
          </div>
          {withCredential.length > 0 ? (
            <ul className="flex flex-col">
              {withCredential.map((c) => (
                <li key={c.id} className="border-t border-line-subtle first:border-t-0">
                  <Link
                    href={`/talent/courses/${c.slug}`}
                    className="transition-control flex items-center gap-4 py-3 text-fg-heading hover:text-fg-accent"
                  >
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="font-semibold">{c.title}</span>
                      <span className="text-sm text-fg-muted">{`${courseMeta(c)}. ${startText(c) ?? ''}`.trim()}</span>
                    </span>
                    <span className="text-fg-muted"><Icon name="arrow-right" size={16} /></span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-fg-body">Ahora no hay cursos abiertos que otorguen credencial.</p>
          )}
          <NavButton href="/talent/courses" variant="ghost" iconAfter="arrow-right" className="-ml-4 self-start">
            Ver todos los cursos
          </NavButton>
        </section>
      </div>
    </div>
  );
}
