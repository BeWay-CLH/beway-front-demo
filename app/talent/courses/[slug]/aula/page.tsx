import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { InProgressScreen } from '@/components/InProgressScreen';
import { getCourseBySlug } from '@/lib/services/courses';

export const metadata: Metadata = { title: 'Aula · BeWay', robots: { index: false } };

/* Aula del curso (ficha 14). En proceso (D5): sin módulos ni progreso reales. Solo existe si el curso existe. */
export default async function ClassroomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) notFound();
  return (
    <InProgressScreen
      eyebrow={`Aula · ${course.title}`}
      title="Aula del curso."
      description="Módulos a la izquierda y contenido a la derecha. Aquí se seguirá el curso, bloque a bloque."
      expects={[
        'Índice de módulos con tu progreso',
        'Reproductor y recursos de cada bloque',
        'Evaluación al completar los bloques',
      ]}
      backHref={`/talent/courses/${slug}`}
      backLabel="Volver al curso"
    />
  );
}
