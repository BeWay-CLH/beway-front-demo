'use client';
import React from 'react';
import { Icon } from './Icon.jsx';

export function Tabs({ items = [], value, onChange, onInverse = false, style, ...rest }) {
  return (
    <div
      role="tablist"
      style={{ display: 'flex', gap: 'var(--space-5)', borderBottom: '1px solid ' + (onInverse ? 'var(--border-inverse)' : 'var(--border-subtle)'), ...style }}
      {...rest}
    >
      {items.map((it) => {
        const t = typeof it === 'string' ? { value: it, label: it } : it;
        const active = value === t.value;
        return (
          <button
            key={t.value} role="tab" aria-selected={active} onClick={() => onChange && onChange(t.value)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '0 0 var(--space-3)', marginBottom: -1,
              fontFamily: 'var(--font-body)', fontSize: 'var(--text-small-size)', fontWeight: 600,
              color: active ? (onInverse ? 'var(--white)' : 'var(--text-heading)') : (onInverse ? 'var(--text-on-inverse-muted)' : 'var(--text-muted)'),
              borderBottom: '2px solid ' + (active ? 'var(--brand-cyan)' : 'transparent'),
              transition: 'var(--transition-control)',
            }}
          >
            {t.icon ? <Icon name={t.icon} size={16} /> : null}
            {t.label}
            {t.count !== undefined ? (
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}>{t.count}</span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
