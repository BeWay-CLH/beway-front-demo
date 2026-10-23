'use client';

import type { SurveyAnswersVM } from '@/lib/models/survey';
import { useStored } from '@/components/demo-store';

/* Estado simulado de encuestas en esta sesión (E-03). El borrador y "completada" solo viven en sessionStorage, por
   cuenta: nada llega a un servidor (DEC-006). Al cerrar la pestaña la encuesta vuelve a lo que dice el fixture. */

export type SurveyDraft = { answers: SurveyAnswersVM; consent: boolean };

export const draftKey = (userId: string, surveyId: string) => `beway-demo-survey-draft:${userId}:${surveyId}`;
export const completedKey = (userId: string) => `beway-demo-surveys-completed:${userId}`;

/* Ids de encuestas enviadas en esta sesión. */
export function useCompletedSurveys(userId?: string): string[] {
  return useStored<string[]>(userId ? completedKey(userId) : undefined) ?? [];
}

/* ¿Tiene esta persona un borrador local con alguna respuesta? */
export function useHasDraft(userId: string | undefined, surveyId: string): boolean {
  const draft = useStored<SurveyDraft>(userId ? draftKey(userId, surveyId) : undefined);
  return Boolean(draft && Object.keys(draft.answers).length > 0);
}
