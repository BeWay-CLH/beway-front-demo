'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Avatar, Button, Dialog, Icon, IconButton } from '@ds';
import { signOut } from '@/lib/auth-actions';
import type { Session } from '@/lib/models/session';
import { getNotifications } from '@/lib/services/notifications';

/* Ventanas de la cuenta en la cabecera (guía de correcciones, ficha 06): ambas son modales centrados
   con el Dialog del DS (740 px, backdrop con blur, Escape y X cierran, el foco vuelve al disparador).
   Ninguna acción aquí envía nada: "Cerrar sesión" usa el mismo formulario de siempre. */

const row = 'flex items-center gap-3 rounded-control px-3 py-3 text-fg-body transition-control hover:bg-surface-sunken';

export function NotificationsButton() {
  const [open, setOpen] = useState(false);
  const items = getNotifications();
  return (
    <>
      <IconButton icon="bell" label="Notificaciones" size="sm" aria-haspopup="dialog" onClick={() => setOpen(true)} />
      <Dialog open={open} onClose={() => setOpen(false)} width={740} title="Lo que pasa en tu recorrido.">
        <p className="eyebrow m-0 text-fg-muted">Ejemplo · sin datos reales</p>
        <ul className="flex flex-col gap-2">
          {items.map((n) => (
            <li key={n.id}>
              <Link href={n.href} onClick={() => setOpen(false)} className={`${row} justify-between`}>
                <span className="flex min-w-0 items-center gap-3">
                  <span className="text-fg-accent"><Icon name={n.icon} size={18} /></span>
                  <span className="text-sm">{n.text}</span>
                </span>
                <span className="flex-none text-xs font-[650] text-fg-accent">{n.destinationLabel}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Dialog>
    </>
  );
}

export function PersonalMenu({ session }: { session: Session }) {
  const [open, setOpen] = useState(false);
  const profileType = session.roles.includes('talent') ? 'Talento' : 'Cuenta';
  return (
    <>
      <button
        type="button"
        aria-label="Mi espacio"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-control p-1"
      >
        <Avatar name={session.displayName} size={32} />
      </button>
      <Dialog open={open} onClose={() => setOpen(false)} width={740} aria-label="Mi espacio">
        <div className="flex items-center gap-4">
          <Avatar name={session.displayName} size={56} />
          <div className="flex min-w-0 flex-col gap-1">
            <p className="eyebrow m-0 text-fg-muted">Mi espacio</p>
            <p className="m-0 font-heading text-lg font-[700] text-fg-heading">{session.displayName}</p>
            <p className="m-0 text-sm text-fg-muted">{profileType}</p>
          </div>
        </div>
        <nav aria-label="Mi espacio" className="flex flex-col gap-1 border-t border-line-subtle pt-3">
          <Link href="/companies" onClick={() => setOpen(false)} className={row}><Icon name="building-2" size={18} />Explorar empresas</Link>
          <Link href="/talent/dashboard" onClick={() => setOpen(false)} className={row}><Icon name="layout-dashboard" size={18} />Mi panel</Link>
          <Link href="/talent/profile" onClick={() => setOpen(false)} className={row}><Icon name="user-round" size={18} />Mi perfil y CV</Link>
          <Link href="/ayuda" onClick={() => setOpen(false)} className={row}><Icon name="circle-help" size={18} />Ayuda</Link>
          <Link href="/talent/settings" onClick={() => setOpen(false)} className={row}><Icon name="settings" size={18} />Ajustes de cuenta</Link>
        </nav>
        <form action={signOut} className="border-t border-line-subtle pt-3">
          <Button type="submit" variant="ghost" fullWidth icon="log-out">Cerrar sesión</Button>
        </form>
      </Dialog>
    </>
  );
}
