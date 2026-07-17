import { useRef, useState } from 'react'
import { isValidPhoneNumber } from 'libphonenumber-js'
import { useLanguage } from '../i18n/LanguageContext'
import PhoneInput from './PhoneInput'
import Turnstile from './Turnstile'

const emptyForm = { name: '', email: '', mobile: '', title: '', details: '' }
const DEFAULT_COUNTRY = 'SA'

// CAPTCHA + backend submission are dormant until we go live.
// Flip to true (and add real Turnstile keys + deploy the function) to enable.
const CAPTCHA_ENABLED = false

// Length caps (defense against oversized payloads)
const MAX = { name: 60, email: 254, title: 120, details: 1500 }
// Minimum seconds a real human takes to fill the form (bots submit instantly)
const MIN_FILL_MS = 2500

// Letters (any language) plus spaces, apostrophes, hyphens, and dots
const NAME_RE = /^[\p{L} .'-]+$/u
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const baseInput =
  'w-full rounded-lg px-4 py-3 text-start text-sm bg-white border focus:outline-none focus:ring-2 focus:ring-gold placeholder-gray-500'

// Defined at module scope so its identity is stable across re-renders —
// otherwise the inputs remount on every keystroke and lose focus.
function Field({ id, label, error, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-navy font-medium text-sm text-start">
        {label} <span className="text-red-500" aria-hidden="true">*</span>
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-red-500 text-xs" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export default function ServiceRequest() {
  const { t, lang, dir } = useLanguage()
  const [form, setForm] = useState(emptyForm)
  const [country, setCountry] = useState(DEFAULT_COUNTRY)
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [captchaToken, setCaptchaToken] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')
  const honeypot = useRef('') // bots fill this hidden field; humans never see it
  const mountedAt = useRef(Date.now())
  // Randomized once per load so its name can't be hardcoded/skipped by bots
  const [hpField] = useState(() => 'fld_' + Math.random().toString(36).slice(2, 11))

  const setField = (field) => (e) => setForm({ ...form, [field]: e.target.value })
  const markTouched = (field) => () => setTouched((prev) => ({ ...prev, [field]: true }))

  // Per-field validation -> error message ('' means valid)
  const validate = (f) => {
    const v = (f === 'mobile' ? form.mobile : (form[f] || '')).trim()
    if (!v) return t.request.requiredError
    if (f === 'name' && !NAME_RE.test(v)) return t.request.nameError
    if (f === 'email' && !EMAIL_RE.test(v)) return t.request.emailError
    if (f === 'mobile' && !isValidPhoneNumber(form.mobile, country)) return t.request.mobileError
    return ''
  }

  const errors = {
    name: validate('name'),
    email: validate('email'),
    mobile: validate('mobile'),
    title: validate('title'),
    details: validate('details'),
  }
  const err = (f) => (touched[f] ? errors[f] : '')
  const isFormValid =
    !Object.values(errors).some(Boolean) && (!CAPTCHA_ENABLED || !!captchaToken)

  const inputClass = (f) =>
    `${baseInput} ${err(f) ? 'border-red-400' : 'border-gray-200'}`

  const resetCaptcha = () => {
    setCaptchaToken('')
    if (window.turnstile) {
      try {
        window.turnstile.reset()
      } catch {
        /* no widget */
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerError('')

    // Bot traps — silently drop obvious bots (honeypot filled or submitted too fast)
    if (honeypot.current) return
    if (Date.now() - mountedAt.current < MIN_FILL_MS) return

    setTouched({ name: true, email: true, mobile: true, title: true, details: true })
    if (Object.values(errors).some(Boolean)) return

    // CAPTCHA + backend are dormant until we go live — show local success for now.
    if (!CAPTCHA_ENABLED) {
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 4000)
      setForm(emptyForm)
      setTouched({})
      mountedAt.current = Date.now()
      return
    }

    if (!captchaToken) return // CAPTCHA not solved

    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...form, token: captchaToken, hp: honeypot.current }),
      })
      const out = await res.json().catch(() => ({}))
      if (res.ok && out.ok) {
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 4000)
        setForm(emptyForm)
        setTouched({})
      } else {
        setServerError(t.request.serverError)
      }
    } catch {
      setServerError(t.request.serverError)
    } finally {
      setSubmitting(false)
      resetCaptcha()
      mountedAt.current = Date.now()
    }
  }

  return (
    <section id="request" className="py-20 px-6 md:px-16 lg:px-24 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-10">
          {t.request.title}
        </h2>

        {submitted && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-5 py-3 rounded-lg text-center mb-6 text-sm">
            {t.request.success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
          {/* Honeypot — hidden from users, bots tend to fill it.
              Uses clip (not left:-9999px) so it never widens the page / causes
              horizontal scroll on mobile. */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              width: '1px',
              height: '1px',
              padding: 0,
              margin: '-1px',
              overflow: 'hidden',
              clip: 'rect(0, 0, 0, 0)',
              whiteSpace: 'nowrap',
              border: 0,
            }}
          >
            <label htmlFor={hpField}>Company website</label>
            <input
              id={hpField}
              name={hpField}
              type="text"
              tabIndex={-1}
              autoComplete="off"
              defaultValue=""
              onChange={(e) => (honeypot.current = e.target.value)}
            />
          </div>

          {/* Name + Mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Field id="request-name" label={t.request.nameLabel} error={err('name')}>
              <input
                id="request-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder={t.request.namePlaceholder}
                maxLength={MAX.name}
                value={form.name}
                onChange={setField('name')}
                onBlur={markTouched('name')}
                aria-invalid={!!err('name')}
                className={inputClass('name')}
              />
            </Field>

            <Field id="request-mobile" label={t.request.mobileLabel} error={err('mobile')}>
              <PhoneInput
                id="request-mobile"
                name="mobile"
                lang={lang}
                dir={dir}
                country={country}
                onCountryChange={(iso) => setCountry(iso)}
                value={form.mobile}
                onChange={(v) => setForm({ ...form, mobile: v })}
                onBlur={markTouched('mobile')}
                invalid={!!err('mobile')}
                placeholder={t.request.mobilePlaceholder}
              />
            </Field>
          </div>

          {/* Email */}
          <Field id="request-email" label={t.request.emailLabel} error={err('email')}>
            <input
              id="request-email"
              name="email"
              type="email"
              autoComplete="email"
              dir="ltr"
              placeholder={t.request.emailPlaceholder}
              maxLength={MAX.email}
              value={form.email}
              onChange={setField('email')}
              onBlur={markTouched('email')}
              aria-invalid={!!err('email')}
              className={`${inputClass('email')} text-start`}
            />
          </Field>

          {/* Service title */}
          <Field id="request-title" label={t.request.titleLabel} error={err('title')}>
            <input
              id="request-title"
              name="title"
              type="text"
              placeholder={t.request.titlePlaceholder}
              maxLength={MAX.title}
              value={form.title}
              onChange={setField('title')}
              onBlur={markTouched('title')}
              aria-invalid={!!err('title')}
              className={inputClass('title')}
            />
          </Field>

          {/* Service details */}
          <Field id="request-details" label={t.request.detailsLabel} error={err('details')}>
            <textarea
              id="request-details"
              name="details"
              placeholder={t.request.detailsPlaceholder}
              maxLength={MAX.details}
              value={form.details}
              onChange={setField('details')}
              onBlur={markTouched('details')}
              aria-invalid={!!err('details')}
              rows={5}
              className={`${inputClass('details')} resize-none`}
            />
          </Field>

          {/* CAPTCHA (hidden until we go live) */}
          {CAPTCHA_ENABLED && <Turnstile lang={lang} onVerify={setCaptchaToken} />}

          {serverError && (
            <p className="text-red-500 text-sm text-center" role="alert">
              {serverError}
            </p>
          )}

          <button
            type="submit"
            disabled={!isFormValid || submitting}
            className="w-full bg-navy text-white font-semibold py-4 rounded-lg hover:bg-navy-light transition-colors text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-navy"
          >
            {submitting ? t.request.sending : t.request.submit}
          </button>
        </form>
      </div>
    </section>
  )
}
