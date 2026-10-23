'use client';
import React from 'react';
import { Icon } from './Icon.jsx';
import { Button } from './Button.jsx';
import { Photo } from './Photo.jsx';

/* Company directory card. cover is a photo URL (cold-toned, see README
   Photography); without it the brand gradient shows. logo is a URL, shown in a
   white chip because partner logos are made for white. stats: up to 5 of
   { icon, value, label }. */
export function CompanyCard({ name, category, categoryIcon = 'building-2', description, cover, logo, logoAlt, stats = [], ctaLabel = 'Ver perfil', onView, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  return (
    <article
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', flexDirection: 'column', background: 'var(--surface-card)', color: 'var(--text-body)',
        border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'visible',
        boxShadow: hover ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        transition: 'box-shadow var(--duration-base) var(--ease-standard)', ...style,
      }}
      {...rest}
    >
      <div style={{ position: 'relative' }}>
        <Photo src={cover} overlay={cover ? 'card' : 'none'} height={128} style={{ borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0' }} />
        <span style={{
          position: 'absolute', left: 'var(--space-5)', bottom: -28, width: 56, height: 56, borderRadius: 'var(--radius-md)',
          background: 'var(--white)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
        }}>
          {logo
            ? <img src={logo} alt={logoAlt || name} style={{ maxWidth: '78%', maxHeight: '78%', objectFit: 'contain', display: 'block' }} />
            : <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, color: 'var(--brand-dark)' }}>{(name || '?')[0]}</span>}
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', padding: 'var(--space-8) var(--space-5) var(--space-5)', flex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 18, lineHeight: 1.25, letterSpacing: 'var(--tracking-tight)', color: 'var(--text-heading)' }}>{name}</h3>
          {category ? (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 'var(--text-small-size)', color: 'var(--text-muted)' }}>
              <Icon name={categoryIcon} size={14} />{category}
            </span>
          ) : null}
        </div>
        {description ? (
          <p style={{ margin: 0, fontSize: 'var(--text-small-size)', lineHeight: 'var(--text-small-lh)', color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{description}</p>
        ) : null}
        {stats.length ? (
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(stats.length, 5)}, minmax(0, 1fr))`, gap: 6, marginTop: 'var(--space-1)' }}>
            {stats.slice(0, 5).map((s, i) => (
              <div key={s.label + i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '8px 2px', background: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                {s.icon ? <span style={{ color: 'var(--text-accent)' }}><Icon name={s.icon} size={14} /></span> : null}
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15, color: 'var(--text-heading)' }}>{s.value}</span>
                <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{s.label}</span>
              </div>
            ))}
          </div>
        ) : null}
        <div style={{ marginTop: 'auto', paddingTop: 'var(--space-2)' }}>
          <Button variant="secondary" fullWidth iconAfter="arrow-right" onClick={onView}>{ctaLabel}</Button>
        </div>
      </div>
    </article>
  );
}
