import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

export default function ServiceRequest() {
  const { t } = useLanguage()
  const [form, setForm] = useState({ title: '', details: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setForm({ title: '', details: '' })
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="request-title" className="text-navy font-medium text-sm text-start">{t.request.titleLabel}</label>
            <input
              id="request-title"
              name="title"
              type="text"
              placeholder={t.request.titlePlaceholder}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-start text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold placeholder-gray-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="request-details" className="text-navy font-medium text-sm text-start">{t.request.detailsLabel}</label>
            <textarea
              id="request-details"
              name="details"
              placeholder={t.request.detailsPlaceholder}
              value={form.details}
              onChange={(e) => setForm({ ...form, details: e.target.value })}
              required
              rows={5}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-start text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold placeholder-gray-400 resize-none"
            />
          </div>

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
