import React from 'react';

/* Keyboard-only focus: true after Tab / arrow focus, false after a mouse click.
   Inline styles cannot express :focus-visible, so components ask the browser. */
export function useFocusVisible(onFocus, onBlur) {
  const [visible, setVisible] = React.useState(false);
  return {
    visible,
    onFocus: (e) => {
      let v = true;
      try { v = e.currentTarget.matches(':focus-visible'); } catch (err) { v = true; }
      setVisible(v);
      if (onFocus) onFocus(e);
    },
    onBlur: (e) => { setVisible(false); if (onBlur) onBlur(e); },
  };
}

/* Two-layer ring: a gap in the surface colour, then the 3:1 focus colour. */
export function focusRing(onInverse) {
  return onInverse
    ? '0 0 0 2px var(--surface-inverse), 0 0 0 4px var(--focus-ring-on-inverse)'
    : '0 0 0 2px var(--surface-page), 0 0 0 4px var(--focus-ring)';
}

/* Joins box-shadows, skipping empty ones. */
export function shadows(...list) {
  return list.filter(Boolean).join(', ') || 'none';
}

/* Props that belong on the native <input> of Switch / Checkbox / Radio; everything else stays on the label. */
const INPUT_KEYS = ['id', 'name', 'value', 'required', 'autoFocus', 'form', 'tabIndex', 'aria-label', 'aria-labelledby', 'aria-describedby', 'aria-invalid', 'aria-required'];
export function splitInputProps(rest) {
  const input = {}; const root = {};
  Object.keys(rest).forEach((k) => { (INPUT_KEYS.indexOf(k) > -1 ? input : root)[k] = rest[k]; });
  return [input, root];
}

/* Native control hidden over its custom box: the browser still owns click, Space, arrows and forms. */
export const nativeInputStyle = {
  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', margin: 0, padding: 0,
  opacity: 0, cursor: 'inherit', zIndex: 1,
};

export function isInvalid(props) {
  return props.invalid === true || props['aria-invalid'] === true || props['aria-invalid'] === 'true';
}
