/* Fichas del paquete de Tarea 2 (DEC-046). Lee `data/seed/companies.content.v2.json`, copia íntegra del paquete, y lo pasa
   por el adaptador una sola vez. El resultado es el mismo en cada llamada (DEC-047). La fusión con los fixtures de ejemplo
   la hace `lib/services/companies.ts`, que es la única puerta a los datos de empresa. */

import seedJson from '@/data/seed/companies.content.v2.json';
import type { CompanyRecord } from '@/lib/models/company';
import { toCompanyRecords, type SeedCompany } from './companies-adapter';

const seedRecords: CompanyRecord[] = toCompanyRecords(seedJson as unknown as SeedCompany[]);

export function seedCompanyRecords(): CompanyRecord[] {
  return seedRecords;
}
