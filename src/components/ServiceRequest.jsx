import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

const emptyForm = { name: '', email: '', mobile: '', title: '', details: '' }

const inputClass =
  'w-full border border-gray-200 rounded-lg px-4 py-3 text-start text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold placeholder-gray-500'

// Defined at module scope so its identity is stable across re-renders —
// otherwise the inputs remount on every keystroke and lose focus.
function Field({ id, label, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-navy font-medium text-sm text-start">
        {label} <span className="text-red-500" aria-hidden="true">*</span>
      </label>
      {children}
    </div>
  )
}

export default function ServiceRequest() {
  const { t } = useLanguage()
  const [form, setForm] = useState(emptyForm)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setForm(emptyForm)
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate={false}>
          {/* Name + Mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Field id="request-name" label={t.request.nameLabel}>
              <input
                id="request-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder={t.request.namePlaceholder}
                value={form.name}
                onChange={handleChange('name')}
                required
                className={inputClass}
              />
            </Field>

            <Field id="request-mobile" label={t.request.mobileLabel}>
              <input
                id="request-mobile"
                name="mobile"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                dir="ltr"
                placeholder={t.request.mobilePlaceholder}
                value={form.mobile}
                onChange={handleChange('mobile')}
                required
                pattern="[0-9+ ]{8,}"
                title={t.request.mobileError}
                className={`${inputClass} text-start`}
              />
            </Field>
          </div>

          {/* Email */}
          <Field id="request-email" label={t.request.emailLabel}>
            <input
              id="request-email"
              name="email"
              type="email"
              autoComplete="email"
              dir="ltr"
              placeholder={t.request.emailPlaceholder}
              value={form.email}
              onChange={handleChange('email')}
              required
              className={`${inputClass} text-start`}
            />
          </Field>

          {/* Service title */}
          <Field id="request-title" label={t.request.titleLabel}>
            <input
              id="request-title"
              name="title"
              type="text"
              placeholder={t.request.titlePlaceholder}
              value={form.title}
              onChange={handleChange('title')}
              required
              className={inputClass}
            />
          </Field>

          {/* Service details */}
          <Field id="request-details" label={t.request.detailsLabel}>
            <textarea
              id="request-details"
              name="details"
              placeholder={t.request.detailsPlaceholder}
              value={form.details}
              onChange={handleChange('details')}
              required
              rows={5}
              className={`${inputClass} resize-none`}
            />
          </Field>

          <button
            type="submit"
            className="w-full bg-navy text-white font-semibold py-4 rounded-lg hover:bg-navy-light transition-colors text-sm tracking-wide"
          >
            {t.request.submit}
          </button>
        </form>
      </div>
    </section>
  )
}
