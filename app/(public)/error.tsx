'use client';

import { RouteError } from '@/components/RouteError';

export default function Error({ retry }: { error: unknown; retry: () => void }) {
  return <RouteError retry={retry} />;
}
