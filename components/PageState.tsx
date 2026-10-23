import { EmptyState } from '@ds';
import type { ReactNode } from 'react';

/* Estados de página compartidos (404, sin acceso, sin sesión, error, privado, vacío).
   Envuelve EmptyState del design system con textos por defecto; cualquier texto se puede sobrescribir. */

export type PageStateKind = 'not-found' | 'forbidden' | 'signed-out' | 'error' | 'private' | 'empty';

const presets: Record<PageStateKind, { icon: string; title: string; description: string }> = {
  'not-found': {
    icon: 'map-pin-off',
    title: 'No encontramos esta página',
    description: 'Puede que el enlace esté mal escrito o que la página ya no exista.',
  },
  forbidden: {
    icon: 'lock',
    title: 'No tienes acceso a esta sección',
    description: 'Tu cuenta no tiene permisos para este espacio. Si crees que es un error, escríbenos.',
  },
  'signed-out': {
    icon: 'log-in',
    title: 'Inicia sesión para continuar',
    description: 'Esta sección es solo para personas con cuenta en BeWay.',
  },
  error: {
    icon: 'triangle-alert',
    title: 'Algo ha fallado',
    description: 'No hemos podido cargar esta sección. Vuelve a intentarlo en unos segundos.',
  },
  private: {
    icon: 'eye-off',
    title: 'Este perfil es privado',
    description: 'Su titular no lo ha hecho visible para otras personas.',
  },
  empty: {
    icon: 'inbox',
    title: 'Todavía no hay nada aquí',
    description: 'Cuando haya contenido, lo verás en esta sección.',
  },
};

export function PageState({
  kind,
  title,
  description,
  action,
}: {
  kind: PageStateKind;
  title?: string;
  description?: string;
  action?: ReactNode;
}) {
  const p = presets[kind];
  return (
    <div className="mx-auto flex w-full max-w-narrow flex-col px-4 py-16 md:px-6 md:py-24">
      <EmptyState icon={p.icon} title={title ?? p.title} description={description ?? p.description} action={action} />
    </div>
  );
}
