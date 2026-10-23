import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@ds';
import { SurveyInfo } from '@/components/survey/SurveyInfo';
import { SurveyRunner } from '@/components/survey/SurveyRunner';
import { talentHome } from '@/lib/routes';
import { requireSession } from '@/lib/session';
import { getSurveyPage } from '@/lib/services/surveys';

type Props = { params: Promise<{ slug: string }> };

/* Es una página privada: el título no repite datos de la persona, solo el de la encuesta. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const session = await requireSession();
  const page = await getSurveyPage(slug, session.userId);
  return { title: page ? `${page.survey.title} · BeWay` : 'Encuesta no encontrada · BeWay', robots: { index: false } };
}

/* Encuesta (E-03). Si se puede responder, el flujo completo; si no (no elegible, próxima, cerrada o ya enviada), el resumen sin
   preguntas con el motivo (BE-011). Un slug que no existe da 404 dentro del espacio. */
export default async function SurveyPage({ params }: Props) {
  const { slug } = await params;
  const session = await requireSession();
  const page = await getSurveyPage(slug, session.userId);
  if (!page) notFound();
  const { survey } = page;

  return (
    <div className="mx-auto flex w-full max-w-275 flex-col gap-8 px-4 py-8 md:px-6 md:py-10">
      <header className="flex flex-col gap-4">
        <Breadcrumbs
          aria-label="Ruta de navegación"
          items={[{ label: 'Inicio', href: talentHome }, { label: 'Encuestas', href: '/talent/surveys' }, { label: survey.title }]}
        />
        <div className="flex flex-col gap-3">
          <h1 className="text-h2 font-heading text-fg-heading md:text-h1">{survey.title}</h1>
          <p className="text-fg-muted">{survey.summary}</p>
        </div>
      </header>
      {page.kind === 'answer' ? (
        <SurveyRunner survey={page.survey} userId={session.userId} />
      ) : (
        <SurveyInfo survey={page.survey} reason={page.reason} />
      )}
    </div>
  );
}
