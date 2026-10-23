'use client';
import React from 'react';
import { isInvalid } from './a11y.js';
import { Icon } from './Icon.jsx';

const shell = (invalid, focus, disabled) => ({
  width: '100%', boxSizing: 'border-box', height: 'var(--control-height-md)', padding: '0 var(--space-3)',
  fontFamily: 'var(--font-body)', fontSize: 'var(--text-body-size)', color: 'var(--text-body)',
  background: disabled ? 'var(--surface-sunken)' : 'var(--surface-card)',
  border: '1px solid ' + (invalid ? 'var(--status-danger)' : focus ? 'var(--focus-ring)' : 'var(--border-control)'),
  borderRadius: 'var(--radius-md)', outline: 'none',
  boxShadow: focus ? 'var(--ring-focus)' : 'none',
  transition: 'var(--transition-control)',
});

export function Input({ icon, invalid = false, disabled = false, style, onFocus, onBlur, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const bad = isInvalid({ invalid, 'aria-invalid': rest['aria-invalid'] });
  const input = (
    <input
      disabled={disabled}
      onFocus={(e) => { setFocus(true); if (onFocus) onFocus(e); }} onBlur={(e) => { setFocus(false); if (onBlur) onBlur(e); }}
      style={{ ...shell(bad, focus, disabled), ...(icon ? { paddingLeft: 38 } : null), ...style }}
      {...rest}
      aria-invalid={bad || undefined}
    />
  );
  if (!icon) return input;
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }}>
        <Icon name={icon} size={16} />
      </span>
      {input}
    </div>
  );
}
