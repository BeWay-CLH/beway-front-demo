import type { CompletionItem, ProfileCompletionVM, ProfileFormVM } from '@/lib/models/profile';

/* Porcentaje de completitud. Sin acceso a datos: lo usan el servidor y el cliente, así que cualquier
   cambio en el editor se refleja al instante. */
export function completionOf(
  form: Pick<ProfileFormVM, 'headline' | 'about' | 'experience' | 'education' | 'interests'>,
): ProfileCompletionVM {
  const done: Record<CompletionItem, boolean> = {
    headline: Boolean(form.headline?.trim()),
    about: Boolean(form.about?.trim()),
    experience: form.experience.length > 0,
    education: form.education.length > 0,
    interests: form.interests.length > 0,
  };
  const missing = (Object.keys(done) as CompletionItem[]).filter((key) => !done[key]);
  return { percent: Math.round(((5 - missing.length) / 5) * 100), missing };
}
