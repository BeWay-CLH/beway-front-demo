'use server';

import type { SurveyAnswersVM } from '@/lib/models/survey';
import { requireSession } from '@/lib/session';
import { submitSurvey } from '@/lib/services/surveys';

/* Enviar las respuestas. Pasa por el servicio y siempre devuelve una simulación en la demo (DEC-006). */
export async function submitSurveyAnswers(surveyId: string, answers: SurveyAnswersVM) {
  const session = await requireSession();
  return submitSurvey(session.userId, surveyId, answers);
}
