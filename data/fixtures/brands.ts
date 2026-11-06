/* FICTICIO. Las 17 fichas corporativas de la guía de correcciones (03, anexo). Nombres autorizados por las empresas
   (decisión D7). Textos, cifras, cursos y personas son de ejemplo: la demo los rotula "Datos de ejemplo".
   Los logos y portadas no están en el repo: son placeholders con el color base de la ficha (TODO(seed)).
   Cada ficha usa uno de cuatro arquetipos de composición (photo, plate, tilt, field) con sus propios colores,
   altura de hero, tamaño de titular, fuente y orden de bloques. Valores tomados del anexo de la guía. */

import type { CompanyModuleItemVM, CompanyModuleVM, CompanyRecord, CompanyStatVM, SourceVM } from '@/lib/models/company';
import { logo } from './logo';

export type Archetype = 'photo' | 'plate' | 'tilt' | 'field';

/* Secciones corporativas. Cada una tiene un destino real si la app ya lo tiene; el resto muestra "Próximamente". */
export type SectionKind =
  | 'sobre' | 'curso' | 'challenges' | 'miniproyectos' | 'oportunidades' | 'encuestas' | 'embajadores'
  | 'ecommerce' | 'servicios' | 'herramientas' | 'becas' | 'cierre' | 'tienda' | 'ecosistema' | 'marcas' | 'brandstorm';

export type BrandRecord = {
  slug: string;
  name: string;
  sector: string;
  description: string;
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

export const brands: BrandRecord[] = [
  {
    slug: 'instituto-bme', name: 'Instituto BME', sector: 'Mercados financieros y formación',
    description: 'Formación sobre mercados financieros, con un curso asíncrono y retos internos para practicar.',
    archetype: 'photo', palette: { base: '#07182F', cta: '#0751A0', ctaText: '#FFFFFF' }, heroHeight: 592,
    h1: { size: 68, lineHeight: 72.76, weight: 800 }, headingFont: 'manrope', bodyFont: 'dm',
    sections: [...common, 'ecommerce'],
    localMenu: ['sobre', 'curso', 'challenges', 'miniproyectos', 'embajadores', 'ecommerce', 'oportunidades', 'encuestas'],
  },
  {
    slug: 'mcgraw-hill', name: 'McGraw Hill', sector: 'Educación y editorial',
    description: 'Editorial educativa que propone retos y proyectos sobre su catálogo de materiales.',
    archetype: 'plate', palette: { base: '#0D0D10', cta: '#E51620', ctaText: '#FFFFFF' }, heroHeight: 550,
    h1: { size: 64, lineHeight: 68.48, weight: 800 }, headingFont: 'arial', bodyFont: 'arial',
    sections: [...common, 'ecommerce'],
    localMenu: ['sobre', 'curso', 'challenges', 'miniproyectos', 'embajadores', 'ecommerce', 'oportunidades', 'encuestas'],
  },
  {
    slug: 'garrigues', name: 'Centro de Estudios Garrigues', sector: 'Derecho y formación',
    description: 'Cuatro cursos y un caso jurídico para practicar. Grados y másteres.',
    archetype: 'photo', palette: { base: '#111B22', cta: '#E8E0D3', ctaText: '#111B22' }, heroHeight: 599,
    h1: { size: 64, lineHeight: 68.48, weight: 800 }, headingFont: 'manrope', bodyFont: 'dm',
    sections: ['sobre', 'curso', 'challenges', 'oportunidades', 'encuestas', 'embajadores', 'ecommerce'],
    localMenu: ['sobre', 'curso', 'challenges', 'embajadores', 'ecommerce', 'oportunidades', 'encuestas'],
  },
  {
    slug: 'google', name: 'Google', sector: 'Tecnología',
    description: 'Herramientas y un flash challenge de 72 horas para equipos que quieren aprender haciendo.',
    archetype: 'plate', palette: { base: '#101114', cta: '#1A73E8', ctaText: '#FFFFFF' }, heroHeight: 560,
    h1: { size: 44, lineHeight: 51.04, weight: 800 }, headingFont: 'manrope', bodyFont: 'dm',
    sections: [...common, 'herramientas'],
    localMenu: ['sobre', 'curso', 'challenges', 'miniproyectos', 'embajadores', 'ecommerce', 'oportunidades', 'encuestas'],
  },
  {
    slug: 'ibm', name: 'IBM', sector: 'Consultoría tecnológica',
    description: 'Consultoría tecnológica con hackathons de watsonx y proyectos con la comunidad.',
    archetype: 'field', palette: { base: '#001141', cta: '#0F62FE', ctaText: '#FFFFFF' }, heroHeight: 611,
    h1: { size: 59, lineHeight: 64.31, weight: 800 }, headingFont: 'manrope', bodyFont: 'dm',
    sections: [...common, 'cierre'],
    localMenu: ['sobre', 'curso', 'challenges', 'miniproyectos', 'embajadores', 'ecosistema', 'oportunidades', 'encuestas'],
  },
  {
    slug: 'auren', name: 'Auren', sector: 'Auditoría y consultoría',
    description: 'Auditoría, consultoría y experiencias prácticas para descubrir el mundo profesional.',
    archetype: 'plate', palette: { base: '#0D0D10', cta: '#E2231A', ctaText: '#FFFFFF' }, heroHeight: 550,
    h1: { size: 64, lineHeight: 68.48, weight: 800 }, headingFont: 'manrope', bodyFont: 'dm',
    sections: [...common, 'servicios'],
  },
  {
    slug: 'pwc', name: 'PwC', sector: 'Auditoría y servicios profesionales',
    description: 'Un challenge y varios miniproyectos sobre análisis financiero y de datos.',
    archetype: 'plate', palette: { base: '#151515', cta: '#FD5108', ctaText: '#FFFFFF' }, heroHeight: 580,
    h1: { size: 62, lineHeight: 66.34, weight: 800 }, headingFont: 'manrope', bodyFont: 'dm',
    sections: [...common, 'servicios'],
  },
  {
    slug: 'deloitte', name: 'Deloitte', sector: 'Auditoría financiera y servicios profesionales',
    description: 'Auditoría financiera, un challenge financiero y miniproyectos con servicios de la firma.',
    archetype: 'field', palette: { base: '#101410', cta: '#86BC25', ctaText: '#101410' }, heroHeight: 590,
    h1: { size: 63, lineHeight: 67.02, weight: 800 }, headingFont: 'manrope', bodyFont: 'dm',
    sections: [...common, 'servicios'],
  },
  {
    slug: 'santander', name: 'Banco Santander', sector: 'Banca',
    description: 'Challenge Openbank y becas y ventajas para personas con perfil financiero.',
    archetype: 'tilt', palette: { base: '#141519', cta: '#EC0000', ctaText: '#FFFFFF' }, heroHeight: 558,
    h1: { size: 63, lineHeight: 68.67, weight: 800 }, headingFont: 'manrope', bodyFont: 'dm',
    sections: ['sobre', 'curso', 'challenges', 'oportunidades', 'encuestas', 'embajadores', 'becas'],
  },
  {
    slug: 'revolut', name: 'Revolut', sector: 'Banca digital y tecnología financiera',
    description: 'Campus challenge y tres miniproyectos de banca digital.',
    archetype: 'tilt', palette: { base: '#070B15', cta: '#1652F0', ctaText: '#FFFFFF' }, heroHeight: 605,
    h1: { size: 68, lineHeight: 71.74, weight: 800 }, headingFont: 'manrope', bodyFont: 'dm',
    sections: [...common, 'servicios'],
  },
  {
    slug: 'loreal', name: "L'Oréal", sector: 'Belleza y cosmética',
    description: 'Brandstorm, miniproyectos y embajadoras sobre las marcas del grupo.',
    archetype: 'photo', palette: { base: '#161616', cta: '#FFFFFF', ctaText: '#161616' }, heroHeight: 600,
    h1: { size: 64, lineHeight: 69.76, weight: 750 }, headingFont: 'manrope', bodyFont: 'dm',
    sections: ['sobre', 'curso', 'brandstorm', 'miniproyectos', 'oportunidades', 'encuestas', 'embajadores', 'marcas'],
    localMenu: ['sobre', 'curso', 'brandstorm', 'miniproyectos', 'embajadores', 'marcas', 'oportunidades', 'encuestas'],
  },
  {
    slug: 'mckinsey', name: 'McKinsey & Company', sector: 'Consultoría estratégica',
    description: 'Consultoría estratégica, un challenge individual y tres miniproyectos.',
    archetype: 'plate', palette: { base: '#051C2C', cta: '#2251FF', ctaText: '#FFFFFF' }, heroHeight: 624,
    h1: { size: 65, lineHeight: 69.98, weight: 800 }, headingFont: 'manrope', bodyFont: 'dm',
    sections: [...common, 'ecosistema'],
  },
  {
    slug: 'netflix', name: 'Netflix', sector: 'Entretenimiento y streaming',
    description: 'Tres cursos, challenges internos y un miniproyecto de catálogo para mercados.',
    archetype: 'plate', palette: { base: '#0D0D10', cta: '#E50914', ctaText: '#FFFFFF' }, heroHeight: 565,
    h1: { size: 61, lineHeight: 65.27, weight: 800 }, headingFont: 'manrope', bodyFont: 'dm',
    sections: [...common, 'ecommerce'],
    localMenu: ['sobre', 'curso', 'challenges', 'miniproyectos', 'embajadores', 'ecommerce', 'oportunidades', 'encuestas'],
  },
  {
    slug: 'silbon', name: 'SILBON', sector: 'Moda y retail',
    description: 'Next Collection Challenge y miniproyectos de moda y retail, con su propia tienda.',
    archetype: 'photo', palette: { base: '#102638', cta: '#FFFFFF', ctaText: '#102638' }, heroHeight: 640,
    h1: { size: 68, lineHeight: 72.08, weight: 800 }, headingFont: 'manrope', bodyFont: 'dm',
    sections: [...common, 'tienda'],
  },
  {
    slug: 'atresmedia', name: 'Atresmedia', sector: 'Medios de comunicación y entretenimiento',
    description: 'Dos cursos, el efecto MIL y tres miniproyectos de comunicación digital.',
    archetype: 'tilt', palette: { base: '#111B23', cta: '#72D9DF', ctaText: '#111B23' }, heroHeight: 586,
    h1: { size: 62, lineHeight: 65.64, weight: 800 }, headingFont: 'manrope', bodyFont: 'dm',
    sections: [...common, 'ecosistema'],
  },
  {
    slug: 'heineken', name: 'HEINEKEN', sector: 'Negocio cervecero y gran consumo',
    description: 'Brewhouse, tres miniproyectos y recursos de compañía sobre gestión del negocio.',
    archetype: 'photo', palette: { base: '#002718', cta: '#C3ED9F', ctaText: '#002718' }, heroHeight: 570,
    h1: { size: 65, lineHeight: 69.34, weight: 700 }, headingFont: 'manrope', bodyFont: 'dm',
    sections: [...common, 'servicios', 'cierre'],
  },
  {
    slug: 'mapfre', name: 'Mapfre', sector: 'Seguros y gestión de riesgos',
    description: 'bugaMAP y tres miniproyectos sobre gestión de entidades aseguradoras.',
    archetype: 'photo', palette: { base: '#211317', cta: '#FF002D', ctaText: '#FFFFFF' }, heroHeight: 590,
    h1: { size: 63, lineHeight: 67.65, weight: 800 }, headingFont: 'manrope', bodyFont: 'dm',
    sections: [...common, 'servicios'],
  },
];

export const brandBySlug = (slug: string) => brands.find((b) => b.slug === slug);

/* Registros del directorio para las 17 marcas. Cifras a cero: ningún dato de ejemplo se inventa para igualar la guía. */
const stats = (): CompanyStatVM[] => [
  { icon: 'briefcase', value: 0, label: 'Vacantes' },
  { icon: 'lightbulb', value: 0, label: 'Retos' },
  { icon: 'users', value: 0, label: 'Equipo' },
  { icon: 'map-pin', value: 0, label: 'Sedes' },
];
const summary = (body: string): CompanyModuleVM => ({
  kind: 'summary',
  title: 'Resumen',
  body,
  items: [] as CompanyModuleItemVM[],
  sourceIds: [],
});

export const brandCompanyRecords: CompanyRecord[] = brands.map((b) => ({
  id: `cmp-${b.slug}`,
  slug: b.slug,
  name: b.name,
  category: b.sector,
  categoryIcon: 'building-2',
  description: b.description,
  logo: logo(b.name, b.palette.base),
  stats: stats(),
  status: 'published',
  lastReviewedAt: '2026-10-29',
  modules: [summary(b.description)],
  sources: [] as SourceVM[],
}));
