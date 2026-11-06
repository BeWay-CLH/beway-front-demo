/* FICTICIO. Notificaciones de ejemplo para la ventana "Lo que pasa en tu recorrido" (guía de correcciones, ficha 06).
   No existe modelo real de notificaciones todavía (decisión D11): esta lista se marca como ejemplo en la interfaz.
   TODO(seed): sustituir por el servicio real cuando exista el backend. */

export type NotificationFixture = {
  id: string;
  kind: 'survey' | 'profile' | 'course';
  text: string;
  href: '/talent/surveys' | '/talent/profile' | '/talent/dashboard';
};

export const notificationsFixture: NotificationFixture[] = [
  { id: 'ntf-survey', kind: 'survey', text: 'Hay una encuesta abierta que puedes responder.', href: '/talent/surveys' },
  { id: 'ntf-profile', kind: 'profile', text: 'Tu perfil puede mostrar más evidencias.', href: '/talent/profile' },
  { id: 'ntf-panel', kind: 'course', text: 'Tu panel tiene el próximo paso marcado.', href: '/talent/dashboard' },
];
