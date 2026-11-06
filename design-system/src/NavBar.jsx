'use client';
import React from 'react';
import { Icon } from './Icon.jsx';
import { Logo } from './Logo.jsx';

/* Cabecera en dos filas (guía de correcciones, fichas 01 y 02; DS_CAMBIOS.md):
   fila 1 (barHeight): logo a la izquierda, buscador centrado a la derecha, acciones a la derecha.
   fila 2 (navHeight): enlaces a la izquierda (links) y a la derecha (endLinks). Sin fila 2 si no hay enlaces.
   Alturas por contexto: general 83 + 57; directorio 66 + 46; ficha de empresa 58 (sin fila 2).
   barClassName, navClassName y searchClassName permiten ocultar filas con clases responsive. */
export function NavBar({
  assetBase = '/assets', logo, logoHeight = 32,
  showSearch = true, searchPlaceholder = 'Buscar empresas, certificaciones, oportunidades…', onSearch,
  links, endLinks, actions, barHeight = 83, navHeight = 57,
  barClassName, navClassName, searchClassName, style, ...rest
}) {
  const [q, setQ] = React.useState('');
  const hasNav = Boolean(links || endLinks);
  return (
    <header
      style={{
        display: 'flex', flexDirection: 'column', boxSizing: 'border-box',
        background: 'var(--surface-card)', borderBottom: '1px solid var(--border-subtle)', ...style,
      }}
      {...rest}
    >
      <div
        className={barClassName}
        style={{
          display: 'flex', alignItems: 'center', gap: 'var(--space-5)', height: barHeight, boxSizing: 'border-box',
          padding: '0 var(--space-6)',
        }}
      >
        <div style={{ flex: 'none', display: 'flex' }}>
          {logo || <Logo variant="auto" height={logoHeight} assetBase={assetBase} />}
        </div>
        {showSearch ? (
          <div className={searchClassName} style={{ flex: 1, display: 'flex', justifyContent: 'center', minWidth: 0 }}>
            <form
              role="search" onSubmit={(e) => { e.preventDefault(); onSearch && onSearch(q); }}
              style={{ position: 'relative', width: '100%', maxWidth: 515 }}
            >
              <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }}>
                <Icon name="search" size={16} />
              </span>
              <input
                type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={searchPlaceholder} aria-label="Buscar"
                style={{
                  width: '100%', boxSizing: 'border-box', height: 'var(--control-height-md)', padding: '0 var(--space-3) 0 38px', outline: 'none',
                  fontFamily: 'var(--font-body)', fontSize: 'var(--text-small-size)', borderRadius: 'var(--radius-search)',
                  color: 'var(--text-body)', background: 'var(--surface-sunken)', border: '1px solid var(--border-control)',
                }}
              />
            </form>
          </div>
        ) : <span style={{ flex: 1 }} />}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flex: 'none' }}>{actions}</div>
      </div>
      {hasNav ? (
        <div
          className={navClassName}
          style={{
            display: 'flex', alignItems: 'stretch', justifyContent: 'space-between', gap: 'var(--space-5)',
            height: navHeight, boxSizing: 'border-box', padding: '0 var(--space-6)', borderTop: '1px solid var(--border-subtle)',
          }}
        >
          {links ? <nav style={{ display: 'flex', alignItems: 'stretch', gap: 'var(--space-5)', minWidth: 0 }}>{links}</nav> : <span />}
          {endLinks ? <nav style={{ display: 'flex', alignItems: 'stretch', gap: 'var(--space-5)', flex: 'none' }}>{endLinks}</nav> : null}
        </div>
      ) : null}
    </header>
  );
}
