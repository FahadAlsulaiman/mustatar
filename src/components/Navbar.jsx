import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t, toggleLang } = useLanguage()

  // Transparent over the hero on landing; solid once the user scrolls down
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: t.nav.home, href: '#hero' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.team, href: '#team' },
    { label: t.nav.clients, href: '#clients' },
    { label: t.nav.contact, href: '#contact' },
    { label: t.nav.cta, href: '#request' },
  ]

  const LangButton = ({ className = '' }) => (
    <button
      onClick={toggleLang}
      className={`w-12 h-12 inline-flex items-center justify-center rounded-md bg-gold text-white text-lg font-medium hover:bg-opacity-90 transition-colors ${className}`}
      aria-label="Toggle language"
    >
      <span className="leading-none" style={{ fontFamily: 'system-ui, sans-serif' }}>
        {t.langButton}
      </span>
    </button>
  )

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled || open ? 'bg-navy shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">
        {/* Leading side: Logo (right in AR, left in EN) */}
        <a href="#hero" className="flex items-center" aria-label={t.brand.name}>
          <img
            src="/hero/logo.png"
            alt={t.brand.name}
            className="h-9 md:h-11 w-auto"
          />
        </a>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-300 hover:text-gold text-sm transition-colors whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Trailing side: language toggle */}
        <div className="hidden md:flex items-center">
          <LangButton />
        </div>

        {/* Mobile actions */}
        <div className="md:hidden flex items-center gap-4">
          <LangButton />
          <button
            className="text-white"
            onClick={() => setOpen(!open)}
            aria-label="toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-navy-light border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-gray-300 hover:text-gold text-sm py-1"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
