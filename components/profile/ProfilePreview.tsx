import { Avatar, Tag } from '@ds';
import type { ProfileCardVM, ProfileVisibility } from '@/lib/models/profile';

/* Lo que ve alguien con el enlace. Cambia en vivo con el interruptor de visibilidad: es la pieza
   propia de BeWay, la decisión de privacidad hecha visible (DESIGN.md, "Cara del producto"). */
export function ProfilePreview({ card, visibility }: { card: ProfileCardVM | null; visibility: ProfileVisibility }) {
  const isPublic = visibility === 'public' && card !== null;
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-semibold text-fg-heading">Así lo ve alguien con el enlace</p>
      <div aria-live="polite" className="rounded-card border border-line-subtle bg-surface-sunken p-5">
        {isPublic ? (
          <div className="flex items-start gap-4">
            <Avatar name={card.displayName} size={48} />
            <div className="flex min-w-0 flex-col gap-1">
              <span className="font-heading text-h3 text-fg-heading">{card.displayName}</span>
              {card.headline ? <span className="text-sm text-fg-body">{card.headline}</span> : null}
              {card.interests.length > 0 ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {card.interests.map((interest) => (
                    <Tag key={interest}>{interest}</Tag>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <p className="text-sm text-fg-muted">
            Con el perfil en privado, quien abra el enlace solo verá que el perfil es privado.
          </p>
        )}
      </div>
    </div>
  );
}
