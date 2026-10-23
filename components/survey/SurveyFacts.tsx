import Link from 'next/link';
import { formatDate } from '@/lib/format';
import type { SurveyInfoVM } from '@/lib/models/survey';
import { questionsText } from './survey-labels';

/* Datos de una encuesta como pares etiqueta-valor: quién la publica, cuánto dura, qué contiene y cuándo cierra.
   La usan la introducción de la encuesta y la vista de resumen. Las cifras salen de los datos, no de un texto aparte. */
export function SurveyFacts({ survey, sectionCount }: { survey: SurveyInfoVM; sectionCount?: number }) {
  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-sm">
      <dt className="text-fg-muted">La publica</dt>
      <dd>
        <Link href={`/companies/${survey.publisher.slug}`} className="font-semibold text-fg-heading hover:text-fg-accent">
          {survey.publisher.name}
        </Link>
      </dd>
      <dt className="text-fg-muted">Dura</dt>
      <dd className="text-fg-body">{`${survey.estimatedMinutes} min`}</dd>
      <dt className="text-fg-muted">Contiene</dt>
      <dd className="text-fg-body">
        {sectionCount
          ? `${questionsText(survey.questionCount)} en ${sectionCount} ${sectionCount === 1 ? 'sección' : 'secciones'}`
          : questionsText(survey.questionCount)}
      </dd>
      {survey.opensAt && survey.status === 'upcoming' ? (
        <>
          <dt className="text-fg-muted">Abre</dt>
          <dd className="text-fg-body">{formatDate(survey.opensAt)}</dd>
        </>
      ) : null}
      {survey.closesAt ? (
        <>
          <dt className="text-fg-muted">{survey.status === 'closed' ? 'Cerró' : 'Cierra'}</dt>
          <dd className="text-fg-body">{formatDate(survey.closesAt)}</dd>
        </>
      ) : null}
    </dl>
  );
}
