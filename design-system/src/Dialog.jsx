'use client';
import React from 'react';
import { IconButton } from './IconButton.jsx';

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

function visible(el) { return el.offsetParent !== null || el === document.activeElement; }

/* Modal dialog (guía de correcciones, 01 A9 y D): cabecera con padding 18px 26px, cuerpo con 30 px,
   radio 14 px, backdrop rgba(8,27,50,.42) con blur 5 px (tokens). Escape y el scrim cierran (si hay onClose),
   Tab cicla dentro, el foco entra al abrir y vuelve al disparador al cerrar, la página de fondo no se desplaza.
   Título y descripción se enlazan con aria-labelledby / aria-describedby; sin título pasa aria-label. */
export function Dialog({ open = false, ...props }) {
  if (!open) return null;
  return <DialogPanel {...props} />;
}

function DialogPanel({ title, description, footer, onClose, closeLabel = 'Cerrar', width = 480, children, style, ...rest }) {
  const auto = React.useId();
  const titleId = 'bw-dialog-' + auto + '-title';
  const descId = 'bw-dialog-' + auto + '-desc';
  const panel = React.useRef(null);
  const closeRef = React.useRef(onClose);
  closeRef.current = onClose;
  const pointerDownOnScrim = React.useRef(false);
  const hasHeader = Boolean(title || onClose);

  React.useEffect(() => {
    const previous = document.activeElement;
    const node = panel.current;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (node) {
      const all = Array.prototype.filter.call(node.querySelectorAll(FOCUSABLE), visible);
      const marked = node.querySelector('[data-autofocus]');
      const header = node.querySelector('[data-dialog-header]');
      const target = marked || all.find((el) => !header || !header.contains(el)) || all[0] || node;
      target.focus();
    }
    return () => {
      document.body.style.overflow = prevOverflow;
      if (previous && typeof previous.focus === 'function' && document.contains(previous)) previous.focus();
    };
  }, []);

  const onKeyDown = (e) => {
    if (e.key === 'Escape' && closeRef.current) { e.stopPropagation(); closeRef.current(e); return; }
    if (e.key !== 'Tab' || !panel.current) return;
    const all = Array.prototype.filter.call(panel.current.querySelectorAll(FOCUSABLE), visible);
    if (!all.length) { e.preventDefault(); panel.current.focus(); return; }
    const first = all[0]; const last = all[all.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && (active === first || active === panel.current)) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus(); }
  };

  return (
    <div
      onMouseDown={(e) => { pointerDownOnScrim.current = e.target === e.currentTarget; }}
      onClick={(e) => { if (pointerDownOnScrim.current && e.target === e.currentTarget && onClose) onClose(e); pointerDownOnScrim.current = false; }}
      style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, left: 0, zIndex: 100, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'var(--space-5)', background: 'var(--surface-scrim)', backdropFilter: 'var(--blur-panel)',
      }}
    >
      <div
        ref={panel} role="dialog" aria-modal="true" tabIndex={-1} onKeyDown={onKeyDown}
        aria-labelledby={title ? titleId : undefined} aria-describedby={description ? descId : undefined}
        style={{
          width: 'calc(100% - 38px)', boxSizing: 'border-box', maxWidth: width, maxHeight: '90dvh', overflowY: 'auto', outline: 'none',
          background: 'var(--surface-card)', color: 'var(--text-body)',
          borderRadius: 'var(--radius-dialog)', boxShadow: 'var(--shadow-lg)',
          display: 'flex', flexDirection: 'column', ...style,
        }}
        {...rest}
      >
        {hasHeader ? (
          <div
            data-dialog-header=""
            style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)', padding: '18px 26px', borderBottom: '1px solid var(--border-subtle)' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', flex: 1, minWidth: 0 }}>
              {title ? <h3 id={titleId} style={{ margin: 0 }}>{title}</h3> : null}
              {description ? <p id={descId} style={{ margin: 0, color: 'var(--text-muted)', fontSize: 'var(--text-small-size)' }}>{description}</p> : null}
            </div>
            {onClose ? <IconButton icon="x" label={closeLabel} size="sm" onClick={onClose} /> : null}
          </div>
        ) : null}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', padding: '30px' }}>{children}</div>
        {footer ? (
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', padding: '18px 26px', borderTop: '1px solid var(--border-subtle)' }}>{footer}</div>
        ) : null}
      </div>
    </div>
  );
}
