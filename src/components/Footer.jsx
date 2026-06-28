import { useLanguage } from '../i18n/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  const quickLinks = [
    { label: t.nav.home, href: '#hero' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.clients, href: '#clients' },
    { label: t.nav.contact, href: '#contact' },
  ]

  return (
    <footer className="bg-navy text-gray-400 pt-16 pb-8 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* About */}
          <div className="text-start col-span-2 md:col-span-1">
            <h4 className="text-gold font-bold mb-4 text-base">{t.brand.name}</h4>
            <p className="text-gray-500 text-xs leading-relaxed">{t.footer.about}</p>
          </div>

          {/* Quick links */}
          <div className="text-start">
            <h4 className="text-white font-bold mb-4 text-sm">{t.footer.quickLinks}</h4>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-gray-500 hover:text-gold text-xs transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="text-start">
            <h4 className="text-white font-bold mb-4 text-sm">{t.footer.servicesTitle}</h4>
            <ul className="flex flex-col gap-2">
              {t.services.items.map((s, i) => (
                <li key={i}>
                  <a href="#services" className="text-gray-500 hover:text-gold text-xs transition-colors">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div className="text-start">
            <h4 className="text-white font-bold mb-4 text-sm">{t.footer.contactTitle}</h4>
            <ul className="flex flex-col gap-2 text-xs text-gray-500">
              <li>{t.contact.address}</li>
              <li dir="ltr" className="text-start">{t.contact.phone}</li>
              <li>{t.contact.email}</li>
              <li>{t.contact.website}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-gold text-xs">{t.footer.rights}</p>
        </div>
      </div>
    </footer>
  )
}
