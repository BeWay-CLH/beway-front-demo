'use client';
import React from 'react';

/* The real brand marks, cropped from the supplied Manual de Marca board.
   Never re-draw the hexagon or re-angle its gradient.
   variant="auto" renders the primary mark in the light theme and the negative
   mark in the dark theme (swapped by bundle.css on [data-theme="dark"]). */
const SRC = {
  primary: 'logo-primary.png',
  negative: 'logo-negative-inline-transparent.png',
  mono: 'logo-mono-white-transparent.png',
  stacked: 'logo-stacked-negative-transparent.png',
  mark: 'logo-icon-transparent.png',
};

export function Logo({ variant = 'primary', height = 40, assetBase = '/assets', alt = 'BeWay', style, className, ...rest }) {
  const base = assetBase.replace(/\/$/, '') + '/';
  const img = (file, cls) => (
    <img
      src={base + file} alt={alt} className={[cls, className].filter(Boolean).join(' ') || undefined}
      style={{ height, width: 'auto', display: 'block', ...style }} {...rest}
    />
  );
  if (variant === 'auto') {
    return (
      <>
        {img(SRC.primary, 'bw-logo-on-light')}
        {img(SRC.negative, 'bw-logo-on-dark')}
      </>
    );
  }
  return img(SRC[variant] || SRC.primary);
}
