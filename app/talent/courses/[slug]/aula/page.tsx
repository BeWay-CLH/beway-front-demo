import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AulaPlayer } from '@/components/course/AulaPlayer';
import { getCourseBySlug } from '@/lib/services/courses';

type Props = { params: Promise<{ slug: string }> };

export const metadata: Metadata = { title: 'Aula · BeWay', robots: { index: false } };

/* Aula del curso (guía de correcciones, ficha 14). Los bloques vienen del programa (syllabus). Sin vídeo real. */
export default async function ClassroomPage({ params }: Props) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) notFound();
  const blocks = course.syllabus.map((s) => ({ title: s.title, durationLabel: s.durationLabel }));
  return <AulaPlayer slug={slug} courseTitle={course.title} provider={course.provider} blocks={blocks} />;
}
