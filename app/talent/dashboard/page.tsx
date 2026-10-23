import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Icon } from '@ds';
import { NavButton } from '@/components/NavButton';
import { CompletionRail } from '@/components/dashboard/CompletionRail';
import { SuggestedCompanies } from '@/components/dashboard/SuggestedCompanies';
import { formatList } from '@/lib/format';
import type { TalentDashboardVM } from '@/lib/models/dashboard';
import { requireSession } from '@/lib/session';
import { getTalentDashboard } from '@/lib/services/dashboard';

export const metadata: Metadata = { title: 'Inicio · BeWay' };

/* Título y hallazgo según el estado del perfil (DESIGN.md: pregunta y hallazgo de cada pantalla). */
function headline(d: TalentDashboardVM): { title: string; finding: string } {
  const pending = d.steps.filter((s) => !s.done);
  if (d.isNew) {
    return {
      title: `Hola, ${d.greetingName}. Vamos a montar tu perfil.`,
      finding: 'Son cuatro pasos y puedes dejarlo cuando quieras.',
    };
  }
  if (pending.length > 0) {
    return {
      /* Espacio duro antes del %: en móvil no puede quedarse solo en la segunda línea. */
      title: `Hola, ${d.greetingName}. Tu perfil está al ${d.completion.percent} %.`,
      finding: `Lo siguiente: ${pending[0].title.toLowerCase()}.`,
    };
  }
  return {
    title: `Hola, ${d.greetingName}. Tu perfil está completo.`,
    finding:
      d.visibility === 'public'
        ? 'Revísalo como lo ve otra persona.'
        : 'Ahora solo lo ves tú. Puedes hacerlo visible en Ajustes.',
  };
}

export default async function TalentDashboard() {
  const session = await requireSession();
  const dashboard = await getTalentDashboard(session.userId);
  if (!dashboard) notFound();

  const { title, finding } = headline(dashboard);
  const pending = dashboard.steps.filter((s) => !s.done);
  const ready = dashboard.steps.filter((s) => s.done).map((s) => s.label);

  const quickLinks = [
    { label: 'Editar mi perfil', description: 'Añade lo que falta o cambia lo que ya tienes.', href: '/talent/profile/edit', icon: 'pencil' },
    {
      label: 'Ver mi perfil',
      description: dashboard.visibility === 'public' ? 'Así lo ve cualquiera con el enlace.' : 'Ahora solo lo ves tú.',
      href: `/u/${dashboard.username}`,
      icon: 'user-round',
    },
    { label: 'Explorar empresas', description: 'Descubre fichas y sigue las que te interesen.', href: '/companies', icon: 'building-2' },
    { label: 'Ajustes', description: 'Cuenta, privacidad y avisos.', href: '/talent/settings', icon: 'settings' },
  ];

  return (
    <div className="mx-auto flex w-full max-w-275 flex-col gap-8 px-4 py-8 md:px-6 md:py-10">
      <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-3">
          <h1 className="text-h2 font-heading text-fg-heading md:text-h1">{title}</h1>
          <p className="text-fg-muted">{finding}</p>
        </div>
        {dashboard.nextStep ? (
          <NavButton
            href={dashboard.nextStep.href}
            variant="primary"
            size="lg"
            iconAfter="arrow-right"
            className="self-start md:self-auto"
          >
            {dashboard.nextStep.label}
          </NavButton>
        ) : null}
      </header>

      {pending.length > 0 ? (
        <section
          aria-labelledby="pending-title"
          className="flex flex-col gap-6 rounded-card border border-line-subtle bg-surface-card p-6"
        >
          <div className="flex flex-col gap-1">
            <h2 id="pending-title" className="text-h3 font-heading text-fg-heading">Qué falta en tu perfil</h2>
            <p className="text-sm text-fg-muted">
              {`Tienes ${dashboard.steps.length - pending.length} de ${dashboard.steps.length} apartados listos.`}
            </p>
          </div>
          <CompletionRail steps={dashboard.steps} />
          {ready.length > 0 ? (
            <p className="text-sm text-fg-muted md:hidden">Ya tienes listo: {formatList(ready)}.</p>
          ) : null}
          <ul className="flex flex-col">
            {pending.map((step) => (
              <li
                key={step.item}
                className="flex flex-col gap-3 border-t border-line-subtle py-4 first:pt-0 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-fg-heading">{step.title}</span>
                  <span className="text-sm text-fg-muted">{step.description}</span>
                </div>
                <NavButton href={step.href} variant="ghost" iconAfter="arrow-right" className="self-start md:self-auto">
                  Completar
                </NavButton>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="grid gap-4 md:grid-cols-12">
        <section
          aria-labelledby="companies-title"
          className="flex flex-col gap-4 rounded-card border border-line-subtle bg-surface-card p-6 md:col-span-7"
        >
          <div className="flex flex-col gap-1">
            <h2 id="companies-title" className="text-h3 font-heading text-fg-heading">Empresas de tus intereses</h2>
            {dashboard.interests.length > 0 ? (
              <p className="text-sm text-fg-muted">{`Por los temas de tu perfil: ${formatList(dashboard.interests)}.`}</p>
            ) : null}
          </div>
          {dashboard.interests.length > 0 ? (
            <SuggestedCompanies
              userId={session.userId}
              interests={dashboard.interests}
              candidates={dashboard.interestCompanies}
              followedIds={dashboard.followedIds}
            />
          ) : (
            <div className="flex flex-col items-start gap-3">
              <p className="text-fg-body">Elige los temas que te interesan y te enseñamos empresas de esos temas.</p>
              <NavButton href="/talent/profile/edit#intereses" variant="ghost" iconAfter="arrow-right" className="-ml-4">
                Elegir intereses
              </NavButton>
            </div>
          )}
        </section>

        <section
          aria-labelledby="quick-title"
          className="flex flex-col gap-4 rounded-card border border-line-subtle bg-surface-card p-6 md:col-span-5"
        >
          <h2 id="quick-title" className="text-h3 font-heading text-fg-heading">Accesos rápidos</h2>
          <ul className="flex flex-col">
            {quickLinks.map((link) => (
              <li key={link.href} className="border-t border-line-subtle first:border-t-0">
                <Link
                  href={link.href}
                  className="transition-control flex items-center gap-4 py-3 text-fg-heading hover:text-fg-accent"
                >
                  <span className="flex-none text-fg-muted"><Icon name={link.icon} size={20} /></span>
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="font-semibold">{link.label}</span>
                    <span className="text-sm text-fg-muted">{link.description}</span>
                  </span>
                  <span className="text-fg-muted"><Icon name="arrow-right" size={16} /></span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
