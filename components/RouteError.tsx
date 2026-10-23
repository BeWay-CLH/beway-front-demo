'use client';

import { Button } from '@ds';
import { PageState } from './PageState';

/* Contenido común de los error.tsx de cada espacio. No muestra el mensaje técnico. */
export function RouteError({ retry }: { retry: () => void }) {
  return <PageState kind="error" action={<Button variant="secondary" icon="rotate-ccw" onClick={() => retry()}>Reintentar</Button>} />;
}
