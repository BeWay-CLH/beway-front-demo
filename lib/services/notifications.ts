import { notificationsFixture, type NotificationFixture } from '@/data/fixtures/notifications';

/* Lectura de notificaciones para la ventana de la cabecera. Hoy devuelve el fixture ficticio;
   al conectar el backend, solo cambia esta función (BACKEND_HANDOFF: pendiente de BE-XXX). */

export type NotificationVM = {
  id: string;
  icon: 'clipboard-list' | 'user-round' | 'layout-dashboard';
  text: string;
  href: NotificationFixture['href'];
  destinationLabel: string;
};

const iconFor: Record<NotificationFixture['kind'], NotificationVM['icon']> = {
  survey: 'clipboard-list',
  profile: 'user-round',
  course: 'layout-dashboard',
};

const destinationFor: Record<NotificationFixture['href'], string> = {
  '/talent/surveys': 'Encuestas',
  '/talent/profile': 'Mi perfil',
  '/talent/dashboard': 'Mi panel',
};

export function getNotifications(): NotificationVM[] {
  return notificationsFixture.map((n) => ({
    id: n.id,
    icon: iconFor[n.kind],
    text: n.text,
    href: n.href,
    destinationLabel: destinationFor[n.href],
  }));
}
