import { useState } from 'react'
import { Link } from 'react-router-dom'
import SiteHeader from '../../../shared/ui/SiteHeader.jsx'
import SiteFooter from '../../../shared/ui/SiteFooter.jsx'
import { forgotPassword } from '../../../api/auth.js'
import './AuthForms.css'

function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | sent | error
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('loading')
    setErrorMsg('')
    try {
      await forgotPassword(email.trim())
      setStatus('sent')
    } catch (err) {
      const detail = err?.response?.data?.detail
      const isThrottle = err?.response?.status === 429
      if (isThrottle || detail) {
        setErrorMsg(detail ?? 'Too many requests. Please try again later.')
      } else {
        setErrorMsg('Something went wrong. Please try again.')
      }
      setStatus('error')
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-uape-bg text-uape-white">
      <SiteHeader compact />

      <main className="uape-section-shell uape-auth-form-main flex flex-1 items-center justify-center py-25">
        <div className="uape-verify-content flex flex-col gap-8">

          {status !== 'sent' ? (
            <>
              <div className="flex flex-col gap-2">
                <h1 className="text-[36px] font-semibold leading-tight">Forgot password?</h1>
                <p className="text-[16px] text-uape-muted leading-6">
                  Enter your email and we&apos;ll send you a reset link.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                <div className="flex flex-col gap-2">
                  <label htmlFor="fp-email" className="text-[13px] font-medium text-uape-muted uppercase tracking-wide">
                    Email
                  </label>
                  <input
                    id="fp-email"
                    type="email"
                    value={email}
                    autoComplete="email"
                    placeholder="you@example.com"
                    onChange={e => setEmail(e.target.value)}
                    className="h-14 w-full rounded-lg border border-uape-border-soft bg-uape-form-bg px-5 text-base text-uape-white outline-none placeholder:text-uape-muted/60 focus:border-white/30"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-[14px] text-[#eb4823]">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="uape-orange-btn h-14 w-full text-base font-semibold"
                >
                  {status === 'loading' ? 'Sending…' : 'Send reset link'}
                </button>
              </form>

              <Link
                to="/login"
                className="text-[14px] text-uape-muted transition hover:text-uape-white text-center"
              >
                ← Back to login
              </Link>
            </>
          ) : (
            <>
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                <rect width="64" height="64" rx="32" fill="#2A1510" />
                <path d="M16 32l10 10 22-22" stroke="#eb4823" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex flex-col gap-2">
                <h1 className="text-[36px] font-semibold">Check your email</h1>
                <p className="text-[16px] text-uape-muted leading-6">
                  If <strong className="text-uape-white">{email}</strong> is registered,
                  a reset link has been sent. Check your inbox and spam folder.
                </p>
                <p className="text-[14px] text-uape-muted mt-2">
                  Link expires in 24 hours.
                </p>
              </div>
              <Link
                to="/login"
                className="text-[14px] text-uape-muted transition hover:text-uape-white"
              >
                ← Back to login
              </Link>
            </>
          )}

        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

export default ForgotPasswordPage
