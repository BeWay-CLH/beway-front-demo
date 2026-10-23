'use client';

import { useMemo, useSyncExternalStore } from 'react';

/* Seguimientos simulados (C-05). No se guarda nada fuera del navegador: los cambios de esta sesión viven en
   sessionStorage, por cuenta, y se aplican sobre lo que trae el fixture. Al cerrar la pestaña vuelven al fixture.
   Todo el acceso a storage va en try/catch: puede estar bloqueado. */

const EVENT = 'beway:follows';
const keyFor = (userId: string) => `beway-demo-follows:${userId}`;

export type FollowOverrides = Record<string, boolean>;

function read(userId: string): string {
  try {
    return sessionStorage.getItem(keyFor(userId)) ?? '';
  } catch {
    return '';
  }
}

function parse(raw: string): FollowOverrides {
  if (!raw) return {};
  try {
    const value: unknown = JSON.parse(raw);
    return value && typeof value === 'object' ? (value as FollowOverrides) : {};
  } catch {
    return {};
  }
}

export function setFollowOverride(userId: string, companyId: string, following: boolean) {
  try {
    const next = { ...parse(read(userId)), [companyId]: following };
    sessionStorage.setItem(keyFor(userId), JSON.stringify(next));
  } catch {
    /* Sin storage el cambio se pierde al recargar; la pantalla sigue funcionando. */
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener('storage', onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener('storage', onChange);
  };
}

/* Cambios simulados de esta sesión. En servidor y en la primera pintura es `{}`, igual que el HTML. */
export function useFollowOverrides(userId?: string): FollowOverrides {
  const raw = useSyncExternalStore(
    subscribe,
    () => (userId ? read(userId) : ''),
    () => '',
  );
  return useMemo(() => parse(raw), [raw]);
}
