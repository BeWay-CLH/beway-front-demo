'use client';
import React from 'react';

export function Tooltip({ label, placement = 'top', children, style, ...rest }) {
  const [open, setOpen] = React.useState(false);
  const pos = {
    top: { bottom: '100%', left: '50%', transform: 'translate(-50%,-8px)' },
    bottom: { top: '100%', left: '50%', transform: 'translate(-50%,8px)' },
    left: { right: '100%', top: '50%', transform: 'translate(-8px,-50%)' },
    right: { left: '100%', top: '50%', transform: 'translate(8px,-50%)' },
  }[placement];
  return (
    <span
      onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}
      style={{ position: 'relative', display: 'inline-flex', ...style }}
      {...rest}
    >
      {children}
      <span
        role="tooltip"
        style={{
          position: 'absolute', zIndex: 60, whiteSpace: 'nowrap', pointerEvents: 'none',
          padding: '6px var(--space-3)', borderRadius: 'var(--radius-md)',
          background: 'var(--surface-inverse)', color: 'var(--text-on-inverse)', border: '1px solid var(--border-inverse)',
          fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500,
          boxShadow: 'var(--shadow-md)',
          opacity: open ? 1 : 0,
          transition: 'opacity var(--duration-fast) var(--ease-standard)',
          ...pos,
        }}
      >{label}</span>
    </span>
  );
}
