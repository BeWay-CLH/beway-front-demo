import { NavButton } from '@/components/NavButton';
import { PageState } from '@/components/PageState';

export default function AdminNotFound() {
  return <PageState kind="not-found" action={<NavButton href="/admin/dashboard" variant="secondary" icon="arrow-left">Volver al panel</NavButton>} />;
}
