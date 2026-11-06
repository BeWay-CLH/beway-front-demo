import { Badge, Tag } from '@ds';
import { ExternalLink } from './ExternalLink';
import { ScholarshipTable } from './ScholarshipTable';
import type { ReactNode } from 'react';
import type {
  AcademicProgramVM,
  AmbassadorVM,
  BrandVM,
  ChallengeVM,
  CompanyCollectionKey,
  CompanyCollectionsVM,
  LearningVM,
  MiniprojectVM,
  OfferDetailVM,
  OfferOrigin,
  ResourceVM,
} from '@/lib/models/company';

/* Pestañas del paquete de contenido (DEC-054). Usan los patrones de la ficha (filas con borde, tarjetas, `Badge`, `Tag` y
   `Table` del DS). Ninguna presenta una propuesta de BeWay ni una iniciativa externa como oferta de la empresa (DEC-052).
   Los títulos de la fuente (`sectionHeadings`) se muestran como encabezado de la pestaña. */

export const COLLECTION_LABEL: Record<CompanyCollectionKey, string> = {
  learning: 'Formación',
  challenges: 'Retos',
  miniprojects: 'Miniproyectos',
  ambassadors: 'Embajadores',
  resources: 'Recursos',
  scholarships: 'Becas',
  academicPrograms: 'Grados y másteres',
  brands: 'Marcas',
};

/* Orden de las pestañas del paquete, detrás de los módulos de siempre. */
export const COLLECTION_ORDER: CompanyCollectionKey[] = [
  'learning',
  'challenges',
  'miniprojects',
  'ambassadors',
  'resources',
  'scholarships',
  'academicPrograms',
  'brands',
];

/* Una pestaña aparece solo si tiene datos. */
export function hasCollection(c: CompanyCollectionsVM, key: CompanyCollectionKey): boolean {
  return c[key].length > 0;
}

/* Nota fija bajo el encabezado de cada pestaña: qué es y qué no es el contenido. */
const NOTE: Record<CompanyCollectionKey, string> = {
  learning:
    'Propuestas de BeWay y formación publicada en catálogos externos. No hay inscripción desde BeWay y ninguna certificación está verificada.',
  challenges:
    'Propuestas de BeWay y concursos oficiales de sus organizadores externos. Una iniciativa oficial externa no implica colaboración con BeWay. Confirma los plazos en la fuente antes de participar.',
  miniprojects: 'Casos de práctica propuestos por BeWay. Son ejercicios, no proyectos de la empresa.',
  ambassadors:
    'Personas de la comunidad CLH. No forman parte de la plantilla de la empresa. Las que no han dado su autorización se marcan como pendientes.',
  resources: 'Enlaces a páginas externas. BeWay no gestiona estos servicios: comprueba su estado en la web de cada uno.',
  scholarships: 'Estado y plazo según la fuente indicada. No es el estado de hoy: consulta la convocatoria antes de solicitar.',
  academicPrograms: 'Programas tal como los publica el centro. Confirma plazos y condiciones en su web.',
  brands: 'Marcas que aparecen en la ficha, con enlace a su web oficial.',
};

const ORIGIN_LABEL: Record<OfferOrigin, string> = {
  beway_proposal: 'Propuesta BeWay',
  external_published: 'Catálogo externo',
  external_official: 'Iniciativa oficial externa',
  external_historical: 'Histórico',
};

const rowBase = 'flex flex-col gap-1 border-t border-line-subtle py-4 first:border-t-0 first:pt-0 last:pb-0';
const card = 'flex flex-col gap-4 rounded-card border border-line-subtle bg-surface-card p-5';

function Details({ items }: { items: OfferDetailVM[] }) {
  if (items.length === 0) return null;
  return (
    <dl className="grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
      {items.map((it) => (
        <div key={it.label} className="flex flex-col gap-0.5">
          <dt className="text-fg-muted">{it.label}</dt>
          <dd className="text-fg-body">{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Origin({ origin }: { origin: OfferOrigin }) {
  return <Badge tone={origin === 'beway_proposal' ? 'neutral' : 'navy'}>{ORIGIN_LABEL[origin]}</Badge>;
}

function LearningList({ items }: { items: LearningVM[] }) {
  return (
    <ul className="flex flex-col gap-4">
      {items.map((l) => (
        <li key={l.id} className={card}>
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-2">
              <Origin origin={l.origin} />
              {l.certificateVerified ? null : <Badge tone="warning">Certificación no verificada</Badge>}
            </div>
            <h3 className="font-semibold text-fg-heading">{l.title}</h3>
            {l.description ? <p className="text-fg-body">{l.description}</p> : null}
          </div>
          <Details items={l.details} />
          {l.curriculum.length > 0 ? (
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold text-fg-heading">Temario</p>
              <ul className="flex flex-wrap gap-2">
                {l.curriculum.map((t) => (
                  <li key={t}>
                    <Tag>{t}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {l.modules.length > 0 ? (
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold text-fg-heading">Módulos</p>
              <ol className="flex flex-col gap-3">
                {l.modules.map((m) => (
                  <li key={m.number} className="flex gap-3">
                    <span className="font-heading text-fg-muted tabular-nums">{m.number}</span>
                    <div className="flex flex-col gap-1">
                      <p className="font-semibold text-fg-heading">{m.title}</p>
                      {m.topics.length > 0 ? <p className="text-sm text-fg-muted">{m.topics.join(' · ')}</p> : null}
                      {m.outcome ? <p className="text-sm text-fg-body">Resultado: {m.outcome}</p> : null}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ) : null}
          {l.programUrl ? <ExternalLink href={l.programUrl}>Ver el programa en la fuente externa</ExternalLink> : null}
        </li>
      ))}
    </ul>
  );
}

function ChallengeList({ items }: { items: ChallengeVM[] }) {
  return (
    <ul className="flex flex-col gap-4">
      {items.map((c) => (
        <li key={c.id} className={card}>
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <Origin origin={c.origin} />
              <Badge tone={c.status === 'Cerrado' ? 'danger' : 'neutral'}>{c.status}</Badge>
            </div>
            <h3 className="font-semibold text-fg-heading">{c.title}</h3>
            {c.category ? <p className="text-sm text-fg-muted">{c.category}</p> : null}
            {c.description ? <p className="text-fg-body">{c.description}</p> : null}
          </div>
          <Details items={c.details} />
          {c.deliverables.length > 0 ? (
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold text-fg-heading">Entregables</p>
              <ul className="list-disc pl-5 text-sm text-fg-body">
                {c.deliverables.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {c.steps.length > 0 ? (
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold text-fg-heading">Pasos</p>
              <ol className="flex flex-wrap gap-2">
                {c.steps.map((s, i) => (
                  <li key={s}>
                    <Tag>
                      {i + 1}. {s}
                    </Tag>
                  </li>
                ))}
              </ol>
            </div>
          ) : null}
          {c.officialUrl || c.conditionsUrl ? (
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {c.officialUrl ? <ExternalLink href={c.officialUrl}>Ver la convocatoria oficial</ExternalLink> : null}
              {c.conditionsUrl ? <ExternalLink href={c.conditionsUrl}>Bases y condiciones</ExternalLink> : null}
            </div>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

function MiniprojectList({ items }: { items: MiniprojectVM[] }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {items.map((m) => (
        <li key={m.id} className={card}>
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-2">
              <Origin origin={m.origin} />
              {m.level ? <Badge tone="neutral" icon="gauge">{m.level}</Badge> : null}
            </div>
            <h3 className="font-semibold text-fg-heading">{m.title}</h3>
            {m.description ? <p className="text-fg-body">{m.description}</p> : null}
          </div>
          <Details items={[...(m.duration ? [{ label: 'Duración', value: m.duration }] : []), ...(m.participation ? [{ label: 'Participación', value: m.participation }] : []), ...m.details]} />
          {m.skills.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {m.skills.map((s) => (
                <li key={s}>
                  <Tag>{s}</Tag>
                </li>
              ))}
            </ul>
          ) : null}
          {m.caseDataUrl ? <ExternalLink href={m.caseDataUrl}>Descargar los datos del caso (CSV ficticio)</ExternalLink> : null}
        </li>
      ))}
    </ul>
  );
}

/* Embajadores CLH (DEC-059): nombre, organización y país. Sin autorización, la etiqueta lo dice; no se omite a nadie. */
function AmbassadorsView({ items }: { items: AmbassadorVM[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {items.map((a) => (
        <li key={a.id} className={card}>
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-fg-heading">{a.name}</span>
            {a.organization ? <span className="text-sm text-fg-muted">{a.organization}</span> : null}
            {a.country ? <span className="text-sm text-fg-muted">{a.country}</span> : null}
          </div>
          {a.authorized ? null : <Badge tone="warning">Pendiente de autorización</Badge>}
        </li>
      ))}
    </ul>
  );
}

function ResourceList({ items }: { items: ResourceVM[] }) {
  const groups = new Map<string, ResourceVM[]>();
  for (const r of items) {
    const key = r.category ?? '';
    groups.set(key, [...(groups.get(key) ?? []), r]);
  }
  return (
    <div className="flex flex-col gap-8">
      {[...groups.entries()].map(([category, rows]) => (
        <section key={category || 'otros'} className="flex flex-col gap-2">
          {category ? <h3 className="font-heading font-semibold text-fg-heading">{category}</h3> : null}
          <ul className="flex flex-col">
            {rows.map((r) => (
              <li key={r.id} className={rowBase}>
                <ExternalLink href={r.url}>{r.title}</ExternalLink>
                {r.description ? <span className="text-sm text-fg-muted">{r.description}</span> : null}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function AcademicProgramList({ items }: { items: AcademicProgramVM[] }) {
  const families = new Map<string, AcademicProgramVM[]>();
  for (const p of items) families.set(p.family, [...(families.get(p.family) ?? []), p]);
  return (
    <div className="flex flex-col gap-8">
      {[...families.entries()].map(([family, rows]) => (
        <section key={family} className="flex flex-col gap-3">
          <h3 className="font-heading font-semibold text-fg-heading">
            {family} <span className="text-sm font-normal text-fg-muted">({rows.length})</span>
          </h3>
          <ul className="grid gap-4 md:grid-cols-2">
            {rows.map((p) => (
              <li key={p.id} className={card}>
                <div className="flex flex-col gap-2">
                  <h4 className="font-semibold text-fg-heading">{p.title}</h4>
                  {p.summary ? <p className="text-sm text-fg-body">{p.summary}</p> : null}
                </div>
                <Details
                  items={[
                    ...(p.duration ? [{ label: 'Duración', value: p.duration }] : []),
                    ...(p.mode ? [{ label: 'Modalidad', value: p.mode }] : []),
                    ...(p.location ? [{ label: 'Lugar', value: p.location }] : []),
                    ...(p.startLabel ? [{ label: 'Inicio previsto', value: p.startLabel }] : []),
                  ]}
                />
                {p.url ? <ExternalLink href={p.url}>Ver el programa en la web del centro</ExternalLink> : null}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function BrandList({ items }: { items: BrandVM[] }) {
  const divisions = new Map<string, BrandVM[]>();
  for (const b of items) divisions.set(b.division, [...(divisions.get(b.division) ?? []), b]);
  return (
    <div className="flex flex-col gap-8">
      {[...divisions.entries()].map(([division, rows]) => (
        <section key={division} className="flex flex-col gap-3">
          <h3 className="font-heading font-semibold text-fg-heading">{division}</h3>
          <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {rows.map((b) => (
              <li key={b.id} className="flex flex-col gap-2 rounded-card border border-line-subtle bg-surface-card p-4">
                {b.url ? <ExternalLink href={b.url}>{b.name}</ExternalLink> : <span className="font-semibold text-fg-heading">{b.name}</span>}
                {b.description ? <span className="text-sm text-fg-muted">{b.description}</span> : null}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

/* Contenido de una pestaña del paquete. `heading` es el titular de la fuente; si falta, el nombre de la pestaña. */
export function CollectionView({
  kind,
  collections,
  heading,
  label,
}: {
  kind: CompanyCollectionKey;
  collections: CompanyCollectionsVM;
  heading?: string;
  /* Nombre de la pestaña: sirve de encabezado (solo para lectores de pantalla) si la fuente no trae titular. */
  label: string;
}) {
  const body = (() => {
    switch (kind) {
      case 'learning':
        return <LearningList items={collections.learning} />;
      case 'challenges':
        return <ChallengeList items={collections.challenges} />;
      case 'miniprojects':
        return <MiniprojectList items={collections.miniprojects} />;
      case 'ambassadors':
        return <AmbassadorsView items={collections.ambassadors} />;
      case 'resources':
        return <ResourceList items={collections.resources} />;
      case 'scholarships':
        return <ScholarshipTable items={collections.scholarships} />;
      case 'academicPrograms':
        return <AcademicProgramList items={collections.academicPrograms} />;
      case 'brands':
        return <BrandList items={collections.brands} />;
    }
  })();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className={`font-heading text-h3 text-fg-heading ${heading ? '' : 'sr-only'}`}>{heading ?? label}</h2>
        <p className="max-w-[68ch] text-sm text-fg-muted">{NOTE[kind]}</p>
      </div>
      {body}
    </div>
  );
}
