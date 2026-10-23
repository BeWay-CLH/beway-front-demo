import Link from 'next/link';
import { Icon } from '@ds';
import type { CompanyCardVM } from '@/lib/models/company';

/* Fila de empresa con logo en chip blanco, nombre y una línea de apoyo (por defecto, su categoría). La usan
   "Empresas que sigues" (perfil) y "Empresas de tus intereses" (dashboard). Enlaza a la ficha. */
export function CompanyRow({
  company,
  note,
}: {
  company: Pick<CompanyCardVM, 'slug' | 'name' | 'category' | 'logo'>;
  note?: string;
}) {
  return (
    <Link
      href={`/companies/${company.slug}`}
      className="transition-control group flex items-center gap-4 py-3 text-fg-heading hover:text-fg-accent"
    >
      <span className="flex size-10 flex-none items-center justify-center overflow-hidden rounded-control border border-line-subtle bg-white">
        {company.logo ? (
          <img src={company.logo} alt="" className="max-h-[78%] max-w-[78%] object-contain" />
        ) : (
          <span aria-hidden="true" className="font-heading text-brand-dark">{company.name[0]}</span>
        )}
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="font-semibold">{company.name}</span>
        <span className="text-sm text-fg-muted">{note ?? company.category}</span>
      </span>
      <span className="text-fg-muted"><Icon name="arrow-right" size={16} /></span>
    </Link>
  );
}
