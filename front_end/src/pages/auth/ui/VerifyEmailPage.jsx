import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import SiteHeader from '../../../shared/ui/SiteHeader.jsx'
import SiteFooter from '../../../shared/ui/SiteFooter.jsx'
import { verifyEmail, saveTokens, saveUser, getProfile, resendVerification } from '../../../api/auth.js'

function ResendForm() {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const handleResend = async (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    setMsg('')
    try {
      await resendVerification(email.trim())
      setMsg('Email sent! Check your inbox.')
    } catch (err) {
      setMsg(err?.response?.data?.detail ?? 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleResend} className="flex flex-col items-center gap-3 w-full">
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="h-14 w-full rounded-lg border border-uape-border-soft bg-uape-form-bg px-5 text-base text-uape-white outline-none placeholder:text-uape-muted/60 focus:border-uape-accent"
      />
      <button
        type="submit"
        disabled={loading}
        className="uape-orange-btn h-14 w-full text-base font-semibold disabled:opacity-50"
      >
        {loading ? 'Sending…' : 'Send new link'}
      </button>
      {msg && <p className="text-sm text-uape-muted">{msg}</p>}
    </form>
  )
}

function VerifyEmailPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get('token')

  const [verifyStatus, setVerifyStatus] = useState('loading')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (!token) {
      setVerifyStatus('error')
      setErrorMsg('No verification token found.')
      return
    }

    verifyEmail(token)
      .then(async (data) => {
        saveTokens(data)
        try {
          const profile = await getProfile()
          saveUser({ first_name: data.first_name, last_name: data.last_name, photo: profile.avatar ?? null })
        } catch {
          saveUser({ first_name: data.first_name, last_name: data.last_name })
        }
        setVerifyStatus('success')
        setTimeout(() => navigate('/onboarding', { replace: true }), 1500)
      })
      .catch((err) => {
        const detail = err?.response?.data?.detail ?? 'Verification failed.'
        setErrorMsg(detail)
        setVerifyStatus('error')
      })
  }, [token])

  return (
    <div className="flex min-h-screen flex-col bg-uape-bg text-uape-white">
      <SiteHeader compact />

      <main className="uape-section-shell flex flex-1 items-center justify-center py-25">
        <div className="uape-verify-content flex flex-col items-center gap-8 text-center">

          {verifyStatus === 'loading' && (
            <>
              <div className="uape-spinner" />
              <p className="font-figtree text-[20px] text-uape-muted">Verifying your email…</p>
            </>
          )}

          {verifyStatus === 'success' && (
            <>
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                <rect width="64" height="64" rx="32" fill="#1A3A1A" />
                <path d="M20 32l10 10 14-18" stroke="#4ADE80" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex flex-col gap-2">
                <h1 className="font-figtree text-[36px] font-semibold">Email confirmed!</h1>
                <p className="font-figtree text-[16px] text-uape-muted">Redirecting you to onboarding…</p>
              </div>
            </>
          )}

          {verifyStatus === 'error' && (
            <>
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                <rect width="64" height="64" rx="32" fill="#3A1A1A" />
                <path d="M22 22l20 20M42 22L22 42" stroke="#F87171" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <div className="flex flex-col gap-3">
                <h1 className="font-figtree text-[32px] font-semibold">Link expired or invalid</h1>
                <p className="font-figtree text-[16px] text-uape-muted">{errorMsg}</p>
              </div>
              <ResendForm />
            </>
          )}

        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

export default VerifyEmailPage
