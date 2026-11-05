'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Icon } from '@ds';
import { setFollowing } from '@/lib/actions/companies';
import { setFollowOverride, useFollowOverrides } from './follow-store';

/* Seguir desde la tarjeta del directorio (ficha 04): "+" para seguir, check teal si ya se sigue.
   Misma acción que la ficha (C-05): sin sesión lleva a crear cuenta; con sesión es una simulación que solo dura la
   sesión del navegador (DEC-006). El aviso completo sigue en la ficha de la empresa. */
export function FollowMark({
  companyId,
  companyName,
  userId,
  initialFollowing,
}: {
  companyId: string;
  companyName: string;
  userId?: string;
  initialFollowing: boolean;
}) {
  const router = useRouter();
  const overrides = useFollowOverrides(userId);
  const following = overrides[companyId] ?? initialFollowing;
  const [, startTransition] = useTransition();

  const onClick = () => {
    if (!userId) {
      router.push('/signup');
      return;
    }
    const next = !following;
    startTransition(async () => {
      await setFollowing(companyId, next);
      setFollowOverride(userId, companyId, next);
    });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={following ? `Dejar de seguir a ${companyName}` : `Seguir a ${companyName}`}
      aria-pressed={following}
      title={userId ? 'Simulado en la demo: solo dura esta sesión' : 'Crea una cuenta para seguir empresas'}
      className={`transition-control inline-flex size-8 items-center justify-center rounded-control border border-line-control bg-surface-card hover:bg-surface-sunken ${following ? 'text-fg-accent' : 'text-fg-body'}`}
    >
      <Icon name={following ? 'check' : 'plus'} size={16} />
    </button>
  );
}
