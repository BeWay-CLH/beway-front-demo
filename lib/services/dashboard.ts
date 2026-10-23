import { completionOf } from '@/lib/completion';
import type { CompletionStepVM, NextStepVM, TalentDashboardVM } from '@/lib/models/dashboard';
import type { CompletionItem } from '@/lib/models/profile';
import { getCompaniesByInterests, getFollowedCompanies } from './companies';
import { getCourses } from './courses';
import { getAccountSettings, getProfileForm } from './profiles';
import { getSurveys } from './surveys';

/* Resumen del dashboard Talent (BE-021). El frontend lo compone con perfil (BE-005), empresas (BE-008), seguidas
   (BE-025), encuestas (BE-010) y cursos (BE-013); si el backend ofrece un agregado, solo cambia el cuerpo de esta función (ARCHITECTURE §4). */

const EDIT = '/talent/profile/edit';

/* Texto de cada apartado y a dónde lleva. El orden es el del porcentaje (`completionOf`). `cta` es el botón
   principal cuando ese apartado es el siguiente paso. */
const stepCopy: Record<CompletionItem, { label: string; title: string; description: string; cta: string; href: string }> = {
  headline: {
    label: 'titular',
    title: 'Añade un titular',
    description: 'Una frase sobre lo que haces. Aparece junto a tu nombre.',
    cta: 'Añadir titular',
    href: `${EDIT}#datos-basicos`,
  },
  about: {
    label: 'presentación',
    title: 'Escribe unas frases sobre ti',
    description: 'Qué estudias o haces, y qué buscas.',
    cta: 'Escribir presentación',
    href: `${EDIT}#sobre-ti`,
  },
  experience: {
    label: 'experiencia',
    title: 'Añade tu primera experiencia',
    description: 'Puede ser una práctica, un trabajo o un proyecto.',
    cta: 'Añadir experiencia',
    href: `${EDIT}#experiencia`,
  },
  education: {
    label: 'formación',
    title: 'Añade tu formación',
    description: 'Tu grado, máster o curso más relevante.',
    cta: 'Añadir formación',
    href: `${EDIT}#formacion`,
  },
  interests: {
    label: 'intereses',
    title: 'Elige al menos un interés',
    description: 'Los temas que eliges se ven en tu perfil.',
    cta: 'Elegir intereses',
    href: `${EDIT}#intereses`,
  },
};

/* `null` = la cuenta no tiene perfil: la página responde 404. */
export async function getTalentDashboard(userId: string): Promise<TalentDashboardVM | null> {
  const [form, settings, followed] = await Promise.all([
    getProfileForm(userId),
    getAccountSettings(userId),
    getFollowedCompanies(userId),
  ]);
  if (!form || !settings) return null;

  const completion = completionOf(form);
  const steps: CompletionStepVM[] = (Object.keys(stepCopy) as CompletionItem[]).map((item) => ({
    item,
    done: !completion.missing.includes(item),
    label: stepCopy[item].label,
    title: stepCopy[item].title,
    description: stepCopy[item].description,
    href: stepCopy[item].href,
  }));

  const isNew = completion.missing.length === steps.length;
  const first = completion.missing[0];
  /* Con el perfil vacío, el mejor siguiente paso es el recorrido guiado; después, el primer apartado que falta. */
  const nextStep: NextStepVM | undefined = isNew
    ? { label: 'Empezar mi perfil', href: '/talent/onboarding' }
    : first
      ? { label: stepCopy[first].cta, href: stepCopy[first].href }
      : undefined;

  const [matches, surveys, courses] = await Promise.all([
    getCompaniesByInterests(form.interests),
    getSurveys(userId),
    getCourses({ status: 'open' }),
  ]);

  return {
    greetingName: form.displayName.split(' ')[0],
    username: settings.username,
    visibility: settings.visibility,
    completion,
    steps,
    nextStep,
    isNew,
    interests: form.interests,
    interestCompanies: matches.map(({ id, slug, name, category, logo }) => ({ id, slug, name, category, logo })),
    followedIds: followed.map((c) => c.id),
    surveys: surveys
      .filter((x) => x.status === 'open' && x.eligibility !== 'not-eligible' && x.participation !== 'completed')
      .sort((a, b) => (a.closesAt ?? '').localeCompare(b.closesAt ?? ''))
      .map(({ id, slug, title, publisher, estimatedMinutes, closesAt, participation }) => ({ id, slug, title, publisher, estimatedMinutes, closesAt, participation })),
    courses: courses.map(({ id, slug, title, provider, format, durationLabel, startsAt, grantsCredential }) => ({ id, slug, title, provider, format, durationLabel, startsAt, grantsCredential })),
  };
}
