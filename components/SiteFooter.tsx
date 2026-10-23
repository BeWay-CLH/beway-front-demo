import { Footer } from '@ds';

export function SiteFooter() {
  return (
    <Footer
      assetBase="/assets"
      links={[
        { label: 'Empresas', href: '/companies' },
        { label: 'Crear cuenta', href: '/signup' },
        { label: 'Iniciar sesión', href: '/login' },
        { label: 'Guía de estilo', href: '/styleguide' },
      ]}
      legalLinks={[
        { label: 'Privacidad', href: '/privacy' },
        { label: 'Términos', href: '/terms' },
        { label: 'Contacto', href: '/contact' },
      ]}
    />
  );
}
