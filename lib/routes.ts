/* Navegación de cada espacio. Fuente única para menús: un ítem `planned` existe en el mapa
   (docs/frontend/ROUTES.md) pero no se muestra hasta que su pantalla esté construida. */

export type RouteStatus = 'live' | 'planned';

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
  /* Otras rutas que también marcan este ítem como actual. `:me` es el nombre de usuario de la sesión. */
  alsoActive?: string[];
};

export const publicNav: NavItem[] = [
  { label: 'Empresas', href: '/companies', icon: 'building-2', status: 'live' },
];

export const talentHome = '/talent/dashboard';

/* "Inicio" de quien mira: el de su espacio si hay sesión, la portada si no. */
export const homeFor = (signedIn: boolean) => (signedIn ? talentHome : '/');

export const talentNav: NavItem[] = [
  { label: 'Inicio', href: talentHome, icon: 'layout-dashboard', status: 'live' },
  { label: 'Empresas', href: '/companies', icon: 'building-2', status: 'live' },
  { label: 'Encuestas', href: '/talent/surveys', icon: 'clipboard-list', status: 'live' },
  { label: 'Cursos', href: '/talent/courses', icon: 'graduation-cap', status: 'live' },
  { label: 'Credenciales', href: '/talent/credentials', icon: 'award', status: 'live' },
  { label: 'Perfil', href: '/talent/profile', icon: 'user-round', status: 'live', alsoActive: ['/u/:me'] },
];

export const adminNav: NavItem[] = [
  { label: 'Inicio', href: '/admin/dashboard', icon: 'layout-dashboard', status: 'live' },
  { label: 'Empresas', href: '/admin/companies', icon: 'building-2', status: 'planned' },
  { label: 'Revisiones', href: '/admin/reviews', icon: 'clipboard-check', status: 'planned' },
  { label: 'Encuestas', href: '/admin/surveys', icon: 'clipboard-list', status: 'planned' },
  { label: 'Cursos', href: '/admin/courses', icon: 'graduation-cap', status: 'planned' },
];

export const liveOnly = (items: NavItem[]) => items.filter((i) => i.status === 'live');
