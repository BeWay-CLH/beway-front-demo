'use client';
import React from 'react';
import { Icon } from './Icon.jsx';
import { IconButton } from './IconButton.jsx';

const TONES = {
  info: { icon: 'info', color: 'var(--brand-cyan)', base: 'var(--brand-cyan)' },
  success: { icon: 'check-circle', color: 'var(--status-success-text)', base: 'var(--status-success)' },
  warning: { icon: 'alert-triangle', color: 'var(--status-warning-text)', base: 'var(--status-warning)' },
  danger: { icon: 'alert-circle', color: 'var(--status-danger-text)', base: 'var(--status-danger)' },
};

/* Inline, in-page message. For transient messages use Toast. */
export function Alert({ tone = 'info', title, children, icon, onDismiss, style, ...rest }) {
  const t = TONES[tone] || TONES.info;
  const urgent = tone === 'danger' || tone === 'warning';
  return (
    <div
      role={urgent ? 'alert' : 'status'}
      style={{
        display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start', padding: 'var(--space-4)',
        background: `color-mix(in srgb, ${t.base} 12%, var(--surface-card))`,
        border: `1px solid color-mix(in srgb, ${t.base} 38%, transparent)`,
        borderRadius: 'var(--radius-lg)', color: 'var(--text-body)', ...style,
      }}
      {...rest}
    >
      <span style={{ color: tone === 'info' ? 'var(--text-accent)' : t.color, marginTop: 1 }}><Icon name={icon || t.icon} size={18} /></span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, minWidth: 0 }}>
        {title ? <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-small-size)', color: 'var(--text-heading)' }}>{title}</span> : null}
        {children ? <span style={{ fontSize: 'var(--text-small-size)', lineHeight: 'var(--text-small-lh)' }}>{children}</span> : null}
      </div>
      {onDismiss ? <IconButton icon="x" label="Descartar" size="sm" onClick={onDismiss} /> : null}
    </div>
  );
}
