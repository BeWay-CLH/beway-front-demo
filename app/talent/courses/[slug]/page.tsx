import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { Breadcrumbs, Icon } from '@ds';
import { StatusBadge } from '@/components/StatusBadge';
import { CourseInterest } from '@/components/course/CourseInterest';
import { formatLabel, levelLabel, statusBadge } from '@/components/course/course-labels';
import { formatDate } from '@/lib/format';
import { talentHome } from '@/lib/routes';
import { requireSession } from '@/lib/session';
import { getCourseBySlug } from '@/lib/services/courses';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  return {
    title: course ? `${course.title} · BeWay` : 'Curso no encontrado · BeWay',
    description: course?.summary,
    robots: { index: false },
  };
}

/* Sección de la columna de contenido: título y cuerpo, separadas por una línea fina. */
function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3 border-t border-line-subtle py-6 first:border-t-0 first:pt-0">
      <h2 className="text-h3 font-heading text-fg-heading">{title}</h2>
      {children}
    </section>
  );
}

/* Curso (E-06): a la izquierda lo que explica el curso (de qué va, qué aprenderás, requisitos, temario); a la derecha, el
   panel con sus datos y el único botón principal, "Me interesa", simulado. En móvil el panel va primero para que la acción
   esté a la vista. Sin enlaces externos inventados. Un slug que no existe da 404 dentro del espacio. */
export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const session = await requireSession();
  const course = await getCourseBySlug(slug);
  if (!course) notFound();
  const badge = statusBadge[course.status];

  const facts: [string, string][] = [
    ['Lo da', course.provider],
    ['Formato', formatLabel[course.format]],
    ['Duración', course.durationLabel],
    ...(course.level ? [['Nivel', levelLabel[course.level]] as [string, string]] : []),
    ...(course.startsAt
      ? [[course.status === 'closed' ? 'Empezó' : 'Empieza', formatDate(course.startsAt)] as [string, string]]
      : []),
  ];

  return (
    <div className="mx-auto flex w-full max-w-275 flex-col gap-8 px-4 py-8 md:px-6 md:py-10">
      <header className="flex flex-col gap-4">
        <Breadcrumbs
          aria-label="Ruta de navegación"
          items={[{ label: 'Inicio', href: talentHome }, { label: 'Cursos', href: '/talent/courses' }, { label: course.title }]}
        />
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <h1 className="text-h2 font-heading text-fg-heading md:text-h1">{course.title}</h1>
            <StatusBadge tone={badge.tone}>{badge.label}</StatusBadge>
          </div>
          <p className="text-fg-muted">{course.summary}</p>
        </div>
      </header>

      <div className="grid gap-8 md:grid-cols-12 md:items-start md:gap-6">
        <aside
          aria-labelledby="facts-title"
          className="order-first flex flex-col gap-5 rounded-card border border-line-subtle bg-surface-card p-6 md:sticky md:top-36 md:order-last md:col-span-5"
        >
          <h2 id="facts-title" className="text-h3 font-heading text-fg-heading">Datos del curso</h2>
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-sm">
            {facts.map(([label, value]) => (
              <div key={label} className="contents">
                <dt className="text-fg-muted">{label}</dt>
                <dd className="text-fg-body">{value}</dd>
              </div>
            ))}
          </dl>
          {course.grantsCredential ? (
            <p className="flex items-start gap-3 text-sm text-fg-body">
              <span className="mt-0.5 flex-none text-fg-muted"><Icon name="award" size={16} /></span>
              <span>{`Otorga una credencial que emite ${course.provider}. Cuando la tengas, aparecerá en Credenciales.`}</span>
            </p>
          ) : null}
          <div>
            <CourseInterest courseId={course.id} courseTitle={course.title} userId={session.userId} status={course.status} />
          </div>
        </aside>

        <div className="flex flex-col md:col-span-7">
          <Block title="De qué va">
            <p className="text-fg-body">{course.description}</p>
          </Block>
          <Block title="Qué aprenderás">
            <ul className="flex flex-col gap-3">
              {course.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-3 text-fg-body">
                  <span className="mt-0.5 flex-none text-fg-muted"><Icon name="check" size={16} /></span>
                  {o}
                </li>
              ))}
            </ul>
          </Block>
          <Block title="Requisitos">
            <ul className="flex flex-col gap-2 text-fg-body">
              {course.requirements.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </Block>
          <Block title="Temario">
            <ol className="flex flex-col">
              {course.syllabus.map((item) => (
                <li
                  key={item.title}
                  className="flex items-baseline justify-between gap-6 border-t border-line-subtle py-3 first:border-t-0 first:pt-0"
                >
                  <span className="text-fg-body">{item.title}</span>
                  {item.durationLabel ? <span className="flex-none text-sm text-fg-muted">{item.durationLabel}</span> : null}
                </li>
              ))}
            </ol>
          </Block>
        </div>
      </div>
    </div>
  );
}
