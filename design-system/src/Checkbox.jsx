'use client';
import React from 'react';
import { Icon } from './Icon.jsx';
import { useFocusVisible, focusRing, splitInputProps, nativeInputStyle } from './a11y.js';

/* A native <input type="checkbox">: Tab focuses it, Space toggles it, it submits with forms.
   onChange receives the new boolean, as before. */
export function Checkbox({ checked, defaultChecked, label, description, disabled = false, onChange, onFocus, onBlur, style, ...rest }) {
  const controlled = checked !== undefined;
  const [inner, setInner] = React.useState(Boolean(defaultChecked));
  const on = controlled ? Boolean(checked) : inner;
  const fv = useFocusVisible(onFocus, onBlur);
  const [inputProps, rootProps] = splitInputProps(rest);
  const invalid = inputProps['aria-invalid'] === true || inputProps['aria-invalid'] === 'true';
  return (
    <label
      style={{ display: 'inline-flex', gap: 'var(--space-3)', alignItems: description ? 'flex-start' : 'center', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, ...style }}
      {...rootProps}
    >
      <span style={{
        position: 'relative', width: 18, height: 18, flex: 'none', marginTop: description ? 2 : 0, boxSizing: 'border-box',
        borderRadius: 'var(--radius-sm)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        background: on ? 'var(--action-primary)' : 'var(--surface-card)',
        borderWidth: 1, borderStyle: 'solid',
        borderColor: invalid ? 'var(--status-danger)' : on ? 'var(--text-accent)' : 'var(--border-control)',
        color: 'var(--brand-dark)', boxShadow: fv.visible ? focusRing(false) : 'none', transition: 'var(--transition-control)',
      }}>
        <input
          {...inputProps} type="checkbox" checked={on} disabled={disabled}
          onChange={(e) => { const next = e.target.checked; if (!controlled) setInner(next); if (onChange) onChange(next); }}
          onFocus={fv.onFocus} onBlur={fv.onBlur} style={nativeInputStyle}
        />
        {on ? <Icon name="check" size={13} strokeWidth={3} /> : null}
      </span>
      <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-small-size)', color: 'var(--text-body)' }}>{label}</span>
        {description ? <span style={{ fontSize: 'var(--text-small-size)', color: 'var(--text-muted)' }}>{description}</span> : null}
      </span>
    </label>
  );
}
