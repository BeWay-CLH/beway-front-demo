import type { Metadata } from 'next';
import { InProgressScreen } from '@/components/InProgressScreen';

export const metadata: Metadata = { title: 'Challenges · BeWay', robots: { index: false } };

/* Catálogo de challenges (ficha 16). En proceso (D5): sin modelo ni datos todavía. */
export default function ChallengesPage() {
  return (
    <InProgressScreen
      eyebrow="Challenges"
      title="Tu talento se demuestra."
      description="Retos que las empresas plantean, con un briefing claro, una propuesta y una revisión. Aquí verás el catálogo."
      expects={[
        'Challenges de cada empresa, con su sector y su plazo',
        'Briefing, entregables y cómo se revisan',
        'Tu propuesta, guardada como borrador',
      ]}
    />
  );
}
