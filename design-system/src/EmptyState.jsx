'use client';
import React from 'react';
import { Icon } from './Icon.jsx';

/* tone="accent" (default): cyan-tinted tile, for invitations to act. tone="neutral": grey tile, for plain
   "nothing here" states such as an empty search, so the screen is not shouting. */
export function EmptyState({ icon = 'inbox', tone = 'accent', title, description, action, style, ...rest }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 'var(--space-3)', padding: 'var(--space-8) var(--space-5)', ...style }} {...rest}>
      <span style={{ width: 56, height: 56, borderRadius: 'var(--radius-lg)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: tone === 'neutral' ? 'var(--surface-raised)' : 'var(--surface-accent-subtle)', color: tone === 'neutral' ? 'var(--text-muted)' : 'var(--text-accent)' }}>
        <Icon name={icon} size={26} />
      </span>
      {title ? <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-h3-size)', lineHeight: 'var(--text-h3-lh)', letterSpacing: 'var(--tracking-tight)', color: 'var(--text-heading)' }}>{title}</div> : null}
      {description ? <p style={{ margin: 0, maxWidth: 420, fontSize: 'var(--text-small-size)', lineHeight: 'var(--text-small-lh)', color: 'var(--text-muted)' }}>{description}</p> : null}
      {action ? <div style={{ marginTop: 'var(--space-2)' }}>{action}</div> : null}
    </div>
  );
}
