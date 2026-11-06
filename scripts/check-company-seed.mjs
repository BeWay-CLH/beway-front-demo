#!/usr/bin/env node
/* Comprueba el seed de las 17 fichas de empresa (Tarea 2; DEC-046 a DEC-058; docs/frontend/SEED_EMPRESAS.md).
   No escribe nada. Sin dependencias: ejecuta el adaptador TypeScript con la eliminación de tipos de Node.
   Uso: npm run seed:check. Sale con código 1 si algo falla. */

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PACKAGE_COMPANIES, mergeCompanyRecords, toCompanyRecords } from '../lib/seed/companies-adapter.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const raw = JSON.parse(readFileSync(join(root, 'data/seed/companies.content.v2.json'), 'utf8'));
const fixtures = readFileSync(join(root, 'data/fixtures/companies.ts'), 'utf8');
const demoSlugs = [...fixtures.matchAll(/slug: '([^']+)'/g)].map((m) => m[1]);
const demoIds = [...fixtures.matchAll(/id: '([^']+)'/g)].map((m) => m[1]);

const failures = [];
const check = (cond, msg) => {
  if (!cond) failures.push(msg);
};

/* 1. Volumen del paquete (QA.md y prompt, Fase 4). Los conteos son de datos, no de ofertas vigentes. */
const TOTALS = { learning: 25, challenges: 25, miniprojects: 43, ambassadors: 85, resources: 154, scholarships: 6, academicPrograms: 18, brands: 12 };
check(raw.length === 17, `el paquete debe tener 17 empresas y tiene ${raw.length}`);
for (const [key, expected] of Object.entries(TOTALS)) {
  const total = raw.reduce((n, c) => n + (c[key]?.length ?? 0), 0);
  check(total === expected, `${key}: ${total} registros, se esperaban ${expected}`);
}

/* 2. Correspondencias: 17 slugs únicos, todos mapeados y sin colisión con las fichas de ejemplo. */
const packageSlugs = raw.map((c) => c.company.slug);
check(new Set(packageSlugs).size === 17, 'hay slugs del paquete repetidos');
for (const s of packageSlugs) check(PACKAGE_COMPANIES[s], `slug del paquete sin correspondencia: ${s}`);
const repoSlugs = packageSlugs.map((s) => PACKAGE_COMPANIES[s]?.slug);
check(new Set(repoSlugs).size === 17, 'hay slugs del repo repetidos');
for (const s of repoSlugs) check(!demoSlugs.includes(s), `el slug ${s} colisiona con una ficha de ejemplo`);

/* 3. Idempotencia (DEC-047): dos ejecuciones iguales, y repetir la fusión no añade empresas. */
const first = toCompanyRecords(raw);
const second = toCompanyRecords(raw);
check(JSON.stringify(first) === JSON.stringify(second), 'el adaptador no es determinista');
const once = mergeCompanyRecords([], first).records;
const twice = mergeCompanyRecords(once, toCompanyRecords(raw));
check(twice.records.length === 17 && twice.conflicts.length === 17, 'repetir el seed duplicaría empresas');
check(
  [...demoIds, ...first.map((r) => r.id)].length === new Set([...demoIds, ...first.map((r) => r.id)]).size,
  'un id del seed coincide con un id de ejemplo',
);

/* 4. Cobertura por empresa (QA.md, matriz). Recursos: sin los 12 de L'Oréal que repiten sus marcas (DEC-055). */
const EXPECTED = {
  'instituto-bme': { learning: 1, challenges: 3, miniprojects: 3, resources: 6, scholarships: 0, academicPrograms: 0, brands: 0 },
  'mcgraw-hill': { learning: 1, challenges: 3, miniprojects: 3, resources: 3, scholarships: 0, academicPrograms: 0, brands: 0 },
  garrigues: { learning: 4, challenges: 1, miniprojects: 0, resources: 9, scholarships: 0, academicPrograms: 18, brands: 0 },
  google: { learning: 1, challenges: 1, miniprojects: 3, resources: 40, scholarships: 0, academicPrograms: 0, brands: 0 },
  ibm: { learning: 1, challenges: 1, miniprojects: 3, resources: 11, scholarships: 0, academicPrograms: 0, brands: 0 },
  auren: { learning: 1, challenges: 3, miniprojects: 3, resources: 6, scholarships: 0, academicPrograms: 0, brands: 0 },
  pwc: { learning: 1, challenges: 1, miniprojects: 3, resources: 9, scholarships: 0, academicPrograms: 0, brands: 0 },
  santander: { learning: 1, challenges: 1, miniprojects: 0, resources: 7, scholarships: 6, academicPrograms: 0, brands: 0 },
  loreal: { learning: 1, challenges: 1, miniprojects: 3, resources: 0, scholarships: 0, academicPrograms: 0, brands: 12 },
  netflix: { learning: 3, challenges: 3, miniprojects: 1, resources: 5, scholarships: 0, academicPrograms: 0, brands: 0 },
  deloitte: { learning: 1, challenges: 1, miniprojects: 3, resources: 6, scholarships: 0, academicPrograms: 0, brands: 0 },
  mckinsey: { learning: 1, challenges: 1, miniprojects: 3, resources: 7, scholarships: 0, academicPrograms: 0, brands: 0 },
  revolut: { learning: 1, challenges: 1, miniprojects: 3, resources: 6, scholarships: 0, academicPrograms: 0, brands: 0 },
  atresmedia: { learning: 2, challenges: 1, miniprojects: 3, resources: 6, scholarships: 0, academicPrograms: 0, brands: 0 },
  silbon: { learning: 3, challenges: 1, miniprojects: 3, resources: 7, scholarships: 0, academicPrograms: 0, brands: 0 },
  mapfre: { learning: 1, challenges: 1, miniprojects: 3, resources: 8, scholarships: 0, academicPrograms: 0, brands: 0 },
  heineken: { learning: 1, challenges: 1, miniprojects: 3, resources: 6, scholarships: 0, academicPrograms: 0, brands: 0 },
};
const COLLECTION_KEYS = ['learning', 'challenges', 'miniprojects', 'resources', 'scholarships', 'academicPrograms', 'brands'];
const coverage = [];
for (const record of first) {
  const expected = EXPECTED[record.slug];
  const c = record.collections;
  check(expected, `sin fila esperada para ${record.slug}`);
  if (!c) continue;
  const row = Object.fromEntries(COLLECTION_KEYS.map((k) => [k, c[k].length]));
  if (expected) {
    for (const k of COLLECTION_KEYS) check(row[k] === expected[k], `${record.slug}.${k}: ${row[k]}, se esperaban ${expected[k]}`);
  }
  coverage.push({ slug: record.slug, name: record.name, ...row, ambassadors: c.ambassadors.length });
}

/* 5. Reglas de seguridad de contenido (DEC-052, DEC-059). */
const allLearning = first.flatMap((r) => r.collections?.learning ?? []);
check(allLearning.every((l) => l.certificateVerified === false), 'hay una formación con certificación marcada como verificada');
check(
  raw.every((c) => c.learning.every((l) => l.enrollUrl == null)) && raw.every((c) => c.challenges.every((x) => x.applicationUrl == null)),
  'el paquete trae enlaces de inscripción: revisar antes de mostrar CTA',
);
check(
  first.reduce((n, r) => n + (r.collections?.ambassadors.length ?? 0), 0) === TOTALS.ambassadors,
  'los embajadores no suman las 85 apariciones',
);
check(
  first.every((r) => r.collections.ambassadors.every((a) => a.name && typeof a.authorized === 'boolean')),
  'un embajador sin nombre o sin estado de autorización (DEC-059)',
);
const serialized = JSON.stringify(first);
const prototypeLinks = serialized.match(/github\.io/g)?.length ?? 0;
check(prototypeLinks === 1, `enlaces a prototipos (github.io) en la ficha: ${prototypeLinks}; solo se espera el CSV de Netflix (DEC-050)`);
check(!serialized.includes('imageUrl') && !serialized.includes('heroImageUrl') && !serialized.includes('companyLogoUrl'), 'una imagen remota llega a la ficha (DEC-050)');

/* 6. Composiciones de fase 03 (data/fixtures/brands.ts): mismas 17 fichas, mismo nombre, sin registros de fase 03 (DEC-060, DEC-061). */
const brandsSrc = readFileSync(join(root, 'data/fixtures/brands.ts'), 'utf8');
const brandEntries = [...brandsSrc.matchAll(/slug: '([^']+)', name: (?:'([^']*)'|"([^"]*)")/g)].map((m) => ({ slug: m[1], name: m[2] ?? m[3] }));
check(brandEntries.length === 17, `composiciones de fase 03: ${brandEntries.length}, se esperaban 17`);
for (const b of brandEntries) {
  const rec = first.find((r) => r.slug === b.slug);
  check(rec, `composición sin ficha del paquete: ${b.slug}`);
  check(!rec || rec.name === b.name, `${b.slug}: nombre ${rec?.name} distinto de la composición ${b.name}`);
}
check(!brandsSrc.includes('brandCompanyRecords'), 'brands.ts todavía exporta registros de empresa de fase 03 (DEC-060)');

/* 7. Casos concretos del prompt. */
const garrigues = first.find((r) => r.slug === 'garrigues');
check(garrigues.collections.academicPrograms.filter((p) => p.family === 'Grado + máster').length === 1, 'Garrigues debe tener 1 grado');
check(garrigues.collections.academicPrograms.length - 1 === 17, 'Garrigues debe tener 17 másteres');
const loreal = first.find((r) => r.slug === 'loreal');
check(loreal.collections.learning[0].modules.length === 8, "L'Oréal debe tener 8 módulos en su formación");
const netflix = first.find((r) => r.slug === 'netflix');
check(Boolean(netflix.collections.miniprojects.find((m) => m.caseDataUrl)), 'Netflix debe conservar la URL del CSV del caso');
check(first.every((r) => r.status === 'published'), 'las fichas del paquete deben salir publicadas');

console.log('Coverage (formación, retos, miniproyectos, recursos, becas, académicos, marcas, embajadores):');
for (const row of coverage) {
  console.log(
    `  ${row.slug.padEnd(18)} ${row.learning} ${row.challenges} ${row.miniprojects} ${row.resources} ${row.scholarships} ${row.academicPrograms} ${row.brands}  ${row.ambassadors}`,
  );
}
console.log(`Empresas: ${first.length}. Fusión repetida: ${twice.records.length} empresas, ${twice.conflicts.length} repeticiones descartadas.`);

if (failures.length > 0) {
  console.error(`\nseed:check FALLA (${failures.length}):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log('\nseed:check OK');
