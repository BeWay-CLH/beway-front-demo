'use client';
import React from 'react';

/* Static by default. animate adds a slow opacity pulse, and only runs when the
   user has not asked for reduced motion (see bundle.css). */
export function Skeleton({ width = '100%', height = 16, circle = false, radius, animate = false, className, style, ...rest }) {
  return (
    <span
      aria-hidden="true"
      className={['bw-skeleton', animate ? 'bw-skeleton--animate' : '', className].filter(Boolean).join(' ')}
      style={{
        display: 'block', width: circle ? height : width, height, flex: 'none',
        borderRadius: circle ? '50%' : radius != null ? radius : 'var(--radius-md)',
        background: 'color-mix(in srgb, var(--text-muted) 22%, transparent)', ...style,
      }}
      {...rest}
    />
  );
}
