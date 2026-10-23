'use client';

import { useState, useTransition, type FormEvent } from 'react';
import { Alert, Button, Dialog, Field, Input } from '@ds';
import { FormSection } from '@/components/forms/FormSection';
import { ToggleField } from '@/components/forms/ToggleField';
import { ProfilePreview } from '@/components/profile/ProfilePreview';
import { saveOwnSettings } from '@/lib/actions/profile';
import { signOut } from '@/lib/auth-actions';
import type { AccountSettingsVM, ProfileCardVM, ProfileVisibility } from '@/lib/models/profile';

const USERNAME_FORMAT = /^[a-z0-9-]{3,30}$/;

type Notice = { title: string; text: string };

export function AccountSettingsForm({
  initial,
  card,
  displayName,
}: {
  initial: AccountSettingsVM;
  card: ProfileCardVM | null;
  displayName: string;
}) {
  const [username, setUsername] = useState(initial.username);
  const [visibility, setVisibility] = useState<ProfileVisibility>(initial.visibility);
  const [notifications, setNotifications] = useState(initial.notifications);
  const [usernameError, setUsernameError] = useState<string>();
  const [notice, setNotice] = useState<Notice>();
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  /* La vista previa usa el nombre de usuario que se está escribiendo, no el guardado. */
  const previewCard = card ? { ...card, username } : null;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const clean = username.trim().toLowerCase();
    if (!USERNAME_FORMAT.test(clean)) {
      setUsernameError('Usa de 3 a 30 letras minúsculas, números o guiones.');
      return;
    }
    setUsernameError(undefined);
    startTransition(async () => {
      await saveOwnSettings({ ...initial, username: clean, visibility, notifications });
      setUsername(clean);
      setNotice({ title: 'Simulación', text: 'No hemos guardado tus ajustes. En la demo, la cuenta de ejemplo no cambia.' });
    });
  };

  return (
    <>
      <header className="mb-8 flex flex-col gap-3">
        <h1 className="text-h2 font-heading text-fg-heading md:text-h1">Ajustes de cuenta</h1>
        <p className="text-fg-muted">
          {visibility === 'public'
            ? 'Tu perfil es público: cualquiera con el enlace puede verlo.'
            : 'Tu perfil empieza en privado: solo lo ves tú.'}
        </p>
      </header>
      <form onSubmit={onSubmit} noValidate className="flex flex-col">
        <FormSection title="Cuenta" description="Correo y nombre de usuario.">
          <Field
            label="Correo"
            htmlFor="as-email"
            hint="Para cambiarlo hará falta verificar el nuevo correo. Esa verificación llega con el backend."
          >
            <Input id="as-email" value={initial.email} disabled readOnly />
          </Field>
          <Field
            label="Nombre de usuario"
            htmlFor="as-username"
            error={usernameError}
            hint={`Tu perfil está en /u/${username}. Si lo cambias, el enlace anterior deja de funcionar.`}
          >
            <Input
              id="as-username"
              value={username}
              invalid={Boolean(usernameError)}
              autoComplete="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Field>
          <div>
            <Button type="button" variant="secondary" icon="key-round" onClick={() => setPasswordOpen(true)}>
              Cambiar contraseña
            </Button>
          </div>
        </FormSection>

        <FormSection id="privacidad" title="Privacidad" description="Tu perfil empieza en privado. Solo lo ves tú.">
          <ToggleField
            name="visibility"
            label="Perfil público"
            description="Con el interruptor encendido, cualquier persona con el enlace puede ver tu perfil."
            checked={visibility === 'public'}
            onChange={(on) => setVisibility(on ? 'public' : 'private')}
          />
          <ProfilePreview card={previewCard} visibility={visibility} />
        </FormSection>

        <FormSection title="Notificaciones" description="Te avisamos solo de lo que elijas.">
          <ToggleField
            label="Encuestas nuevas"
            description="Cuando una empresa publique una encuesta de tu interés."
            checked={notifications.surveys}
            onChange={(v) => setNotifications({ ...notifications, surveys: v })}
          />
          <ToggleField
            label="Cursos"
            description="Cuando se abra un curso de tus intereses."
            checked={notifications.courses}
            onChange={(v) => setNotifications({ ...notifications, courses: v })}
          />
          <ToggleField
            label="Novedades de empresas"
            description="Cuando una empresa de tus intereses publique algo nuevo."
            checked={notifications.companyNews}
            onChange={(v) => setNotifications({ ...notifications, companyNews: v })}
          />
        </FormSection>

        <div className="flex flex-col gap-4 border-t border-line-subtle pt-8">
          {notice ? (
            <Alert tone="info" title={notice.title}>
              {notice.text}
            </Alert>
          ) : null}
          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={pending}>
              {pending ? 'Guardando…' : 'Guardar cambios'}
            </Button>
          </div>
        </div>
      </form>

      <div className="mt-8 flex flex-col">
        <FormSection title="Sesión" description={`Estás en la demo como ${displayName}.`}>
          <form action={signOut}>
            <Button type="submit" variant="secondary" icon="log-out">
              Cerrar sesión
            </Button>
          </form>
        </FormSection>

        <FormSection title="Zona de peligro" description="Acciones que no se pueden deshacer.">
          <div>
            <Button
              type="button"
              variant="ghost"
              icon="trash-2"
              className="-ml-4"
              style={{ color: 'var(--status-danger-text)' }}
              onClick={() => setDeleteOpen(true)}
            >
              Eliminar cuenta
            </Button>
          </div>
        </FormSection>
      </div>

      <Dialog
        open={passwordOpen}
        title="Cambiar contraseña"
        description="Escribe la actual y la nueva. La nueva tiene al menos 8 caracteres."
        onClose={() => setPasswordOpen(false)}
        width={480}
        footer={
          <>
            <Button type="button" variant="ghost" onClick={() => setPasswordOpen(false)}>
              Cancelar
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setPasswordOpen(false);
                setNotice({ title: 'Simulación', text: 'No hemos cambiado tu contraseña. En la demo no se guarda ninguna.' });
              }}
            >
              Guardar contraseña
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <Field label="Contraseña actual" htmlFor="pw-current">
            <Input id="pw-current" type="password" autoComplete="current-password" />
          </Field>
          <Field label="Contraseña nueva" htmlFor="pw-new" hint="Mínimo 8 caracteres.">
            <Input id="pw-new" type="password" autoComplete="new-password" />
          </Field>
        </div>
      </Dialog>

      <Dialog
        open={deleteOpen}
        title="Eliminar tu cuenta"
        description="Se borran tu perfil, tus respuestas y tus credenciales. No se puede deshacer."
        onClose={() => setDeleteOpen(false)}
        width={480}
        footer={
          <>
            <Button type="button" variant="ghost" onClick={() => setDeleteOpen(false)}>
              Cancelar
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setDeleteOpen(false);
                setNotice({ title: 'Simulación', text: 'No hemos eliminado nada. La demo sigue igual.' });
              }}
            >
              Eliminar cuenta
            </Button>
          </>
        }
      />
    </>
  );
}
