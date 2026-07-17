import { useMemo, useRef, useState, useEffect } from 'react'
import { ChevronDown, Search, Check } from 'lucide-react'
import { getCountries, getCountryCallingCode } from 'libphonenumber-js'

// Convert Arabic-Indic (٠-٩) and Persian (۰-۹) numerals to English digits (0-9)
function toEnglishDigits(s) {
  return s
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
}

// ISO country code -> flag emoji (regional indicator letters)
function flagEmoji(iso) {
  return iso
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)))
}

export default function PhoneInput({
  country,
  onCountryChange,
  value,
  onChange,
  lang = 'en',
  dir = 'ltr',
  invalid = false,
  id,
  name,
  placeholder,
  onBlur,
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const wrapRef = useRef(null)
  const searchRef = useRef(null)

  // Build a localized, sorted country list once per language
  const countries = useMemo(() => {
    let names
    try {
      names = new Intl.DisplayNames([lang], { type: 'region' })
    } catch {
      names = null
    }
    return getCountries()
      .filter((iso) => iso !== 'IL')
      .map((iso) => ({
        iso,
        name: (names && names.of(iso)) || iso,
        dial: getCountryCallingCode(iso),
        flag: flagEmoji(iso),
      }))
      .sort((a, b) => a.name.localeCompare(b.name, lang))
  }, [lang])

  const selected = countries.find((c) => c.iso === country) || countries[0]

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return countries
    return countries.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.iso.toLowerCase().includes(q) ||
        ('+' + c.dial).includes(q) ||
        c.dial.includes(q),
    )
  }, [countries, query])

  // Close on outside click / Escape
  useEffect(() => {
    if (!open) return
    const onDoc = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    setTimeout(() => searchRef.current?.focus(), 0)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const pick = (iso) => {
    onCountryChange(iso)
    setOpen(false)
    setQuery('')
  }

  return (
    <div ref={wrapRef} className="relative">
      <div
        className={`flex items-stretch rounded-lg border bg-white overflow-hidden focus-within:ring-2 focus-within:ring-gold ${
          invalid ? 'border-red-400' : 'border-gray-200'
        }`}
      >
        {/* Country selector */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label="Select country code"
          className="flex items-center gap-1.5 px-3 border-e border-gray-200 text-sm text-navy hover:bg-gray-50 flex-shrink-0"
        >
          <span className="text-base leading-none">{selected?.flag}</span>
          <span dir="ltr" className="font-medium">+{selected?.dial}</span>
          <ChevronDown size={14} className="text-gray-400" />
        </button>

        {/* National number */}
        <input
          id={id}
          name={name}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          dir="ltr"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(toEnglishDigits(e.target.value))}
          onBlur={onBlur}
          className="flex-1 min-w-0 px-4 py-3 text-start text-sm bg-white focus:outline-none placeholder-gray-500"
        />
      </div>

      {/* Searchable dropdown */}
      {open && (
        <div
          className="absolute z-30 mt-1 w-full sm:w-80 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
          style={dir === 'rtl' ? { right: 0 } : { left: 0 }}
        >
          <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100">
            <Search size={15} className="text-gray-400 flex-shrink-0" />
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={lang === 'ar' ? 'ابحث عن دولة أو رمز' : 'Search country or code'}
              className="w-full text-sm bg-transparent focus:outline-none text-start placeholder-gray-400"
            />
          </div>
          <ul role="listbox" className="max-h-60 overflow-y-auto py-1">
            {filtered.length === 0 && (
              <li className="px-3 py-3 text-sm text-gray-400 text-center">
                {lang === 'ar' ? 'لا توجد نتائج' : 'No results'}
              </li>
            )}
            {filtered.map((c) => (
              <li key={c.iso}>
                <button
                  type="button"
                  role="option"
                  aria-selected={c.iso === country}
                  onClick={() => pick(c.iso)}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm text-start hover:bg-gray-50 ${
                    c.iso === country ? 'bg-gold/10' : ''
                  }`}
                >
                  <span className="text-base leading-none">{c.flag}</span>
                  <span className="flex-1 text-navy truncate">{c.name}</span>
                  <span dir="ltr" className="text-gray-400">+{c.dial}</span>
                  {c.iso === country && <Check size={15} className="text-gold flex-shrink-0" />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
