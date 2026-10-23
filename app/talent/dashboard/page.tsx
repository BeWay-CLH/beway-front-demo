import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NavButton } from '@/components/NavButton';
import { companies } from '@/data/mock';
import { completionOf } from '@/lib/completion';
import type { CompletionItem } from '@/lib/models/profile';
import { requireSession } from '@/lib/session';
import { getAccountSettings, getProfileForm } from '@/lib/services/profiles';

export const metadata: Metadata = { title: 'Inicio · BeWay' };

/* Lo que falta, con la acción que lo resuelve. El orden sigue el del porcentaje. */
const nextStep: Record<CompletionItem, { title: string; description: string; href: string }> = {
  headline: {
    title: 'Añade un titular',
    description: 'Una frase sobre lo que haces. Aparece junto a tu nombre.',
    href: '/talent/profile/edit',
  },
  about: {
    title: 'Escribe unas frases sobre ti',
    description: 'Qué estudias o haces, y qué buscas.',
    href: '/talent/profile/edit',
  },
  experience: {
    title: 'Añade tu primera experiencia',
    description: 'Puede ser una práctica, un trabajo o un proyecto.',
    href: '/talent/profile/edit',
  },
  education: {
    title: 'Añade tu formación',
    description: 'Tu grado, máster o curso más relevante.',
    href: '/talent/profile/edit',
  },
  interests: {
    title: 'Elige al menos un interés',
    description: 'Los temas que eliges se ven en tu perfil.',
    href: '/talent/profile/edit',
  },
};

/* Apartados que ya están listos, para mostrarlos junto a los que faltan. */
const doneLabel: Record<CompletionItem, string> = {
  headline: 'titular',
  about: 'presentación',
  experience: 'experiencia',
  education: 'formación',
  interests: 'intereses',
};

/* Lista en castellano: "a, b y c"; "e" delante de palabras que empiezan por i. */
function joinEs(items: string[]): string {
  if (items.length <= 1) return items.join('');
  const last = items[items.length - 1];
  return `${items.slice(0, -1).join(', ')} ${last.startsWith('i') ? 'e' : 'y'} ${last}`;
}

export default async function TalentDashboard() {
  const session = await requireSession();
  const [form, settings] = await Promise.all([
    getProfileForm(session.userId),
    getAccountSettings(session.userId),
  ]);
  if (!form || !settings) notFound();

  const completion = completionOf(form);
  const missing = completion.missing.map((item) => nextStep[item]);
  const firstName = session.displayName.split(' ')[0];
  const finding =
    missing.length > 0
      ? `Lo siguiente: ${missing[0].title.toLowerCase()}.`
      : 'Tu perfil está completo. Revísalo como lo ve otra persona.';

  const ready = (Object.keys(doneLabel) as CompletionItem[])
    .filter((item) => !completion.missing.includes(item))
    .map((item) => doneLabel[item]);

  const tiles = [
    { label: 'Visibilidad', value: settings.visibility === 'public' ? 'Pública' : 'Privada' },
    { label: 'Intereses', value: String(form.interests.length) },
    { label: 'Habilidades', value: String(form.skills.length) },
    { label: 'Experiencia', value: String(form.experience.length) },
  ];

  return (
    <div className="mx-auto flex w-full max-w-275 flex-col gap-8 px-4 py-8 md:px-6 md:py-10">
      <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-3">
          <h1 className="text-h2 font-heading text-fg-heading md:text-h1">
            {`Hola, ${firstName}. Tu perfil está al ${completion.percent} %.`}
          </h1>
          <p className="text-fg-muted">{finding}</p>
        </div>
        {missing.length > 0 ? (
          <NavButton href="/talent/profile/edit" size="lg" iconAfter="arrow-right" className="self-start md:self-auto">
            Completar mi perfil
          </NavButton>
        ) : null}
      </header>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {tiles.map((tile) => (
          <div key={tile.label} className="flex flex-col gap-2 rounded-card border border-line-subtle bg-surface-card p-5">
            <span className="text-sm text-fg-muted">{tile.label}</span>
            <span className="font-heading text-h2 tabular-nums text-fg-heading">{tile.value}</span>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-12">
        <section
          aria-labelledby="pending-title"
          className="flex flex-col gap-4 rounded-card border border-line-subtle bg-surface-card p-6 md:col-span-9"
        >
          <h2 id="pending-title" className="text-h3 font-heading text-fg-heading">Qué falta</h2>
          {missing.length > 0 ? (
            <ul className="flex flex-col">
              {missing.map((item) => (
                <li
                  key={item.title}
                  className="flex flex-col gap-3 border-t border-line-subtle py-4 first:border-t-0 first:pt-0 last:pb-0 md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-fg-heading">{item.title}</span>
                    <span className="text-sm text-fg-muted">{item.description}</span>
                  </div>
                  <NavButton href={item.href} variant="ghost" iconAfter="arrow-right" className="self-start md:self-auto">
                    Completar
                  </NavButton>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-fg-body">No te falta nada en el perfil.</p>
          )}
          {ready.length > 0 ? (
            <p className="text-sm text-fg-muted">Ya tienes listo: {joinEs(ready)}.</p>
          ) : null}
        </section>

        <section
          aria-labelledby="profile-title"
          className="flex flex-col gap-4 rounded-card border border-line-subtle bg-surface-card p-6 md:col-span-3"
        >
          <h2 id="profile-title" className="text-h3 font-heading text-fg-heading">Tu perfil</h2>
          <p className="text-sm text-fg-muted">
            {settings.visibility === 'public' ? 'Cualquiera con el enlace puede verlo.' : 'Solo lo ves tú.'}
          </p>
          <NavButton href={`/u/${session.username}`} variant="secondary" iconAfter="arrow-right" className="self-start">
            Ver mi perfil
          </NavButton>
        </section>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <section
          aria-labelledby="companies-title"
          className="flex flex-col gap-4 rounded-card border border-line-subtle bg-surface-card p-6"
        >
          <h2 id="companies-title" className="text-h3 font-heading text-fg-heading">Empresas del ecosistema</h2>
          <ul className="flex flex-col">
            {companies.slice(0, 3).map((company) => (
              <li key={company.id} className="flex items-center justify-between gap-4 border-t border-line-subtle py-3 first:border-t-0 first:pt-0">
                <span className="font-semibold text-fg-heading">{company.name}</span>
                <span className="text-sm text-fg-muted">{company.category}</span>
              </li>
            ))}
          </ul>
          <NavButton href="/companies" variant="ghost" iconAfter="arrow-right" className="-ml-4 self-start">
            Ver todas las empresas
          </NavButton>
        </section>

        <section
          aria-labelledby="account-title"
          className="flex flex-col gap-4 rounded-card border border-line-subtle bg-surface-card p-6"
        >
          <h2 id="account-title" className="text-h3 font-heading text-fg-heading">Tu cuenta</h2>
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-sm">
            <dt className="text-fg-muted">Correo</dt>
            <dd className="text-fg-body">{settings.email}</dd>
            <dt className="text-fg-muted">Nombre de usuario</dt>
            <dd className="text-fg-body">{settings.username}</dd>
            <dt className="text-fg-muted">Encuestas nuevas</dt>
            <dd className="text-fg-body">{settings.notifications.surveys ? 'Activadas' : 'Desactivadas'}</dd>
            <dt className="text-fg-muted">Cursos</dt>
            <dd className="text-fg-body">{settings.notifications.courses ? 'Activados' : 'Desactivados'}</dd>
          </dl>
          <NavButton href="/talent/settings" variant="ghost" iconAfter="arrow-right" className="-ml-4 self-start">
            Ajustes de cuenta
          </NavButton>
        </section>
      </div>
    </div>
  );
}
