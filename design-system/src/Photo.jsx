'use client';
import React from 'react';

/* Photo with the brand overlay. overlay: "hero" (navy, heavier on the left so
   text sits on the dark side), "card" (bottom fade), or "none". With no src it
   falls back to the brand gradient, never an off-palette colour. */
export function Photo({ src, alt = '', overlay = 'card', ratio, height, radius, children, style, ...rest }) {
  const [broken, setBroken] = React.useState(false);
  const ok = src && !broken;
  const ov = overlay === 'hero' ? 'var(--overlay-hero)' : overlay === 'card' ? 'var(--overlay-card)' : null;
  return (
    <div
      style={{
        position: 'relative', overflow: 'hidden', width: '100%', aspectRatio: ratio, height,
        borderRadius: radius, background: 'var(--gradient-brand)', ...style,
      }}
      {...rest}
    >
      {ok ? (
        <img src={src} alt={alt} onError={() => setBroken(true)}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      ) : null}
      {ov ? <span aria-hidden="true" style={{ position: 'absolute', inset: 0, background: ov, pointerEvents: 'none' }} /> : null}
      {children ? <div style={{ position: 'relative', height: '100%' }}>{children}</div> : null}
    </div>
  );
}
