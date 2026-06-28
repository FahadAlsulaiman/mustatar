import { Eye, Gem } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import CardPattern from './CardPattern'

const cardIcons = [Eye, Gem]

export default function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="bg-white py-20 px-6 md:px-16 lg:px-24">
      <div className="max-w-5xl mx-auto w-full">
        {/* Heading + intro (right-aligned per design) */}
        <h2 className="text-3xl md:text-4xl font-bold text-navy text-start mb-6">
          {t.about.title}
        </h2>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed text-start max-w-3xl mb-12">
          {t.about.intro}
        </p>

        {/* Vision / Values cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.about.cards.map((card, idx) => {
            const Icon = cardIcons[idx]
            return (
              <div
                key={idx}
                className="relative bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-8 pb-20 text-start overflow-hidden"
              >
                {/* Header: title + icon */}
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-navy font-bold text-xl">{card.title}</h3>
                  <span className="w-11 h-11 rounded-full border border-gold/40 flex items-center justify-center">
                    <Icon size={20} className="text-gold" strokeWidth={1.5} />
                  </span>
                </div>

                <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                  {card.text}
                </p>

                <CardPattern />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
