'use client';
import React from 'react';
import { useFocusVisible, focusRing, splitInputProps, nativeInputStyle } from './a11y.js';

/* A native <input type="radio">. Radios that share a `name` get the browser's own arrow-key
   navigation, so use RadioGroup unless you need a single custom one. onChange() is called
   with the radio's `value` (undefined if none was given), as it was called with no argument before. */
export function Radio({ checked = false, label, description, disabled = false, onChange, onFocus, onBlur, style, ...rest }) {
  const fv = useFocusVisible(onFocus, onBlur);
  const [inputProps, rootProps] = splitInputProps(rest);
  return (
    <label
      style={{ display: 'inline-flex', gap: 'var(--space-3)', alignItems: description ? 'flex-start' : 'center', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, ...style }}
      {...rootProps}
    >
      <span style={{
        position: 'relative', width: 18, height: 18, flex: 'none', marginTop: description ? 2 : 0, borderRadius: 999, boxSizing: 'border-box',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--surface-card)', borderWidth: 1, borderStyle: 'solid',
        borderColor: checked ? 'var(--text-accent)' : 'var(--border-control)',
        boxShadow: fv.visible ? focusRing(false) : 'none', transition: 'var(--transition-control)',
      }}>
        <input
          {...inputProps} type="radio" checked={Boolean(checked)} disabled={disabled}
          onChange={() => { if (onChange) onChange(inputProps.value); }}
          onFocus={fv.onFocus} onBlur={fv.onBlur} style={nativeInputStyle}
        />
        {checked ? <span aria-hidden="true" style={{ width: 9, height: 9, borderRadius: 999, background: 'var(--text-accent)' }} /> : null}
      </span>
      <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-small-size)', color: 'var(--text-body)' }}>{label}</span>
        {description ? <span style={{ fontSize: 'var(--text-small-size)', color: 'var(--text-muted)' }}>{description}</span> : null}
      </span>
    </label>
  );
}

/* role="radiogroup" over native radios sharing one name: Tab enters on the selected option,
   arrow keys move and select, per-option `disabled` is honoured. Give it aria-label or
   aria-labelledby (Field does this for you). */
export function RadioGroup({ options = [], value, onChange, name, disabled = false, direction = 'column', style, ...rest }) {
  const auto = React.useId();
  const group = name || 'bw-radio-' + auto;
  return (
    <div role="radiogroup" style={{ display: 'flex', flexDirection: direction, gap: direction === 'row' ? 'var(--space-5)' : 'var(--space-3)', ...style }} {...rest}>
      {options.map((o) => {
        const opt = typeof o === 'string' ? { value: o, label: o } : o;
        return (
          <Radio key={opt.value} name={group} value={opt.value} label={opt.label} description={opt.description}
            disabled={disabled || Boolean(opt.disabled)}
            checked={value === opt.value} onChange={() => onChange && onChange(opt.value)} />
        );
      })}
    </div>
  );
}
