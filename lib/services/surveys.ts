import { surveyRecords } from '@/data/fixtures/surveys';
import type { Simulated } from '@/lib/models/common';
import type {
  Eligibility,
  SurveyAnswersVM,
  SurveyDetailVM,
  SurveyInfoReason,
  SurveyInfoVM,
  SurveyPageVM,
  SurveyParticipation,
  SurveyRecord,
  SurveySummaryVM,
} from '@/lib/models/survey';
import type { CompanyRefVM } from '@/lib/models/company';
import { getCompaniesByInterests, getCompanyRefs, getFollowedCompanies } from './companies';
import { getProfileForm } from './profiles';

/* Única puerta a los datos de encuestas. Hoy lee fixtures; con la API cambia el cuerpo, no la firma (ARCHITECTURE §4).
   Una encuesta cuya empresa no está publicada es como si no existiera. */

/* Audiencia (DEC-016, OI-017): quien sigue a la empresa o tiene su categoría entre sus intereses. */
async function audienceOf(userId: string) {
  const [form, followed] = await Promise.all([getProfileForm(userId), getFollowedCompanies(userId)]);
  const interested = await getCompaniesByInterests(form?.interests ?? []);
  return { followedIds: new Set(followed.map((c) => c.id)), interestedIds: new Set(interested.map((c) => c.id)) };
}

type Audience = Awaited<ReturnType<typeof audienceOf>>;

const eligibilityOf = (companyId: string, audience: Audience): Eligibility =>
  audience.followedIds.has(companyId) ? 'follows' : audience.interestedIds.has(companyId) ? 'interested' : 'not-eligible';

const countQuestions = (r: SurveyRecord) => r.sections.reduce((n, s) => n + s.questions.length, 0);

function toSummary(r: SurveyRecord, publisher: CompanyRefVM, audience: Audience, userId: string): SurveySummaryVM {
  const participation: SurveyParticipation = r.participationByUser[userId] ?? 'not-started';
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    summary: r.summary,
    publisher: { companyId: publisher.id, slug: publisher.slug, name: publisher.name, category: publisher.category, logo: publisher.logo },
    estimatedMinutes: r.estimatedMinutes,
    questionCount: countQuestions(r),
    status: r.status,
    opensAt: r.opensAt,
    closesAt: r.closesAt,
    participation,
    eligibility: eligibilityOf(publisher.id, audience),
  };
}

/* Encuestas con la elegibilidad y la participación de la persona (BE-010). */
export async function getSurveys(userId: string): Promise<SurveySummaryVM[]> {
  const [refs, audience] = await Promise.all([getCompanyRefs(), audienceOf(userId)]);
  return surveyRecords.flatMap((r) => {
    const publisher = refs[r.publisherId];
    return publisher ? [toSummary(r, publisher, audience, userId)] : [];
  });
}

/* Detalle (BE-011). Una encuesta que no se puede responder (no elegible, próxima, cerrada o ya enviada) devuelve el resumen
   sin preguntas. `null` = no existe → notFound(). */
export async function getSurveyPage(slug: string, userId: string): Promise<SurveyPageVM | null> {
  const r = surveyRecords.find((s) => s.slug === slug);
  if (!r) return null;
  const [refs, audience] = await Promise.all([getCompanyRefs(), audienceOf(userId)]);
  const publisher = refs[r.publisherId];
  if (!publisher) return null;

  const summary = toSummary(r, publisher, audience, userId);
  const info: SurveyInfoVM = { ...summary, intro: r.intro, privacyNote: r.privacyNote };

  const reason: SurveyInfoReason | undefined =
    summary.participation === 'completed'
      ? 'completed'
      : summary.eligibility === 'not-eligible'
        ? 'not-eligible'
        : r.status === 'closed'
          ? 'closed'
          : r.status === 'upcoming'
            ? 'upcoming'
            : undefined;
  if (reason) return { kind: 'info', survey: info, reason };

  const detail: SurveyDetailVM = {
    ...info,
    consent: r.consent,
    sections: r.sections,
    savedDraft: r.savedDraftByUser?.[userId],
  };
  return { kind: 'answer', survey: detail };
}

/* Envío simulado: no guarda nada (DEC-006). El contrato ya es el definitivo (BE-012). */
export async function submitSurvey(_userId: string, _surveyId: string, _answers: SurveyAnswersVM): Promise<Simulated> {
  return { simulated: true };
}
