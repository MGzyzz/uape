import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SiteHeader from '../../../shared/ui/SiteHeader.jsx'
import SiteFooter from '../../../shared/ui/SiteFooter.jsx'
import { resendVerification } from '../../../api/auth.js'

const COOLDOWN_SECONDS = 60

function EnvelopeIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <rect width="64" height="64" rx="16" fill="#1A1A1A" />
      <path d="M12 22a4 4 0 0 1 4-4h32a4 4 0 0 1 4 4v20a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4V22z"
        stroke="#FF6B35" strokeWidth="2" fill="none" />
      <path d="M12 24l20 13 20-13" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function VerifyEmailSentPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const email = location.state?.email ?? ''

  const [cooldown, setCooldown] = useState(0)
  const [resendLoading, setResendLoading] = useState(false)
  const [resendMsg, setResendMsg] = useState('')

  useEffect(() => {
    if (!email) navigate('/signup', { replace: true })
  }, [email, navigate])

  useEffect(() => {
    if (cooldown <= 0) return
    const timer = setInterval(() => setCooldown(c => c - 1), 1000)
    return () => clearInterval(timer)
  }, [cooldown])

  const handleResend = async () => {
    if (cooldown > 0 || resendLoading) return
    setResendLoading(true)
    setResendMsg('')
    try {
      await resendVerification(email)
      setResendMsg('Email sent! Check your inbox.')
      setCooldown(COOLDOWN_SECONDS)
    } catch (err) {
      const detail = err?.response?.data?.detail
      setResendMsg(detail ?? 'Something went wrong. Please try again.')
    } finally {
      setResendLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-uape-bg text-uape-white">
      <SiteHeader compact />

      <main className="uape-section-shell flex flex-1 items-center justify-center py-25">
        <div className="uape-verify-content flex flex-col items-center gap-8 text-center">
          <EnvelopeIcon />

          <div className="flex flex-col gap-3">
            <h1 className="font-figtree text-[40px] font-semibold leading-tight">
              Check your email
            </h1>
            <p className="font-figtree text-[18px] text-uape-muted leading-relaxed">
              We sent a confirmation link to{' '}
              <span className="font-semibold text-uape-white">{email}</span>
            </p>
            <p className="font-figtree text-[15px] text-uape-muted">
              Click the link in the email to activate your account.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 w-full">
            <button
              onClick={handleResend}
              disabled={cooldown > 0 || resendLoading}
              className="uape-orange-btn h-14 w-full text-base font-semibold disabled:opacity-50"
            >
              {resendLoading
                ? 'Sending…'
                : cooldown > 0
                  ? `Resend in ${cooldown}s`
                  : 'Resend email'}
            </button>

            {resendMsg && (
              <p className="text-sm text-uape-muted">{resendMsg}</p>
            )}
          </div>

          <Link
            to="/login"
            className="font-figtree text-sm text-uape-muted underline underline-offset-4 hover:text-uape-white transition"
          >
            ← Back to login
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

export default VerifyEmailSentPage
