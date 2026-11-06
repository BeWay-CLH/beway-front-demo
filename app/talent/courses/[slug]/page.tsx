import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { Breadcrumbs, Icon } from '@ds';
import { CourseInterest } from '@/components/course/CourseInterest';
import { formatLabel, levelLabel, statusBadge } from '@/components/course/course-labels';
import { brands } from '@/data/fixtures/brands';
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

/* Tarjeta de contenido (guía de correcciones, ficha 13): "Lo que te llevas.", "Tu recorrido de aprendizaje." y
   "Cómo se refleja en tu perfil.". */
function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4 rounded-card border border-line-subtle bg-surface-card p-6">
      <h2 className="m-0 font-heading text-[17px] font-[600] text-fg-heading">{title}</h2>
      {children}
    </section>
  );
}

/* Curso (E-06 y guía de correcciones, ficha 13). Hero con el color de la marca que lo da (si hay ficha corporativa),
   dos columnas (contenido y lateral de 335 px), módulos del temario en acordeón y un lateral de decisión con sus datos.
   La evaluación y el progreso no existen todavía: se muestran como "—". Móvil: primero el contenido, después el lateral.
   Un slug que no existe da 404 dentro del espacio. */
export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const session = await requireSession();
  const course = await getCourseBySlug(slug);
  if (!course) notFound();
  const badge = statusBadge[course.status];
  const brand = brands.find((b) => b.name === course.provider);

  const facts: [string, string][] = [
    ['Institución', course.provider],
    ['Estado', badge.label],
    ['Duración', course.durationLabel],
    ['Modalidad', formatLabel[course.format]],
    ['Evaluación', '—'],
    ['Progreso', '—'],
    ...(course.level ? [['Nivel', levelLabel[course.level]] as [string, string]] : []),
    ...(course.startsAt
      ? [[course.status === 'closed' ? 'Empezó' : 'Empieza', formatDate(course.startsAt)] as [string, string]]
      : []),
  ];

  return (
    <div className="mx-auto flex w-full max-w-site flex-col gap-6 px-4 pt-6 pb-16 md:px-8">
      <Breadcrumbs
        aria-label="Ruta de navegación"
        items={[{ label: 'Inicio', href: talentHome }, { label: 'Certificaciones', href: '/talent/courses' }, { label: course.title }]}
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_335px] lg:gap-[25px]">
        <div className="flex min-w-0 flex-col gap-6">
          <section className="flex flex-col gap-4 rounded-[12px] p-8 text-white md:p-[38px]" style={{ background: brand?.palette.base ?? 'var(--brand-dark)' }}>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex rounded-[7px] bg-white px-2 py-1 text-xs font-[650] text-brand-dark">{course.provider}</span>
              <span className="eyebrow m-0 uppercase opacity-80">Certificaciones en Beway</span>
            </div>
            <h1 className="m-0 font-heading text-[30px] leading-[1.2] font-[700] text-white md:text-[38px]" style={{ color: 'var(--white)' }}>{course.title}</h1>
            <p className="m-0 max-w-2xl opacity-90">{course.summary}</p>
          </section>

          <Card title="Lo que te llevas.">
            <p className="m-0 text-fg-body">{course.description}</p>
            <ul className="m-0 flex flex-col gap-3">
              {course.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-3 text-fg-body">
                  <span className="mt-0.5 flex-none text-fg-accent"><Icon name="check" size={16} /></span>
                  {o}
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Tu recorrido de aprendizaje.">
            <ol className="m-0 flex flex-col gap-2 p-0">
              {course.syllabus.map((item, i) => (
                <li key={item.title}>
                  <details className="group rounded-control border border-line-subtle px-4 py-3">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-[650] text-fg-heading">
                      <span className="flex items-center gap-3">
                        <span className="text-sm text-fg-muted tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                        {item.title}
                      </span>
                      {item.durationLabel ? <span className="flex-none text-xs text-fg-muted">{item.durationLabel}</span> : null}
                    </summary>
                    <p className="m-0 mt-3 text-sm text-fg-body">Contenido del módulo: se publica con el programa.</p>
                  </details>
                </li>
              ))}
            </ol>
            <p className="m-0 text-sm text-fg-muted">Requisitos: {course.requirements.join('; ')}.</p>
          </Card>

          <Card title="Cómo se refleja en tu perfil.">
            <p className="m-0 text-fg-body">
              {course.grantsCredential
                ? `Si completas el programa, ${course.provider} puede emitir una credencial. Cuando exista, aparecerá en Mi perfil y en Credenciales.`
                : 'Este programa aparece como actividad en tu perfil cuando lo sigas.'}
            </p>
          </Card>
        </div>

        <aside aria-labelledby="facts-title" className="flex flex-col gap-5 self-start rounded-card border border-line-subtle bg-surface-card p-6 lg:sticky lg:top-40">
          <h2 id="facts-title" className="m-0 font-heading text-[17px] font-[600] text-fg-heading">Datos del programa</h2>
          <dl className="m-0 flex flex-col gap-3 text-sm">
            {facts.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4">
                <dt className="text-fg-muted">{label}</dt>
                <dd className="m-0 text-right text-fg-body">{value}</dd>
              </div>
            ))}
          </dl>
          {course.grantsCredential ? (
            <p className="m-0 flex items-start gap-3 text-sm text-fg-body">
              <span className="mt-0.5 flex-none text-fg-muted"><Icon name="award" size={16} /></span>
              <span>{`${course.provider} puede emitir una credencial al completarlo.`}</span>
            </p>
          ) : null}
          <CourseInterest courseId={course.id} courseTitle={course.title} userId={session.userId} status={course.status} />
          {brand ? (
            <Link href={`/companies/${brand.slug}`} className="text-sm font-[650] text-fg-accent">Ver la ficha y el programa</Link>
          ) : null}
        </aside>
      </div>
    </div>
  );
}
