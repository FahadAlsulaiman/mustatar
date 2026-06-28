import { createContext, useContext, useEffect, useState } from 'react'
import { translations } from './translations'

const LanguageContext = createContext(null)

const STORAGE_KEY = 'mustatar-lang'

const FADE_MS = 250

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || 'ar'
  })
  const [fading, setFading] = useState(false)

  const t = translations[lang]
  const dir = t.dir

  // Keep <html> lang/dir and SEO tags in sync with the active language
  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
    document.title = t.seo.title
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', t.seo.description)
    localStorage.setItem(STORAGE_KEY, lang)
  }, [lang, dir, t])

  // Fade content out, flip language + direction while invisible, then fade back in
  const toggleLang = () => {
    setFading(true)
    setTimeout(() => {
      setLang((prev) => (prev === 'ar' ? 'en' : 'ar'))
      setFading(false)
    }, FADE_MS)
  }

  return (
    <LanguageContext.Provider value={{ lang, dir, t, toggleLang }}>
      <div
        style={{
          opacity: fading ? 0 : 1,
          transition: `opacity ${FADE_MS}ms ease-in-out`,
        }}
      >
        {children}
      </div>
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
