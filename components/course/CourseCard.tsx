import Link from 'next/link';
import { Button, Icon } from '@ds';
import { StatusBadge } from '@/components/StatusBadge';
import type { CourseSummaryVM } from '@/lib/models/course';
import { courseMeta, startText, statusBadge } from './course-labels';

/* Tarjeta de certificación del catálogo (guía de correcciones, ficha 11): portada de color de marca de 156 px con
   título blanco de 23 px y marca de agua con las iniciales; cuerpo con padding 22 px, título 17 px, descripción
   12 px / 19.2, metadatos 10 px. El estado va antes del botón, de ancho completo y 42 px. La portada usa un color del
   sistema (no el de la marca): las paletas de marca viven en las fichas corporativas. */

const covers = ['var(--brand-dark)', 'var(--brand-navy)', 'var(--accent-teal-strong)'];

export function CourseCard({ course, index }: { course: CourseSummaryVM; index: number }) {
  const href = `/talent/courses/${course.slug}`;
  const badge = statusBadge[course.status];
  const initials = course.provider
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  return (
    <article className="flex flex-col overflow-hidden rounded-card border border-line-subtle bg-surface-card">
      <div
        className="relative flex h-[156px] flex-none flex-col justify-between overflow-hidden p-5"
        style={{ background: covers[index % covers.length] }}
      >
        <span className="relative z-[1] inline-flex w-fit rounded-[7px] bg-white px-2 py-1 text-xs font-[650] text-brand-dark">
          {course.provider}
        </span>
        <span className="relative z-[1] font-heading text-[23px] leading-[1.2] font-[700] text-white">{course.title}</span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-2 -bottom-8 font-heading text-[120px] leading-none font-[800] text-white opacity-10 select-none"
        >
          {initials}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-[22px]">
        <h2 className="m-0 font-heading text-[17px] leading-[1.3] font-[600] text-fg-heading">{course.title}</h2>
        <p className="m-0 text-xs leading-[1.6] text-fg-body">{course.summary}</p>
        <p className="m-0 text-[10px] text-fg-muted">{courseMeta(course)}</p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-fg-muted">
          <StatusBadge tone={badge.tone}>{badge.label}</StatusBadge>
          {startText(course) ? <span className="tabular-nums">{startText(course)}</span> : null}
          {course.grantsCredential ? (
            <span className="inline-flex items-center gap-1">
              <Icon name="award" size={12} />
              Otorga credencial
            </span>
          ) : null}
        </div>
        <div className="mt-auto pt-2">
          <Button href={href} variant="primary" fullWidth iconAfter="arrow-right" style={{ height: 42 }} aria-label={`Explorar certificación: ${course.title}`}>
            Explorar certificación
          </Button>
        </div>
      </div>
    </article>
  );
}
