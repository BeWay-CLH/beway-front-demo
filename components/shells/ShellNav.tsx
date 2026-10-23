'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@ds';
import { liveOnly, type NavItem } from '@/lib/routes';

/* Enlaces de navegación de un espacio. Patrón nuevo hecho con tokens (el design system no tiene
   estado "actual" para enlaces ni menú móvil): pendiente de pasar al design system, ver DEC-007.
   Horizontal va dentro del NavBar; vertical es el menú móvil. */

const isActive = (pathname: string, href: string) =>
  href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/');

const linkBase = 'transition-control inline-flex items-center gap-2 text-sm font-semibold';

const styles = {
  horizontal: {
    list: 'flex items-center gap-6',
    link: linkBase,
    active: 'text-fg-heading underline decoration-line-accent decoration-2 underline-offset-8',
    idle: 'text-fg-muted hover:text-fg-heading',
  },
  vertical: {
    list: 'flex flex-col gap-1',
    link: `${linkBase} w-full gap-3 rounded-control px-3 py-2`,
    active: 'bg-surface-sunken text-fg-heading',
    idle: 'text-fg-muted hover:text-fg-heading',
  },
};

export function NavList({ items, orientation = 'horizontal' }: { items: NavItem[]; orientation?: 'horizontal' | 'vertical' }) {
  const pathname = usePathname();
  const s = styles[orientation];
  return (
    <ul className={s.list}>
      {liveOnly(items).map((item) => {
        const active = isActive(pathname, item.href);
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

export function ShellNav({ items, label, orientation = 'horizontal' }: { items: NavItem[]; label: string; orientation?: 'horizontal' | 'vertical' }) {
  return (
    <nav aria-label={label}>
      <NavList items={items} orientation={orientation} />
    </nav>
  );
}
