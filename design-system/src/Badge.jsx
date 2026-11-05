'use client';
import React from 'react';
import { Icon } from './Icon.jsx';

const TONES = {
  neutral: { background: 'var(--surface-sunken)', color: 'var(--text-muted)', border: '1px solid var(--border-subtle)' },
  accent: { background: 'var(--surface-accent-subtle)', color: 'var(--text-accent)', border: '1px solid var(--border-accent-subtle)' },
  navy: { background: 'var(--action-secondary)', color: 'var(--text-on-inverse)', border: '1px solid transparent' },
  success: { background: 'color-mix(in srgb, var(--status-success) 14%, transparent)', color: 'var(--status-success-text)', border: '1px solid color-mix(in srgb, var(--status-success) 34%, transparent)' },
  warning: { background: 'color-mix(in srgb, var(--status-warning) 16%, transparent)', color: 'var(--status-warning-text)', border: '1px solid color-mix(in srgb, var(--status-warning) 36%, transparent)' },
  danger: { background: 'color-mix(in srgb, var(--status-danger) 14%, transparent)', color: 'var(--status-danger-text)', border: '1px solid color-mix(in srgb, var(--status-danger) 34%, transparent)' },
  inverse: { background: 'rgba(255,255,255,.10)', color: 'var(--white)', border: '1px solid var(--border-inverse)' },
};

export function Badge({ tone = 'neutral', icon, dot = false, children, style, ...rest }) {
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
        height: 24, padding: '0 var(--space-3)', borderRadius: 'var(--radius-md)',
        fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600,
        letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase',
        whiteSpace: 'nowrap', ...TONES[tone], ...style,
      }}
      {...rest}
    >
      {dot ? <span style={{ width: 6, height: 6, borderRadius: 999, background: 'currentColor' }} /> : null}
      {icon ? <Icon name={icon} size={13} /> : null}
      {children}
    </span>
  );
}
