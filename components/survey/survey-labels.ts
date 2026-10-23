import { formatDate, formatList } from '@/lib/format';
import type { SurveySummaryVM } from '@/lib/models/survey';

/* Textos de estado y motivo de una encuesta, compartidos por la lista, el detalle y el inicio. Sin datos ni efectos. */

export type RowState = 'open' | 'in-progress' | 'upcoming' | 'closed' | 'completed' | 'not-eligible';

/* `completed` es "enviada en esta sesión"; `hasDraft`, "tiene borrador en este navegador". Los dos vienen del navegador. */
export function rowState(s: SurveySummaryVM, opts: { completed: boolean; hasDraft: boolean }): RowState {
  if (s.participation === 'completed' || opts.completed) return 'completed';
  if (s.eligibility === 'not-eligible') return 'not-eligible';
  if (s.status === 'closed') return 'closed';
  if (s.status === 'upcoming') return 'upcoming';
  return s.participation === 'in-progress' || opts.hasDraft ? 'in-progress' : 'open';
}

/* Las abiertas sin empezar no llevan sello: el botón y la fecha de cierre ya lo dicen (una marca por fila). */
export const stateBadge: Record<RowState, { label: string; tone: 'neutral' | 'navy' | 'success'; icon?: string } | undefined> = {
  open: undefined,
  'in-progress': { label: 'En curso', tone: 'navy' },
  upcoming: { label: 'Próxima', tone: 'neutral' },
  closed: { label: 'Cerrada', tone: 'neutral' },
  completed: { label: 'Completada', tone: 'success', icon: 'check' },
  'not-eligible': undefined,
};

export const stateAction: Record<RowState, string> = {
  open: 'Responder',
  'in-progress': 'Continuar',
  upcoming: 'Ver resumen',
  closed: 'Ver resumen',
  completed: 'Ver resumen',
  'not-eligible': 'Ver empresa',
};

/* Por qué la ve (DEC-016, OI-017): decir de dónde viene es lo que hace de BeWay un espacio de empresas que sigues. */
export function reasonText(s: SurveySummaryVM): string {
  if (s.eligibility === 'follows') return `Sigues a ${s.publisher.name}`;
  if (s.eligibility === 'interested') return `Te interesa ${s.publisher.category}`;
  return `Para quien sigue a ${s.publisher.name} o le interesa ${s.publisher.category}`;
}

export function dateNote(s: SurveySummaryVM): string | undefined {
  if (s.status === 'upcoming' && s.opensAt) return `Abre el ${formatDate(s.opensAt)}`;
  if (s.status === 'closed' && s.closesAt) return `Cerró el ${formatDate(s.closesAt)}`;
  if (s.closesAt) return `Cierra el ${formatDate(s.closesAt)}`;
  return undefined;
}

export const questionsText = (n: number) => `${n} ${n === 1 ? 'pregunta' : 'preguntas'}`;

/* "Datalia, 5 preguntas y 4 min" para una línea de apoyo. */
export const metaText = (s: SurveySummaryVM) =>
  formatList([s.publisher.name, questionsText(s.questionCount), `${s.estimatedMinutes} min`]);
