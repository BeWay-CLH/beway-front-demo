'use client';

import { useState, type KeyboardEvent } from 'react';
import { Button, Tabs } from '@ds';
import type { CompanyDetailVM, CompanyModuleKind } from '@/lib/models/company';
import { ModuleView, SourcesView } from './CompanyModules';

/* Pestañas de la ficha: un módulo por pestaña y, al final, las fuentes. El estado vive también en ?tab= para poder
   compartir el enlace a una pestaña; se actualiza con history.replaceState, sin recargar la página. */

const TAB_LABEL: Record<CompanyModuleKind | 'sources', string> = {
  summary: 'Resumen',
  culture: 'Cultura',
  programs: 'Programas',
  openings: 'Vacantes',
  locations: 'Sedes',
  sources: 'Fuentes',
};

export function CompanyTabs({
  modules,
  sources,
  initialTab,
}: {
  modules: CompanyDetailVM['modules'];
  sources: CompanyDetailVM['sources'];
  initialTab?: string;
}) {
  const tabs = [
    ...modules.map((m) => ({ value: m.kind as string, label: TAB_LABEL[m.kind] })),
    ...(sources.length > 0 ? [{ value: 'sources', label: TAB_LABEL.sources }] : []),
  ];
  const [tab, setTab] = useState(tabs.some((t) => t.value === initialTab) ? (initialTab as string) : tabs[0].value);

  const select = (value: string) => {
    setTab(value);
    try {
      const url = new URL(window.location.href);
      if (value === tabs[0].value) url.searchParams.delete('tab');
      else url.searchParams.set('tab', value);
      window.history.replaceState(window.history.state, '', url);
    } catch {
      /* Sin acceso al historial la pestaña cambia igual; solo no se refleja en la dirección. */
    }
  };

  /* Flechas, Inicio y Fin mueven la selección, como en cualquier lista de pestañas. */
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
    const buttons = Array.from(e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
    const i = buttons.indexOf(document.activeElement as HTMLButtonElement);
    if (i === -1) return;
    e.preventDefault();
    const next =
      e.key === 'Home' ? 0 : e.key === 'End' ? buttons.length - 1 : (i + (e.key === 'ArrowRight' ? 1 : -1) + buttons.length) % buttons.length;
    buttons[next].focus();
    buttons[next].click();
  };

  const module = modules.find((m) => m.kind === tab);
  const label = tabs.find((t) => t.value === tab)?.label ?? '';
  const cited = module?.sourceIds?.map((id) => sources.find((s) => s.id === id)?.label).filter(Boolean) ?? [];

  return (
    <div className="flex flex-col gap-6">
      <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0" onKeyDown={onKeyDown}>
        <Tabs
          aria-label="Secciones de la ficha"
          items={tabs}
          value={tab}
          onChange={select}
          style={{ width: 'max-content', minWidth: '100%', whiteSpace: 'nowrap' }}
        />
      </div>

      <div role="tabpanel" aria-label={label} tabIndex={0} className="flex flex-col gap-6">
        {/* Si el título repite la pestaña activa solo se lee con lector de pantalla; si añade algo ("Vacantes destacadas") se ve. */}
        <h2 className={`text-h3 font-heading text-fg-heading ${module && module.title !== label ? '' : 'sr-only'}`}>
          {module?.title ?? label}
        </h2>
        {module ? <ModuleView module={module} /> : <SourcesView sources={sources} />}
        {cited.length > 0 ? (
          <p className="flex flex-wrap items-center gap-x-2 text-sm text-fg-muted">
            <span>Fuente: {cited.join(', ')}.</span>
            {sources.length > 0 ? (
              <Button variant="ghost" size="sm" onClick={() => select('sources')} className="-ml-3">
                Ver todas las fuentes
              </Button>
            ) : null}
          </p>
        ) : null}
      </div>
    </div>
  );
}
