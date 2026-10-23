import { NavButton } from '@/components/NavButton';
import { PageState } from '@/components/PageState';

export default function TalentNotFound() {
  return <PageState kind="not-found" action={<NavButton href="/talent/dashboard" variant="secondary" icon="arrow-left">Volver a tu inicio</NavButton>} />;
}
