'use client';

import { useEffect, useState, useTransition } from 'react';
import { Button, Toast } from '@ds';
import { NavButton } from '@/components/NavButton';
import { setFollowing } from '@/lib/actions/companies';
import { setFollowOverride, useFollowOverrides } from './follow-store';

/* Seguir / dejar de seguir (C-05). Sin sesión lleva a crear cuenta. Con sesión el cambio es una simulación:
   se anuncia con un aviso y solo dura la sesión del navegador (DEC-006). "Seguir" es el único primary cyan de
   la ficha; "Siguiendo" pasa a navy. */
export function FollowButton({
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
  const overrides = useFollowOverrides(userId);
  const following = overrides[companyId] ?? initialFollowing;
  const [notice, setNotice] = useState<string>();
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(undefined), 7000);
    return () => clearTimeout(timer);
  }, [notice]);

  if (!userId) {
    return (
      <NavButton href="/signup" variant="primary" icon="plus" size="lg">
        Seguir
      </NavButton>
    );
  }

  const toggle = () => {
    const next = !following;
    startTransition(async () => {
      await setFollowing(companyId, next);
      setFollowOverride(userId, companyId, next);
      setNotice(
        next
          ? `No hemos guardado que sigues a ${companyName}. En la demo, tus empresas seguidas solo cambian en esta sesión.`
          : `No hemos guardado que dejas de seguir a ${companyName}. En la demo, tus empresas seguidas solo cambian en esta sesión.`,
      );
    });
  };

  return (
    <>
      <Button
        variant={following ? 'secondary' : 'primary'}
        icon={following ? 'check' : 'plus'}
        size="lg"
        disabled={pending}
        onClick={toggle}
      >
        {following ? 'Siguiendo' : 'Seguir'}
      </Button>
      {notice ? (
        <div className="fixed inset-x-4 bottom-4 z-50 flex justify-center md:inset-x-auto md:right-6 md:justify-end">
          <Toast tone="info" title="Simulación" message={notice} onDismiss={() => setNotice(undefined)} />
        </div>
      ) : null}
    </>
  );
}
