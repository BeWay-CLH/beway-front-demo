'use client';
import React from 'react';

/* Greyscale row of partner logos under a caps label. Static unless animate is
   set, and even then it only scrolls when the user has not asked for reduced
   motion (see bundle.css). logos: [{ src, alt }]. */
export function LogoMarquee({ label = 'EMPRESAS QUE CONFÍAN EN BEWAY', logos = [], height = 28, animate = false, style, ...rest }) {
  const row = (suffix, hidden) => logos.map((l, i) => (
    <img key={suffix + i} src={l.src} alt={hidden ? '' : l.alt || ''} aria-hidden={hidden || undefined}
      style={{ height, width: 'auto', display: 'block', flex: 'none' }} />
  ));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)', ...style }} {...rest}>
      {label ? <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{label}</span> : null}
      <div className="bw-marquee" style={{ width: '100%', overflow: 'hidden' }}>
        <div className={'bw-marquee-track' + (animate ? ' bw-marquee-track--animate' : '')}
          style={{ display: 'flex', alignItems: 'center', justifyContent: animate ? 'flex-start' : 'center', gap: 'var(--space-6)', width: animate ? 'max-content' : '100%', flexWrap: animate ? 'nowrap' : 'wrap' }}>
          {row('a', false)}
          {animate ? row('b', true) : null}
        </div>
      </div>
    </div>
  );
}
