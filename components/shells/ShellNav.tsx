'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@ds';
import { liveOnly, type NavItem } from '@/lib/routes';

/* Enlaces de navegación de un espacio. Patrón nuevo hecho con tokens (el design system no tiene
   estado "actual" para enlaces ni menú móvil): pendiente de pasar al design system, ver DEC-007.
   Horizontal va dentro del NavBar; vertical es el menú móvil. */

const matches = (pathname: string, href: string) =>
  href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/');

/* El perfil propio vive en /u/<usuario> pero se llega desde "Perfil" (/talent/profile): ambos lo marcan. */
const isActive = (pathname: string, item: NavItem, username?: string) =>
  [item.href, ...(item.alsoActive ?? []).map((p) => (username ? p.replace(':me', username) : p))].some(
    (href) => !href.includes(':me') && matches(pathname, href),
  );

/* Guía de correcciones (01 A10): texto 12 px peso 550; activo 750 con línea teal de 2 px. */
const linkBase = 'transition-control inline-flex items-center gap-2 text-xs font-[550]';

const styles = {
  horizontal: {
    list: 'flex h-full items-stretch gap-5',
    link: `${linkBase} h-full border-b-2 border-transparent`,
    active: 'font-[750] text-fg-heading border-line-accent',
    idle: 'text-fg-muted hover:text-fg-heading',
  },
  vertical: {
    list: 'flex flex-col gap-1',
    link: `${linkBase} w-full gap-3 rounded-control px-3 py-2`,
    active: 'bg-surface-sunken text-fg-heading',
    idle: 'text-fg-muted hover:text-fg-heading',
  },
};

export function NavList({
  items,
  orientation = 'horizontal',
  username,
}: {
  items: NavItem[];
  orientation?: 'horizontal' | 'vertical';
  username?: string;
}) {
  const pathname = usePathname();
  const s = styles[orientation];
  return (
    <ul className={s.list}>
      {liveOnly(items).map((item) => {
        const active = isActive(pathname, item, username);
        return (
          <li key={item.href} className="flex">
            <Link href={item.href} aria-current={active ? 'page' : undefined} className={`${s.link} ${active ? s.active : s.idle}`}>
              <Icon name={item.icon} size={16} />
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function ShellNav({
  items,
  label,
  orientation = 'horizontal',
  username,
}: {
  items: NavItem[];
  label: string;
  orientation?: 'horizontal' | 'vertical';
  username?: string;
}) {
  return (
    <nav aria-label={label}>
      <NavList items={items} orientation={orientation} username={username} />
    </nav>
  );
}
