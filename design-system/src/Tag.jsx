'use client';
import React from 'react';
import { Icon } from './Icon.jsx';

/* variant="filter": category filter chips, cyan fill when selected.
   variant="default": any other tag, navy fill when selected. */
export function Tag({ children, onRemove, selected = false, variant = 'default', onClick, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const interactive = Boolean(onClick);
  return (
    <span
      onClick={onClick}
      aria-pressed={interactive ? selected : undefined}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(e); } } : undefined}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
        height: 30, padding: onRemove ? '0 var(--space-2) 0 var(--space-3)' : '0 var(--space-3)',
        borderRadius: 'var(--radius-pill)', fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-small-size)', fontWeight: 500,
        background: selected ? (variant === 'filter' ? 'var(--action-primary)' : 'var(--action-secondary)') : hover && interactive ? 'var(--surface-raised)' : 'var(--surface-card)',
        color: selected ? (variant === 'filter' ? 'var(--text-on-accent)' : 'var(--text-on-inverse)') : 'var(--text-body)',
        border: '1px solid ' + (selected ? 'transparent' : 'var(--border-strong)'),
        cursor: interactive ? 'pointer' : 'default',
        transition: 'var(--transition-control)', ...style,
      }}
      {...rest}
    >
      {children}
      {onRemove ? (
        <span
          role="button" aria-label="Quitar"
          onClick={(e) => { e.stopPropagation(); onRemove(e); }}
          style={{ display: 'inline-flex', padding: 2, borderRadius: 999, color: 'var(--text-muted)', cursor: 'pointer' }}
        >
          <Icon name="x" size={13} />
        </span>
      ) : null}
    </span>
  );
}
