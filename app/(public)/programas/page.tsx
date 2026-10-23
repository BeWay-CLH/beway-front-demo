import type { Metadata } from 'next';
import { ProgramasView } from './ProgramasView';

export const metadata: Metadata = {
  title: 'Programas · BeWay',
  description: 'Mentorías, retos y prácticas abiertas por las empresas del ecosistema BeWay.',
};

export default function ProgramasPage() {
  return <ProgramasView />;
}
