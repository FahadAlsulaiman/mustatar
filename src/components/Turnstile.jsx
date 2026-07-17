import { useEffect, useRef } from 'react'

// Cloudflare Turnstile site key.
// This is Cloudflare's official TEST key (always passes, any domain).
// Replace with your real site key from https://dash.cloudflare.com > Turnstile.
const SITE_KEY = '1x00000000000000000000AA'

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

function loadScript() {
  return new Promise((resolve) => {
    if (window.turnstile) return resolve()
    const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`)
    if (existing) {
      existing.addEventListener('load', () => resolve())
      return
    }
    const s = document.createElement('script')
    s.src = SCRIPT_SRC
    s.async = true
    s.defer = true
    s.onload = () => resolve()
    document.head.appendChild(s)
  })
}

export default function Turnstile({ onVerify, lang = 'en' }) {
  const containerRef = useRef(null)
  const widgetId = useRef(null)

  useEffect(() => {
    let cancelled = false
    loadScript().then(() => {
      if (cancelled || !window.turnstile || !containerRef.current) return
      widgetId.current = window.turnstile.render(containerRef.current, {
        sitekey: SITE_KEY,
        theme: 'light',
        language: lang === 'ar' ? 'ar' : 'en',
        callback: (token) => onVerify(token),
        'expired-callback': () => onVerify(''),
        'error-callback': () => onVerify(''),
      })
    })
    return () => {
      cancelled = true
      if (widgetId.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetId.current)
        } catch {
          /* widget already gone */
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div ref={containerRef} className="min-h-[65px]" />
}
