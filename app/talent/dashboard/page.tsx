import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button, Icon } from '@ds';
import { AccreditationDialog } from '@/components/credentials/AccreditationDialog';
import { SuggestedCompanies } from '@/components/dashboard/SuggestedCompanies';
import { formatDate } from '@/lib/format';
import type { TalentDashboardVM } from '@/lib/models/dashboard';
import { requireSession } from '@/lib/session';
import { getChallenges } from '@/lib/services/challenges';
import { getCredentials } from '@/lib/services/credentials';
import { getTalentDashboard } from '@/lib/services/dashboard';

export const metadata: Metadata = { title: 'Mi panel · BeWay' };

/* Mi panel (guía de correcciones, fichas 21 y 22). Primer pantallazo: saludo, bloque navy "Próximo paso" y dos columnas
   1.75 : 1. Orden de la columna principal: Tu semana, Empresas para ti, Oportunidades para ti, Retos recomendados,
   Mis certificaciones. Orden de la columna derecha: BEWAY Score, Tu ranking de talento, Próximos eventos, Tu voz.
   Las cifras de ejemplo (score, ranking) se rotulan y no se calculan. */

function headline(d: TalentDashboardVM): string {
  return `Hola, ${d.greetingName}.`;
}

/* Anillo de ejemplo (SVG, sin gradiente). El valor se marca como ejemplo: no hay fórmula de puntuación. */
function ScoreRing() {
  const r = 46;
  const c = 2 * Math.PI * r;
  const share = 0.6;
  return (
    <svg viewBox="0 0 120 120" width="120" height="120" role="img" aria-label="Anillo de ejemplo del BEWAY Score">
      <circle cx="60" cy="60" r={r} fill="none" stroke="var(--surface-sunken)" strokeWidth="10" />
      <circle cx="60" cy="60" r={r} fill="none" stroke="var(--accent-teal)" strokeWidth="10" strokeLinecap="round" strokeDasharray={`${c * share} ${c}`} transform="rotate(-90 60 60)" />
      <text x="60" y="66" textAnchor="middle" className="font-heading" fontSize="22" fontWeight="700" fill="var(--text-heading)">—</text>
    </svg>
  );
}

export default async function TalentDashboard() {
  const session = await requireSession();
  const dashboard = await getTalentDashboard(session.userId);
  if (!dashboard) notFound();

  const [credentials, challenges] = await Promise.all([getCredentials(session.userId), getChallenges({ kind: 'challenge' })]);
  const pending = dashboard.steps.filter((s) => !s.done);
  const openChallenges = challenges.filter((c) => c.status === 'open').slice(0, 2);
  const week = [
    ...dashboard.surveys.slice(0, 3).map((s) => ({ key: `s-${s.id}`, text: s.title, meta: `Encuesta de ${s.publisher.name}`, href: `/talent/surveys/${s.slug}` })),
    ...dashboard.courses.slice(0, 2).map((c) => ({ key: `c-${c.id}`, text: c.title, meta: `Certificación de ${c.provider}`, href: `/talent/courses/${c.slug}` })),
  ];

  return (
    <div className="mx-auto flex w-full max-w-site flex-col gap-7 px-4 pt-9 pb-16 md:px-8">
      <header className="flex flex-col gap-2">
        <p className="eyebrow m-0 text-fg-muted uppercase">Mi panel</p>
        <h1 className="m-0 font-heading text-[30px] leading-[1.2] font-[700] text-fg-heading md:text-[38px] [letter-spacing:var(--tracking-h1)]">
          {headline(dashboard)}
        </h1>
        <p className="m-0 text-fg-muted">
          {pending.length > 0 ? `Tu perfil está al ${dashboard.completion.percent} %. Lo siguiente, en un paso.` : 'Tu perfil está completo.'}
        </p>
      </header>

      <section aria-labelledby="next-title" className="flex flex-col gap-5 rounded-card bg-surface-inverse p-6 text-white md:flex-row md:items-center md:p-8">
        <span className="flex size-12 flex-none items-center justify-center rounded-control bg-white/10 text-white">
          <Icon name="arrow-right" size={22} />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <p className="eyebrow m-0 uppercase opacity-80">Próximo paso</p>
          <h2 id="next-title" className="m-0 font-heading text-[24px] leading-[1.35] font-[600] text-white">
            {dashboard.nextStep ? dashboard.nextStep.label : 'Tu perfil está listo'}
          </h2>
          <div className="flex items-center gap-3">
            <div className="h-1.5 w-full max-w-xs overflow-hidden rounded-pill bg-white/20" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={dashboard.completion.percent} aria-label="Perfil completado">
              <div className="h-full bg-accent-teal" style={{ width: `${dashboard.completion.percent}%` }} />
            </div>
            <span className="text-xs opacity-80">{dashboard.completion.percent} %</span>
          </div>
        </div>
        <Button href={dashboard.nextStep ? dashboard.nextStep.href : `/u/${dashboard.username}`} variant="secondary" iconAfter="arrow-right" className="flex-none self-start md:self-auto">
          {dashboard.nextStep ? 'Continuar' : 'Ver mi perfil'}
        </Button>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.75fr_1fr]">
        <div className="flex min-w-0 flex-col gap-6">
          <section aria-labelledby="week-title" className="flex flex-col gap-4 rounded-card border border-line-subtle bg-surface-card p-6">
            <h2 id="week-title" className="m-0 font-heading text-[17px] font-[600] text-fg-heading">Tu semana</h2>
            {week.length > 0 ? (
              <ul className="flex flex-col">
                {week.map((w) => (
                  <li key={w.key} className="border-t border-line-subtle first:border-t-0 first:pt-0">
                    <Link href={w.href} className="flex items-center justify-between gap-4 py-3 text-fg-heading hover:text-fg-accent">
                      <span className="flex flex-col">
                        <span className="font-[650]">{w.text}</span>
                        <span className="text-xs text-fg-muted">{w.meta}</span>
                      </span>
                      <Icon name="arrow-right" size={16} />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="m-0 text-sm text-fg-muted">No tienes encuestas ni cursos con fecha esta semana.</p>
            )}
          </section>

          <section aria-labelledby="companies-title" className="flex flex-col gap-4 rounded-card border border-line-subtle bg-surface-card p-6">
            <h2 id="companies-title" className="m-0 font-heading text-[17px] font-[600] text-fg-heading">Empresas para ti</h2>
            {dashboard.interests.length > 0 ? (
              <SuggestedCompanies userId={session.userId} interests={dashboard.interests} candidates={dashboard.interestCompanies} followedIds={dashboard.followedIds} />
            ) : (
              <div className="flex flex-col items-start gap-3">
                <p className="m-0 text-sm text-fg-body">Elige los temas que te interesan y te enseñamos empresas de esos temas.</p>
                <Link href="/talent/profile/edit#intereses" className="text-sm font-[650] text-fg-accent">Elegir intereses</Link>
              </div>
            )}
          </section>

          <section aria-labelledby="opps-title" className="flex flex-col gap-3 rounded-card border border-line-subtle bg-surface-card p-6">
            <h2 id="opps-title" className="m-0 font-heading text-[17px] font-[600] text-fg-heading">Oportunidades para ti</h2>
            <p className="m-0 text-sm text-fg-muted">Todavía no hay oportunidades publicadas para tu perfil.</p>
          </section>

          <section aria-labelledby="challenges-title" className="flex flex-col gap-4 rounded-card border border-line-subtle bg-surface-card p-6">
            <h2 id="challenges-title" className="m-0 font-heading text-[17px] font-[600] text-fg-heading">Retos recomendados</h2>
            {openChallenges.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {openChallenges.map((c) => (
                  <Link key={c.slug} href={`/talent/challenges/${c.slug}`} className="flex flex-col gap-2 rounded-card border border-line-subtle p-5 hover:bg-surface-sunken">
                    <span className="text-xs text-fg-muted">{c.companyName}</span>
                    <span className="font-[650] text-fg-heading">{c.title}</span>
                    <span className="text-xs text-fg-muted">{c.format}</span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="m-0 text-sm text-fg-muted">No hay retos abiertos ahora.</p>
            )}
          </section>

          <section aria-labelledby="creds-title" className="flex flex-col gap-4 rounded-card border border-line-subtle bg-surface-card p-6">
            <h2 id="creds-title" className="m-0 font-heading text-[17px] font-[600] text-fg-heading">Mis certificaciones</h2>
            {credentials.length > 0 ? (
              <ul className="flex flex-col">
                {credentials.slice(0, 3).map((c) => (
                  <li key={c.id} className="flex flex-col gap-2 border-t border-line-subtle py-3 first:border-t-0 first:pt-0 md:flex-row md:items-center md:justify-between">
                    <span className="flex flex-col">
                      <span className="font-[650] text-fg-heading">{c.title}</span>
                      <span className="text-xs text-fg-muted">{`${c.issuer}, ${formatDate(c.issuedAt)}`}</span>
                    </span>
                    <AccreditationDialog credential={c} holderName={session.displayName} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="m-0 text-sm text-fg-muted">Todavía no tienes certificaciones. <Link href="/talent/courses" className="font-[650] text-fg-accent">Explorar certificaciones</Link></p>
            )}
          </section>
        </div>

        <div className="flex min-w-0 flex-col gap-6 self-start">
          <section aria-labelledby="score-title" className="flex flex-col items-center gap-4 rounded-card border border-line-subtle bg-surface-card p-6">
            <h2 id="score-title" className="m-0 self-start font-heading text-[17px] font-[600] text-fg-heading">Mejora tu BEWAY Score</h2>
            <ScoreRing />
            <p className="m-0 text-center text-xs text-fg-muted">Ejemplo: el score real todavía no se calcula.</p>
            <div className="flex w-full flex-col gap-2">
              {['Perfil', 'Evidencias', 'Participación'].map((label) => (
                <div key={label} className="flex items-center gap-3 text-xs text-fg-muted">
                  <span className="w-24 flex-none">{label}</span>
                  <div className="h-1.5 flex-1 rounded-pill bg-surface-sunken" />
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="rank-title" className="flex flex-col gap-2 rounded-card border border-line-subtle bg-surface-card p-6">
            <h2 id="rank-title" className="m-0 font-heading text-[17px] font-[600] text-fg-heading">Tu ranking de talento</h2>
            <p className="m-0 text-sm text-fg-muted">Ejemplo: el ranking se mostrará cuando exista un cálculo real.</p>
          </section>

          <section aria-labelledby="events-title" className="flex flex-col gap-2 rounded-card border border-line-subtle bg-surface-card p-6">
            <h2 id="events-title" className="m-0 font-heading text-[17px] font-[600] text-fg-heading">Próximos eventos</h2>
            <p className="m-0 text-sm text-fg-muted">No hay eventos próximos publicados.</p>
          </section>

          <section aria-labelledby="voice-title" className="flex flex-col gap-2 rounded-card border border-line-subtle bg-surface-card p-6">
            <h2 id="voice-title" className="m-0 font-heading text-[17px] font-[600] text-fg-heading">Tu voz también cuenta</h2>
            <p className="m-0 text-sm text-fg-muted">Responde las encuestas de las empresas que te interesan.</p>
            <Link href="/talent/surveys" className="text-sm font-[650] text-fg-accent">Ver encuestas</Link>
          </section>
        </div>
      </div>
    </div>
  );
}
