import { useLanguage } from '../i18n/LanguageContext'
import { serviceIcons } from '../i18n/translations'
import CardPattern from './CardPattern'

export default function Services() {
  const { t } = useLanguage()

  return (
    <section id="services" className="py-20 px-6 md:px-16 lg:px-24 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-12">
          {t.services.title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.services.items.map((service, idx) => {
            const Icon = serviceIcons[idx]
            return (
              <div
                key={idx}
                className="relative overflow-hidden bg-white border border-gray-100 rounded-xl p-8 pb-20 text-start shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="flex justify-start mb-5">
                  <div className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-gold transition-colors">
                    <Icon size={24} className="text-navy group-hover:text-gold transition-colors" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="text-navy font-bold text-lg mb-3">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
                <CardPattern />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
