'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Field, Select, Tag } from '@ds';
import type { CourseFormat, CourseStatus } from '@/lib/models/course';
import { courseFormats, formatLabel } from './course-labels';

/* Filtros del catálogo (E-05). Viven en la URL (?format=&status=) y los resuelve el servidor: este componente solo la
   actualiza. Formato = una sola fila de `Tag` de filtro (el único acento cyan de la pantalla); estado = un `Select`. */
export function CourseFilters({ format, status }: { format?: CourseFormat; status?: CourseStatus }) {
  const router = useRouter();
  const pathname = usePathname();

  const go = (next: { format?: string; status?: string }) => {
    const params = new URLSearchParams();
    if (next.format) params.set('format', next.format);
    if (next.status) params.set('status', next.status);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div role="group" aria-label="Formato" className="flex flex-wrap gap-2">
        <Tag variant="filter" selected={!format} onClick={() => go({ status })}>
          Todos
        </Tag>
        {courseFormats.map((f) => (
          <Tag key={f} variant="filter" selected={format === f} onClick={() => go({ format: f, status })}>
            {formatLabel[f]}
          </Tag>
        ))}
      </div>
      <div className="md:w-56">
        <Field label="Estado" htmlFor="course-status">
          <Select
            id="course-status"
            value={status ?? ''}
            options={[
              { value: '', label: 'Todos los estados' },
              { value: 'open', label: 'Abiertos' },
              { value: 'upcoming', label: 'Próximos' },
              { value: 'closed', label: 'Cerrados' },
            ]}
            onChange={(e) => go({ format, status: e.target.value })}
          />
        </Field>
      </div>
    </div>
  );
}
