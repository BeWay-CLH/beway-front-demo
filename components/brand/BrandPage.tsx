import Link from 'next/link';
import type { Archetype, BrandRecord, SectionKind } from '@/data/fixtures/brands';

/* Ficha corporativa de una de las 17 marcas (guía de correcciones, 03 y 10). Cuatro arquetipos de hero
   (photo, plate, tilt, field); cada marca aporta sus colores, altura, titular y fuente. Bloques en su orden real;
   el menú local (anclas) puede ser otro orden. Los logos son placeholders (TODO(seed)). Sin compra ni pago. */

const label: Record<SectionKind, string> = {
  sobre: 'Sobre',
  curso: 'Certificaciones',
  challenges: 'Challenges',
  miniproyectos: 'Miniproyectos',
  oportunidades: 'Oportunidades profesionales',
  encuestas: 'Encuestas',
  embajadores: 'Embajadores',
  ecommerce: 'Ecommerce',
  servicios: 'Servicios',
  herramientas: 'Herramientas',
  becas: 'Becas y ventajas',
  cierre: 'Cierre',
  tienda: 'Tienda',
  ecosistema: 'Ecosistema',
  marcas: 'Sus marcas',
  brandstorm: 'Brandstorm',
};

/* Destinos que la app ya tiene. Lo demás muestra "Próximamente" y no lleva enlace. */
const target: Partial<Record<SectionKind, { href: string; cta: string }>> = {
  curso: { href: '/talent/courses', cta: 'Ver certificaciones' },
  challenges: { href: '/talent/challenges', cta: 'Ver challenges' },
  miniproyectos: { href: '/talent/miniprojects', cta: 'Ver miniproyectos' },
  oportunidades: { href: '/talent/opportunities', cta: 'Ver oportunidades' },
  encuestas: { href: '/talent/surveys', cta: 'Ver encuestas' },
};

const fontFamily = (f: 'manrope' | 'arial') => (f === 'arial' ? 'Arial, Helvetica, sans-serif' : 'var(--font-display)');
const bodyFamily = (f: 'dm' | 'arial') => (f === 'arial' ? 'Arial, Helvetica, sans-serif' : 'var(--font-body)');

/* Marca de placeholder: la inicial sobre el color base de la ficha, como pide la guía (00, Logos y portadas). */
function MarkPlaceholder({ name, color, size }: { name: string; color: string; size: number }) {
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size, background: color, color: 'var(--white)', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: size * 0.42 }}
      className="inline-flex items-center justify-center rounded-[12px]"
    >
      {name[0]}
    </span>
  );
}

function Hero({ brand }: { brand: BrandRecord }) {
  const { palette, heroHeight, h1, headingFont, bodyFont, archetype } = brand;
  const textColor = 'var(--white)';
  const copy = (
    <div className="relative z-[1] flex max-w-xl flex-col gap-5">
      <p className="m-0 text-xs font-[650] uppercase tracking-[0.14em] opacity-80" style={{ fontFamily: bodyFamily(bodyFont) }}>
        Ficha de ejemplo · {brand.sector}
      </p>
      <h1
        className="m-0"
        style={{
          color: 'var(--white)',
          fontFamily: fontFamily(headingFont),
          fontSize: h1.size,
          lineHeight: `${h1.lineHeight}px`,
          fontWeight: h1.weight,
          letterSpacing: '-0.02em',
        }}
      >
        {brand.name}
      </h1>
      <p className="m-0 text-base leading-[1.6] opacity-90" style={{ fontFamily: bodyFamily(bodyFont) }}>
        {brand.description}
      </p>
      <div>
        <a
          href="#sobre"
          className="inline-flex h-[42px] items-center rounded-[7px] px-[17px] text-xs font-[650]"
          style={{ background: palette.cta, color: palette.ctaText, fontFamily: bodyFamily(bodyFont) }}
        >
          Explorar {brand.name}
        </a>
      </div>
    </div>
  );

  const visual = (() => {
    switch (archetype) {
      case 'plate':
        return (
          <div className="flex h-[200px] w-[300px] items-center justify-center rounded-[12px] bg-white shadow-card">
            <MarkPlaceholder name={brand.name} color={palette.base} size={96} />
          </div>
        );
      case 'tilt':
        return (
          <div className="flex h-[220px] w-[280px] -rotate-6 items-center justify-center rounded-[16px] bg-white shadow-raised">
            <MarkPlaceholder name={brand.name} color={palette.base} size={88} />
          </div>
        );
      case 'field':
        return (
          <span
            aria-hidden="true"
            className="select-none font-[800] opacity-[0.14]"
            style={{ fontFamily: 'var(--font-display)', fontSize: 360, lineHeight: 1, color: 'var(--white)' }}
          >
            {brand.name[0]}
          </span>
        );
      case 'photo':
      default:
        return (
          <div
            aria-hidden="true"
            className="min-h-[360px] w-full rounded-[12px]"
            style={{ background: `linear-gradient(135deg, ${palette.base} 0%, var(--brand-navy) 100%)` }}
          />
        );
    }
  })();

  return (
    <section
      className="relative flex items-center overflow-hidden"
      style={{ background: palette.base, color: textColor, minHeight: heroHeight }}
    >
      <div className="mx-auto grid w-full max-w-site grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-2 md:px-12">
        {copy}
        <div className="relative flex min-h-[220px] items-center justify-center">{visual}</div>
      </div>
      {archetype === 'tilt' ? <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-[42%] md:block" style={{ background: 'rgba(255,255,255,0.04)' }} /> : null}
    </section>
  );
}

function Block({ brand, kind }: { brand: BrandRecord; kind: SectionKind }) {
  const t = target[kind];
  const body =
    kind === 'sobre'
      ? brand.description
      : t
        ? 'Lo verás en la sección correspondiente de Beway.'
        : 'Próximamente.';
  return (
    <section id={kind} className="scroll-mt-[120px] border-t border-line-subtle px-6 py-12 md:px-12">
      <div className="mx-auto flex max-w-site flex-col gap-4">
        <h2 className="m-0 font-heading text-[26px] leading-[1.25] font-[600] text-fg-heading">
          {kind === 'sobre' ? `Sobre ${brand.name}` : label[kind]}
        </h2>
        <p className="m-0 max-w-2xl text-fg-muted">{body}</p>
        {t ? (
          <div>
            <Link href={t.href} className="inline-flex h-[42px] items-center rounded-control border border-line-control bg-surface-card px-[17px] text-xs font-[650] text-fg-body hover:bg-surface-sunken">
              {t.cta}
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function BrandPage({ brand }: { brand: BrandRecord }) {
  const menu = brand.localMenu ?? brand.sections;
  return (
    <div className="flex flex-col">
      <Hero brand={brand} />
      <nav aria-label={`Secciones de ${brand.name}`} className="border-b border-line-subtle bg-surface-card">
        <ul className="mx-auto flex max-w-site gap-5 overflow-x-auto whitespace-nowrap px-6 py-3 text-xs font-[550] text-fg-muted md:px-12">
          {menu.map((k) => (
            <li key={k}>
              <a href={`#${k}`} className="hover:text-fg-heading">{label[k]}</a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex flex-col">
        {brand.sections.map((k) => (
          <Block key={k} brand={brand} kind={k} />
        ))}
      </div>
      <p className="m-0 px-6 py-6 text-center text-xs text-fg-muted md:px-12">
        Ficha de ejemplo. Los nombres son autorizados; las cifras, cursos y personas son de ejemplo.
      </p>
    </div>
  );
}
