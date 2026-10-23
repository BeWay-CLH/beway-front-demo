import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* Compatibilidad con las URLs en español del prototipo (DEC-003). Temporales (307): se quitan
     cuando nadie use los enlaces antiguos. /programas sigue vivo hasta que lo sustituyan cursos y retos. */
  async redirects() {
    return [
      { source: '/empresas', destination: '/companies', permanent: false },
      { source: '/registro', destination: '/signup', permanent: false },
    ];
  },
};

export default nextConfig;
