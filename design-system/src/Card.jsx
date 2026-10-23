'use client';
import React from 'react';

const SURFACES = {
  light: { background: 'var(--surface-card)', color: 'var(--text-body)', border: '1px solid var(--border-subtle)' },
  sunken: { background: 'var(--surface-sunken)', color: 'var(--text-body)', border: '1px solid var(--border-subtle)' },
  inverse: { background: 'var(--surface-inverse)', color: 'var(--text-on-inverse)', border: '1px solid var(--border-inverse)' },
  gradient: { background: 'var(--gradient-brand)', color: 'var(--text-on-inverse)', border: '1px solid transparent' },
};

/* elevation defaults to 'none': the 1px border carries the card. Use 'md' (or 'lg') only for
   floating things such as a popover or a raised callout; 'sm' stays available but is not the default. */
export function Card({ surface = 'light', padding = 'var(--space-5)', elevation = 'none', interactive = false, children, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const shadow = { none: 'none', sm: 'var(--shadow-sm)', md: 'var(--shadow-md)', lg: 'var(--shadow-lg)' }[elevation];
  return (
    <div
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        borderRadius: 'var(--radius-lg)', padding, boxShadow: shadow,
        transition: 'box-shadow var(--duration-base) var(--ease-standard),transform var(--duration-base) var(--ease-standard)',
        cursor: interactive ? 'pointer' : undefined,
        ...SURFACES[surface],
        ...(interactive && hover ? { boxShadow: 'var(--shadow-md)', transform: 'translateY(-2px)' } : null),
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
