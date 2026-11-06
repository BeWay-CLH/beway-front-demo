import Link from 'next/link';
import type { ReactNode } from 'react';
import { Alert } from '@ds';
import { CollectionView, hasCollection } from '@/components/company/CompanyCollections';
import { ExternalLink } from '@/components/company/ExternalLink';
import { ModuleView } from '@/components/company/CompanyModules';
import type { BrandRecord, SectionKind } from '@/data/fixtures/brands';
import { formatDate } from '@/lib/format';
import type { CompanyCollectionKey, CompanyDetailVM } from '@/lib/models/company';

/* Ficha corporativa de una de las 17 marcas (guía de correcciones, 03 y 10). Cuatro arquetipos de hero (photo, plate, tilt,
   field); cada marca aporta sus colores, altura, titular y fuente (data/fixtures/brands.ts). Los textos y los datos vienen
   de la ficha del paquete de Tarea 2 (DEC-060). Bloques en su orden real; el menú local puede ser otro orden. Los logos son
   placeholders (TODO(seed)). Sin compra ni pago. */

const label: Record<SectionKind, string> = {
  sobre: 'Sobre',
  curso: 'Formación',
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
  grados: 'Grados y másteres',
  recursos: 'Recursos',
};

/* De dónde sale el contenido de cada bloque (DEC-063). Sin datos: "Próximamente", sin enlace, como pide la guía.
   Oportunidades y encuestas no vienen en el paquete: van a la sección de Beway. */
type Source =
  | { kind: 'about' }
  | { kind: 'collection'; key: CompanyCollectionKey }
  | { kind: 'target'; href: string; cta: string }
  | { kind: 'empty' };

const SOURCE: Record<SectionKind, Source> = {
  sobre: { kind: 'about' },
  curso: { kind: 'collection', key: 'learning' },
  challenges: { kind: 'collection', key: 'challenges' },
  brandstorm: { kind: 'collection', key: 'challenges' },
  miniproyectos: { kind: 'collection', key: 'miniprojects' },
  embajadores: { kind: 'collection', key: 'ambassadors' },
  becas: { kind: 'collection', key: 'scholarships' },
  grados: { kind: 'collection', key: 'academicPrograms' },
  marcas: { kind: 'collection', key: 'brands' },
  herramientas: { kind: 'collection', key: 'resources' },
  servicios: { kind: 'collection', key: 'resources' },
  ecosistema: { kind: 'collection', key: 'resources' },
  tienda: { kind: 'collection', key: 'resources' },
  recursos: { kind: 'collection', key: 'resources' },
  oportunidades: { kind: 'target', href: '/talent/opportunities', cta: 'Ver oportunidades' },
  encuestas: { kind: 'target', href: '/talent/surveys', cta: 'Ver encuestas' },
  ecommerce: { kind: 'empty' },
  cierre: { kind: 'empty' },
};

/* Bloque al que lleva cada CTA de la cabecera del paquete, si la composición lo tiene (DEC-056). */
const ANCHOR_FOR: Partial<Record<CompanyCollectionKey, SectionKind[]>> = {
  learning: ['curso'],
  challenges: ['challenges'],
  miniprojects: ['miniproyectos'],
  ambassadors: ['embajadores'],
  resources: ['herramientas', 'servicios', 'ecosistema', 'tienda', 'recursos'],
  scholarships: ['becas'],
  academicPrograms: ['grados'],
  brands: ['marcas'],
};

const fontFamily = (f: 'manrope' | 'arial') => (f === 'arial' ? 'Arial, Helvetica, sans-serif' : 'var(--font-display)');
const bodyFamily = (f: 'dm' | 'arial') => (f === 'arial' ? 'Arial, Helvetica, sans-serif' : 'var(--font-body)');

/* Como mucho dos CTA extra, sin repetir bloque, y solo si el bloque existe en esta composición. */
function heroLinks(company: CompanyDetailVM, sections: SectionKind[]): { label: string; href: string }[] {
  const seen = new Set<SectionKind>();
  const out: { label: string; href: string }[] = [];
  for (const a of company.heroActions) {
    const anchor = (ANCHOR_FOR[a.section] ?? []).find((k) => sections.includes(k));
    if (!anchor || seen.has(anchor)) continue;
    seen.add(anchor);
    out.push({ label: a.label, href: `#${anchor}` });
  }
  return out.slice(0, 2);
}

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

function Hero({ brand, company }: { brand: BrandRecord; company: CompanyDetailVM }) {
  const { palette, heroHeight, h1, headingFont, bodyFont, archetype } = brand;
  const textColor = 'var(--white)';
  const extra = heroLinks(company, brand.sections);
  const copy = (
    <div className="relative z-[1] flex max-w-xl flex-col gap-5">
      <p className="m-0 text-xs font-[650] uppercase tracking-[0.14em] opacity-80" style={{ fontFamily: bodyFamily(bodyFont) }}>
        Ficha de empresa · {company.sector}
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
        {company.name}
      </h1>
      <p className="m-0 text-base leading-[1.6] opacity-90" style={{ fontFamily: bodyFamily(bodyFont) }}>
        {company.description}
      </p>
      <div className="flex flex-wrap gap-3">
        <a
          href="#sobre"
          className="inline-flex h-[42px] items-center rounded-[7px] px-[17px] text-xs font-[650]"
          style={{ background: palette.cta, color: palette.ctaText, fontFamily: bodyFamily(bodyFont) }}
        >
          Explorar {company.name}
        </a>
        {extra.map((a) => (
          <a
            key={a.href}
            href={a.href}
            className="inline-flex h-[42px] items-center rounded-[7px] border px-[17px] text-xs font-[650]"
            style={{ borderColor: 'currentColor', color: textColor, fontFamily: bodyFamily(bodyFont) }}
          >
            {a.label}
          </a>
        ))}
      </div>
    </div>
  );

  const visual = (() => {
    switch (archetype) {
      case 'plate':
        return (
          <div className="flex h-[200px] w-[300px] items-center justify-center rounded-[12px] bg-white shadow-card">
            <MarkPlaceholder name={company.name} color={palette.base} size={96} />
          </div>
        );
      case 'tilt':
        return (
          <div className="flex h-[220px] w-[280px] -rotate-6 items-center justify-center rounded-[16px] bg-white shadow-raised">
            <MarkPlaceholder name={company.name} color={palette.base} size={88} />
          </div>
        );
      case 'field':
        return (
          <span
            aria-hidden="true"
            className="select-none font-[800] opacity-[0.14]"
            style={{ fontFamily: 'var(--font-display)', fontSize: 360, lineHeight: 1, color: 'var(--white)' }}
          >
            {company.name[0]}
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

function Section({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-[120px] border-t border-line-subtle px-6 py-12 md:px-12">
      <div className="mx-auto flex max-w-site flex-col gap-6">{children}</div>
    </section>
  );
}

function Block({ company, kind }: { company: CompanyDetailVM; kind: SectionKind }) {
  const src = SOURCE[kind];

  if (src.kind === 'about') {
    const summary = company.modules.find((m) => m.kind === 'summary');
    return (
      <Section id={kind}>
        <h2 className="font-heading text-h3 text-fg-heading">Sobre {company.name}</h2>
        {summary ? <ModuleView module={summary} /> : null}
        {company.website ? <ExternalLink href={company.website}>Sitio web oficial de {company.name}</ExternalLink> : null}
      </Section>
    );
  }

  if (src.kind === 'collection' && hasCollection(company.collections, src.key)) {
    return (
      <Section id={kind}>
        <CollectionView kind={src.key} collections={company.collections} heading={label[kind]} label={label[kind]} />
      </Section>
    );
  }

  const target = src.kind === 'target' ? src : undefined;
  return (
    <Section id={kind}>
      <div className="flex flex-col gap-4">
        <h2 className="m-0 font-heading text-h3 text-fg-heading">{label[kind]}</h2>
        <p className="m-0 max-w-2xl text-fg-muted">{target ? 'Lo verás en la sección correspondiente de Beway.' : 'Próximamente.'}</p>
        {target ? (
          <div>
            <Link href={target.href} className="inline-flex h-[42px] items-center rounded-control border border-line-control bg-surface-card px-[17px] text-xs font-[650] text-fg-body hover:bg-surface-sunken">
              {target.cta}
            </Link>
          </div>
        ) : null}
      </div>
    </Section>
  );
}

export function BrandPage({ brand, company }: { brand: BrandRecord; company: CompanyDetailVM }) {
  const menu = (brand.localMenu ?? brand.sections).filter((k) => brand.sections.includes(k));
  return (
    <div className="flex flex-col">
      <Hero brand={brand} company={company} />
      {company.notices.length > 0 ? (
        <div className="mx-auto w-full max-w-site px-6 pt-6 md:px-12">
          <Alert tone="info" title="Datos a confirmar">
            {company.notices.map((n, i) => (
              <p key={i}>{n}</p>
            ))}
          </Alert>
        </div>
      ) : null}
      <nav aria-label={`Secciones de ${company.name}`} className="border-b border-line-subtle bg-surface-card">
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
          <Block key={k} company={company} kind={k} />
        ))}
      </div>
      <p className="m-0 px-6 py-6 text-center text-xs text-fg-muted md:px-12">
        Datos de la ficha de contenido, revisados el {formatDate(company.lastReviewedAt)}. Convocatorias, becas, precios y
        personas: confírmalos en la fuente antes de decidir. Los nombres son los autorizados por cada empresa.
      </p>
    </div>
  );
}
