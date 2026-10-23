'use client';
import React from 'react';
import { useFocusVisible, focusRing, splitInputProps, nativeInputStyle } from './a11y.js';

/* A native <input type="checkbox" role="switch">: Tab focuses it, Space toggles it,
   it submits with forms. onChange receives the new boolean, as before. */
export function Switch({ checked, defaultChecked, label, disabled = false, onChange, onFocus, onBlur, style, ...rest }) {
  const controlled = checked !== undefined;
  const [inner, setInner] = React.useState(Boolean(defaultChecked));
  const on = controlled ? Boolean(checked) : inner;
  const fv = useFocusVisible(onFocus, onBlur);
  const [inputProps, rootProps] = splitInputProps(rest);
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-3)', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, ...style }} {...rootProps}>
      <span style={{
        position: 'relative', width: 40, height: 22, borderRadius: 999, flex: 'none', boxSizing: 'border-box',
        background: on ? 'var(--action-primary)' : 'var(--border-control)',
        boxShadow: fv.visible ? focusRing(false) : 'none',
        transition: 'background-color var(--duration-base) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)',
      }}>
        <input
          {...inputProps} type="checkbox" role="switch" checked={on} disabled={disabled}
          onChange={(e) => { const next = e.target.checked; if (!controlled) setInner(next); if (onChange) onChange(next); }}
          onFocus={fv.onFocus} onBlur={fv.onBlur} style={nativeInputStyle}
        />
        <span aria-hidden="true" style={{
          position: 'absolute', top: 2, left: 2, width: 18, height: 18, borderRadius: 999,
          background: on ? 'var(--brand-dark)' : 'var(--white)', boxShadow: 'var(--shadow-xs)',
          transform: on ? 'translateX(18px)' : 'translateX(0)',
          transition: 'transform var(--duration-base) var(--ease-standard)',
        }} />
      </span>
      {label ? <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-small-size)', color: 'var(--text-body)' }}>{label}</span> : null}
    </label>
  );
}
