import { UserCircle2, Check } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export default function Team() {
  const { t } = useLanguage()

  return (
    <section id="team" className="py-20 px-6 md:px-16 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-4">
          {t.team.title}
        </h2>
        <p className="text-gray-600 text-center leading-relaxed mb-12 max-w-2xl mx-auto">
          {t.team.subtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {t.team.members.map((member, idx) => (
            <div
              key={idx}
              className="relative bg-gray-50 rounded-xl overflow-hidden shadow-sm flex flex-col border border-gray-100"
            >
              <div className="flex items-center justify-center h-44 bg-navy/5">
                <UserCircle2 size={72} className="text-gray-400" strokeWidth={1} />
              </div>
              <div className="bg-navy px-5 py-3 text-center">
                <p className="text-white font-semibold text-sm">{member.name}</p>
                <p className="text-gold text-xs mt-0.5">{member.role}</p>
              </div>
              <ul className="flex flex-col gap-2 p-5 text-start flex-1">
                {member.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600 text-xs leading-relaxed">
                    <Check size={14} className="text-gold flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
