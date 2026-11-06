'use client';
import React from 'react';
import { Logo } from './Logo.jsx';

const link = { fontSize: 'var(--text-small-size)', color: 'var(--text-muted)', textDecoration: 'none' };

/* Pie claro (guía de correcciones, ficha 40): marca a la izquierda, frase central (tagline) y enlaces a la derecha.
   Fondo de superficie de tarjeta, no navy (DS_CAMBIOS.md). tagline se omite hasta tener el copy (decisión D9).
   links: [{ label, href }]; legalLinks igual. Un ítem sin href se muestra como texto, nunca como enlace "#". */
export function Footer({
  assetBase = '/assets', logo, logoHeight = 32, tagline, links = [], legalLinks = [],
  copyright = '© 2026 BeWay. Todos los derechos reservados.', style, ...rest
}) {
  return (
    <footer
      style={{
        display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', boxSizing: 'border-box',
        padding: 'var(--space-6) var(--space-6) var(--space-5)', background: 'var(--surface-card)',
        borderTop: '1px solid var(--border-subtle)', color: 'var(--text-body)', fontFamily: 'var(--font-body)', ...style,
      }}
      {...rest}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-5)', flexWrap: 'wrap' }}>
        {logo || <Logo variant="auto" height={logoHeight} assetBase={assetBase} />}
        {tagline ? <p style={{ margin: 0, flex: 1, textAlign: 'center', color: 'var(--text-muted)', fontSize: 'var(--text-small-size)' }}>{tagline}</p> : null}
        <nav style={{ display: 'flex', gap: 'var(--space-5)', flexWrap: 'wrap' }}>
          {links.map((l) => (l.href ? <a key={l.label} href={l.href} style={link}>{l.label}</a> : <span key={l.label} style={link}>{l.label}</span>))}
        </nav>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-4)', flexWrap: 'wrap', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-4)' }}>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{copyright}</span>
        <nav style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
          {legalLinks.map((l) => (l.href ? <a key={l.label} href={l.href} style={{ ...link, fontSize: 12 }}>{l.label}</a> : <span key={l.label} style={{ ...link, fontSize: 12 }}>{l.label}</span>))}
        </nav>
      </div>
    </footer>
  );
}
