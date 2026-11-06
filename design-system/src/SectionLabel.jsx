'use client';
import React from 'react';

/* The brand board's section device: wide-tracked caps over a short cyan rule. */
export function SectionLabel({ children, onInverse = false, align = 'left', style, ...rest }) {
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 'var(--space-2)', alignItems: align === 'center' ? 'center' : 'flex-start', ...style }} {...rest}>
      <span style={{
        fontFamily: 'var(--font-body)', fontSize: 'var(--text-eyebrow-size)', fontWeight: 700,
        letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase',
        color: onInverse ? 'var(--white)' : 'var(--text-heading)',
      }}>{children}</span>
      <span style={{ width: 56, height: 'var(--border-width-accent)', background: 'var(--accent-teal)', borderRadius: 2 }} />
    </div>
  );
}
