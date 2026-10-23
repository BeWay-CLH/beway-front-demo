'use client';
import React from 'react';
import { IconButton } from './IconButton.jsx';

export function Pagination({ page = 1, pageCount = 1, onChange, style, ...rest }) {
  const go = (p) => onChange && p >= 1 && p <= pageCount && onChange(p);
  const pages = [];
  for (let p = 1; p <= pageCount; p += 1) {
    if (p === 1 || p === pageCount || Math.abs(p - page) <= 1) pages.push(p);
    else if (pages[pages.length - 1] !== '…') pages.push('…');
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', ...style }} {...rest}>
      <IconButton icon="chevron-left" variant="outline" size="sm" label="Anterior" onClick={() => go(page - 1)} disabled={page === 1} />
      {pages.map((p, i) => p === '…' ? (
        <span key={'g' + i} style={{ width: 32, textAlign: 'center', color: 'var(--text-muted)', fontSize: 'var(--text-small-size)' }}>…</span>
      ) : (
        <button key={p} aria-current={p === page ? 'page' : undefined} onClick={() => go(p)} style={{
          width: 32, height: 32, borderRadius: 'var(--radius-md)', cursor: 'pointer',
          fontFamily: 'var(--font-body)', fontSize: 'var(--text-small-size)', fontWeight: 600,
          background: p === page ? 'var(--action-secondary)' : 'transparent',
          color: p === page ? 'var(--text-on-inverse)' : 'var(--text-muted)',
          border: '1px solid ' + (p === page ? 'transparent' : 'var(--border-subtle)'),
          transition: 'var(--transition-control)',
        }}>{p}</button>
      ))}
      <IconButton icon="chevron-right" variant="outline" size="sm" label="Siguiente" onClick={() => go(page + 1)} disabled={page === pageCount} />
    </div>
  );
}
