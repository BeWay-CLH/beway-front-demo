'use client';

import { useState, type KeyboardEvent } from 'react';
import { Button, Tabs } from '@ds';
import type { CompanyCollectionKey, CompanyDetailVM, CompanyModuleKind } from '@/lib/models/company';
import { CollectionView, COLLECTION_LABEL, COLLECTION_ORDER, hasCollection } from './CompanyCollections';
import { ModuleView, SourcesView } from './CompanyModules';

/* Pestañas de la ficha: un módulo por pestaña, las pestañas del paquete de contenido (solo si tienen datos) y, al final,
   las fuentes. El estado vive también en ?tab= para poder compartir el enlace a una pestaña; se actualiza con
   history.replaceState, sin recargar la página. */

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
  collections,
  sectionHeadings = {},
  heroActions = [],
  initialTab,
}: {
  modules: CompanyDetailVM['modules'];
  sources: CompanyDetailVM['sources'];
  collections?: CompanyDetailVM['collections'];
  sectionHeadings?: CompanyDetailVM['sectionHeadings'];
  heroActions?: CompanyDetailVM['heroActions'];
  initialTab?: string;
}) {
  const collectionKeys: CompanyCollectionKey[] = collections ? COLLECTION_ORDER.filter((k) => hasCollection(collections, k)) : [];
  const tabs = [
    ...modules.map((m) => ({ value: m.kind as string, label: TAB_LABEL[m.kind] })),
    ...collectionKeys.map((k) => ({ value: k as string, label: COLLECTION_LABEL[k] })),
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
  const collectionKey = collectionKeys.find((k) => k === tab);
  const label = tabs.find((t) => t.value === tab)?.label ?? '';
  /* En el Resumen, el titular de la fuente ("about") sustituye al título del módulo cuando lo hay. */
  const moduleTitle = module?.kind === 'summary' && sectionHeadings.about ? sectionHeadings.about : module?.title;
  const cited = module?.sourceIds?.map((id) => sources.find((s) => s.id === id)?.label).filter(Boolean) ?? [];
  /* Un CTA de la cabecera solo lleva a una pestaña que existe. */
  const actions = heroActions.filter((a) => collectionKeys.includes(a.section));

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

      {collections && collectionKey ? (
        <div role="tabpanel" aria-label={label} tabIndex={0}>
          <CollectionView kind={collectionKey} collections={collections} heading={sectionHeadings[collectionKey]} label={label} />
        </div>
      ) : (
        <div role="tabpanel" aria-label={label} tabIndex={0} className="flex flex-col gap-6">
          {/* Si el título repite la pestaña activa solo se lee con lector de pantalla; si añade algo ("Vacantes destacadas") se ve. */}
          <h2 className={`text-h3 font-heading text-fg-heading ${moduleTitle && moduleTitle !== label ? '' : 'sr-only'}`}>
            {moduleTitle ?? label}
          </h2>
          {module ? <ModuleView module={module} /> : <SourcesView sources={sources} />}
          {module?.kind === 'summary' && actions.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {actions.map((a) => (
                <Button key={`${a.section}-${a.label}`} variant="outline" size="sm" iconAfter="arrow-right" onClick={() => select(a.section)}>
                  {a.label}
                </Button>
              ))}
            </div>
          ) : null}
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
      )}
    </div>
  );
}
