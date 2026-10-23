import type { Metadata } from 'next';
import { Alert, Card, EmptyState, SectionLabel, StatStrip } from '@ds';
import { programs } from '@/data/mock';
import { getCompanies, getCompanyCategories } from '@/lib/services/companies';

export const metadata: Metadata = { title: 'Admin CLH · BeWay' };

/* Shell del backoffice (bloque A). Listado, editor y cola editorial llegan en el bloque F (F-01…F-04).
   Las cifras salen del dataset de ejemplo, no son métricas reales. */
export default async function AdminDashboard() {
  const [catalog, categories] = await Promise.all([getCompanies({ pageSize: 1 }), getCompanyCategories()]);
  const stats = [
    { value: catalog.total, label: 'Empresas en catálogo', icon: 'building-2' },
    { value: categories.length, label: 'Categorías', icon: 'tags' },
    { value: programs.length, label: 'Programas de ejemplo', icon: 'graduation-cap' },
  ];

  return (
    <div className="mx-auto flex max-w-site flex-col gap-8 px-4 py-8 md:px-6 md:py-10">
      <header className="flex flex-col gap-3">
        <SectionLabel>Admin CLH</SectionLabel>
        <h1 className="text-h1 font-heading text-fg-heading">Panel de administración</h1>
        <p className="max-w-2xl text-fg-muted">Gestiona las fichas de empresa y su publicación.</p>
      </header>

      <Alert tone="info" title="Datos de ejemplo">
        Nada de lo que hagas aquí se guarda. El backoffice se conecta cuando exista la API.
      </Alert>

      <Card elevation="sm" padding="var(--space-2)">
        <StatStrip items={stats} />
      </Card>

      <Card elevation="sm" padding="var(--space-6)">
        <EmptyState
          icon="clipboard-check"
          title="Cola editorial vacía"
          description="Las fichas pendientes de revisión aparecerán aquí cuando el editor de empresas esté listo."
        />
      </Card>
    </div>
  );
}
