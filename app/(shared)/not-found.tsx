import { NavButton } from '@/components/NavButton';
import { PageState } from '@/components/PageState';

/* 404 de fichas y perfiles: se pinta dentro del marco de quien mira, sin perder su navegación. */
export default function SharedNotFound() {
  return (
    <PageState
      kind="not-found"
      action={
        <NavButton href="/companies" variant="secondary" icon="building-2">
          Ver empresas
        </NavButton>
      }
    />
  );
}
