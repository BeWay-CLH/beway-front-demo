'use client';
import React from 'react';

const initialsOf = (name = '') =>
  name.trim().split(/\s+/).slice(0, 2).map((w) => w[0] || '').join('').toUpperCase();

const HEX = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';

/* shape: "rounded" (8px, default), "circle", or "hexagon" (echoes the mark). */
export function Avatar({ src, name = '', size = 40, shape = 'rounded', alt, style, ...rest }) {
  const [broken, setBroken] = React.useState(false);
  const radius = shape === 'circle' ? '50%' : shape === 'hexagon' ? 0 : 'var(--radius-md)';
  const showImg = src && !broken;
  return (
    <span
      role="img" aria-label={alt || name || 'Avatar'}
      style={{
        width: size, height: size, flex: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', borderRadius: radius, clipPath: shape === 'hexagon' ? HEX : undefined,
        background: 'var(--surface-accent-subtle)', color: 'var(--text-accent)',
        fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: Math.round(size * 0.38),
        ...style,
      }}
      {...rest}
    >
      {showImg
        ? <img src={src} alt="" onError={() => setBroken(true)} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        : initialsOf(name)}
    </span>
  );
}
