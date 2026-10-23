'use client';

import { useEffect, useState, useTransition } from 'react';
import { Alert, Button, Checkbox, StepNav } from '@ds';
import { readStored, parseStored, writeStored } from '@/components/demo-store';
import { NavButton } from '@/components/NavButton';
import { submitSurveyAnswers } from '@/lib/actions/surveys';
import { formatList } from '@/lib/format';
import type { SurveyAnswersVM, SurveyDetailVM, SurveyQuestionVM } from '@/lib/models/survey';
import { QuestionField, type AnswerValue } from './QuestionField';
import { SurveyFacts } from './SurveyFacts';
import { questionsText } from './survey-labels';
import { completedKey, draftKey, useCompletedSurveys, type SurveyDraft } from './survey-store';

/* Responder una encuesta (E-03): introducción con consentimiento, una pantalla por sección, revisión y envío.
   El borrador vive en sessionStorage (con try/catch); enviar es una simulación y nunca dice que se guardó (DEC-006).
   El progreso es un dato ("1 de 3 secciones completadas"), no "Paso 1 de 3" (DEC-028). */

type Phase = 'intro' | 'review' | 'sent' | number;

const isAnswered = (q: SurveyQuestionVM, v: AnswerValue | undefined): boolean => {
  if (v === undefined) return false;
  if (q.type === 'multiple') return Array.isArray(v) && v.length > 0;
  if (q.type === 'scale') return typeof v === 'number';
  return typeof v === 'string' && v.trim().length > 0;
};

/* Qué falta para poder avanzar, dicho de forma que se pueda arreglar. */
const problemOf = (q: SurveyQuestionVM, v: AnswerValue | undefined): string | undefined => {
  if (!q.required || isAnswered(q, v)) return undefined;
  if (q.type === 'multiple') return 'Elige al menos una opción para continuar.';
  if (q.type === 'scale') return `Elige un valor del 1 al ${q.max} para continuar.`;
  if (q.type === 'single') return 'Elige una opción para continuar.';
  return 'Escribe tu respuesta para continuar.';
};

function displayAnswer(q: SurveyQuestionVM, v: AnswerValue | undefined): string | undefined {
  if (!isAnswered(q, v)) return undefined;
  if (q.type === 'single') return q.options.find((o) => o.value === v)?.label ?? String(v);
  if (q.type === 'multiple') return formatList((v as string[]).map((x) => q.options.find((o) => o.value === x)?.label ?? x));
  if (q.type === 'scale') return `${v} de ${q.max}`;
  return String(v);
}

function focusQuestion(id: string) {
  requestAnimationFrame(() => document.getElementById(`q-${id}`)?.querySelector<HTMLElement>('input, textarea')?.focus());
}

export function SurveyRunner({ survey, userId }: { survey: SurveyDetailVM; userId: string }) {
  const { sections } = survey;
  const completedIds = useCompletedSurveys(userId);
  const [answers, setAnswers] = useState<SurveyAnswersVM>({});
  const [consent, setConsent] = useState(false);
  const [restored, setRestored] = useState(false);
  const [phase, setPhase] = useState<Phase>('intro');
  const [reached, setReached] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [consentError, setConsentError] = useState<string>();
  const [pending, startTransition] = useTransition();

  /* Un borrador del navegador manda sobre el del servidor (BE-012: el servidor permite seguir en otro dispositivo). */
  useEffect(() => {
    const stored = parseStored<SurveyDraft>(readStored(draftKey(userId, survey.id)));
    if (stored) {
      setAnswers(stored.answers ?? {});
      setConsent(Boolean(stored.consent));
    } else if (survey.savedDraft) {
      setAnswers(survey.savedDraft);
    }
    setRestored(true);
  }, [userId, survey.id, survey.savedDraft]);

  useEffect(() => {
    if (!restored || phase === 'sent') return;
    const hasAnything = Object.keys(answers).length > 0 || consent;
    writeStored(draftKey(userId, survey.id), hasAnything ? ({ answers, consent } satisfies SurveyDraft) : null);
  }, [answers, consent, restored, phase, userId, survey.id]);

  const hasProgress = Object.keys(answers).length > 0;
  const sectionProblems = (index: number) =>
    Object.fromEntries(
      sections[index].questions.flatMap((q) => {
        const p = problemOf(q, answers[q.id]);
        return p ? [[q.id, p] as const] : [];
      }),
    );
  const firstIncomplete = () => {
    const i = sections.findIndex((_, idx) => Object.keys(sectionProblems(idx)).length > 0);
    return i === -1 ? 0 : i;
  };

  const goTo = (target: Phase) => {
    setErrors({});
    setPhase(target);
    const index = typeof target === 'number' ? target : target === 'review' ? sections.length : 0;
    setReached((r) => Math.max(r, index));
  };

  const setAnswer = (q: SurveyQuestionVM, value: AnswerValue) => {
    setAnswers((a) => ({ ...a, [q.id]: value }));
    setErrors((e) => {
      if (!e[q.id]) return e;
      const { [q.id]: _gone, ...rest } = e;
      return rest;
    });
  };

  const start = () => {
    if (survey.consent.required && !consent) {
      setConsentError('Acepta para empezar. Es lo que nos permite recoger tus respuestas.');
      return;
    }
    setConsentError(undefined);
    goTo(hasProgress ? firstIncomplete() : 0);
  };

  const next = () => {
    if (typeof phase !== 'number') return;
    const problems = sectionProblems(phase);
    if (Object.keys(problems).length > 0) {
      setErrors(problems);
      focusQuestion(Object.keys(problems)[0]);
      return;
    }
    goTo(phase + 1 < sections.length ? phase + 1 : 'review');
  };

  const send = () => {
    const bad = sections.findIndex((_, i) => Object.keys(sectionProblems(i)).length > 0);
    if (bad !== -1) {
      const problems = sectionProblems(bad);
      setPhase(bad);
      setErrors(problems);
      focusQuestion(Object.keys(problems)[0]);
      return;
    }
    startTransition(async () => {
      await submitSurveyAnswers(survey.id, answers);
      writeStored(draftKey(userId, survey.id), null);
      writeStored(completedKey(userId), [...completedIds.filter((id) => id !== survey.id), survey.id]);
      setPhase('sent');
    });
  };

  /* Enviada: ahora mismo o antes, en esta sesión. */
  if (phase === 'sent' || completedIds.includes(survey.id)) {
    return (
      <div className="flex flex-col gap-6 rounded-card border border-line-subtle bg-surface-card p-6">
        <Alert tone="info" title="Simulación">
          No hemos guardado tus respuestas. En la demo, esta encuesta aparece como completada mientras no cierres esta pestaña.
        </Alert>
        <p className="text-fg-body">
          {phase === 'sent'
            ? `Tus respuestas no han salido de este navegador. Con una cuenta real, las recibirían ${survey.publisher.name} y BeWay.`
            : 'Ya la enviaste en esta sesión.'}
        </p>
        <div>
          <NavButton href="/talent/surveys" size="lg" iconAfter="arrow-right">
            Ver mis encuestas
          </NavButton>
        </div>
      </div>
    );
  }

  const stepIndex = typeof phase === 'number' ? phase : phase === 'review' ? sections.length : -1;
  const completed = Array.from({ length: Math.min(reached, sections.length) }, (_, i) => i);
  const errorCount = Object.keys(errors).length;

  if (phase === 'intro') {
    return (
      <div className="grid gap-4 md:grid-cols-12">
        <section
          aria-labelledby="about-title"
          className="flex flex-col gap-6 rounded-card border border-line-subtle bg-surface-card p-6 md:col-span-7"
        >
          <h2 id="about-title" className="text-h3 font-heading text-fg-heading">Sobre esta encuesta</h2>
          <p className="text-fg-body">{survey.intro}</p>
          <SurveyFacts survey={survey} sectionCount={sections.length} />
        </section>

        <section
          aria-labelledby="before-title"
          className="flex flex-col gap-5 rounded-card border border-line-subtle bg-surface-card p-6 md:col-span-5"
        >
          <h2 id="before-title" className="text-h3 font-heading text-fg-heading">Antes de empezar</h2>
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-fg-heading">Quién verá tus respuestas</p>
            <p className="text-sm text-fg-body">{survey.privacyNote}</p>
          </div>
          <div className="flex flex-col gap-2">
            <Checkbox
              id="survey-consent"
              label={survey.consent.text}
              checked={consent}
              required={survey.consent.required}
              aria-invalid={consentError ? true : undefined}
              aria-describedby={consentError ? 'survey-consent-error' : undefined}
              onChange={(next) => {
                setConsent(next);
                if (next) setConsentError(undefined);
              }}
            />
            {consentError ? (
              <p id="survey-consent-error" className="text-sm text-status-danger-text">{consentError}</p>
            ) : null}
          </div>
          {hasProgress ? (
            <p className="text-sm text-fg-muted">Ya tienes respuestas. Seguirás donde lo dejaste.</p>
          ) : null}
          <div>
            <Button type="button" size="lg" iconAfter="arrow-right" onClick={start}>
              {hasProgress ? 'Continuar' : 'Empezar'}
            </Button>
          </div>
        </section>

        <section
          aria-labelledby="asks-title"
          className="flex flex-col gap-4 rounded-card border border-line-subtle bg-surface-card p-6 md:col-span-12"
        >
          <h2 id="asks-title" className="text-h3 font-heading text-fg-heading">Qué te preguntaremos</h2>
          <ol className="flex flex-col gap-4 md:flex-row md:gap-6">
            {sections.map((s) => (
              <li key={s.id} className="flex flex-col gap-1 md:flex-1">
                <span className="font-semibold text-fg-heading">{s.title}</span>
                {s.description ? <span className="text-sm text-fg-muted">{s.description}</span> : null}
                <span className="text-sm text-fg-body">{questionsText(s.questions.length)}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 md:flex-row md:items-start">
      <div className="flex flex-col gap-2 md:hidden" aria-live="polite">
        <p className="text-sm text-fg-muted">{`${completed.length} de ${sections.length} secciones completadas`}</p>
        <div className="h-1.5 w-full rounded-full bg-line-subtle" aria-hidden="true">
          <div className="h-full rounded-full bg-action-primary" style={{ width: `${(completed.length / sections.length) * 100}%` }} />
        </div>
      </div>
      <div className="hidden flex-none md:block">
        <StepNav
          steps={[...sections.map((s) => s.title), 'Revisar y enviar']}
          width={300}
          current={stepIndex}
          completed={completed}
          title="Tu encuesta"
          percent={Math.round((completed.length / sections.length) * 100)}
          meta={`${completed.length} de ${sections.length} secciones completadas`}
          onSelect={(index) => {
            if (index <= reached) goTo(index === sections.length ? 'review' : index);
          }}
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-6 rounded-card border border-line-subtle bg-surface-card p-6">
        {typeof phase === 'number' ? (
          <>
            <div className="flex flex-col gap-1">
              <h2 className="text-h3 font-heading text-fg-heading">{sections[phase].title}</h2>
              {sections[phase].description ? <p className="text-sm text-fg-muted">{sections[phase].description}</p> : null}
            </div>
            <div className="flex flex-col gap-8">
              {sections[phase].questions.map((q) => (
                <QuestionField key={q.id} question={q} value={answers[q.id]} error={errors[q.id]} onChange={(v) => setAnswer(q, v)} />
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-1">
              <h2 className="text-h3 font-heading text-fg-heading">Revisa tus respuestas</h2>
              <p className="text-sm text-fg-muted">Al enviar no podrás cambiarlas. Si algo no es correcto, edítalo antes.</p>
            </div>
            <div className="flex flex-col gap-6">
              {sections.map((section, index) => (
                <section key={section.id} aria-labelledby={`rv-${section.id}`} className="flex flex-col border-t border-line-subtle pt-4 first:border-t-0 first:pt-0">
                  <div className="flex items-center justify-between gap-4">
                    <h3 id={`rv-${section.id}`} className="font-semibold text-fg-heading">{section.title}</h3>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      aria-label={`Editar ${section.title}`}
                      style={{ marginRight: 'calc(var(--space-3) * -1)' }}
                      onClick={() => goTo(index)}
                    >
                      Editar
                    </Button>
                  </div>
                  <dl className="flex flex-col">
                    {section.questions.map((q) => {
                      const shown = displayAnswer(q, answers[q.id]);
                      return (
                        <div key={q.id} className="flex flex-col gap-1 border-t border-line-subtle py-3 first:border-t-0 md:flex-row md:justify-between md:gap-8">
                          <dt className="text-sm text-fg-muted md:max-w-[45%]">{q.prompt}</dt>
                          <dd className={`min-w-0 break-words md:text-right ${shown ? 'text-fg-body' : 'text-fg-muted'}`}>
                            {shown ?? 'Sin respuesta'}
                          </dd>
                        </div>
                      );
                    })}
                  </dl>
                </section>
              ))}
            </div>
          </>
        )}

        {errorCount > 0 ? (
          <Alert tone="warning" title="Falta una respuesta">
            {errorCount === 1 ? 'Responde a la pregunta marcada para continuar.' : `Responde a las ${errorCount} preguntas marcadas para continuar.`}
          </Alert>
        ) : null}

        <div className="flex flex-col-reverse gap-3 border-t border-line-subtle pt-6 sm:flex-row sm:justify-between">
          <Button
            type="button"
            variant="ghost"
            icon="arrow-left"
            onClick={() => goTo(phase === 'review' ? sections.length - 1 : phase === 0 ? 'intro' : (phase as number) - 1)}
          >
            Atrás
          </Button>
          {phase === 'review' ? (
            <Button type="button" size="lg" disabled={pending} onClick={send}>
              {pending ? 'Enviando…' : 'Enviar respuestas'}
            </Button>
          ) : (
            <Button type="button" size="lg" iconAfter="arrow-right" onClick={next}>
              {phase === sections.length - 1 ? 'Revisar' : 'Siguiente'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
