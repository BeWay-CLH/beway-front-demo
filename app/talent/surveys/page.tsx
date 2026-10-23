import type { Metadata } from 'next';
import { SurveyList } from '@/components/survey/SurveyList';
import { requireSession } from '@/lib/session';
import { getSurveys } from '@/lib/services/surveys';

export const metadata: Metadata = { title: 'Encuestas · BeWay' };

/* Encuestas de las empresas que sigues o que te interesan (E-02, DEC-016). La lectura es del servidor; lo que pasa en la
   sesión del navegador (borradores, envíos simulados) lo aplica la lista encima. */
export default async function SurveysPage() {
  const session = await requireSession();
  const surveys = await getSurveys(session.userId);
  return <SurveyList userId={session.userId} surveys={surveys} />;
}
