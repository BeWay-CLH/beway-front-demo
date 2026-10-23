'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@ds';
import type { ComponentProps } from 'react';

/* Botón del design system que navega. Úsalo en páginas de servidor, donde no se pueden pasar onClick. */
export function NavButton({ href, ...props }: { href: string } & ComponentProps<typeof Button>) {
  const router = useRouter();
  return <Button {...props} onClick={() => router.push(href)} />;
}
