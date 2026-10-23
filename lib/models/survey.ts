/* View Models de encuestas del frontend (E-01). Cuando exista la API, un adapter traduce sus DTO a estos tipos (ARCHITECTURE §4). */

import type { CompanyCardVM } from './company';

export type SurveyStatus = 'open' | 'upcoming' | 'closed';
export type SurveyParticipation = 'not-started' | 'in-progress' | 'completed';
/* Por qué la ve esta persona (DEC-016, OI-017): sigue a la empresa, o su categoría está entre sus intereses. */
export type Eligibility = 'follows' | 'interested' | 'not-eligible';

/* Quién la publica. CLH es `cmp-clh`, una empresa más (DEC-016). */
export type SurveyPublisherVM = Pick<CompanyCardVM, 'category' | 'logo' | 'name' | 'slug'> & { companyId: string };

export type SurveySummaryVM = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  publisher: SurveyPublisherVM;
  estimatedMinutes: number;
  /* Lo calcula el servicio con las secciones: nunca se teclea aparte del contenido. */
  questionCount: number;
  status: SurveyStatus;
  opensAt?: string;
  closesAt?: string;
  participation: SurveyParticipation;
  eligibility: Eligibility;
};

export type OptionVM = { value: string; label: string };

export type SurveyQuestionVM =
  | { id: string; type: 'single'; prompt: string; required: boolean; options: OptionVM[] }
  | { id: string; type: 'multiple'; prompt: string; required: boolean; options: OptionVM[]; max?: number }
  | { id: string; type: 'scale'; prompt: string; required: boolean; max: 5 | 7 | 10; minLabel: string; maxLabel: string }
  | { id: string; type: 'short-text'; prompt: string; required: boolean; maxLength: number }
  | { id: string; type: 'long-text'; prompt: string; required: boolean; maxLength: number };

export type SurveySectionVM = { id: string; title: string; description?: string; questions: SurveyQuestionVM[] };

/* Por id de pregunta. Un número en `scale`, una opción en `single`, varias en `multiple`, texto en el resto. */
export type SurveyAnswersVM = Record<string, string | string[] | number>;

/* Lo que se enseña de una encuesta sin preguntas (no elegible, próxima, cerrada o ya respondida; BE-011). */
export type SurveyInfoVM = SurveySummaryVM & { intro: string; privacyNote: string };

export type SurveyDetailVM = SurveyInfoVM & {
  consent: { text: string; required: boolean };
  sections: SurveySectionVM[];
  /* Borrador guardado en el servidor (BE-012). El del navegador, si existe, manda sobre este. */
  savedDraft?: SurveyAnswersVM;
};

export type SurveyInfoReason = 'not-eligible' | 'upcoming' | 'closed' | 'completed';

export type SurveyPageVM =
  | { kind: 'answer'; survey: SurveyDetailVM }
  | { kind: 'info'; survey: SurveyInfoVM; reason: SurveyInfoReason };

/* Registro del fixture: todo lo que guarda una encuesta, incluido lo de cada persona. */
export type SurveyRecord = Omit<SurveyDetailVM, 'publisher' | 'questionCount' | 'participation' | 'eligibility' | 'savedDraft'> & {
  publisherId: string;
  /* Por id de usuario. Sin entrada = no empezada. */
  participationByUser: Record<string, Exclude<SurveyParticipation, 'not-started'>>;
  savedDraftByUser?: Record<string, SurveyAnswersVM>;
};
