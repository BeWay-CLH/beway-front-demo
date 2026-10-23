import Link from 'next/link';
import { Icon } from '@ds';
import { NavButton } from '@/components/NavButton';
import { StatusBadge } from '@/components/StatusBadge';
import type { CourseSummaryVM } from '@/lib/models/course';
import { courseMeta, startText, statusBadge } from './course-labels';

/* Un curso como fila de dos líneas: título con su sello de estado, quién lo da, formato y duración, y una frase. A la
   derecha, cuándo empieza y si otorga credencial. La acción lleva al detalle. */
export function CourseRow({ course }: { course: CourseSummaryVM }) {
  const badge = statusBadge[course.status];
  const href = `/talent/courses/${course.slug}`;
  return (
    <li className="grid grid-cols-1 items-center gap-x-6 gap-y-3 border-t border-line-subtle py-4 first:border-t-0 first:pt-0 md:grid-cols-[1fr_12rem_auto]">
      <div className="flex min-w-0 flex-col gap-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <Link href={href} className="transition-control font-semibold text-fg-heading hover:text-fg-accent">
            {course.title}
          </Link>
          <StatusBadge tone={badge.tone}>{badge.label}</StatusBadge>
        </div>
        <span className="text-sm text-fg-muted">{courseMeta(course)}</span>
        <span className="max-w-prose text-sm text-fg-body">{course.summary}</span>
      </div>

      <div className="flex flex-col gap-1 text-sm text-fg-muted md:text-right">
        <span className="tabular-nums">{startText(course)}</span>
        {course.grantsCredential ? (
          <span className="inline-flex items-center gap-2 md:justify-end">
            <Icon name="award" size={14} />
            Otorga credencial
          </span>
        ) : null}
      </div>

      <NavButton
        href={href}
        variant="outline"
        iconAfter="arrow-right"
        aria-label={`Ver curso: ${course.title}`}
        className="self-start md:self-auto"
      >
        Ver curso
      </NavButton>
    </li>
  );
}
