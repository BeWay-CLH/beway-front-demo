import Link from 'next/link';
import { Alert, Breadcrumbs, Icon, Photo } from '@ds';
import { NavButton } from '@/components/NavButton';
import { PageState } from '@/components/PageState';
import { formatCount, formatDate } from '@/lib/format';
import type { CompanyDetailVM } from '@/lib/models/company';
import { COLLECTION_ORDER, hasCollection } from './CompanyCollections';
import { CompanyTabs } from './CompanyTabs';
import { FollowButton } from './FollowButton';

/* Ficha canónica de empresa (C-02). Banner con el logo en chip blanco (nunca suelto sobre la foto), título debajo,
   cifras, pestañas por módulo y una nota sobre el origen de los datos. Ningún texto va sobre la foto: así el contraste
   no depende de lo que haya detrás. Sin auditoría interna ni estado editorial (decisión 13). */
export function CompanyProfile({
  company,
  userId,
  homeHref,
  initialTab,
}: {
  company: CompanyDetailVM;
  userId?: string;
  homeHref: string;
  initialTab?: string;
}) {
  const hasModules = company.modules.length > 0;
  const hasPackage = COLLECTION_ORDER.some((k) => hasCollection(company.collections, k));
  const notices = company.notices;

  return (
    <div className="mx-auto flex w-full max-w-site flex-col gap-6 px-4 py-6 md:px-6 md:py-8">
      <Breadcrumbs
        aria-label="Ruta de navegación"
        items={[{ label: 'Inicio', href: homeHref }, { label: 'Empresas', href: '/companies' }, { label: company.name }]}
      />

      <header className="flex flex-col">
        <div className="relative">
          <Photo
            src={company.cover}
            alt=""
            overlay={company.cover ? 'hero' : 'none'}
            height="clamp(112px, 16vw, 176px)"
            radius="var(--radius-lg)"
          />
          <span className="absolute -bottom-10 left-5 flex size-20 items-center justify-center overflow-hidden rounded-card border border-line-subtle bg-white shadow-card md:left-8">
            {company.logo ? (
              <img src={company.logo} alt={`Logotipo de ${company.name}`} className="max-h-[78%] max-w-[78%] object-contain" />
            ) : (
              <span aria-hidden="true" className="font-heading text-h2 text-brand-dark">{company.name[0]}</span>
            )}
          </span>
        </div>

        <div className="flex flex-col gap-5 px-5 pt-14 md:flex-row md:items-start md:justify-between md:gap-8 md:px-8">
          <div className="flex min-w-0 flex-col gap-3">
            <div className="flex flex-col gap-1">
              <h1 className="text-h2 font-heading text-fg-heading md:text-h1">{company.name}</h1>
              <p className="flex items-center gap-2 text-sm text-fg-muted">
                <Icon name={company.categoryIcon} size={16} />
                {company.category}
              </p>
            </div>
            <p className="max-w-[68ch] text-fg-body">{company.description}</p>
          </div>
          <div className="flex-none">
            <FollowButton companyId={company.id} companyName={company.name} userId={userId} initialFollowing={company.isFollowing} />
          </div>
        </div>
      </header>

      {company.isStale ? (
        <Alert tone="warning" title="Información pendiente de revisión">
          Esta ficha se revisó por última vez el {formatDate(company.lastReviewedAt)}. Puede que algunos datos hayan cambiado.
        </Alert>
      ) : null}

      {notices.length > 0 ? (
        <Alert tone="info" title="Datos a confirmar">
          {notices.map((n, i) => (
            <p key={i}>{n}</p>
          ))}
        </Alert>
      ) : null}

      {company.stats.length > 0 ? (
        <dl className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {company.stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-2 rounded-card border border-line-subtle bg-surface-card p-5">
              <dt className="flex items-center gap-2 text-sm text-fg-muted">
                <Icon name={s.icon} size={16} />
                {s.label}
              </dt>
              <dd className="font-heading text-h2 tabular-nums text-fg-heading">{formatCount(s.value)}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      {hasModules || hasPackage ? (
        <CompanyTabs
          modules={company.modules}
          sources={company.sources}
          collections={company.collections}
          sectionHeadings={company.sectionHeadings}
          heroActions={company.heroActions}
          initialTab={initialTab}
        />
      ) : (
        <PageState
          kind="empty"
          title="Esta ficha todavía no tiene contenido"
          description="Estamos preparándola. Mientras tanto, puedes explorar otras empresas del ecosistema."
          action={
            <NavButton href="/companies" variant="secondary" icon="building-2">
              Ver empresas
            </NavButton>
          }
        />
      )}

      <aside aria-label="Sobre esta ficha" className="flex flex-col gap-2 border-t border-line-subtle pt-6 text-sm text-fg-muted">
        <p>
          Última revisión: {formatDate(company.lastReviewedAt)}. Reunimos esta información de fuentes públicas. Si algo no es
          correcto,{' '}
          <Link href="/contact" className="text-link underline hover:text-link-hover">
            escríbenos
          </Link>
          .
        </p>
        <p>Si sigues a una empresa, verás sus encuestas en tu espacio.</p>
        <p>Textos provisionales, pendientes de revisión legal.</p>
      </aside>
    </div>
  );
}
