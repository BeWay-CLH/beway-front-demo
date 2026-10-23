'use client';

import { useState, useTransition, type FormEvent } from 'react';
import { Alert, Button, Field, IconButton, Input, Tag, Textarea } from '@ds';
import { NavButton } from '@/components/NavButton';
import { FormSection } from '@/components/forms/FormSection';
import { interestOptions } from '@/data/fixtures/profiles';
import { saveOwnProfile } from '@/lib/actions/profile';
import { completionOf } from '@/lib/completion';
import type { CompletionItem, EducationVM, ExperienceVM, ProfileFormVM } from '@/lib/models/profile';

const ABOUT_MAX = 500;
const NAME_MIN = 2;
const NAME_MAX = 80;

/* Lo que más le falta al perfil, en el orden del porcentaje. */
const missingLabel: Record<CompletionItem, string> = {
  headline: 'un titular',
  about: 'unas frases sobre ti',
  experience: 'experiencia',
  education: 'formación',
  interests: 'intereses',
};

const newId = () => Math.random().toString(36).slice(2, 10);

export function ProfileEditor({ initial, username }: { initial: ProfileFormVM; username: string }) {
  const [form, setForm] = useState<ProfileFormVM>(initial);
  const [skill, setSkill] = useState('');
  const [nameError, setNameError] = useState<string>();
  const [saved, setSaved] = useState(false);
  const [pending, startTransition] = useTransition();

  const completion = completionOf(form);
  const first = completion.missing[0];

  const update = (patch: Partial<ProfileFormVM>) => {
    setSaved(false);
    setForm((f) => ({ ...f, ...patch }));
  };

  const updateExperience = (id: string, patch: Partial<ExperienceVM>) =>
    update({ experience: form.experience.map((e) => (e.id === id ? { ...e, ...patch } : e)) });

  const updateEducation = (id: string, patch: Partial<EducationVM>) =>
    update({ education: form.education.map((e) => (e.id === id ? { ...e, ...patch } : e)) });

  const toggleInterest = (name: string) =>
    update({
      interests: form.interests.includes(name) ? form.interests.filter((i) => i !== name) : [...form.interests, name],
    });

  const addSkill = () => {
    const value = skill.trim();
    if (value && !form.skills.includes(value)) update({ skills: [...form.skills, value] });
    setSkill('');
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = form.displayName.trim();
    if (name.length < NAME_MIN || name.length > NAME_MAX) {
      setNameError(`Escribe tu nombre con entre ${NAME_MIN} y ${NAME_MAX} caracteres.`);
      return;
    }
    setNameError(undefined);
    startTransition(async () => {
      await saveOwnProfile({ ...form, displayName: name });
      setSaved(true);
    });
  };

  return (
    <form onSubmit={onSubmit} noValidate className="mx-auto flex w-full max-w-275 flex-col px-4 py-8 md:px-6 md:py-10">
      <header className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-3">
          <h1 className="text-h2 font-heading text-fg-heading md:text-h1">Editar perfil</h1>
          <p className="text-fg-muted">
            {first
              ? `Tu perfil está al ${completion.percent} %. Lo que más le falta: ${missingLabel[first]}.`
              : 'Tu perfil está completo.'}
          </p>
        </div>
        <NavButton href={`/u/${username}`} variant="ghost" iconAfter="arrow-right" className="self-start">
          Ver perfil
        </NavButton>
      </header>

      <div className="mt-8 flex flex-col">
        <FormSection id="datos-basicos" title="Datos básicos" description="Así te encuentran cuando ven tu perfil.">
          <Field label="Nombre" htmlFor="pe-name" required error={nameError}>
            <Input
              id="pe-name"
              value={form.displayName}
              invalid={Boolean(nameError)}
              autoComplete="name"
              onChange={(e) => update({ displayName: e.target.value })}
            />
          </Field>
          <Field label="Titular" htmlFor="pe-headline" hint="Una frase sobre lo que haces. Por ejemplo: Analista de datos junior.">
            <Input id="pe-headline" value={form.headline ?? ''} onChange={(e) => update({ headline: e.target.value })} />
          </Field>
          <Field label="Ubicación" htmlFor="pe-location">
            <Input id="pe-location" value={form.location ?? ''} onChange={(e) => update({ location: e.target.value })} />
          </Field>
        </FormSection>

        <FormSection id="sobre-ti" title="Sobre ti" description="Unas frases: qué estudias o haces y qué buscas.">
          <Field label="Presentación" htmlFor="pe-about" hint={`${(form.about ?? '').length} / ${ABOUT_MAX}`}>
            <Textarea
              id="pe-about"
              rows={5}
              maxLength={ABOUT_MAX}
              value={form.about ?? ''}
              onChange={(e) => update({ about: e.target.value })}
            />
          </Field>
        </FormSection>

        <FormSection id="experiencia" title="Experiencia" description="Empieza por tu puesto actual o por el último.">
          {form.experience.map((e) => (
            <div key={e.id} className="grid gap-4 border-t border-line-subtle pt-5 first:border-t-0 first:pt-0 md:grid-cols-2">
              <Field label="Cargo" htmlFor={`exp-role-${e.id}`}>
                <Input id={`exp-role-${e.id}`} value={e.role} onChange={(ev) => updateExperience(e.id, { role: ev.target.value })} />
              </Field>
              <Field label="Organización" htmlFor={`exp-org-${e.id}`}>
                <Input
                  id={`exp-org-${e.id}`}
                  value={e.organization}
                  onChange={(ev) => updateExperience(e.id, { organization: ev.target.value })}
                />
              </Field>
              <Field label="Desde" htmlFor={`exp-start-${e.id}`}>
                <Input
                  id={`exp-start-${e.id}`}
                  type="month"
                  value={e.start ?? ''}
                  onChange={(ev) => updateExperience(e.id, { start: ev.target.value || undefined })}
                />
              </Field>
              <Field label="Hasta" htmlFor={`exp-end-${e.id}`} hint="Déjalo vacío si es tu puesto actual.">
                <Input
                  id={`exp-end-${e.id}`}
                  type="month"
                  value={e.end ?? ''}
                  onChange={(ev) => updateExperience(e.id, { end: ev.target.value || undefined })}
                />
              </Field>
              <div className="flex justify-end md:col-span-2">
                <IconButton
                  icon="trash-2"
                  label="Quitar experiencia"
                  onClick={() => update({ experience: form.experience.filter((x) => x.id !== e.id) })}
                />
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="ghost"
            icon="plus"
            className="-ml-4 self-start"
            onClick={() => update({ experience: [...form.experience, { id: newId(), role: '', organization: '' }] })}
          >
            Añadir experiencia
          </Button>
        </FormSection>

        <FormSection id="formacion" title="Formación" description="Tu grado, máster o curso más relevante.">
          {form.education.map((e) => (
            <div key={e.id} className="grid gap-4 border-t border-line-subtle pt-5 first:border-t-0 first:pt-0 md:grid-cols-2">
              <Field label="Título" htmlFor={`edu-title-${e.id}`}>
                <Input id={`edu-title-${e.id}`} value={e.title} onChange={(ev) => updateEducation(e.id, { title: ev.target.value })} />
              </Field>
              <Field label="Centro" htmlFor={`edu-inst-${e.id}`}>
                <Input
                  id={`edu-inst-${e.id}`}
                  value={e.institution}
                  onChange={(ev) => updateEducation(e.id, { institution: ev.target.value })}
                />
              </Field>
              <div className="flex justify-end md:col-span-2">
                <IconButton
                  icon="trash-2"
                  label="Quitar formación"
                  onClick={() => update({ education: form.education.filter((x) => x.id !== e.id) })}
                />
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="ghost"
            icon="plus"
            className="-ml-4 self-start"
            onClick={() => update({ education: [...form.education, { id: newId(), title: '', institution: '' }] })}
          >
            Añadir formación
          </Button>
        </FormSection>

        <FormSection id="intereses" title="Intereses" description="Los temas que te interesan. Se ven en tu perfil.">
          <div role="group" aria-label="Intereses" className="flex flex-wrap gap-2">
            {interestOptions.map((name) => (
              <Tag key={name} selected={form.interests.includes(name)} onClick={() => toggleInterest(name)}>
                {name}
              </Tag>
            ))}
          </div>
        </FormSection>

        <FormSection title="Habilidades" description="Con tus palabras. Se muestran como declaradas, sin verificar.">
          {form.skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {form.skills.map((s) => (
                <Tag key={s} onRemove={() => update({ skills: form.skills.filter((x) => x !== s) })}>
                  {s}
                </Tag>
              ))}
            </div>
          ) : null}
          <div className="flex items-end gap-2">
            <div className="min-w-0 flex-1">
              <Field label="Añadir habilidad" htmlFor="pe-skill">
                <Input
                  id="pe-skill"
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                />
              </Field>
            </div>
            <Button type="button" variant="ghost" onClick={addSkill}>
              Añadir
            </Button>
          </div>
        </FormSection>
      </div>

      <footer className="flex flex-col gap-4 border-t border-line-subtle pt-8">
        {saved ? (
          <Alert tone="info" title="Simulación">
            No hemos guardado tus cambios. En la demo, tu perfil de ejemplo no cambia.
          </Alert>
        ) : null}
        <div className="flex justify-end">
          <Button type="submit" size="lg" disabled={pending}>
            {pending ? 'Guardando…' : 'Guardar cambios'}
          </Button>
        </div>
      </footer>
    </form>
  );
}
