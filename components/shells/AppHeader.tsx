'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Badge, Logo, NavBar } from '@ds';
import { NavButton } from '@/components/NavButton';
import { ThemeToggle } from '@/components/ThemeToggle';
import type { Session } from '@/lib/models/session';
import { headerItems, type NavItem, type Space } from '@/lib/routes';
import { NotificationsButton, PersonalMenu } from './AccountMenus';
import { DemoBar, demoBarEnabled } from './DemoBar';
import { NavList } from './ShellNav';

/* Cabecera única de todos los espacios (DEC-013 y DEC-045; guía de correcciones 01 C y 07): dos filas.
   Fila 1: logo, buscador (desde md) y cuenta. Fila 2: navegación a la izquierda (side 'start') y a la derecha ('end').
   Densidad: general 83 + 57 px; directorio 66 + 46 (móvil 60 + 44). En móvil la fila 2 se desplaza en horizontal
   (ficha 07): no hay menú hamburguesa; la cuenta completa (ajustes y cerrar sesión) está en el menú personal.
   Las clases responsive llevan "!" porque los estilos en línea del DS vencen a las clases normales. */
export function AppHeader({
  space,
  homeHref,
  homeLabel,
  items = [],
  badge,
  search = false,
  session = null,
  quiet = false,
}: {
  space: Space;
  homeHref: string;
  homeLabel: string;
  items?: NavItem[];
  badge?: string;
  search?: boolean;
  session?: Session | null;
  /* Acceso, registro y estados sin acceso: sin acciones de cuenta, solo el tema. */
  quiet?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const guestActions = !session && !quiet && space === 'public';
  const visible = headerItems(items);
  const startItems = visible.filter((i) => (i.side ?? 'start') === 'start');
  const endItems = visible.filter((i) => i.side === 'end');
  const username = session?.username;

  const directory = pathname === '/companies';
  const bar = directory
    ? { height: 66, cls: 'max-md:h-[60px]! max-md:px-4!' }
    : { height: 83, cls: 'max-md:px-4!' };
  const nav = directory
    ? { height: 46, cls: 'max-md:h-11! max-md:px-4!' }
    : { height: 57, cls: 'max-md:h-11! max-md:px-4!' };

  return (
    <div className="sticky top-0 z-40">
      {demoBarEnabled ? <DemoBar space={space} /> : null}
      <NavBar
        barHeight={bar.height}
        navHeight={nav.height}
        barClassName={bar.cls}
        navClassName={`overflow-x-auto ${nav.cls}`}
        searchClassName="max-md:hidden!"
        showSearch={search}
        onSearch={(q) => router.push('/companies' + (q ? `?q=${encodeURIComponent(q)}` : ''))}
        logo={
          <span className="flex items-center gap-3">
            <Link href={homeHref} aria-label={homeLabel} className="flex items-center">
              <Logo variant="auto" height={32} alt="" />
            </Link>
            {badge ? <Badge tone="navy">{badge}</Badge> : null}
          </span>
        }
        links={startItems.length > 0 ? <NavList items={startItems} username={username} /> : undefined}
        endLinks={endItems.length > 0 ? <NavList items={endItems} username={username} /> : undefined}
        actions={
          <>
            <ThemeToggle />
            {session ? (
              <>
                <NotificationsButton />
                <PersonalMenu session={session} />
              </>
            ) : guestActions ? (
              <>
                <NavButton href="/login" variant="ghost" className="max-sm:hidden">Iniciar sesión</NavButton>
                <NavButton href="/signup" variant="secondary">Crear cuenta</NavButton>
              </>
            ) : null}
          </>
        }
      />
    </div>
  );
}
