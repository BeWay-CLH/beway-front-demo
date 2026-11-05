import type { Metadata } from 'next';
import { InProgressScreen } from '@/components/InProgressScreen';

export const metadata: Metadata = { title: 'Miniproyectos · BeWay', robots: { index: false } };

/* Catálogo de miniproyectos (ficha 19). En proceso (D5). */
export default function MiniprojectsPage() {
  return (
    <InProgressScreen
      eyebrow="Miniproyectos"
      title="Pequeños proyectos. Evidencias reales."
      description="Prácticas guiadas de una empresa que se pueden llevar al portfolio. Aquí verás el catálogo."
      expects={[
        'Proyectos prácticos con su briefing',
        'Evidencia para tu portfolio al terminarlos',
      ]}
    />
  );
}
