'use client';

import { useMemo, useState } from 'react';
import { Badge, Breadcrumbs, Button, Card, Icon, Tag } from '@ds';
import { programCategories, programs, type Program } from '@/data/mock';

const details: { key: keyof Pick<Program, 'start' | 'duration' | 'mode' | 'seats'>; label: string; icon: string }[] = [
  { key: 'start', label: 'Inicio', icon: 'calendar' },
  { key: 'duration', label: 'Duración', icon: 'clock' },
  { key: 'mode', label: 'Modalidad', icon: 'map-pin' },
  { key: 'seats', label: 'Cupos', icon: 'users' },
];

function ProgramCard({ program }: { program: Program }) {
  return (
    <li className="flex">
      <Card className="flex w-full flex-col gap-5" elevation="sm" padding="var(--space-6)">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-fg-muted">
            <Icon name={program.categoryIcon} size={16} />
            {program.category}
          </span>
          <Badge tone={program.state === 'Abierto' ? 'success' : 'warning'} dot>
            {program.state}
          </Badge>
        </div>

        <div className="flex flex-col gap-1">
          <h2 className="text-h3 font-heading text-fg-heading">{program.name}</h2>
          <p className="text-sm text-fg-muted">Con {program.org}</p>
        </div>

        <p className="text-fg-body">{program.description}</p>

        <dl className="grid grid-cols-2 gap-4 rounded-control bg-surface-sunken p-4">
          {details.map((d) => (
            <div key={d.key} className="flex flex-col gap-1">
              <dt className="text-sm text-fg-muted">{d.label}</dt>
              <dd className="flex items-center gap-2 text-sm font-semibold text-fg-heading">
                <span className="text-fg-accent">
                  <Icon name={d.icon} size={16} />
                </span>
                {program[d.key]}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto">
          <Button variant="secondary" fullWidth iconAfter="arrow-right">
            Ver programa
          </Button>
        </div>
      </Card>
    </li>
  );
}

export function ProgramasView() {
  const [category, setCategory] = useState('Todos');

  const visible = useMemo(
    () => programs.filter((p) => category === 'Todos' || p.category === category),
    [category],
  );

  return (
    <div className="mx-auto flex max-w-site flex-col gap-8 px-6 py-10">
      <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Programas' }]} />

      <header className="flex flex-col gap-3">
        <h1 className="text-h1 font-heading text-fg-heading">Programas con empresas reales</h1>
        <p className="max-w-2xl text-fg-body">
          Mentorías, retos y prácticas abiertas por las empresas del ecosistema: filtra por categoría y apúntate al que encaje contigo.
        </p>
      </header>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
          {programCategories.map((c) => (
            <Tag key={c} variant="filter" selected={category === c} onClick={() => setCategory(c)}>
              {c}
            </Tag>
          ))}
        </div>
        <p className="text-sm text-fg-muted" aria-live="polite">
          Mostrando {visible.length} {visible.length === 1 ? 'programa' : 'programas'}
        </p>
      </div>

      <ul className="grid gap-5 md:grid-cols-2">
        {visible.map((p) => (
          <ProgramCard key={p.id} program={p} />
        ))}
      </ul>
    </div>
  );
}
