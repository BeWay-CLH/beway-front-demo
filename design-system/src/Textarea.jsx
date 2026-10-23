'use client';
import React from 'react';
import { isInvalid } from './a11y.js';

export function Textarea({ invalid = false, disabled = false, rows = 4, resize = 'vertical', style, onFocus, onBlur, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const bad = isInvalid({ invalid, 'aria-invalid': rest['aria-invalid'] });
  return (
    <textarea
      rows={rows} disabled={disabled} aria-invalid={bad || undefined}
      onFocus={(e) => { setFocus(true); if (onFocus) onFocus(e); }} onBlur={(e) => { setFocus(false); if (onBlur) onBlur(e); }}
      style={{
        width: '100%', boxSizing: 'border-box', minHeight: 96, padding: 'var(--space-3)', resize,
        fontFamily: 'var(--font-body)', fontSize: 'var(--text-body-size)', lineHeight: 'var(--text-body-lh)',
        color: 'var(--text-body)',
        background: disabled ? 'var(--surface-sunken)' : 'var(--surface-card)',
        border: '1px solid ' + (bad ? 'var(--status-danger)' : focus ? 'var(--focus-ring)' : 'var(--border-control)'),
        borderRadius: 'var(--radius-md)', outline: 'none',
        boxShadow: focus ? 'var(--ring-focus)' : 'none',
        cursor: disabled ? 'not-allowed' : undefined,
        transition: 'var(--transition-control)', ...style,
      }}
      {...rest}
    />
  );
}
