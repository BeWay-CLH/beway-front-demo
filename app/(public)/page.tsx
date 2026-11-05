import { FeatureCard, LogoMarquee, Photo, StatStrip, SectionLabel, Card } from '@ds';
import { NavButton } from '@/components/NavButton';
import { homeStats, partnerLogos, pillars } from '@/data/mock';

export default function Home() {
  return (
    <div className="mx-auto flex max-w-site flex-col gap-24 px-6 py-10">
      {/* Hero: foto con overlay navy a la izquierda. Sin foto, degradado de marca. */}
      <section>
        <Photo overlay="hero" height={460} radius="var(--radius-xl)" alt="">
          <div className="flex h-full max-w-xl flex-col justify-center gap-6 px-10 py-12">
            <span className="eyebrow uppercase text-link-on-inverse">Ecosistema de talento</span>
            <h1 className="text-display font-heading tracking-hero text-white">Conectamos talento, construimos el futuro</h1>
            <p className="text-base text-white/80">Perfiles verificados, retos abiertos y programas de mentoría en un solo lugar.</p>
            <div className="flex flex-wrap gap-3">
              <NavButton href="/signup" size="lg" iconAfter="arrow-right">Únete al ecosistema</NavButton>
              <NavButton href="/companies" size="lg" variant="ghost" onInverse>Ver empresas</NavButton>
            </div>
          </div>
        </Photo>
      </section>

      <section>
        <Card elevation="sm" padding="var(--space-2)">
          <StatStrip items={homeStats} />
        </Card>
      </section>

      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <SectionLabel>Qué hacemos</SectionLabel>
          <h2 className="text-h1 font-heading text-fg-heading">Cuatro formas de avanzar juntos</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <FeatureCard key={p.title} {...p} />
          ))}
        </div>
      </section>

      <section>
        <LogoMarquee logos={partnerLogos} />
      </section>

      <section>
        <Card surface="gradient" padding="var(--space-8)" elevation="none">
          <div className="flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex max-w-xl flex-col gap-2">
              <h2 className="text-h2 font-heading text-white">Crea tu perfil y empieza hoy</h2>
              <p className="text-white/80">Tus cambios ya son visibles para las empresas del ecosistema.</p>
            </div>
            <NavButton href="/signup" size="lg" iconAfter="arrow-right">Crear mi perfil</NavButton>
          </div>
        </Card>
      </section>
    </div>
  );
}
