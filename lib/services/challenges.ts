import { brandBySlug } from '@/data/fixtures/brands';
import { challengeBySlug, challengeFixtures, type ChallengeFixture, type ChallengeKind, type ParticipationState } from '@/data/fixtures/challenges';

/* Lectura de challenges y miniproyectos para las pantallas (guía de correcciones, 05). Hoy devuelve fixtures ficticios;
   al conectar el backend cambia solo este archivo. Las escrituras (unirse, borrador, entrega) son simulaciones en la
   sesión del navegador: ningún servicio las recibe (DEC-006). */

export type ChallengeVM = {
  slug: string;
  kind: ChallengeKind;
  title: string;
  summary: string;
  sector: string;
  companySlug: string;
  companyName: string;
  /* Color base de la portada: el de la marca si existe; si no, el del sistema. */
  base: string;
  status: ChallengeFixture['status'];
  format: string;
  deadline: string;
  start: string;
  deliverables: string[];
  review: string[];
  sampleParticipation: ParticipationState;
};

const toVM = (c: ChallengeFixture): ChallengeVM => {
  const brand = brandBySlug(c.companySlug);
  return {
    slug: c.slug,
    kind: c.kind,
    title: c.title,
    summary: c.summary,
    sector: c.sector,
    companySlug: c.companySlug,
    companyName: brand?.name ?? c.companySlug,
    base: brand?.palette.base ?? '#0B172C',
    status: c.status,
    format: c.format,
    deadline: c.deadline,
    start: c.start,
    deliverables: c.deliverables,
    review: c.review,
    sampleParticipation: c.sampleParticipation,
  };
};

export async function getChallenges(filter: { kind: ChallengeKind; q?: string; companySlug?: string }): Promise<ChallengeVM[]> {
  const needle = (filter.q ?? '').trim().toLowerCase();
  return challengeFixtures
    .filter((c) => c.kind === filter.kind)
    .filter((c) => !filter.companySlug || c.companySlug === filter.companySlug)
    .filter((c) => !needle || `${c.title} ${c.summary} ${c.sector}`.toLowerCase().includes(needle))
    .map(toVM);
}

export async function getChallengeBySlug(slug: string): Promise<ChallengeVM | null> {
  const c = challengeBySlug(slug);
  return c ? toVM(c) : null;
}

/* Empresas que aparecen en el filtro: solo las que tienen challenges o miniproyectos. */
export function challengeCompanies(kind: ChallengeKind) {
  const slugs = [...new Set(challengeFixtures.filter((c) => c.kind === kind).map((c) => c.companySlug))];
  return slugs.map((slug) => ({ slug, name: brandBySlug(slug)?.name ?? slug }));
}
