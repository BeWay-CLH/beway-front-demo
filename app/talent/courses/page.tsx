import type { Metadata } from 'next';
import { CourseFilters } from '@/components/course/CourseFilters';
import { CourseRow } from '@/components/course/CourseRow';
import { courseFormats } from '@/components/course/course-labels';
import { NavButton } from '@/components/NavButton';
import { formatDate } from '@/lib/format';
import type { CourseFormat, CourseStatus } from '@/lib/models/course';
import { requireSession } from '@/lib/session';
import { getCourses } from '@/lib/services/courses';

export const metadata: Metadata = { title: 'Cursos · BeWay' };

type Search = Record<string, string | string[] | undefined>;
const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);
const STATUSES: CourseStatus[] = ['open', 'upcoming', 'closed'];

/* Catálogo de cursos (E-05). El formato y el estado viven en la URL (?format=&status=) y se resuelven aquí, en servidor,
   como lo hará la API (BE-013). Un valor que no existe se ignora. */
export default async function CoursesPage({ searchParams }: { searchParams: Promise<Search> }) {
  await requireSession();
  const search = await searchParams;
  const rawFormat = first(search.format);
  const rawStatus = first(search.status);
  const format = courseFormats.includes(rawFormat as CourseFormat) ? (rawFormat as CourseFormat) : undefined;
  const status = STATUSES.includes(rawStatus as CourseStatus) ? (rawStatus as CourseStatus) : undefined;

  const [all, shown] = await Promise.all([getCourses(), getCourses({ format, status })]);
  const open = all.filter((c) => c.status === 'open');
  const next = open[0];
  const finding = next
    ? `Hay ${open.length} ${open.length === 1 ? 'curso abierto' : 'cursos abiertos'}. El primero en empezar es ${next.title}, el ${formatDate(next.startsAt ?? '')}.`
    : 'No hay cursos abiertos ahora.';

  return (
    <div className="mx-auto flex w-full max-w-275 flex-col gap-8 px-4 py-8 md:px-6 md:py-10">
      <header className="flex flex-col gap-3">
        <h1 className="text-h2 font-heading text-fg-heading md:text-h1">Cursos</h1>
        <p className="text-fg-muted">{finding}</p>
      </header>

      <div className="flex flex-col gap-6 rounded-card border border-line-subtle bg-surface-card p-6">
        <CourseFilters format={format} status={status} />
        <p className="text-sm text-fg-muted" aria-live="polite">
          {`Mostrando ${shown.length} de ${all.length} ${all.length === 1 ? 'curso' : 'cursos'}`}
        </p>
        {shown.length > 0 ? (
          <ul className="flex flex-col">
            {shown.map((c) => (
              <CourseRow key={c.id} course={c} />
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-start gap-3">
            <p className="text-fg-body">No hay cursos con estos filtros.</p>
            <NavButton href="/talent/courses" variant="ghost" icon="x" className="-ml-4">
              Limpiar filtros
            </NavButton>
          </div>
        )}
      </div>
    </div>
  );
}
