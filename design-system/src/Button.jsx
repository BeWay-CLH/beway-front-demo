'use client';
import React from 'react';
import { Icon } from './Icon.jsx';
import { useFocusVisible, focusRing, shadows } from './a11y.js';

const SIZES = {
  sm: { height: 'var(--control-height-sm)', padding: '0 var(--space-3)', font: 'var(--text-small-size)', gap: 'var(--space-2)', icon: 16 },
  md: { height: 'var(--control-height-md)', padding: '0 var(--space-4)', font: 'var(--text-body-size)', gap: 'var(--space-2)', icon: 18 },
  lg: { height: 'var(--control-height-lg)', padding: '0 var(--space-5)', font: 'var(--text-body-size)', gap: 'var(--space-3)', icon: 20 },
};

/* Every variant sets background, color and borderColor, never the `border` shorthand,
   so hover can change borderColor without React warning about mixed shorthand/longhand. */
const VARIANTS = {
  primary: { background: 'var(--action-primary)', color: 'var(--text-on-accent)', borderColor: 'transparent' },
  secondary: { background: 'var(--action-secondary)', color: 'var(--text-on-inverse)', borderColor: 'var(--border-inverse)' },
  outline: { background: 'transparent', color: 'var(--text-body)', borderColor: 'var(--border-control)' },
  ghost: { background: 'transparent', color: 'var(--text-body)', borderColor: 'transparent' },
  /* `border-box` in the shorthand sets background-origin and background-clip too. */
  gradient: { background: 'var(--gradient-action) border-box', color: 'var(--white)', borderColor: 'transparent' },
};

const HOVER = {
  primary: { background: 'var(--action-primary-hover)', glow: true },
  secondary: { background: 'var(--action-secondary-hover)' },
  outline: { background: 'var(--surface-raised)', borderColor: 'var(--text-muted)' },
  ghost: { background: 'var(--surface-raised)' },
  gradient: { glow: true },
};

/* On a dark photo or surface (inverse): light fills and visible outlines. */
const INVERSE = {
  primary: {},
  secondary: { background: 'var(--white)', color: 'var(--brand-dark)', borderColor: 'transparent' },
  outline: { color: 'var(--text-on-inverse)', borderColor: 'rgba(255,255,255,.5)' },
  ghost: { color: 'var(--text-on-inverse)' },
  gradient: {},
};
const INVERSE_HOVER = {
  primary: HOVER.primary,
  secondary: { background: 'var(--brand-gray-100)' },
  outline: { background: 'rgba(255,255,255,.10)', borderColor: 'var(--white)' },
  ghost: { background: 'rgba(255,255,255,.10)' },
  gradient: HOVER.gradient,
};

/* Flat, obviously inactive: no opacity trick that turns cyan into pastel cyan. */
function disabledStyle(variant, onInverse) {
  if (onInverse) {
    return { background: variant === 'outline' || variant === 'ghost' ? 'transparent' : 'rgba(255,255,255,.08)',
      color: 'var(--text-on-inverse-muted)', borderColor: variant === 'outline' ? 'rgba(255,255,255,.18)' : 'transparent', opacity: 0.7 };
  }
  return { background: variant === 'outline' || variant === 'ghost' ? 'transparent' : 'var(--surface-raised)',
    color: 'var(--text-muted)', borderColor: variant === 'outline' ? 'var(--border-strong)' : 'transparent', opacity: 0.8 };
}

export function Button({
  variant = 'primary', size = 'md', icon, iconAfter, fullWidth = false,
  disabled = false, onInverse = false, as, href, children, style, onFocus, onBlur, onClick, ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const fv = useFocusVisible(onFocus, onBlur);
  const s = SIZES[size] || SIZES.md;
  const name = VARIANTS[variant] ? variant : 'primary';
  const v = { ...VARIANTS[name], ...(onInverse ? INVERSE[name] : null) };
  const hv = hover && !disabled ? (onInverse ? INVERSE_HOVER[name] : HOVER[name]) : null;
  const Tag = as || (href ? 'a' : 'button');
  const native = Tag === 'button';
  const merged = { ...v, ...(hv ? { background: hv.background || v.background, borderColor: hv.borderColor || v.borderColor } : null), ...(disabled ? disabledStyle(name, onInverse) : null) };
  const pressed = press && !disabled && name === 'primary' && !onInverse ? { background: 'var(--action-primary-active)' } : null;
  const linkProps = native
    ? { type: 'button', disabled }
    : { href: disabled ? undefined : href, 'aria-disabled': disabled || undefined, tabIndex: disabled ? -1 : undefined };
  return (
    <Tag
      {...linkProps}
      onClick={disabled ? (e) => e.preventDefault() : onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)} onMouseUp={() => setPress(false)}
      onFocus={fv.onFocus} onBlur={fv.onBlur}
      style={{
        display: fullWidth ? 'flex' : 'inline-flex', width: fullWidth ? '100%' : undefined,
        alignItems: 'center', justifyContent: 'center', gap: s.gap, boxSizing: 'border-box',
        height: s.height, padding: s.padding, fontFamily: 'var(--font-body)',
        fontSize: s.font, fontWeight: 600, letterSpacing: 'var(--tracking-tight)', lineHeight: 1,
        whiteSpace: 'nowrap', textDecoration: 'none', outline: 'none', margin: 0,
        borderWidth: 1, borderStyle: 'solid', borderRadius: 'var(--radius-md)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'var(--transition-control)', ...merged, ...pressed,
        boxShadow: shadows(hv && hv.glow ? 'var(--shadow-glow)' : null, fv.visible ? focusRing(onInverse) : null),
        transform: press && !disabled ? 'translateY(1px)' : 'none',
        ...style,
      }}
      {...rest}
    >
      {icon ? <Icon name={icon} size={s.icon} /> : null}
      {children}
      {iconAfter ? <Icon name={iconAfter} size={s.icon} /> : null}
    </Tag>
  );
}
