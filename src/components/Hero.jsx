import { useLanguage } from '../i18n/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center bg-navy overflow-hidden"
    >
      {/* Skyline background photo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/hero/skyline.webp)' }}
      />

      {/* Navy overlay for contrast/readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(15,27,45,0.92) 0%, rgba(15,27,45,0.82) 45%, rgba(15,27,45,0.9) 100%)',
        }}
      />

      {/* Decorative geometric pattern strip on the left edge.
          Transparent gold motif shows its lines directly over the dark hero. */}
      <div
        className="absolute inset-y-0 left-0 w-24 md:w-40 bg-repeat-y bg-top pointer-events-none opacity-25"
        style={{
          backgroundImage: 'url(/hero/pattern-gold.webp)',
          backgroundSize: '100% auto',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl">
        <h1 className="sr-only">{t.brand.name} — {t.brand.sub}</h1>
        <img
          src="/hero/logo.webp"
          alt={t.brand.name}
          className="w-72 md:w-96 h-auto mb-6"
        />

        <p className="text-gray-300 text-base md:text-lg leading-relaxed mt-4">
          {t.hero.tagline}
        </p>

        <a
          href="#about"
          className="mt-10 border border-gold text-gold px-8 py-3 text-sm hover:bg-gold hover:text-white transition-colors"
        >
          {t.hero.cta}
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50">
        <div className="w-px h-10 bg-gold animate-pulse" />
      </div>
    </section>
  )
}
