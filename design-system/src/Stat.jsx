'use client';
import React from 'react';
import { Icon } from './Icon.jsx';

/* One figure with a caps label. */
export function Stat({ value, label, icon, align = 'center', onInverse = false, style, ...rest }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: align === 'center' ? 'center' : 'flex-start', textAlign: align, gap: 4, ...style }} {...rest}>
      {icon ? <span style={{ color: onInverse ? 'var(--brand-cyan)' : 'var(--text-accent)' }}><Icon name={icon} size={20} /></span> : null}
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 28, lineHeight: 1.1, letterSpacing: 'var(--tracking-display)', color: onInverse ? 'var(--white)' : 'var(--text-heading)' }}>{value}</span>
      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: onInverse ? 'var(--text-on-inverse-muted)' : 'var(--text-muted)' }}>{label}</span>
    </div>
  );
}

/* Row of Stats separated by vertical hairlines. items: [{ value, label, icon? }]. */
export function StatStrip({ items = [], onInverse = false, style, ...rest }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'stretch', justifyContent: 'center', ...style }} {...rest}>
      {items.map((it, i) => (
        <div key={it.label + i} style={{
          flex: '1 1 140px', display: 'flex', justifyContent: 'center', padding: 'var(--space-4) var(--space-5)',
          borderLeft: i === 0 ? 'none' : '1px solid ' + (onInverse ? 'var(--border-inverse)' : 'var(--border-subtle)'),
        }}>
          <Stat {...it} onInverse={onInverse} />
        </div>
      ))}
    </div>
  );
}
