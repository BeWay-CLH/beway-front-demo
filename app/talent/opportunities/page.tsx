import type { Metadata } from 'next';
import { InProgressScreen } from '@/components/InProgressScreen';

export const metadata: Metadata = { title: 'Oportunidades · BeWay', robots: { index: false } };

/* Catálogo de oportunidades profesionales (ficha 27). En proceso (D5): no hay vacantes reales ni de ejemplo. */
export default function OpportunitiesPage() {
  return (
    <InProgressScreen
      eyebrow="Oportunidades profesionales"
      title="El siguiente paso puede estar aquí."
      description="Ofertas de las empresas de Beway, con su modalidad y su tipo. Aquí verás el catálogo."
      expects={[
        'Oportunidades de las empresas del programa',
        'Guardar una oportunidad para después',
      ]}
    />
  );
}
