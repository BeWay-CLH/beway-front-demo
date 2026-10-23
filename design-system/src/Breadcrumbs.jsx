'use client';
import React from 'react';
import { Icon } from './Icon.jsx';

export function Breadcrumbs({ items = [], style, ...rest }) {
  return (
    <nav style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap', ...style }} {...rest}>
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <React.Fragment key={it.label + i}>
            {last ? (
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-small-size)', fontWeight: 600, color: 'var(--text-body)' }}>{it.label}</span>
            ) : (
              <a href={it.href || '#'} style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-small-size)', color: 'var(--text-muted)', textDecoration: 'none' }}>{it.label}</a>
            )}
            {!last ? <span style={{ color: 'var(--text-muted)', display: 'inline-flex' }}><Icon name="chevron-right" size={14} /></span> : null}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
