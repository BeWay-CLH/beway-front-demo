'use client';

import { useState } from 'react';
import {
  Alert, Avatar, Badge, Button, Card, Checkbox, EmptyState, FeatureCard, IconButton, Input, Pagination,
  SectionLabel, Skeleton, Stat, Switch, Table, Tabs, Tag, Textarea, Toast, Tooltip,
} from '@ds';
import { homeStats, retos } from '@/data/mock';

const swatches = [
  ['bg-surface-page', 'surface-page'], ['bg-surface-card', 'surface-card'], ['bg-surface-sunken', 'surface-sunken'],
  ['bg-surface-inverse', 'surface-inverse'], ['bg-action-primary', 'action-primary'], ['bg-action-secondary', 'action-secondary'],
  ['bg-surface-accent-subtle', 'accent-subtle'], ['bg-status-success', 'success'], ['bg-status-warning', 'warning'], ['bg-status-danger', 'danger'],
];

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <SectionLabel>{title}</SectionLabel>
      {children}
    </section>
  );
}

export function Styleguide() {
  const [tab, setTab] = useState('todos');
  const [page, setPage] = useState(3);
  const [sel, setSel] = useState('Innovación');
  return (
    <div className="mx-auto flex max-w-site flex-col gap-14 px-6 py-10">
      <header className="flex flex-col gap-3">
        <h1 className="text-h1 font-heading text-fg-heading">Guía de estilo</h1>
        <p className="max-w-2xl text-fg-muted">Todos los componentes en el tema activo. Usa el botón de la luna en la barra para ver el tema oscuro.</p>
      </header>

      <Block title="Color (utilidades de Tailwind)">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {swatches.map(([cls, name]) => (
            <div key={name} className="flex flex-col gap-2">
              <div className={`${cls} h-16 rounded-card border border-line-subtle`} />
              <code className="text-xs text-fg-muted">{cls}</code>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Tipografía">
        <div className="flex flex-col gap-2">
          <div className="text-display font-heading tracking-hero text-fg-heading">Display 40/800</div>
          <div className="text-h1 font-heading text-fg-heading">H1 · 32/700</div>
          <div className="text-h2 font-heading text-fg-heading">H2 · 24/600</div>
          <div className="text-h3 font-heading text-fg-heading">H3 · 20/600</div>
          <p className="text-base text-fg-body">Cuerpo 16/400. Conectamos talento, impulsamos la innovación.</p>
          <p className="text-sm text-fg-muted">Pequeño 14/400 en texto secundario.</p>
          <span className="eyebrow uppercase text-fg-muted">Eyebrow 12/600</span>
        </div>
      </Block>

      <Block title="Acciones">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primario</Button>
          <Button variant="secondary">Secundario</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="gradient" iconAfter="arrow-right">Gradient</Button>
          <Button disabled>Desactivado</Button>
          <Tooltip label="Guardar"><IconButton icon="bookmark" label="Guardar" variant="outline" /></Tooltip>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {['Innovación', 'Talento', 'Movilidad'].map((t) => (
            <Tag key={t} variant="filter" selected={sel === t} onClick={() => setSel(t)}>{t}</Tag>
          ))}
          <Tag selected>Etiqueta navy</Tag>
          <Tag onRemove={() => {}}>React</Tag>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge tone="accent">Nuevo</Badge><Badge tone="navy">Programa</Badge><Badge tone="success" dot>Activo</Badge>
          <Badge tone="warning">Pendiente</Badge><Badge tone="danger">Cerrado</Badge><Badge icon="clock">48 h</Badge>
        </div>
      </Block>

      <Block title="Formularios">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-3">
            <Input icon="mail" placeholder="nombre@empresa.com" />
            <Input invalid defaultValue="+34 6" />
            <Textarea rows={3} placeholder="Cuéntanos quién eres" />
          </div>
          <div className="flex flex-col gap-3">
            <Checkbox defaultChecked label="Recibir oportunidades" description="Máximo un correo por semana" />
            <Switch defaultChecked label="Perfil visible" />
          </div>
        </div>
      </Block>

      <Block title="Navegación">
        <Tabs value={tab} onChange={setTab} items={[{ value: 'todos', label: 'Todos', count: 128 }, { value: 'nuevos', label: 'Nuevos', icon: 'sparkles' }, { value: 'guardados', label: 'Guardados' }]} />
        <Pagination page={page} pageCount={12} onChange={setPage} />
      </Block>

      <Block title="Feedback">
        <div className="grid gap-3 md:grid-cols-2">
          <Alert tone="info" title="Nueva convocatoria">Hay 3 retos abiertos para tu perfil.</Alert>
          <Alert tone="warning" title="Perfil incompleto">Añade tu experiencia para aparecer en búsquedas.</Alert>
          <Toast tone="success" title="Perfil actualizado" message="Tus cambios ya son visibles." />
          <Toast tone="danger" title="No se pudo publicar" message="Revisa los campos marcados." />
        </div>
      </Block>

      <Block title="Datos">
        <Table
          rows={retos}
          columns={[
            { key: 'name', header: 'Reto' }, { key: 'org', header: 'Empresa' }, { key: 'date', header: 'Cierra', align: 'right' },
            { key: 'state', header: 'Estado', render: (r) => <Badge tone={r.state === 'Abierto' ? 'success' : r.state === 'Pendiente' ? 'warning' : 'neutral'} dot>{r.state}</Badge> },
          ]}
        />
        <div className="flex flex-wrap items-center gap-6">
          {homeStats.map((s) => <Stat key={s.label} {...s} />)}
          <Avatar name="Lucía Martín" size={48} /><Avatar name="Diego R" size={48} shape="circle" /><Avatar name="Nexora" size={48} shape="hexagon" />
        </div>
        <Card><div className="flex items-center gap-3"><Skeleton circle height={44} /><div className="flex flex-1 flex-col gap-2"><Skeleton width="60%" height={16} /><Skeleton width="40%" height={12} /></div></div></Card>
        <Card padding="0"><EmptyState icon="search" title="Sin resultados" description="Prueba con otra categoría o quita algún filtro." action={<Button variant="outline">Limpiar filtros</Button>} /></Card>
        <div className="grid gap-4 sm:grid-cols-3">
          <FeatureCard icon="users" title="Conectamos talento" description="Perfiles verificados." />
          <FeatureCard icon="lightbulb" title="Impulsamos la innovación" description="Retos abiertos." />
          <FeatureCard icon="trending-up" title="Generamos oportunidades" description="Mentoría y programas." />
        </div>
      </Block>
    </div>
  );
}
