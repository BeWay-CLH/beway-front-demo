import type { ReactNode } from 'react';
import { Alert, Avatar, Icon, Tag } from '@ds';
import { NavButton } from '@/components/NavButton';
import { FormSection } from '@/components/forms/FormSection';
import { formatPeriod } from '@/lib/format';
import type { EducationVM, ExperienceVM, ProfileCardVM, ProfileVisibility } from '@/lib/models/profile';

/* Perfil de una persona. Las secciones vacías no aparecen para visitantes; el propio titular ve una invitación.
   `following` (empresas que sigue) solo lo recibe el titular: nadie más ve esa lista. */
export function PublicProfileView({
  profile,
  isOwner,
  visibility,
  following,
}: {
  profile: ProfileCardVM;
  isOwner: boolean;
  visibility: ProfileVisibility;
  following?: ReactNode;
}) {
  const showEmpty = (empty: boolean) => !empty || isOwner;

  return (
    <div className="mx-auto flex w-full max-w-275 flex-col gap-8 px-4 py-8 md:px-6 md:py-10">
      <header className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="flex items-center gap-5">
          <Avatar name={profile.displayName} size={72} />
          <div className="flex min-w-0 flex-col gap-2">
            <h1 className="text-h2 font-heading text-fg-heading md:text-h1">{profile.displayName}</h1>
            {profile.headline ? <p className="text-fg-body">{profile.headline}</p> : null}
            {profile.location ? (
              <p className="flex items-center gap-2 text-sm text-fg-muted">
                <Icon name="map-pin" size={16} />
                {profile.location}
              </p>
            ) : null}
          </div>
        </div>
        {isOwner ? (
          <NavButton href="/talent/profile/edit" variant="secondary" icon="pencil" className="self-start">
            Editar perfil
          </NavButton>
        ) : null}
      </header>

      {isOwner && visibility === 'private' ? (
        <Alert tone="info" title="Solo tú ves este perfil">
          Está en privado. Cámbialo en tus ajustes si quieres que otras personas lo vean.
        </Alert>
      ) : null}

      <div className="flex flex-col">
        {profile.about || isOwner ? (
          <FormSection title="Sobre ti">
            {profile.about ? (
              <p className="max-w-[68ch] text-fg-body">{profile.about}</p>
            ) : (
              <NavButton href="/talent/profile/edit" variant="ghost" icon="plus" className="-ml-4 self-start">
                Escribe unas frases sobre ti
              </NavButton>
            )}
          </FormSection>
        ) : null}

        {showEmpty(profile.experience.length === 0) ? (
          <FormSection title="Experiencia">
            {profile.experience.length > 0 ? (
              <ul className="flex flex-col">{profile.experience.map((e) => <Entry key={e.id} item={e} />)}</ul>
            ) : (
              <NavButton href="/talent/profile/edit" variant="ghost" icon="plus" className="-ml-4 self-start">
                Añade tu primera experiencia
              </NavButton>
            )}
          </FormSection>
        ) : null}

        {showEmpty(profile.education.length === 0) ? (
          <FormSection title="Formación">
            {profile.education.length > 0 ? (
              <ul className="flex flex-col">{profile.education.map((e) => <Entry key={e.id} item={e} />)}</ul>
            ) : (
              <NavButton href="/talent/profile/edit" variant="ghost" icon="plus" className="-ml-4 self-start">
                Añade tu formación
              </NavButton>
            )}
          </FormSection>
        ) : null}

        {profile.interests.length > 0 || isOwner ? (
          <FormSection title="Intereses">
            {profile.interests.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((i) => (
                  <Tag key={i}>{i}</Tag>
                ))}
              </div>
            ) : (
              <NavButton href="/talent/profile/edit" variant="ghost" icon="plus" className="-ml-4 self-start">
                Elige al menos un interés
              </NavButton>
            )}
          </FormSection>
        ) : null}

        {profile.skills.length > 0 ? (
          <FormSection title="Habilidades" description="Declaradas por la persona, sin verificar.">
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
          </FormSection>
        ) : null}

        {isOwner && following ? (
          <FormSection title="Empresas que sigues" description="Solo tú ves esta lista.">
            {following}
          </FormSection>
        ) : null}
      </div>
    </div>
  );
}

function Entry({ item }: { item: ExperienceVM | EducationVM }) {
  const detail = 'role' in item ? item.organization : item.institution;
  const title = 'role' in item ? item.role : item.title;
  return (
    <li className="flex flex-col gap-1 border-t border-line-subtle py-4 first:border-t-0 first:pt-0 md:flex-row md:items-baseline md:justify-between md:gap-6">
      <div className="flex flex-col gap-1">
        <span className="font-semibold text-fg-heading">{title}</span>
        <span className="text-sm text-fg-muted">{detail}</span>
      </div>
      <span className="text-sm tabular-nums text-fg-muted">{formatPeriod(item.start, item.end)}</span>
    </li>
  );
}
