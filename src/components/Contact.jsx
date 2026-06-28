import { Phone, Mail, MapPin, Globe } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export default function Contact() {
  const { t } = useLanguage()
  const c = t.contact

  return (
    <section id="contact" className="py-20 px-6 md:px-16 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-12">
          {c.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Map */}
          <div className="rounded-xl overflow-hidden shadow-sm h-72 md:h-96 bg-gray-100">
            <iframe
              title={c.title}
              src="https://www.google.com/maps?q=Riyadh+Southern+Ring+Road+exit+24&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Contact info */}
          <div className="text-start flex flex-col gap-6">
            <div>
              <h3 className="text-xl font-bold text-navy mb-2">{c.heading}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{c.desc}</p>
            </div>

            <div className="flex flex-col gap-4">
              <ContactRow icon={MapPin} text={c.address} />
              <ContactRow icon={Phone} text={c.phone} dir="ltr" href={`tel:${c.phone.replace(/\s/g, '')}`} />
              <ContactRow icon={Mail} text={c.email} href={`mailto:${c.email}`} />
              <ContactRow icon={Globe} text={c.website} href={`https://${c.website}`} />
            </div>

            <p className="text-gray-400 text-xs">{c.cr}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactRow({ icon: Icon, text, dir, href }) {
  const content = (
    <span className="text-gray-700 text-sm font-medium" dir={dir}>
      {text}
    </span>
  )
  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-navy/5 flex items-center justify-center flex-shrink-0">
        <Icon size={16} className="text-navy" />
      </div>
      {href ? (
        <a href={href} className="hover:text-gold transition-colors">{content}</a>
      ) : content}
    </div>
  )
}
