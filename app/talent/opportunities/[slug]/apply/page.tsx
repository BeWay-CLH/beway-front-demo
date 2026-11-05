import type { Metadata } from 'next';
import { InProgressScreen } from '@/components/InProgressScreen';

export const metadata: Metadata = { title: 'Candidatura · BeWay', robots: { index: false } };

/* Candidatura en tres pasos (fichas 29 y 30). En proceso (D5). No envía nada: no existe endpoint de candidatura. */
export default async function ApplyPage({ params }: { params: Promise<{ slug: string }> }) {
  await params;
  return (
    <InProgressScreen
      eyebrow="Candidatura"
      title="Tu candidatura."
      description="Tres pasos: tu perfil, tu motivación y la revisión. Aquí se completará la candidatura."
      expects={[
        'Tu perfil y el CV que elijas',
        'Tu motivación y tu portfolio',
        'Una revisión antes de enviar',
      ]}
      backHref="/talent/opportunities"
      backLabel="Volver a oportunidades"
    />
  );
}
