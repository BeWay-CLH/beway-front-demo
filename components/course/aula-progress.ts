/* Progreso del aula en la sesión del navegador (escritura simulada de la demo, DEC-006). No es un registro real:
   solo dura la pestaña. Sin storage, o si falla, el aula funciona con progreso vacío. Nunca se usa localStorage. */

const key = (slug: string) => `bw-aula:${slug}`;

export function readDone(slug: string): number[] {
  try {
    const raw = window.sessionStorage.getItem(key(slug));
    const value: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(value) ? value.filter((n): n is number => Number.isInteger(n)) : [];
  } catch {
    return [];
  }
}

export function writeDone(slug: string, done: number[]) {
  try {
    window.sessionStorage.setItem(key(slug), JSON.stringify(done));
  } catch {
    /* sin almacenamiento: el progreso dura lo que la pantalla */
  }
}
