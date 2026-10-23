'use client';

import { useMemo, useSyncExternalStore } from 'react';

/* Estado simulado de la sesión del navegador (borradores de encuesta, "completada en esta sesión", "me interesa").
   Nada sale del navegador: vive en sessionStorage y se pierde al cerrar la pestaña. Todo acceso va en try/catch porque el
   almacenamiento puede estar bloqueado; sin él la pantalla funciona igual, solo que no recuerda. */

const EVENT = 'beway:demo-store';

export function readStored(key: string): string {
  try {
    return sessionStorage.getItem(key) ?? '';
  } catch {
    return '';
  }
}

/* `null` borra la clave. */
export function writeStored(key: string, value: unknown | null) {
  try {
    if (value === null) sessionStorage.removeItem(key);
    else sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* Sin almacenamiento el cambio se pierde al recargar. */
  }
  window.dispatchEvent(new Event(EVENT));
}

export function parseStored<T>(raw: string): T | undefined {
  if (!raw) return undefined;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return undefined;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener('storage', onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener('storage', onChange);
  };
}

/* Valor guardado en `key`. En servidor y en la primera pintura es `undefined`, igual que el HTML. */
export function useStored<T>(key?: string): T | undefined {
  const raw = useSyncExternalStore(
    subscribe,
    () => (key ? readStored(key) : ''),
    () => '',
  );
  return useMemo(() => parseStored<T>(raw), [raw]);
}
