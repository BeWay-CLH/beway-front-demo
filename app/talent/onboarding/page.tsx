import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { requireSession } from '@/lib/session';
import { getAccountSettings, getProfileForm } from '@/lib/services/profiles';
import { OnboardingFlow } from './OnboardingFlow';

export const metadata: Metadata = { title: 'Tu perfil · BeWay' };

export default async function OnboardingPage() {
  const session = await requireSession();
  const [initial, settings] = await Promise.all([getProfileForm(session.userId), getAccountSettings(session.userId)]);
  if (!initial || !settings) notFound();
  return <OnboardingFlow initial={initial} settings={settings} />;
}
