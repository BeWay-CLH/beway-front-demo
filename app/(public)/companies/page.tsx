import type { Metadata } from 'next';
import { Suspense } from 'react';
import { CompaniesView } from './CompaniesView';

export const metadata: Metadata = {
  title: 'Empresas · BeWay',
  description: 'Directorio de empresas del ecosistema BeWay.',
};

export default function CompaniesPage() {
  return (
    <Suspense>
      <CompaniesView />
    </Suspense>
  );
}
