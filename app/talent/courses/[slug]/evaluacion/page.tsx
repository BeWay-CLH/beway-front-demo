import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { EvaluationGate } from '@/components/course/EvaluationGate';
import { getCourseBySlug } from '@/lib/services/courses';

type Props = { params: Promise<{ slug: string }> };

export const metadata: Metadata = { title: 'Evaluación · BeWay', robots: { index: false } };

/* Evaluación y acreditación de un curso (guía de correcciones, ficha 15). Solo existe si el curso existe. */
export default async function EvaluationPage({ params }: Props) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) notFound();
  return (
    <div className="mx-auto flex w-full max-w-narrow flex-col gap-6 px-4 pt-8 pb-16 md:px-6">
      <p className="eyebrow m-0 text-fg-muted uppercase">Evaluación y acreditación</p>
      <h1 className="m-0 font-heading text-[28px] leading-[1.2] font-[700] text-fg-heading">{course.title}</h1>
      <EvaluationGate slug={slug} courseTitle={course.title} total={course.syllabus.length} />
    </div>
  );
}
