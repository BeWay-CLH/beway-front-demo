'use client';
import React from 'react';
import { Icon } from './Icon.jsx';
import { useFocusVisible, focusRing, shadows } from './a11y.js';

const BOX = { sm: 32, md: 40, lg: 48 };

/* borderColor only, never the `border` shorthand (same rule as Button). */
const BASE = {
  ghost: { background: 'transparent', color: 'var(--text-muted)', borderColor: 'transparent' },
  outline: { background: 'var(--surface-card)', color: 'var(--text-body)', borderColor: 'var(--border-control)' },
  solid: { background: 'var(--action-primary)', color: 'var(--text-on-accent)', borderColor: 'transparent' },
};
const HOVER = {
  ghost: { background: 'var(--surface-raised)', color: 'var(--text-body)' },
  outline: { background: 'var(--surface-raised)', borderColor: 'var(--text-muted)' },
  solid: { background: 'var(--action-primary-hover)' },
};
const INVERSE = {
  ghost: { color: 'var(--text-on-inverse)' },
  outline: { background: 'transparent', color: 'var(--text-on-inverse)', borderColor: 'rgba(255,255,255,.5)' },
  solid: {},
};
const INVERSE_HOVER = {
  ghost: { background: 'rgba(255,255,255,.10)', color: 'var(--white)' },
  outline: { background: 'rgba(255,255,255,.10)', borderColor: 'var(--white)' },
  solid: HOVER.solid,
};

export function IconButton({ icon, size = 'md', variant = 'ghost', label, onInverse = false, disabled = false, as, href, style, onFocus, onBlur, onClick, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const fv = useFocusVisible(onFocus, onBlur);
  const box = BOX[size] || BOX.md;
  const name = BASE[variant] ? variant : 'ghost';
  const hv = hover && !disabled ? (onInverse ? INVERSE_HOVER[name] : HOVER[name]) : null;
  const dis = disabled
    ? (onInverse
      ? { background: 'transparent', color: 'var(--text-on-inverse-muted)', borderColor: name === 'outline' ? 'rgba(255,255,255,.18)' : 'transparent', opacity: 0.7 }
      : { background: name === 'solid' ? 'var(--surface-raised)' : 'transparent', color: 'var(--text-muted)', borderColor: name === 'outline' ? 'var(--border-strong)' : 'transparent', opacity: 0.8 })
    : null;
  const Tag = as || (href ? 'a' : 'button');
  const native = Tag === 'button';
  const linkProps = native
    ? { type: 'button', disabled }
    : { href: disabled ? undefined : href, 'aria-disabled': disabled || undefined, tabIndex: disabled ? -1 : undefined };
  const { glow, ...hvStyle } = hv || {};
  return (
    <Tag
      {...linkProps} aria-label={label} title={label}
      onClick={disabled ? (e) => e.preventDefault() : onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      onFocus={fv.onFocus} onBlur={fv.onBlur}
      style={{
        width: box, height: box, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        boxSizing: 'border-box', padding: 0, margin: 0, outline: 'none', textDecoration: 'none',
        borderWidth: 1, borderStyle: 'solid', borderRadius: 'var(--radius-md)',
        cursor: disabled ? 'not-allowed' : 'pointer', transition: 'var(--transition-control)',
        ...BASE[name], ...(onInverse ? INVERSE[name] : null), ...hvStyle, ...dis,
        boxShadow: shadows(glow ? 'var(--shadow-glow)' : null, fv.visible ? focusRing(onInverse) : null),
        ...style,
      }}
      {...rest}
    >
      <Icon name={icon} size={size === 'sm' ? 16 : size === 'lg' ? 22 : 18} />
    </Tag>
  );
}
