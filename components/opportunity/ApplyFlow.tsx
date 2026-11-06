'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button, Icon } from '@ds';

/* Candidatura en tres pasos (guía de correcciones, fichas 29 y 30): Perfil, Motivación y Revisión. Paso a paso sin
   perder lo escrito. El envío no existe en la demo: el botón final queda deshabilitado y se dice por qué. */

type Profile = { displayName: string; headline: string; location: string; education: string };

const steps = ['Perfil', 'Motivación', 'Revisión'] as const;

export function ApplyFlow({ slug, title, company, profile }: { slug: string; title: string; company: string; profile: Profile }) {
  const [step, setStep] = useState(0);
  const [motivation, setMotivation] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [error, setError] = useState<string>();
  const [confirmed, setConfirmed] = useState(false);

  const next = () => {
    if (step === 1 && !motivation.trim()) {
      setError('Escribe tu motivación para continuar.');
      return;
    }
    setError(undefined);
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };
  const back = () => {
    setError(undefined);
    setStep((s) => Math.max(s - 1, 0));
  };

  return (
    <div className="mx-auto flex w-full max-w-[760px] flex-col gap-8 px-4 pt-8 pb-16 md:px-6">
      <header className="flex flex-col gap-3">
        <p className="eyebrow m-0 text-fg-muted uppercase">{company}</p>
        <h1 className="m-0 font-heading text-[30px] leading-[1.2] font-[700] text-fg-heading md:text-[38px] [letter-spacing:var(--tracking-h1)]">Tu candidatura.</h1>
        <p className="m-0 text-fg-body">{title}</p>
        <ol className="m-0 mt-2 flex flex-wrap gap-2 p-0" aria-label="Pasos de la candidatura">
          {steps.map((label, i) => (
            <li key={label} aria-current={i === step ? 'step' : undefined} className={`inline-flex items-center gap-2 rounded-control px-3 py-2 text-xs font-[650] ${i === step ? 'bg-action-primary text-fg-on-accent' : 'border border-line-control bg-surface-card text-fg-body'}`}>
              {i < step ? <Icon name="check" size={12} /> : null}
              {`${i + 1}. ${label}`}
            </li>
          ))}
        </ol>
      </header>

      {step === 0 ? (
        <section aria-labelledby="p1" className="flex flex-col gap-5 rounded-card border border-line-subtle bg-surface-card p-6 md:p-8">
          <h2 id="p1" className="m-0 font-heading text-[17px] font-[600] text-fg-heading">Empieza con lo que ya cuenta tu perfil.</h2>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1"><dt className="text-xs font-[650] uppercase tracking-[0.04em] text-fg-muted">Nombre</dt><dd className="m-0 text-sm text-fg-body">{profile.displayName || '—'}</dd></div>
            <div className="flex flex-col gap-1"><dt className="text-xs font-[650] uppercase tracking-[0.04em] text-fg-muted">Titular</dt><dd className="m-0 text-sm text-fg-body">{profile.headline || '—'}</dd></div>
            <div className="flex flex-col gap-1"><dt className="text-xs font-[650] uppercase tracking-[0.04em] text-fg-muted">Ubicación</dt><dd className="m-0 text-sm text-fg-body">{profile.location || '—'}</dd></div>
            <div className="flex flex-col gap-1"><dt className="text-xs font-[650] uppercase tracking-[0.04em] text-fg-muted">Formación</dt><dd className="m-0 text-sm text-fg-body">{profile.education || '—'}</dd></div>
          </dl>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-[650] uppercase tracking-[0.04em] text-fg-muted">CV</span>
            <p className="m-0 text-sm text-fg-body">La demo no tiene CV subido. Añádelo desde tu perfil cuando esté disponible.</p>
          </div>
          <div className="flex justify-between gap-3">
            <Link href={`/talent/opportunities/${slug}`} className="inline-flex h-[42px] items-center rounded-control px-4 text-xs font-[650] text-fg-body">Volver a la oportunidad</Link>
            <Button type="button" variant="primary" iconAfter="arrow-right" onClick={next}>Continuar</Button>
          </div>
        </section>
      ) : null}

      {step === 1 ? (
        <section aria-labelledby="p2" className="flex flex-col gap-5 rounded-card border border-line-subtle bg-surface-card p-6 md:p-8">
          <h2 id="p2" className="m-0 font-heading text-[17px] font-[600] text-fg-heading">Lo que te gustaría aportar.</h2>
          <div className="flex flex-col gap-2">
            <label htmlFor="motivation" className="text-xs font-[650] uppercase tracking-[0.04em] text-fg-muted">Tu motivación</label>
            <textarea id="motivation" value={motivation} onChange={(e) => setMotivation(e.target.value)} rows={6} aria-invalid={Boolean(error)} aria-describedby="motivation-help" className="rounded-control border border-line-control bg-surface-card px-3 py-2 text-sm text-fg-body" />
            <p id="motivation-help" className="m-0 text-xs text-fg-muted">Obligatorio. Dos o tres frases bastan.</p>
            {error ? <p role="alert" className="m-0 text-xs font-[650] text-status-danger-text">{error}</p> : null}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="portfolio" className="text-xs font-[650] uppercase tracking-[0.04em] text-fg-muted">Portfolio</label>
            <input id="portfolio" value={portfolio} onChange={(e) => setPortfolio(e.target.value)} placeholder="Opcional" className="h-[42px] rounded-control border border-line-control bg-surface-card px-3 text-sm text-fg-body" />
          </div>
          <div className="flex justify-between gap-3">
            <Button type="button" variant="ghost" icon="arrow-left" onClick={back}>Anterior</Button>
            <Button type="button" variant="primary" iconAfter="arrow-right" onClick={next}>Continuar</Button>
          </div>
        </section>
      ) : null}

      {step === 2 ? (
        <section aria-labelledby="p3" className="flex flex-col gap-5 rounded-card border border-line-subtle bg-surface-card p-6 md:p-8">
          <h2 id="p3" className="m-0 font-heading text-[17px] font-[600] text-fg-heading">Revisa antes de dar el siguiente paso.</h2>
          <dl className="flex flex-col gap-3 text-sm">
            <div className="flex flex-col gap-1"><dt className="text-xs text-fg-muted">Puesto</dt><dd className="m-0 text-fg-body">{title}</dd></div>
            <div className="flex flex-col gap-1"><dt className="text-xs text-fg-muted">Empresa</dt><dd className="m-0 text-fg-body">{company}</dd></div>
            <div className="flex flex-col gap-1"><dt className="text-xs text-fg-muted">Perfil</dt><dd className="m-0 text-fg-body">{profile.displayName || '—'}</dd></div>
            <div className="flex flex-col gap-1"><dt className="text-xs text-fg-muted">Motivación</dt><dd className="m-0 whitespace-pre-line text-fg-body">{motivation}</dd></div>
            {portfolio ? <div className="flex flex-col gap-1"><dt className="text-xs text-fg-muted">Portfolio</dt><dd className="m-0 text-fg-body">{portfolio}</dd></div> : null}
          </dl>
          <label className="flex items-start gap-3 text-sm text-fg-body">
            <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} className="mt-1" />
            Confirmo que mis datos son correctos y que quiero enviar esta candidatura.
          </label>
          <p className="m-0 rounded-control bg-surface-sunken p-3 text-xs text-fg-body">
            Simulación: en la demo no se envían candidaturas. El envío real llega con el backend y, hasta entonces, el botón queda deshabilitado.
          </p>
          <div className="flex flex-wrap justify-between gap-3">
            <Button type="button" variant="ghost" icon="arrow-left" onClick={back}>Anterior</Button>
            <Button type="button" variant="primary" disabled>Enviar candidatura (no disponible)</Button>
          </div>
        </section>
      ) : null}
    </div>
  );
}
