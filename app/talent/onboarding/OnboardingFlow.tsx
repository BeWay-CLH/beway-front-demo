'use client';

import { useEffect, useState, useTransition } from 'react';
import { Alert, Button, Field, Input, StepNav, Tag, Textarea } from '@ds';
import { NavButton } from '@/components/NavButton';
import { ToggleField } from '@/components/forms/ToggleField';
import { ProfilePreview } from '@/components/profile/ProfilePreview';
import { interestOptions } from '@/data/fixtures/profiles';
import { saveOwnProfile, saveOwnSettings } from '@/lib/actions/profile';
import type { AccountSettingsVM, ProfileFormVM, ProfileVisibility } from '@/lib/models/profile';

/* Onboarding en cuatro pasos. El borrador vive en sessionStorage (con try/catch: si el navegador lo bloquea,
   el borrador vive solo en la pantalla). Ningún paso guarda nada hasta "Terminar", y ese guardado es simulado. */

const STORAGE_KEY = 'bw-onboarding-draft';
const STEPS = ['Sobre ti', 'Formación y experiencia', 'Intereses', 'Privacidad'];
const TITLES = ['Sobre ti', 'Formación y experiencia', 'Intereses', 'Privacidad'];
const FINDINGS = [
  'Solo hace falta tu nombre. Lo demás puedes completarlo después.',
  'Todo es opcional. Un solo dato ya da contexto a tu perfil.',
  'Elige al menos uno para continuar. Puedes cambiarlos cuando quieras.',
  'Tu perfil empieza en privado: solo lo ves tú.',
];
const ABOUT_MAX = 500;

type Draft = {
  displayName: string;
  headline: string;
  location: string;
  about: string;
  educationTitle: string;
  educationInstitution: string;
  experienceRole: string;
  experienceOrganization: string;
  experienceStart: string;
  interests: string[];
  visibility: ProfileVisibility;
};

function draftFrom(initial: ProfileFormVM, visibility: ProfileVisibility): Draft {
  const exp = initial.experience[0];
  const edu = initial.education[0];
  return {
    displayName: initial.displayName,
    headline: initial.headline ?? '',
    location: initial.location ?? '',
    about: initial.about ?? '',
    educationTitle: edu?.title ?? '',
    educationInstitution: edu?.institution ?? '',
    experienceRole: exp?.role ?? '',
    experienceOrganization: exp?.organization ?? '',
    experienceStart: exp?.start ?? '',
    interests: initial.interests,
    visibility,
  };
}

/* El onboarding escribe el primer puesto y la primera formación; los demás elementos se conservan. */
function toForm(draft: Draft, initial: ProfileFormVM): ProfileFormVM {
  const role = draft.experienceRole.trim();
  const title = draft.educationTitle.trim();
  return {
    displayName: draft.displayName.trim(),
    headline: draft.headline.trim() || undefined,
    location: draft.location.trim() || undefined,
    about: draft.about.trim() || undefined,
    experience: [
      ...(role
        ? [{ id: 'exp-onboarding', role, organization: draft.experienceOrganization.trim(), start: draft.experienceStart || undefined }]
        : []),
      ...initial.experience.slice(1),
    ],
    education: [
      ...(title ? [{ id: 'edu-onboarding', title, institution: draft.educationInstitution.trim() }] : []),
      ...initial.education.slice(1),
    ],
    interests: draft.interests,
    skills: initial.skills,
  };
}

export function OnboardingFlow({ initial, settings }: { initial: ProfileFormVM; settings: AccountSettingsVM }) {
  const [draft, setDraft] = useState<Draft>(() => draftFrom(initial, settings.visibility));
  const [restored, setRestored] = useState(false);
  const [step, setStep] = useState(0);
  const [reached, setReached] = useState(0);
  const [error, setError] = useState<string>();
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setDraft({ ...draftFrom(initial, settings.visibility), ...(JSON.parse(raw) as Partial<Draft>) });
    } catch {
      /* Sin almacenamiento el borrador vive solo en esta pantalla. */
    }
    setRestored(true);
  }, [initial, settings.visibility]);

  useEffect(() => {
    if (!restored) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch {
      /* Ver arriba. */
    }
  }, [draft, restored]);

  const patch = (values: Partial<Draft>) => {
    setError(undefined);
    setDraft((d) => ({ ...d, ...values }));
  };

  const problemIn = (current: number): string | undefined => {
    if (current === 0) {
      const n = draft.displayName.trim().length;
      if (n < 2 || n > 80) return 'Escribe tu nombre con entre 2 y 80 caracteres para continuar.';
    }
    if (current === 2 && draft.interests.length === 0) return 'Elige al menos un interés para continuar.';
    return undefined;
  };

  const goTo = (target: number) => {
    setError(undefined);
    setStep(target);
    setReached((r) => Math.max(r, target));
  };

  const next = () => {
    const problem = problemIn(step);
    if (problem) return setError(problem);
    goTo(step + 1);
  };

  const finish = () => {
    const problem = problemIn(0) ?? problemIn(2);
    if (problem) return setError(problem);
    startTransition(async () => {
      await Promise.all([
        saveOwnProfile(toForm(draft, initial)),
        saveOwnSettings({ ...settings, visibility: draft.visibility }),
      ]);
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        /* Nada que limpiar. */
      }
      setDone(true);
    });
  };

  if (done) {
    return (
      <div className="mx-auto flex w-full max-w-275 flex-col gap-8 px-4 py-8 md:px-6 md:py-10">
        <header className="flex flex-col gap-3">
          <h1 className="text-h1 font-heading text-fg-heading">Onboarding completado en la demo</h1>
          <p className="text-fg-muted">Revisa tu perfil como lo verá otra persona.</p>
        </header>
        <Alert tone="info" title="Simulación">
          Tu perfil no se ha guardado. Lo que has escrito queda solo en esta pantalla, y el perfil de ejemplo de Lucía
          Martín sigue igual.
        </Alert>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Button type="button" variant="ghost" icon="arrow-left" onClick={() => setDone(false)}>
            Seguir editando
          </Button>
          <NavButton href={`/u/${settings.username}`} size="lg" iconAfter="arrow-right">
            Ver mi perfil
          </NavButton>
        </div>
      </div>
    );
  }

  const previewCard = { ...toForm(draft, initial), username: settings.username };
  const completed = Array.from({ length: reached }, (_, i) => i);

  return (
    <div className="mx-auto flex w-full max-w-275 flex-col gap-8 px-4 py-8 md:px-6 md:py-10">
      <header className="flex flex-col gap-3">
        <h1 className="text-h2 font-heading text-fg-heading md:text-h1">{TITLES[step]}</h1>
        <p className="text-fg-muted">{FINDINGS[step]}</p>
      </header>

      <div className="flex flex-col gap-8 md:flex-row md:items-start">
        <div className="flex flex-col gap-2 md:hidden">
          <p className="text-sm text-fg-muted">{completed.length} de {STEPS.length} secciones completadas</p>
          <div className="h-1.5 w-full rounded-full bg-line-subtle" aria-hidden="true">
            <div className="h-full rounded-full bg-action-primary" style={{ width: `${(completed.length / STEPS.length) * 100}%` }} />
          </div>
        </div>
        <div className="hidden flex-none md:block">
          <StepNav
            steps={STEPS} width={300}
            current={step}
            completed={completed}
            title="Tu perfil"
            onSelect={(index) => {
              if (index <= reached) goTo(index);
            }}
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-6 rounded-card border border-line-subtle bg-surface-card p-6">
          {step === 0 ? (
            <>
              <Field label="Nombre" htmlFor="ob-name" required>
                <Input id="ob-name" value={draft.displayName} autoComplete="name" onChange={(e) => patch({ displayName: e.target.value })} />
              </Field>
              <Field label="Titular" htmlFor="ob-headline" hint="Por ejemplo: Analista de datos junior.">
                <Input id="ob-headline" value={draft.headline} onChange={(e) => patch({ headline: e.target.value })} />
              </Field>
              <Field label="Ubicación" htmlFor="ob-location">
                <Input id="ob-location" value={draft.location} onChange={(e) => patch({ location: e.target.value })} />
              </Field>
              <Field label="Presentación" htmlFor="ob-about" hint={`${draft.about.length} / ${ABOUT_MAX}`}>
                <Textarea
                  id="ob-about"
                  rows={4}
                  maxLength={ABOUT_MAX}
                  value={draft.about}
                  onChange={(e) => patch({ about: e.target.value })}
                />
              </Field>
            </>
          ) : null}

          {step === 1 ? (
            <>
              <Field label="Título de tu formación" htmlFor="ob-edu-title" hint="Puedes añadir más después en tu perfil.">
                <Input id="ob-edu-title" value={draft.educationTitle} onChange={(e) => patch({ educationTitle: e.target.value })} />
              </Field>
              <Field label="Centro" htmlFor="ob-edu-inst">
                <Input id="ob-edu-inst" value={draft.educationInstitution} onChange={(e) => patch({ educationInstitution: e.target.value })} />
              </Field>
              <Field label="Tu puesto o práctica" htmlFor="ob-exp-role">
                <Input id="ob-exp-role" value={draft.experienceRole} onChange={(e) => patch({ experienceRole: e.target.value })} />
              </Field>
              <Field label="Organización" htmlFor="ob-exp-org">
                <Input id="ob-exp-org" value={draft.experienceOrganization} onChange={(e) => patch({ experienceOrganization: e.target.value })} />
              </Field>
              <Field label="Desde" htmlFor="ob-exp-start">
                <Input id="ob-exp-start" type="month" value={draft.experienceStart} onChange={(e) => patch({ experienceStart: e.target.value })} />
              </Field>
            </>
          ) : null}

          {step === 2 ? (
            <div role="group" aria-label="Intereses" className="flex flex-wrap gap-2">
              {interestOptions.map((name) => {
                const selected = draft.interests.includes(name);
                return (
                  <Tag
                    key={name}
                    selected={selected}
                    onClick={() =>
                      patch({ interests: selected ? draft.interests.filter((i) => i !== name) : [...draft.interests, name] })
                    }
                  >
                    {name}
                  </Tag>
                );
              })}
            </div>
          ) : null}

          {step === 3 ? (
            <div className="flex flex-col gap-6">
              <ToggleField
                name="visibility"
                label="Perfil público"
                description="Con el interruptor encendido, cualquier persona con el enlace puede ver tu perfil."
                checked={draft.visibility === 'public'}
                onChange={(on) => patch({ visibility: on ? 'public' : 'private' })}
              />
              <ProfilePreview card={previewCard} visibility={draft.visibility} />
            </div>
          ) : null}

          {error ? <Alert tone="warning" title="Falta un dato">{error}</Alert> : null}

          <div className="flex flex-col-reverse gap-3 border-t border-line-subtle pt-6 sm:flex-row sm:justify-between">
            {step > 0 ? (
              <Button type="button" variant="ghost" icon="arrow-left" className="-ml-4" onClick={() => goTo(step - 1)}>
                Atrás
              </Button>
            ) : (
              <span />
            )}
            {step < 3 ? (
              <Button type="button" size="lg" iconAfter="arrow-right" onClick={next}>
                Siguiente
              </Button>
            ) : (
              <Button type="button" size="lg" disabled={pending} onClick={finish}>
                {pending ? 'Guardando…' : 'Terminar'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
