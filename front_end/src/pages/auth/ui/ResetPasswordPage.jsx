import { useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import SiteHeader from '../../../shared/ui/SiteHeader.jsx'
import SiteFooter from '../../../shared/ui/SiteFooter.jsx'
import PasswordStrength, { PW_RULES } from '../../../shared/ui/PasswordStrength.jsx'
import { resetPassword } from '../../../api/auth.js'

function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get('token')

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [status, setStatus] = useState(() => token ? 'idle' : 'invalid') // idle | loading | success | error | invalid
  const [errorMsg, setErrorMsg] = useState('')

  if (status === 'invalid') {
    return (
      <div className="flex min-h-screen flex-col bg-uape-bg text-uape-white">
        <SiteHeader compact />
        <main className="uape-section-shell flex flex-1 items-center justify-center py-25">
          <div className="uape-verify-content flex flex-col items-center gap-8 text-center">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
              <rect width="64" height="64" rx="32" fill="#3A1A1A" />
              <path d="M22 22l20 20M42 22L22 42" stroke="#F87171" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <div className="flex flex-col gap-2">
              <h1 className="text-[32px] font-semibold">Invalid reset link</h1>
              <p className="text-[16px] text-uape-muted">No token found in the URL.</p>
            </div>
            <Link to="/forgot-password" className="uape-orange-btn px-8 py-3 text-base font-semibold">
              Request a new link
            </Link>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div className="flex min-h-screen flex-col bg-uape-bg text-uape-white">
        <SiteHeader compact />
        <main className="uape-section-shell flex flex-1 items-center justify-center py-25">
          <div className="uape-verify-content flex flex-col items-center gap-8 text-center">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
              <rect width="64" height="64" rx="32" fill="#1A3A1A" />
              <path d="M20 32l10 10 14-18" stroke="#4ADE80" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="flex flex-col gap-2">
              <h1 className="text-[36px] font-semibold">Password updated!</h1>
              <p className="text-[16px] text-uape-muted">You can now log in with your new password.</p>
            </div>
            <button
              className="uape-orange-btn px-8 py-3 text-base font-semibold"
              onClick={() => navigate('/login')}
            >
              Go to login
            </button>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  const validate = () => {
    const failed = PW_RULES.find(r => !r.test(password))
    if (failed) return failed.label
    if (password !== confirm) return 'Passwords do not match'
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = validate()
    if (err) { setErrorMsg(err); return }
    setStatus('loading')
    setErrorMsg('')
    try {
      await resetPassword({ token, new_password: password })
      setStatus('success')
    } catch (err) {
      const data = err?.response?.data ?? {}
      setErrorMsg(data.detail ?? data.new_password ?? 'Something went wrong. Try requesting a new link.')
      setStatus('error')
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-uape-bg text-uape-white">
      <SiteHeader compact />

      <main className="uape-section-shell flex flex-1 items-center justify-center py-25">
        <div className="uape-verify-content flex flex-col gap-8">

          <div className="flex flex-col gap-2">
            <h1 className="text-[36px] font-semibold leading-tight">Set new password</h1>
            <p className="text-[16px] text-uape-muted leading-6">
              Choose a strong password you don&apos;t use anywhere else.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            <div className="flex flex-col gap-2">
              <label htmlFor="rp-password" className="text-[13px] font-medium text-uape-muted uppercase tracking-wide">
                New password
              </label>
              <div className="relative">
                <input
                  id="rp-password"
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  autoComplete="new-password"
                  onChange={e => setPassword(e.target.value)}
                  className="h-14 w-full rounded-lg border border-uape-border-soft bg-uape-form-bg px-5 pr-12 text-base text-uape-white outline-none placeholder:text-uape-muted/60 focus:border-white/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  aria-label="Toggle password visibility"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-uape-muted transition hover:text-uape-white"
                >
                  {showPw ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              <PasswordStrength password={password} />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="rp-confirm" className="text-[13px] font-medium text-uape-muted uppercase tracking-wide">
                Confirm password
              </label>
              <input
                id="rp-confirm"
                type="password"
                value={confirm}
                autoComplete="new-password"
                onChange={e => setConfirm(e.target.value)}
                className="h-14 w-full rounded-lg border border-uape-border-soft bg-uape-form-bg px-5 text-base text-uape-white outline-none placeholder:text-uape-muted/60 focus:border-white/30"
              />
            </div>

            {(status === 'error' || errorMsg) && (
              <p className="text-[14px] text-[#eb4823]">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="uape-orange-btn h-14 w-full text-base font-semibold"
            >
              {status === 'loading' ? 'Saving…' : 'Update password'}
            </button>
          </form>

          <Link
            to="/login"
            className="text-[14px] text-uape-muted transition hover:text-uape-white text-center"
          >
            ← Back to login
          </Link>

        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

export default ResetPasswordPage
