import type { ParticipationState } from '@/data/fixtures/challenges';

/* Participación en un challenge o miniproyecto, solo en la sesión del navegador (escritura simulada, DEC-006).
   Nunca se usa localStorage. Sin storage, o si falla, vale el estado de ejemplo del fixture. */

const key = (slug: string) => `bw-part:${slug}`;
const draftKey = (slug: string) => `bw-draft:${slug}`;

export function readPart(slug: string, fallback: ParticipationState): ParticipationState {
  try {
    const raw = window.sessionStorage.getItem(key(slug));
    return raw === 'none' || raw === 'draft' || raw === 'joined' ? raw : fallback;
  } catch {
    return fallback;
  }
}

export function writePart(slug: string, state: ParticipationState) {
  try {
    window.sessionStorage.setItem(key(slug), state);
  } catch {
    /* sin almacenamiento: la participación dura lo que la pantalla */
  }
}

export type DraftFields = { title: string; problem: string; proposal: string; link: string };

export function readDraft(slug: string): DraftFields | null {
  try {
    const raw = window.sessionStorage.getItem(draftKey(slug));
    return raw ? (JSON.parse(raw) as DraftFields) : null;
  } catch {
    return null;
  }
}

export function writeDraft(slug: string, draft: DraftFields) {
  try {
    window.sessionStorage.setItem(draftKey(slug), JSON.stringify(draft));
  } catch {
    /* sin almacenamiento: el borrador dura lo que la pantalla */
  }
}
