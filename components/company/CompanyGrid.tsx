'use client';

import { useRouter } from 'next/navigation';
import { CompanyCard } from '@ds';
import type { CompanyCardVM } from '@/lib/models/company';
import { FollowMark } from './FollowMark';

/* Rejilla del directorio y de la portada (guía de correcciones, 02 y 03). Columnas por ancho:
   1 hasta 650 px; 2 desde 651 px; 3 desde 901 px; 4 desde 1650 px. Gap 17 px hasta 1150 px y 24 px por encima. */
export function CompanyGrid({
  items,
  followingIds,
  userId,
}: {
  items: CompanyCardVM[];
  followingIds: string[];
  userId?: string;
}) {
  const router = useRouter();
  return (
    <div className="grid gap-[17px] min-[651px]:grid-cols-2 min-[901px]:grid-cols-3 min-[1151px]:gap-6 min-[1650px]:grid-cols-4">
      {items.map((c) => (
        <CompanyCard
          key={c.id}
          name={c.name}
          category={c.category}
          categoryIcon={c.categoryIcon}
          description={c.description}
          logo={c.logo}
          cover={c.cover}
          stats={c.stats}
          metrics={c.metrics}
          onView={() => router.push(`/companies/${c.slug}`)}
          followSlot={
            <FollowMark
              companyId={c.id}
              companyName={c.name}
              userId={userId}
              initialFollowing={followingIds.includes(c.id)}
            />
          }
        />
      ))}
    </div>
  );
}
