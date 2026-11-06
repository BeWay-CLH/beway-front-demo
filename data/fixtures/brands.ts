/* Composición de las 17 fichas corporativas (guía de correcciones, 03 y anexo 17). Solo es diseño: arquetipo de hero, colores,
   altura, titular, fuentes y orden de bloques. Los textos y los datos de cada ficha vienen del paquete de Tarea 2
   (`data/seed/`, DEC-060). El nombre se conserva porque retos, oportunidades y cursos lo usan para mostrar al proveedor. */

export type Archetype = 'photo' | 'plate' | 'tilt' | 'field';

/* Bloques de una ficha. Los de recursos (`herramientas`, `servicios`, `ecosistema`, `tienda`) muestran los enlaces de la
   empresa; `recursos` se añade cuando la composición no tiene ninguno de ellos (DEC-062). */
export type SectionKind =
  | 'sobre' | 'curso' | 'challenges' | 'miniproyectos' | 'oportunidades' | 'encuestas' | 'embajadores'
  | 'ecommerce' | 'servicios' | 'herramientas' | 'becas' | 'cierre' | 'tienda' | 'ecosistema' | 'marcas' | 'brandstorm'
  | 'grados' | 'recursos';

export type BrandRecord = {
  slug: string;
  /* Nombre para mostrar. Lo usan también los retos, las oportunidades y los cursos (DEC-061). */
  name: string;
  archetype: Archetype;
  palette: { base: string; cta: string; ctaText: string };
  heroHeight: number;
  h1: { size: number; lineHeight: number; weight: number };
  /* Arial para McGraw Hill y SILBON según 03; el resto, Manrope en titulares y DM Sans en cuerpo. */
  headingFont: 'manrope' | 'arial';
  bodyFont: 'dm' | 'arial';
  /* Orden real de los bloques (no el del menú). */
  sections: SectionKind[];
  /* Orden del menú local (anclas bajo el hero). Si no se indica, es el mismo que el real. */
  localMenu?: SectionKind[];
};

const common: SectionKind[] = ['sobre', 'curso', 'challenges', 'miniproyectos', 'oportunidades', 'encuestas', 'embajadores'];
const menuCommon: SectionKind[] = ['sobre', 'curso', 'challenges', 'miniproyectos', 'embajadores', 'ecommerce', 'oportunidades', 'encuestas', 'recursos'];

export const brands: BrandRecord[] = [
  {
    slug: 'instituto-bme', name: 'Instituto BME',
    archetype: 'photo', palette: { base: '#07182F', cta: '#0751A0', ctaText: '#FFFFFF' }, heroHeight: 592,
    h1: { size: 68, lineHeight: 72.76, weight: 800 }, headingFont: 'manrope', bodyFont: 'dm',
    sections: [...common, 'ecommerce', 'recursos'],
    localMenu: menuCommon,
  },
  {
    slug: 'mcgraw-hill', name: 'McGraw Hill',
    archetype: 'plate', palette: { base: '#0D0D10', cta: '#E51620', ctaText: '#FFFFFF' }, heroHeight: 550,
    h1: { size: 64, lineHeight: 68.48, weight: 800 }, headingFont: 'arial', bodyFont: 'arial',
    sections: [...common, 'ecommerce', 'recursos'],
    localMenu: menuCommon,
  },
  {
    slug: 'garrigues', name: 'Centro de Estudios Garrigues',
    archetype: 'photo', palette: { base: '#111B22', cta: '#E8E0D3', ctaText: '#111B22' }, heroHeight: 599,
    h1: { size: 64, lineHeight: 68.48, weight: 800 }, headingFont: 'manrope', bodyFont: 'dm',
    sections: ['sobre', 'curso', 'challenges', 'oportunidades', 'encuestas', 'embajadores', 'grados', 'recursos'],
    localMenu: ['sobre', 'curso', 'challenges', 'grados', 'embajadores', 'oportunidades', 'encuestas', 'recursos'],
  },
  {
    slug: 'google', name: 'Google',
    archetype: 'plate', palette: { base: '#101114', cta: '#1A73E8', ctaText: '#FFFFFF' }, heroHeight: 560,
    h1: { size: 44, lineHeight: 51.04, weight: 800 }, headingFont: 'manrope', bodyFont: 'dm',
    sections: [...common, 'herramientas'],
    localMenu: menuCommon,
  },
  {
    slug: 'ibm', name: 'IBM',
    archetype: 'field', palette: { base: '#001141', cta: '#0F62FE', ctaText: '#FFFFFF' }, heroHeight: 611,
    h1: { size: 59, lineHeight: 64.31, weight: 800 }, headingFont: 'manrope', bodyFont: 'dm',
    sections: [...common, 'cierre', 'recursos'],
    localMenu: ['sobre', 'curso', 'challenges', 'miniproyectos', 'embajadores', 'ecosistema', 'oportunidades', 'encuestas'],
  },
  {
    slug: 'auren', name: 'Auren',
    archetype: 'plate', palette: { base: '#0D0D10', cta: '#E2231A', ctaText: '#FFFFFF' }, heroHeight: 550,
    h1: { size: 64, lineHeight: 68.48, weight: 800 }, headingFont: 'manrope', bodyFont: 'dm',
    sections: [...common, 'servicios'],
  },
  {
    slug: 'pwc', name: 'PwC',
    archetype: 'plate', palette: { base: '#151515', cta: '#FD5108', ctaText: '#FFFFFF' }, heroHeight: 580,
    h1: { size: 62, lineHeight: 66.34, weight: 800 }, headingFont: 'manrope', bodyFont: 'dm',
    sections: [...common, 'servicios'],
  },
  {
    slug: 'deloitte', name: 'Deloitte',
    archetype: 'field', palette: { base: '#101410', cta: '#86BC25', ctaText: '#101410' }, heroHeight: 590,
    h1: { size: 63, lineHeight: 67.02, weight: 800 }, headingFont: 'manrope', bodyFont: 'dm',
    sections: [...common, 'servicios'],
  },
  {
    slug: 'santander', name: 'Banco Santander',
    archetype: 'tilt', palette: { base: '#141519', cta: '#EC0000', ctaText: '#FFFFFF' }, heroHeight: 558,
    h1: { size: 63, lineHeight: 68.67, weight: 800 }, headingFont: 'manrope', bodyFont: 'dm',
    sections: ['sobre', 'curso', 'challenges', 'oportunidades', 'encuestas', 'embajadores', 'becas', 'recursos'],
  },
  {
    slug: 'revolut', name: 'Revolut',
    archetype: 'tilt', palette: { base: '#070B15', cta: '#1652F0', ctaText: '#FFFFFF' }, heroHeight: 605,
    h1: { size: 68, lineHeight: 71.74, weight: 800 }, headingFont: 'manrope', bodyFont: 'dm',
    sections: [...common, 'servicios'],
  },
  {
    slug: 'loreal', name: "L'Oréal",
    archetype: 'photo', palette: { base: '#161616', cta: '#FFFFFF', ctaText: '#161616' }, heroHeight: 600,
    h1: { size: 64, lineHeight: 69.76, weight: 750 }, headingFont: 'manrope', bodyFont: 'dm',
    sections: ['sobre', 'curso', 'brandstorm', 'miniproyectos', 'oportunidades', 'encuestas', 'embajadores', 'marcas'],
    localMenu: ['sobre', 'curso', 'brandstorm', 'miniproyectos', 'embajadores', 'marcas', 'oportunidades', 'encuestas'],
  },
  {
    slug: 'mckinsey', name: 'McKinsey & Company',
    archetype: 'plate', palette: { base: '#051C2C', cta: '#2251FF', ctaText: '#FFFFFF' }, heroHeight: 624,
    h1: { size: 65, lineHeight: 69.98, weight: 800 }, headingFont: 'manrope', bodyFont: 'dm',
    sections: [...common, 'ecosistema'],
  },
  {
    slug: 'netflix', name: 'Netflix',
    archetype: 'plate', palette: { base: '#0D0D10', cta: '#E50914', ctaText: '#FFFFFF' }, heroHeight: 565,
    h1: { size: 61, lineHeight: 65.27, weight: 800 }, headingFont: 'manrope', bodyFont: 'dm',
    sections: [...common, 'ecommerce', 'recursos'],
    localMenu: menuCommon,
  },
  {
    slug: 'silbon', name: 'SILBON',
    archetype: 'photo', palette: { base: '#102638', cta: '#FFFFFF', ctaText: '#102638' }, heroHeight: 640,
    h1: { size: 68, lineHeight: 72.08, weight: 800 }, headingFont: 'manrope', bodyFont: 'dm',
    sections: [...common, 'tienda'],
  },
  {
    slug: 'atresmedia', name: 'Atresmedia',
    archetype: 'tilt', palette: { base: '#111B23', cta: '#72D9DF', ctaText: '#111B23' }, heroHeight: 586,
    h1: { size: 62, lineHeight: 65.64, weight: 800 }, headingFont: 'manrope', bodyFont: 'dm',
    sections: [...common, 'ecosistema'],
  },
  {
    slug: 'heineken', name: 'HEINEKEN',
    archetype: 'photo', palette: { base: '#002718', cta: '#C3ED9F', ctaText: '#002718' }, heroHeight: 570,
    h1: { size: 65, lineHeight: 69.34, weight: 700 }, headingFont: 'manrope', bodyFont: 'dm',
    sections: [...common, 'servicios', 'cierre'],
  },
  {
    slug: 'mapfre', name: 'Mapfre',
    archetype: 'photo', palette: { base: '#211317', cta: '#FF002D', ctaText: '#FFFFFF' }, heroHeight: 590,
    h1: { size: 63, lineHeight: 67.65, weight: 800 }, headingFont: 'manrope', bodyFont: 'dm',
    sections: [...common, 'servicios'],
  },
];

export const brandBySlug = (slug: string) => brands.find((b) => b.slug === slug);
