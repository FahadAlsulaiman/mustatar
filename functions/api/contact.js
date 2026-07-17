// Cloudflare Pages Function — POST /api/contact
// Verifies the Turnstile token with Cloudflare, re-validates all fields
// server-side (never trust the client), then (TODO) sends the email.

const NAME_RE = /^[\p{L} .'-]+$/u
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  })

const bad = (error, status = 400) => json({ ok: false, error }, status)

export async function onRequestPost({ request, env }) {
  let data
  try {
    data = await request.json()
  } catch {
    return bad('invalid_json')
  }

  const {
    name = '',
    email = '',
    mobile = '',
    title = '',
    details = '',
    token = '',
    hp = '', // honeypot
  } = data

  // Honeypot: pretend success so bots don't learn they were caught
  if (String(hp).trim() !== '') return json({ ok: true })

  // Server-side validation (mirror of the client, authoritative)
  const s = (v) => String(v).trim()
  if (!s(name) || s(name).length > 60 || !NAME_RE.test(s(name))) return bad('invalid_name')
  if (!s(email) || s(email).length > 254 || !EMAIL_RE.test(s(email))) return bad('invalid_email')
  if (!s(mobile) || s(mobile).length > 20) return bad('invalid_mobile')
  if (!s(title) || s(title).length > 120) return bad('invalid_title')
  if (!s(details) || s(details).length > 1500) return bad('invalid_details')

  // Verify the CAPTCHA token with Cloudflare
  if (!token) return bad('captcha_required')
  if (!env.TURNSTILE_SECRET) return bad('server_misconfigured', 500)

  const form = new FormData()
  form.append('secret', env.TURNSTILE_SECRET)
  form.append('response', token)
  const ip = request.headers.get('CF-Connecting-IP')
  if (ip) form.append('remoteip', ip)

  const verify = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    { method: 'POST', body: form },
  )
  const outcome = await verify.json()
  if (!outcome.success) {
    return bad('captcha_failed', 403)
  }

  // TODO: send the email via the chosen provider here (server-side).
  // The submission is verified and clean at this point.

  return json({ ok: true })
}
