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
          {/* Map — cookie-free OpenStreetMap embed (avoids third-party cookies) */}
          <div className="relative rounded-xl overflow-hidden shadow-sm h-72 md:h-96 bg-gray-100">
            <iframe
              title={c.title}
              src="https://www.openstreetmap.org/export/embed.html?bbox=46.690%2C24.560%2C46.790%2C24.620&layer=mapnik&marker=24.590%2C46.740"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <a
              href="https://www.google.com/maps/search/?api=1&query=RKNA3169%20Riyadh"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-3 end-3 bg-navy/90 text-white text-xs font-medium px-3 py-1.5 rounded-md hover:bg-navy transition-colors"
            >
              {c.viewOnMap}
            </a>
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
