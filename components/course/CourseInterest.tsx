'use client';

import { useEffect, useState, useTransition } from 'react';
import { Button, Toast } from '@ds';
import { useStored, writeStored } from '@/components/demo-store';
import { setInterest } from '@/lib/actions/courses';
import type { CourseStatus } from '@/lib/models/course';

const keyFor = (userId: string) => `beway-demo-course-interest:${userId}`;

/* "Me interesa" (E-06). Sin enlace real de inscripción (DEC-021, brief: no inventar URLs), el curso solo recoge interés,
   y es una simulación: se anuncia con un aviso y solo dura la sesión del navegador (DEC-006). Un curso cerrado no admite
   interés y dice por qué en lugar de dejar un botón apagado sin explicación. */
export function CourseInterest({
  courseId,
  courseTitle,
  userId,
  status,
}: {
  courseId: string;
  courseTitle: string;
  userId: string;
  status: CourseStatus;
}) {
  const ids = useStored<string[]>(keyFor(userId)) ?? [];
  const interested = ids.includes(courseId);
  const [notice, setNotice] = useState<string>();
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(undefined), 7000);
    return () => clearTimeout(timer);
  }, [notice]);

  if (status === 'closed') {
    return (
      <div className="flex flex-col gap-2">
        <Button variant="primary" size="lg" icon="plus" disabled>
          Me interesa
        </Button>
        <p className="text-sm text-fg-muted">Este curso ya terminó, así que no admite interés.</p>
      </div>
    );
  }

  const toggle = () => {
    const next = !interested;
    startTransition(async () => {
      await setInterest(courseId, next);
      writeStored(keyFor(userId), next ? [...ids, courseId] : ids.filter((id) => id !== courseId));
      setNotice(
        next
          ? `No hemos guardado tu interés en ${courseTitle}. En la demo, solo se recuerda mientras no cierres esta pestaña.`
          : `No hemos guardado que quitas tu interés en ${courseTitle}. En la demo, solo se recuerda mientras no cierres esta pestaña.`,
      );
    });
  };

  return (
    <>
      <Button
        variant={interested ? 'secondary' : 'primary'}
        size="lg"
        icon={interested ? 'check' : 'plus'}
        disabled={pending}
        aria-pressed={interested}
        onClick={toggle}
      >
        {interested ? 'Te interesa' : 'Me interesa'}
      </Button>
      {notice ? (
        <div className="fixed inset-x-4 bottom-4 z-50 flex justify-center md:inset-x-auto md:right-6 md:justify-end">
          <Toast tone="info" title="Simulación" message={notice} onDismiss={() => setNotice(undefined)} />
        </div>
      ) : null}
    </>
  );
}
