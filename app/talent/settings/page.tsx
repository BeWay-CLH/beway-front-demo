import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { requireSession } from '@/lib/session';
import { getAccountSettings, getPreviewCard } from '@/lib/services/profiles';
import { AccountSettingsForm } from './AccountSettingsForm';

export const metadata: Metadata = { title: 'Ajustes · BeWay' };

export default async function SettingsPage() {
  const session = await requireSession();
  const [settings, card] = await Promise.all([getAccountSettings(session.userId), getPreviewCard(session.userId)]);
  if (!settings) notFound();

  return (
    <div className="mx-auto flex w-full max-w-275 flex-col px-4 py-8 md:px-6 md:py-10">
      <AccountSettingsForm initial={settings} card={card} displayName={session.displayName} />
    </div>
  );
}
