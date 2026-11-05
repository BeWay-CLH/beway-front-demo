import type { Metadata } from 'next';
import { InProgressScreen } from '@/components/InProgressScreen';

export const metadata: Metadata = { title: 'Ayuda · BeWay' };

/* Ayuda (ficha 37). En proceso (D5): sin preguntas frecuentes reales ni canal de ayuda. */
export default function HelpPage() {
  return (
    <InProgressScreen
      eyebrow="Ayuda"
      title="Aquí para ayudarte."
      description="Preguntas frecuentes y el canal de ayuda. Aquí encontrarás respuestas a lo más habitual."
      expects={[
        'Preguntas frecuentes sobre tu cuenta y tu perfil',
        'Cómo funcionan las certificaciones y los programas',
        'Un canal para escribirnos',
      ]}
      backHref="/contact"
      backLabel="Contactar"
    />
  );
}
