'use client';
import React from 'react';
import { Icon } from './Icon.jsx';
import { Card } from './Card.jsx';

export function FeatureCard({ icon = 'sparkles', title, description, style, ...rest }) {
  return (
    <Card style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', height: '100%', ...style }} {...rest}>
      <span style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-accent-subtle)', color: 'var(--text-accent)' }}>
        <Icon name={icon} size={22} />
      </span>
      {title ? <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 18, lineHeight: 1.3, letterSpacing: 'var(--tracking-tight)', color: 'var(--text-heading)' }}>{title}</h3> : null}
      {description ? <p style={{ margin: 0, fontSize: 'var(--text-small-size)', lineHeight: 'var(--text-small-lh)', color: 'var(--text-muted)' }}>{description}</p> : null}
    </Card>
  );
}
