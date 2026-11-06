'use client';
import React from 'react';
import { Icon } from './Icon.jsx';
import { Button } from './Button.jsx';
import { Photo } from './Photo.jsx';

/* Tarjeta del directorio (guía de correcciones, ficha 04; DS_CAMBIOS.md):
   portada de 174 px; placa de logo blanca de 58 × 54 px con solape de −26 px; cuerpo 0 20 px 19 px;
   nombre Manrope 18 px; sector 10 px; descripción 12 px / 1.6 con altura mínima de 57 px; cinco cifras en
   celdas iguales (número 14 px, etiqueta 7 px, altura mínima 62 px); CTA navy de ancho completo, 37 px, 11 px.
   metrics: las cinco cifras en orden fijo (value null = "—"). stats: respaldo de la versión anterior.
   followSlot: el control de seguir (+ / check) a la derecha del nombre. Hover: sube 4 px con sombra suave. */
export function CompanyCard({
  name, category, categoryIcon = 'building-2', description, cover, logo, logoAlt,
  metrics, stats = [], ctaLabel = 'Explorar empresa', onView, followSlot, style, ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const cells = metrics
    ? metrics.map((m) => ({ key: m.key, label: m.label, value: m.value == null ? '—' : m.value }))
    : stats.slice(0, 5).map((s, i) => ({ key: s.label + i, label: s.label, value: s.value }));
  return (
    <article
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', flexDirection: 'column', background: 'var(--surface-card)', color: 'var(--text-body)',
        border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-directory)', overflow: 'visible',
        boxShadow: hover ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        transform: hover ? 'translateY(-4px)' : 'none',
        transition: 'box-shadow var(--duration-base) var(--ease-standard), transform var(--duration-base) var(--ease-standard)', ...style,
      }}
      {...rest}
    >
      <div style={{ position: 'relative', height: 174, flex: 'none' }}>
        <Photo src={cover} overlay={cover ? 'card' : 'none'} height={174} style={{ borderRadius: 'var(--radius-directory) var(--radius-directory) 0 0' }} />
        <span style={{
          position: 'absolute', left: 20, bottom: -26, width: 58, height: 54, boxSizing: 'border-box', padding: 9,
          borderRadius: 10, background: 'var(--white)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
        }}>
          {logo
            ? <img src={logo} alt={logoAlt || name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }} />
            : <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: 'var(--brand-dark)' }}>{(name || '?')[0]}</span>}
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '36px 20px 19px', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
            <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 18, lineHeight: 1.35, letterSpacing: 'var(--tracking-h3)', color: 'var(--text-heading)' }}>{name}</h3>
            {category ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 10, color: 'var(--text-muted)' }}>
                <Icon name={categoryIcon} size={12} />{category}
              </span>
            ) : null}
          </div>
          {followSlot ? <div style={{ flex: 'none' }}>{followSlot}</div> : null}
        </div>
        {description ? (
          <p style={{ margin: 0, fontSize: 12, lineHeight: 1.6, minHeight: 57, color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{description}</p>
        ) : null}
        {cells.length ? (
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cells.length}, minmax(0, 1fr))`, gap: 5 }}>
            {cells.map((c) => (
              <div key={c.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, minHeight: 62, padding: '6px 2px', boxSizing: 'border-box', background: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, lineHeight: 1.2, color: 'var(--text-heading)' }}>{c.value}</span>
                <span style={{ fontSize: 7, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{c.label}</span>
              </div>
            ))}
          </div>
        ) : null}
        <div style={{ marginTop: 'auto', paddingTop: 4 }}>
          <Button variant="primary" fullWidth iconAfter="arrow-right" onClick={onView} style={{ height: 37, fontSize: 11 }}>{ctaLabel}</Button>
        </div>
      </div>
    </article>
  );
}
