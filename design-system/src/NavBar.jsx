'use client';
import React from 'react';
import { Icon } from './Icon.jsx';
import { Logo } from './Logo.jsx';
import { Button } from './Button.jsx';

/* tone="light": white bar (default, the platform prototype).
   tone="navy": deep navy bar with the negative logo (README spec). */
export function NavBar({
  tone = 'light', assetBase = '/assets', logo, logoHeight = 32, showSearch = true,
  searchPlaceholder = 'Buscar empresas, vacantes, talento…', onSearch,
  loginLabel = 'Iniciar sesión', ctaLabel = 'Crear cuenta', onLogin, onCta, links, actions, style, ...rest
}) {
  const navy = tone === 'navy';
  const [q, setQ] = React.useState('');
  return (
    <header
      style={{
        display: 'flex', alignItems: 'center', gap: 'var(--space-5)', height: 76, boxSizing: 'border-box', padding: '0 var(--space-6)',
        background: navy ? 'var(--surface-inverse)' : 'var(--surface-card)',
        borderBottom: '1px solid ' + (navy ? 'var(--border-inverse)' : 'var(--border-subtle)'), ...style,
      }}
      {...rest}
    >
      <div style={{ flex: 'none', display: 'flex' }}>
        {logo || <Logo variant={navy ? 'negative' : 'auto'} height={logoHeight} assetBase={assetBase} />}
      </div>
      {links ? <nav style={{ display: 'flex', gap: 'var(--space-5)', alignItems: 'center' }}>{links}</nav> : null}
      {showSearch ? (
        <form
          role="search" onSubmit={(e) => { e.preventDefault(); onSearch && onSearch(q); }}
          style={{ position: 'relative', flex: 1, maxWidth: 520, margin: '0 auto 0 var(--space-4)' }}
        >
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: navy ? 'var(--text-on-inverse-muted)' : 'var(--text-muted)', pointerEvents: 'none' }}><Icon name="search" size={16} /></span>
          <input
            type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={searchPlaceholder} aria-label="Buscar"
            style={{
              width: '100%', boxSizing: 'border-box', height: 'var(--control-height-md)', padding: '0 var(--space-3) 0 38px', outline: 'none',
              fontFamily: 'var(--font-body)', fontSize: 'var(--text-small-size)', borderRadius: 'var(--radius-md)',
              color: navy ? 'var(--text-on-inverse)' : 'var(--text-body)',
              background: navy ? 'rgba(255,255,255,.08)' : 'var(--surface-sunken)',
              border: '1px solid ' + (navy ? 'var(--border-inverse)' : 'var(--border-control)'),
            }}
          />
        </form>
      ) : <span style={{ flex: 1 }} />}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flex: 'none' }}>
        {actions || (
          <>
            <Button variant="ghost" onInverse={navy} onClick={onLogin}>{loginLabel}</Button>
            <Button variant={navy ? 'primary' : 'secondary'} onClick={onCta}>{ctaLabel}</Button>
          </>
        )}
      </div>
    </header>
  );
}
