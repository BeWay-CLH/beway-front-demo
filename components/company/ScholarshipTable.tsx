'use client';

import { Badge, Table } from '@ds';
import type { ScholarshipVM } from '@/lib/models/company';
import { ExternalLink } from './ExternalLink';

/* Tabla de becas. Cliente porque el DS `Table` recibe funciones de render; los datos llegan ya formateados (DEC-053). */
export function ScholarshipTable({ items }: { items: ScholarshipVM[] }) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
      <Table
        rows={items}
        caption={`Datos de la fuente del ${items[0].sourceAsOf}.`}
        columns={[
          {
            key: 'title',
            header: 'Beca',
            render: (r: ScholarshipVM) => (
              <span className="flex flex-col gap-1">
                <span className="font-semibold text-fg-heading">{r.title}</span>
                {r.summary ? <span className="text-sm text-fg-muted">{r.summary}</span> : null}
              </span>
            ),
          },
          { key: 'country', header: 'País', render: (r: ScholarshipVM) => r.country ?? '—' },
          {
            key: 'amount',
            header: 'Importe',
            render: (r: ScholarshipVM) => (
              <span className="flex flex-col gap-1">
                <span>{r.amount ?? '—'}</span>
                {r.rebecaExtra ? <span className="text-sm text-fg-muted">Extra ReBeca: {r.rebecaExtra}</span> : null}
              </span>
            ),
          },
          {
            key: 'state',
            header: 'Estado en la fuente',
            render: (r: ScholarshipVM) => (
              <span className="flex flex-col items-start gap-1">
                <Badge tone="neutral">{r.stateLabel}</Badge>
                {r.dateShown ? <span className="text-sm text-fg-muted">{r.dateShown}</span> : null}
              </span>
            ),
          },
          {
            key: 'url',
            header: 'Más información',
            render: (r: ScholarshipVM) => (r.url ? <ExternalLink href={r.url}>Ver la beca</ExternalLink> : '—'),
          },
        ]}
      />
    </div>
  );
}
