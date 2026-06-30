import { Building2 } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import CardPattern from './CardPattern'

export default function Clients() {
  const { t } = useLanguage()

  return (
    <section id="clients" className="py-20 px-6 md:px-16 lg:px-24 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-4">
          {t.clients.title}
        </h2>
        {t.clients.intro && (
          <p className="text-gray-600 text-center leading-relaxed mb-12 max-w-3xl mx-auto">
            {t.clients.intro}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.clients.items.map((client, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden bg-white border border-gray-100 rounded-xl px-6 pt-5 pb-12 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-full bg-navy/5 flex items-center justify-center flex-shrink-0 overflow-hidden">
                {client.logo ? (
                  <img src={client.logo} alt={client.name} className="w-full h-full object-contain p-1.5" />
                ) : (
                  <Building2 size={20} className="text-gold" />
                )}
              </div>
              <p className="text-navy text-sm font-medium text-start">{client.name}</p>
              <CardPattern className="h-8" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
