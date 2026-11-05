/* Navegación de cada espacio. Fuente única para menús: un ítem `planned` existe en el mapa
   (docs/frontend/ROUTES.md) pero no se muestra hasta que su pantalla esté construida. */

export type RouteStatus = 'live' | 'planned';

/* Dónde va el ítem en la cabecera de dos filas (guía de correcciones, ficha 01):
   'start' = fila de navegación a la izquierda, 'end' = a la derecha, 'none' = fuera de la cabecera
   (se llega desde otra pantalla). Por defecto, 'start'. */
export type NavSide = 'start' | 'end' | 'none';

/* Espacios que se pueden recorrer desde la barra de demostración. Auth cuenta como Público. */
export type Space = 'public' | 'talent' | 'admin';

export const spaces: { id: Space; label: string; href: string }[] = [
  { id: 'public', label: 'Público', href: '/' },
  { id: 'talent', label: 'Talent', href: '/talent/dashboard' },
  { id: 'admin', label: 'Admin CLH', href: '/admin/dashboard' },
];

export type NavItem = {
  label: string;
  href: string;
  icon: string;
  status: RouteStatus;
  side?: NavSide;
  /* Otras rutas que también marcan este ítem como actual. `:me` es el nombre de usuario de la sesión. */
  alsoActive?: string[];
};

export const publicNav: NavItem[] = [
  { label: 'Empresas', href: '/companies', icon: 'building-2', status: 'live' },
];

export const talentHome = '/talent/dashboard';

/* "Inicio" de quien mira: el de su espacio si hay sesión, la portada si no. */
export const homeFor = (signedIn: boolean) => (signedIn ? talentHome : '/');

/* Orden de la guía: Empresas, Certificaciones, Challenges, Miniproyectos, Encuestas, Oportunidades
   a la izquierda; Mi panel y Mi perfil a la derecha. Etiquetas en español; rutas en inglés (DEC-002, D6).
   Credenciales no es un enlace de cabecera: se llega desde Mi perfil (ficha 25). */
export const talentNav: NavItem[] = [
  { label: 'Empresas', href: '/companies', icon: 'building-2', status: 'live' },
  { label: 'Certificaciones', href: '/talent/courses', icon: 'graduation-cap', status: 'live' },
  { label: 'Challenges', href: '/talent/challenges', icon: 'trophy', status: 'planned' },
  { label: 'Miniproyectos', href: '/talent/miniprojects', icon: 'folder-kanban', status: 'planned' },
  { label: 'Encuestas', href: '/talent/surveys', icon: 'clipboard-list', status: 'live' },
  { label: 'Oportunidades', href: '/talent/opportunities', icon: 'briefcase', status: 'planned' },
  { label: 'Mi panel', href: talentHome, icon: 'layout-dashboard', status: 'live', side: 'end' },
  { label: 'Mi perfil', href: '/talent/profile', icon: 'user-round', status: 'live', side: 'end', alsoActive: ['/u/:me'] },
  { label: 'Credenciales', href: '/talent/credentials', icon: 'award', status: 'live', side: 'none' },
];

export const adminNav: NavItem[] = [
  { label: 'Inicio', href: '/admin/dashboard', icon: 'layout-dashboard', status: 'live' },
  { label: 'Empresas', href: '/admin/companies', icon: 'building-2', status: 'planned' },
  { label: 'Revisiones', href: '/admin/reviews', icon: 'clipboard-check', status: 'planned' },
  { label: 'Encuestas', href: '/admin/surveys', icon: 'clipboard-list', status: 'planned' },
  { label: 'Cursos', href: '/admin/courses', icon: 'graduation-cap', status: 'planned' },
];

export const liveOnly = (items: NavItem[]) => items.filter((i) => i.status === 'live');

/* Ítems que aparecen en la cabecera (no 'none'), en su orden. */
export const headerItems = (items: NavItem[]) => items.filter((i) => (i.side ?? 'start') !== 'none');
