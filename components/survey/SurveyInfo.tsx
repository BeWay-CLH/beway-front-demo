import { Alert } from '@ds';
import { NavButton } from '@/components/NavButton';
import { formatDate } from '@/lib/format';
import type { SurveyInfoReason, SurveyInfoVM } from '@/lib/models/survey';
import { SurveyFacts } from './SurveyFacts';

/* Resumen de una encuesta que no se puede responder: no es para la persona, aún no abre, ya cerró o ya la envió (BE-011).
   Nunca lleva preguntas. Dice por qué y qué hacer, y como mucho tiene un botón principal. */
function noticeOf(reason: SurveyInfoReason, s: SurveyInfoVM): { tone: 'info' | 'success'; title: string; text: string } {
  switch (reason) {
    case 'not-eligible':
      return {
        tone: 'info',
        title: 'Esta encuesta no es para ti por ahora',
        text: `Es para personas que siguen a ${s.publisher.name} o a las que les interesa ${s.publisher.category}. Si la sigues desde su ficha, la verás en Disponibles.`,
      };
    case 'upcoming':
      return {
        tone: 'info',
        title: 'Todavía no está abierta',
        text: s.opensAt ? `Abre el ${formatDate(s.opensAt)}. Podrás responderla desde aquí.` : 'Podrás responderla desde aquí cuando abra.',
      };
    case 'closed':
      return {
        tone: 'info',
        title: 'Ya está cerrada',
        text: s.closesAt ? `Cerró el ${formatDate(s.closesAt)} y ya no admite respuestas.` : 'Ya no admite respuestas.',
      };
    case 'completed':
      return {
        tone: 'success',
        title: 'Ya la has respondido',
        text: 'No se puede editar después de enviarla.',
      };
  }
}

export function SurveyInfo({ survey, reason }: { survey: SurveyInfoVM; reason: SurveyInfoReason }) {
  const notice = noticeOf(reason, survey);
  return (
    <div className="flex flex-col gap-6">
      <Alert tone={notice.tone} title={notice.title}>
        {notice.text}
      </Alert>
      <div className="grid gap-4 md:grid-cols-12 md:items-start">
        <section
          aria-labelledby="about-title"
          className="flex flex-col gap-6 rounded-card border border-line-subtle bg-surface-card p-6 md:col-span-7"
        >
          <h2 id="about-title" className="text-h3 font-heading text-fg-heading">Sobre esta encuesta</h2>
          <p className="text-fg-body">{survey.intro}</p>
          <SurveyFacts survey={survey} />
        </section>
        <section
          aria-labelledby="privacy-title"
          className="flex flex-col gap-3 rounded-card border border-line-subtle bg-surface-card p-6 md:col-span-5"
        >
          <h2 id="privacy-title" className="text-h3 font-heading text-fg-heading">Quién verá las respuestas</h2>
          <p className="text-fg-body">{survey.privacyNote}</p>
        </section>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        <NavButton href="/talent/surveys" variant="ghost" icon="arrow-left">
          Volver a encuestas
        </NavButton>
        {reason === 'not-eligible' ? (
          <NavButton href={`/companies/${survey.publisher.slug}`} size="lg" iconAfter="arrow-right">
            {`Ver a ${survey.publisher.name}`}
          </NavButton>
        ) : null}
      </div>
    </div>
  );
}
