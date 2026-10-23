import { Icon } from '@ds';
import { formatDate } from '@/lib/format';
import type { CompanyModuleItemVM, CompanyModuleVM, SourceVM } from '@/lib/models/company';

/* Una vista por tipo de módulo de la ficha (DEC-020). Los módulos vacíos no llegan: el servicio los quita. */

const rowBase = 'flex flex-col gap-1 border-t border-line-subtle py-4 first:border-t-0 first:pt-0 last:pb-0';

function Items({ items }: { items: CompanyModuleItemVM[] }) {
  return (
    <ul className="flex flex-col">
      {items.map((it) => (
        <li key={it.label} className={`${rowBase} md:flex-row md:items-baseline md:justify-between md:gap-6`}>
          <span className="flex items-center gap-3">
            {it.icon ? <span className="text-fg-muted"><Icon name={it.icon} size={16} /></span> : null}
            <span className="font-semibold text-fg-heading">{it.label}</span>
          </span>
          {it.value ? <span className="text-sm text-fg-muted md:max-w-[60%] md:text-right">{it.value}</span> : null}
        </li>
      ))}
    </ul>
  );
}

function SummaryView({ module }: { module: CompanyModuleVM }) {
  return (
    <div className="flex flex-col gap-6">
      {module.body ? <p className="max-w-[68ch] text-fg-body">{module.body}</p> : null}
      {module.items?.length ? (
        <dl className="grid gap-4 sm:grid-cols-3">
          {module.items.map((it) => (
            <div key={it.label} className="flex flex-col gap-1 rounded-card border border-line-subtle bg-surface-card p-4">
              <dt className="text-sm text-fg-muted">{it.label}</dt>
              <dd className="font-semibold text-fg-heading">{it.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </div>
  );
}

function CultureView({ module }: { module: CompanyModuleVM }) {
  return (
    <div className="flex flex-col gap-6">
      {module.body ? <p className="max-w-[68ch] text-fg-body">{module.body}</p> : null}
      {module.items?.length ? (
        <ul className="grid gap-4 md:grid-cols-3">
          {module.items.map((it) => (
            <li key={it.label} className="flex flex-col gap-2 rounded-card border border-line-subtle bg-surface-card p-5">
              {it.icon ? <span className="text-fg-accent"><Icon name={it.icon} size={20} /></span> : null}
              <span className="font-semibold text-fg-heading">{it.label}</span>
              {it.value ? <span className="text-sm text-fg-muted">{it.value}</span> : null}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function LocationsView({ module }: { module: CompanyModuleVM }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {(module.items ?? []).map((it) => (
        <li key={it.label} className="flex items-start gap-3 rounded-card border border-line-subtle bg-surface-card p-4">
          <span className="mt-0.5 text-fg-muted"><Icon name={it.icon ?? 'map-pin'} size={16} /></span>
          <span className="flex flex-col gap-1">
            <span className="font-semibold text-fg-heading">{it.label}</span>
            {it.value ? <span className="text-sm text-fg-muted">{it.value}</span> : null}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ListView({ module }: { module: CompanyModuleVM }) {
  return (
    <div className="flex flex-col gap-6">
      {module.body ? <p className="max-w-[68ch] text-fg-body">{module.body}</p> : null}
      {module.items?.length ? <Items items={module.items} /> : null}
    </div>
  );
}

export function ModuleView({ module }: { module: CompanyModuleVM }) {
  switch (module.kind) {
    case 'summary':
      return <SummaryView module={module} />;
    case 'culture':
      return <CultureView module={module} />;
    case 'locations':
      return <LocationsView module={module} />;
    default:
      return <ListView module={module} />;
  }
}

export function SourcesView({ sources }: { sources: SourceVM[] }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="max-w-[68ch] text-fg-muted">
        De dónde sale lo que ves en esta ficha y cuándo lo consultamos por última vez.
      </p>
      <ul className="flex flex-col">
        {sources.map((s) => (
          <li key={s.id} className={`${rowBase} md:flex-row md:items-baseline md:justify-between md:gap-6`}>
            <span className="flex items-center gap-3">
              <span className="text-fg-muted"><Icon name="file-text" size={16} /></span>
              <span className="font-semibold text-fg-heading">{s.label}</span>
            </span>
            <span className="text-sm tabular-nums text-fg-muted">Consultada el {formatDate(s.retrievedAt)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
