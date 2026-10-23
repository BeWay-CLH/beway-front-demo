'use client';
import React from 'react';
import { Icon } from './Icon.jsx';
import { useFocusVisible, focusRing } from './a11y.js';

const HEX = 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)';

/* Hexagonal step marker — echoes the BeWay mark. Outline states are drawn as
   a coloured hexagon with an inset hexagon on top (clip-path can't take a border). */
function Marker({ state, index, size = 28, onInverse }) {
  const shell = { width: size, height: size, flex: `0 0 ${size}px`, position: 'relative', display: 'grid', placeItems: 'center' };
  const hex = { position: 'absolute', inset: 0, clipPath: HEX, transition: 'var(--transition-control)' };
  const surface = onInverse ? 'var(--surface-inverse)' : 'var(--surface-card)';
  if (state === 'done') {
    return (
      <span style={shell}>
        <span style={{ ...hex, background: 'var(--brand-cyan)' }} />
        <span style={{ position: 'relative', color: 'var(--brand-dark)', display: 'flex' }}>
          <Icon name="check" size={Math.round(size * 0.5)} strokeWidth={3} />
        </span>
      </span>
    );
  }
  if (state === 'current') {
    return (
      <span style={shell}>
        <span style={{ ...hex, background: 'var(--action-primary)' }} />
        <span style={{ position: 'relative', color: 'var(--text-on-accent)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: Math.round(size * 0.43) }}>{index}</span>
      </span>
    );
  }
  return (
    <span style={shell}>
      <span style={{ ...hex, background: onInverse ? 'var(--border-inverse)' : 'var(--border-strong)' }} />
      <span style={{ ...hex, background: surface, transform: 'scale(.86)' }} />
      <span style={{ position: 'relative', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: Math.round(size * 0.43), color: onInverse ? 'var(--text-on-inverse-muted)' : 'var(--text-muted)' }}>{index}</span>
    </span>
  );
}

function StepButton({ onInverse, style, children, ...rest }) {
  const fv = useFocusVisible();
  return (
    <button {...rest} onFocus={fv.onFocus} onBlur={fv.onBlur} style={{ ...style, outline: 'none', boxShadow: fv.visible ? focusRing(onInverse) : 'none' }}>{children}</button>
  );
}

/* width: CSS width of the nav, default '100%' so it fills a sidebar column; pass 300 for a fixed rail.
   The current marker is flat cyan, no glow: the single glow in the system is on the primary button. */
export function StepNav({
  steps = [], current = 0, completed, title = 'Tu CV Vivo', percent, meta,
  onSelect, onInverse = false, width = '100%', footer, style, ...rest
}) {
  const list = steps.map((s, i) => {
    const st = typeof s === 'string' ? { label: s } : s;
    const state = st.status || (completed ? (completed.includes(i) ? 'done' : i === current ? 'current' : 'todo')
      : i < current ? 'done' : i === current ? 'current' : 'todo');
    return { ...st, state };
  });
  const doneCount = list.filter((s) => s.state === 'done').length;
  const pct = percent !== undefined ? percent : Math.round((doneCount / Math.max(list.length, 1)) * 100);
  const muted = onInverse ? 'var(--text-on-inverse-muted)' : 'var(--text-muted)';
  const heading = onInverse ? 'var(--white)' : 'var(--text-heading)';

  return (
    <nav
      aria-label={title}
      style={{
        width, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)',
        padding: 'var(--space-5)', borderRadius: 'var(--radius-lg)',
        fontFamily: 'var(--font-body)',
        background: onInverse ? 'var(--surface-inverse)' : 'var(--surface-card)',
        border: '1px solid ' + (onInverse ? 'var(--border-inverse)' : 'var(--border-subtle)'),
        ...style,
      }}
      {...rest}
    >
      <div>
        <div style={{ fontSize: 'var(--text-eyebrow-size)', fontWeight: 600, letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: muted }}>{title}</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, margin: '6px 0 var(--space-3)' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 700, letterSpacing: 'var(--tracking-display)', lineHeight: 1, color: heading }}>{pct}%</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600, color: muted }}>completo</span>
        </div>
        <div style={{ height: 6, borderRadius: 'var(--radius-pill)', background: onInverse ? 'rgba(255,255,255,.12)' : 'var(--surface-raised)', overflow: 'hidden' }}>
          <div style={{
            width: `${Math.max(pct, 2)}%`, height: '100%', borderRadius: 'var(--radius-pill)',
            background: 'var(--action-primary)',
            transition: `width var(--duration-slow) var(--ease-out)`,
          }} />
        </div>
        <div style={{ marginTop: 'var(--space-2)', fontSize: 12, color: muted }}>
          {meta || `${doneCount} de ${list.length} secciones completadas`}
        </div>
      </div>

      <ol style={{ listStyle: 'none', margin: 0, padding: 0, position: 'relative', display: 'flex', flexDirection: 'column' }}>
        {list.map((s, i) => {
          const active = s.state === 'current';
          const last = i === list.length - 1;
          return (
            <li key={s.label} style={{ position: 'relative' }}>
              {!last ? (
                <span style={{
                  position: 'absolute', left: 27, top: 32, bottom: -6, width: 2, borderRadius: 1,
                  background: s.state === 'done' ? 'var(--brand-cyan)' : (onInverse ? 'var(--border-inverse)' : 'var(--border-subtle)'),
                }} />
              ) : null}
              <StepButton
                onClick={() => onSelect && onSelect(i)}
                aria-current={active ? 'step' : undefined}
                disabled={!onSelect}
                onInverse={onInverse}
                style={{
                  position: 'relative', boxSizing: 'border-box', width: '100%', textAlign: 'left', cursor: onSelect ? 'pointer' : 'default',
                  display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
                  padding: 'var(--space-2) var(--space-3)', border: 'none', borderRadius: 'var(--radius-md)',
                  background: active ? (onInverse ? 'rgba(0,212,255,.10)' : 'var(--surface-accent-subtle)') : 'transparent',
                  transition: 'var(--transition-control)', font: 'inherit',
                }}
              >
                {active ? (
                  <span style={{ position: 'absolute', left: 0, top: 8, bottom: 8, width: 'var(--border-width-accent)', borderRadius: 'var(--radius-pill)', background: 'var(--brand-cyan)' }} />
                ) : null}
                <Marker state={s.state} index={i + 1} onInverse={onInverse} />
                <span style={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 0 }}>
                  <span style={{
                    fontFamily: active ? 'var(--font-display)' : 'var(--font-body)',
                    fontSize: 'var(--text-small-size)', lineHeight: 1.35,
                    fontWeight: active ? 700 : s.state === 'done' ? 500 : 400,
                    letterSpacing: active ? 'var(--tracking-tight)' : 'var(--tracking-normal)',
                    color: active ? heading : s.state === 'done' ? (onInverse ? 'var(--white)' : 'var(--text-body)') : muted,
                  }}>{s.label}</span>
                  {s.hint ? <span style={{ fontSize: 11, color: muted }}>{s.hint}</span> : null}
                </span>
                {s.state === 'done' ? (
                  <span style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 600, letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-accent)' }}>Ok</span>
                ) : null}
              </StepButton>
            </li>
          );
        })}
      </ol>

      {footer ? (
        <div style={{ marginTop: 'auto', paddingTop: 'var(--space-4)', borderTop: '1px solid ' + (onInverse ? 'var(--border-inverse)' : 'var(--border-subtle)') }}>{footer}</div>
      ) : null}
    </nav>
  );
}
