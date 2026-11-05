#!/usr/bin/env node
/* Capturas de página completa para las puertas de fase de las correcciones visuales (decisión D8).
   Uso:
     node scripts/capturas.mjs <url-base> <carpeta-salida> [--session=lucia|marcos] [--themes=light,dark]
                               [--sizes=1440x900,768x1024,390x844] <ruta> [<ruta>...]
   Ejemplo:
     node scripts/capturas.mjs http://localhost:3000 docs/correcciones-visuales/capturas/01 /companies /talent/dashboard --session=lucia
   Las capturas no se versionan (ver PENDIENTES.md); la carpeta va en .gitignore del usuario o se deja sin añadir.
   Requiere: npx playwright install chromium (una vez). */

import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const args = process.argv.slice(2);
if (args.length < 3) {
  console.error('Uso: node scripts/capturas.mjs <url-base> <carpeta-salida> <ruta> [<ruta>...] [--session=lucia] [--themes=light,dark] [--sizes=WxH,...]');
  process.exit(2);
}

const [base, outDir, ...rest] = args;
const opts = { session: null, themes: ['light'], sizes: ['1440x900', '768x1024', '390x844'] };
const routes = [];
for (const arg of rest) {
  if (arg.startsWith('--session=')) opts.session = arg.slice('--session='.length);
  else if (arg.startsWith('--themes=')) opts.themes = arg.slice('--themes='.length).split(',');
  else if (arg.startsWith('--sizes=')) opts.sizes = arg.slice('--sizes='.length).split(',');
  else routes.push(arg);
}

const SESSION_ACCOUNTS = new Set(['lucia', 'marcos']);
if (opts.session && !SESSION_ACCOUNTS.has(opts.session)) {
  console.error(`Cuenta de demo desconocida: ${opts.session}`);
  process.exit(2);
}

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();
try {
  for (const size of opts.sizes) {
    const [width, height] = size.split('x').map(Number);
    for (const theme of opts.themes) {
      for (const route of routes) {
        const context = await browser.newContext({
          viewport: { width, height },
          colorScheme: theme === 'dark' ? 'dark' : 'light',
          deviceScaleFactor: 1,
        });
        await context.addInitScript((t) => {
          try { localStorage.setItem('beway-theme', t); } catch { /* sin almacenamiento */ }
        }, theme);
        if (opts.session) {
          await context.addCookies([{ name: 'bw_demo', value: opts.session, url: base }]);
        }
        const page = await context.newPage();
        await page.goto(new URL(route, base).toString(), { waitUntil: 'networkidle' });
        await page.waitForTimeout(300);
        const slug = route.replace(/^\/+/, '').replace(/[^a-zA-Z0-9]+/g, '_').replace(/_$/, '') || 'home';
        const file = path.join(outDir, `${slug}-${width}x${height}-${theme}.png`);
        await page.screenshot({ path: file, fullPage: true, animations: 'disabled' });
        console.log(file);
        await context.close();
      }
    }
  }
} finally {
  await browser.close();
}
