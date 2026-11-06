import Link from 'next/link';
import { Button, Icon } from '@ds';
import { CompanyGrid } from '@/components/company/CompanyGrid';
import { partnerLogos } from '@/data/mock';
import { getSession } from '@/lib/session';
import { getCompanies, getFollowingIds } from '@/lib/services/companies';

/* Bienvenida (guía de correcciones, ficha 02 y cierre de la 40). Orden de la referencia: hero navy de dos columnas,
   mosaico de marcas, arranque del directorio real y tres caminos antes del pie. Los logos son placeholders
   (TODO(seed)): sin archivos oficiales en el repo (decisión D7). */

const paths = [
  { title: 'Aprende con certificaciones.', href: '/talent/courses', icon: 'graduation-cap' },
  { title: 'Demuestra con proyectos.', href: '/talent/miniprojects', icon: 'folder-kanban' },
  { title: 'Acércate a tu próximo empleo.', href: '/talent/opportunities', icon: 'briefcase' },
];

export default async function Home() {
  const session = await getSession();
  const [directory, followingIds] = await Promise.all([
    getCompanies({ page: 1, pageSize: 6 }),
    getFollowingIds(session?.userId),
  ]);

  return (
    <div className="mx-auto flex w-full max-w-site flex-col gap-14 pt-6 pb-16">
      <section className="mx-[15px] grid min-h-[330px] items-center gap-8 rounded-[14px] bg-surface-inverse px-7 py-10 md:mx-8 md:grid-cols-[1.45fr_1fr] md:px-12">
        <div className="flex flex-col gap-6">
          <h1 className="m-0 font-heading text-[35px] leading-[1.15] font-[700] text-white md:text-[50px] md:leading-[56px] md:[letter-spacing:-2.75px]">
            Conecta con las empresas <span className="text-link-on-inverse">que construyen tu futuro.</span>
          </h1>
          <p className="m-0 max-w-xl text-base leading-[1.6] text-white/80">
            Aprende cómo trabajan, demuestra lo que puedes aportar y encuentra tu próxima oportunidad.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="#directorio" variant="secondary" onInverse iconAfter="arrow-down">Explorar empresas</Button>
            <Button href="/signup" variant="outline" onInverse>Construir mi perfil</Button>
          </div>
        </div>
        <div aria-hidden="true" className="mx-auto grid w-full max-w-sm grid-cols-3 gap-3 -rotate-6">
          {partnerLogos.map((logo) => (
            <div
              key={logo.alt}
              className="flex h-[85px] items-center justify-center rounded-[10px] bg-brand-navy font-heading text-lg font-[800] text-white"
            >
              {/* TODO(seed): logo oficial de la marca; por ahora, la inicial sobre el color base. */}
              {logo.alt[0]}
            </div>
          ))}
        </div>
      </section>

      <section id="directorio" className="scroll-mt-40 flex flex-col gap-6 px-4 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="m-0 font-heading text-[26px] leading-[1.25] font-[600] text-fg-heading [letter-spacing:var(--tracking-h2)]">
            Empresas del ecosistema
          </h2>
          <Link href="/companies" className="text-sm font-[650] text-fg-accent">
            Ver todas las empresas
          </Link>
        </div>
        <CompanyGrid items={directory.items} followingIds={followingIds} userId={session?.userId} />
      </section>

      <section className="flex flex-col gap-6 px-4 md:px-8">
        <div className="flex flex-col gap-2">
          <p className="eyebrow m-0 text-fg-muted uppercase">De la curiosidad a la experiencia</p>
          <h2 className="m-0 font-heading text-[26px] leading-[1.25] font-[600] text-fg-heading [letter-spacing:var(--tracking-h2)]">
            Elige cómo empezar.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {paths.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="flex items-center justify-between gap-4 rounded-card border border-line-subtle bg-surface-card p-6 transition-control hover:bg-surface-sunken"
            >
              <span className="flex items-center gap-4">
                <span className="text-fg-accent"><Icon name={p.icon} size={22} /></span>
                <span className="font-heading text-lg font-[600] text-fg-heading">{p.title}</span>
              </span>
              <Icon name="arrow-right" size={18} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
