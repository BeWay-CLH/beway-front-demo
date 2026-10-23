'use client';
import React from 'react';
import { Logo } from './Logo.jsx';

const link = { fontSize: 'var(--text-small-size)', color: 'var(--text-on-inverse-muted)', textDecoration: 'none' };

/* links: [{ label, href }]; legalLinks likewise. An item without href renders as plain text, never a dead "#" link.
   Always on the inverse surface. */
export function Footer({ assetBase = '/assets', logo, logoHeight = 32, links = [], legalLinks = [], copyright = '© 2026 BeWay. Todos los derechos reservados.', style, ...rest }) {
  return (
    <footer
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', padding: 'var(--space-7) var(--space-6) var(--space-5)', background: 'var(--surface-inverse)', color: 'var(--text-on-inverse)', fontFamily: 'var(--font-body)', ...style }}
      {...rest}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-5)', flexWrap: 'wrap' }}>
        {logo || <Logo variant="negative" height={logoHeight} assetBase={assetBase} />}
        <nav style={{ display: 'flex', gap: 'var(--space-5)', flexWrap: 'wrap' }}>
          {links.map((l) => (l.href ? <a key={l.label} href={l.href} style={link}>{l.label}</a> : <span key={l.label} style={link}>{l.label}</span>))}
        </nav>
      </div>
      <div style={{ height: 1, background: 'var(--border-inverse)' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-4)', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: 13, color: 'var(--text-on-inverse-muted)' }}>{copyright}</span>
        <nav style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
          {legalLinks.map((l) => (l.href ? <a key={l.label} href={l.href} style={{ ...link, fontSize: 13 }}>{l.label}</a> : <span key={l.label} style={{ ...link, fontSize: 13 }}>{l.label}</span>))}
        </nav>
      </div>
    </footer>
  );
}
