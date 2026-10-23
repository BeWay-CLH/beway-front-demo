import Link from 'next/link';
import { Icon } from '@ds';
import { NavButton } from '@/components/NavButton';
import { courseMeta, startText } from '@/components/course/course-labels';
import type { DashboardCourseVM } from '@/lib/models/dashboard';

const SHOWN = 3;

/* Cursos abiertos en el inicio (E-09), los que empiezan antes primero. Sin datos de la persona: es el mismo para todos. */
export function OpenCourses({ courses }: { courses: DashboardCourseVM[] }) {
  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-start gap-3">
        <p className="text-fg-body">No hay cursos abiertos ahora. Mira los próximos para ver cuándo empiezan.</p>
        <NavButton href="/talent/courses" variant="ghost" iconAfter="arrow-right" className="-ml-4">
          Ver cursos
        </NavButton>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-3">
      <ul className="flex flex-col">
        {courses.slice(0, SHOWN).map((c) => (
          <li key={c.id} className="border-t border-line-subtle first:border-t-0">
            <Link
              href={`/talent/courses/${c.slug}`}
              className="transition-control flex items-center gap-4 py-3 text-fg-heading hover:text-fg-accent"
            >
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="font-semibold">{c.title}</span>
                <span className="text-sm text-fg-muted">
                  {courseMeta(c)}
                  {startText({ startsAt: c.startsAt, status: 'open' }) ? `. ${startText({ startsAt: c.startsAt, status: 'open' })}` : ''}
                </span>
              </span>
              <span className="text-fg-muted"><Icon name="arrow-right" size={16} /></span>
            </Link>
          </li>
        ))}
      </ul>
      {courses.length > SHOWN ? <p className="text-sm text-fg-muted">{`Y ${courses.length - SHOWN} más.`}</p> : null}
      <NavButton href="/talent/courses" variant="ghost" iconAfter="arrow-right" className="-ml-4 mt-auto self-start">
        Ver todos los cursos
      </NavButton>
    </div>
  );
}
