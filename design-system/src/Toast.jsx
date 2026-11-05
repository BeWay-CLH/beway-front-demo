'use client';
import React from 'react';
import { Icon } from './Icon.jsx';
import { IconButton } from './IconButton.jsx';

const TONES = {
  info: { icon: 'info', accent: 'var(--status-info)' },
  success: { icon: 'check-circle', accent: 'var(--status-success)' },
  warning: { icon: 'alert-triangle', accent: 'var(--status-warning)' },
  danger: { icon: 'alert-circle', accent: 'var(--status-danger)' },
};

export function Toast({ tone = 'info', title, message, onDismiss, style, ...rest }) {
  const t = TONES[tone] || TONES.info;
  return (
    <div
      role="status"
      style={{
        display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start',
        minWidth: 320, maxWidth: 420, padding: 'var(--space-4)',
        background: 'var(--surface-inverse)', color: 'var(--text-on-inverse)',
        border: '1px solid var(--border-inverse)', borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-inverse)', ...style,
      }}
      {...rest}
    >
      <span style={{ color: t.accent, marginTop: 1 }}><Icon name={t.icon} size={18} /></span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
        {title ? <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-small-size)' }}>{title}</span> : null}
        {message ? <span style={{ fontSize: 'var(--text-small-size)', color: 'var(--text-on-inverse-muted)' }}>{message}</span> : null}
      </div>
      {onDismiss ? <IconButton icon="x" label="Descartar" size="sm" onInverse onClick={onDismiss} /> : null}
    </div>
  );
}
