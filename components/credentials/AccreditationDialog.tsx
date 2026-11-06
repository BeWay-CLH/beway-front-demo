'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button, Dialog, Icon } from '@ds';
import type { CredentialVM } from '@/lib/models/course';
import { formatDate } from '@/lib/format';

/* Ventana de acreditación (guía de correcciones, ficha 15 y 25): modal centrado con el Dialog del DS, con programa,
   emisor, fecha y estado. Es la misma ventana para cualquier credencial que ya existe. El fixture es de ejemplo, así que
   se rotula como tal. Cerrar devuelve el foco al botón que la abrió (lo hace el DS). */
export function AccreditationDialog({ credential, holderName }: { credential: CredentialVM; holderName: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="inline-flex h-[34px] items-center gap-2 self-start rounded-control border border-line-control bg-surface-card px-3 text-xs font-[650] text-fg-body transition-control hover:bg-surface-sunken"
      >
        <Icon name="eye" size={14} />
        Ver acreditación
      </button>
      <Dialog open={open} onClose={() => setOpen(false)} width={740} title="Acreditación">
        <div className="flex flex-col gap-5">
          <p className="m-0 text-xs font-[650] uppercase tracking-[0.14em] text-fg-muted">Dato de ejemplo</p>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-fg-muted">Programa</span>
            <span className="font-heading text-[20px] leading-[1.3] font-[600] text-fg-heading">{credential.title}</span>
          </div>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <dt className="text-xs text-fg-muted">Emisor</dt>
              <dd className="m-0 text-sm text-fg-body">{credential.issuer}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-xs text-fg-muted">Fecha de emisión</dt>
              <dd className="m-0 text-sm text-fg-body">{formatDate(credential.issuedAt)}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-xs text-fg-muted">Titular</dt>
              <dd className="m-0 text-sm text-fg-body">{holderName}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-xs text-fg-muted">Estado</dt>
              <dd className="m-0 text-sm font-[650] text-fg-accent">Emitida</dd>
            </div>
          </dl>
          <div className="flex flex-wrap items-center justify-end gap-3 border-t border-line-subtle pt-4">
            <Link href="/talent/profile" className="text-sm font-[650] text-fg-accent" onClick={() => setOpen(false)}>
              Ver en Mi perfil
            </Link>
            <Button variant="secondary" onClick={() => setOpen(false)}>Cerrar</Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
