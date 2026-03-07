import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google'
import SiteHeader from '../../../shared/ui/SiteHeader.jsx'
import SiteFooter from '../../../shared/ui/SiteFooter.jsx'
import authImage from '../../../shared/assets/solution/auth.jpg'
import welcomeBackImage from '../../../shared/assets/solution/welcome-back.png'
import eyeIcon from '../../../shared/assets/icons/Eye.svg'
import { register, login, googleAuth, saveTokens, saveUser, getProfile } from '../../../api/auth.js'

function AuthPage({ mode }) {
  const isSignup = mode === 'signup'
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState('')
  const [fields, setFields] = useState({
    firstName: '', lastName: '', email: '', password: '',
  })
  const [fieldErrors, setFieldErrors] = useState({})

  const validateField = (name, value) => {
    if (name === 'firstName' && isSignup) {
      if (!value.trim()) return 'First name is required'
    }
    if (name === 'lastName' && isSignup) {
      if (!value.trim()) return 'Last name is required'
    }
    if (name === 'email') {
      if (!value.trim()) return 'Email is required'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address'
    }
    if (name === 'password') {
      if (!value) return 'Password is required'
      if (isSignup && value.length < 8) return 'Password must be at least 8 characters'
    }
    return ''
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFields(prev => ({ ...prev, [name]: value }))
    setError('')
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    const err = validateField(name, value)
    setFieldErrors(prev => ({ ...prev, [name]: err }))
  }

  const validateAll = () => {
    const keys = isSignup
      ? ['firstName', 'lastName', 'email', 'password']
      : ['email', 'password']
    const errors = {}
    keys.forEach(k => {
      const err = validateField(k, fields[k])
      if (err) errors[k] = err
    })
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setGoogleLoading(true)
      setError('')
      try {
        const tokens = await googleAuth({ access_token: tokenResponse.access_token })
        saveTokens(tokens)
        try {
          const profile = await getProfile()
          saveUser({ first_name: tokens.first_name, last_name: tokens.last_name, photo: profile.avatar ?? null })
        } catch {
          saveUser({ first_name: tokens.first_name, last_name: tokens.last_name })
        }
        navigate(tokens.is_new ? '/onboarding' : '/profile')
      } catch {
        setError('Google sign-in failed. Please try again.')
      } finally {
        setGoogleLoading(false)
      }
    },
    onError: () => setError('Google sign-in failed.'),
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateAll()) return
    setLoading(true)
    setError('')
    try {
      let tokens
      if (isSignup) {
        tokens = await register({
          first_name: fields.firstName,
          last_name: fields.lastName,
          email: fields.email,
          password: fields.password,
        })
      } else {
        tokens = await login({ email: fields.email, password: fields.password })
      }
      saveTokens(tokens)
      try {
        const profile = await getProfile()
        saveUser({ first_name: tokens.first_name, last_name: tokens.last_name, photo: profile.avatar ?? null })
      } catch {
        saveUser({ first_name: tokens.first_name, last_name: tokens.last_name })
      }
      navigate(isSignup ? '/onboarding' : '/profile')
    } catch (err) {
      const data = err?.response?.data
      if (data && typeof data === 'object') {
        const first = Object.values(data).flat()[0]
        setError(typeof first === 'string' ? first : 'Something went wrong.')
      } else {
        setError('Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const imageSection = (
    <section className="relative h-[856px] w-[586px] overflow-hidden rounded-3xl">
      <img
        src={isSignup ? authImage : welcomeBackImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        style={isSignup
          ? { transform: 'translateX(-35%) rotate(270deg) scale(1.5)', transformOrigin: 'center' }
          : undefined
        }
      />
      <div className="relative flex h-full items-end p-[52px]">
        <h2 className="w-[424px] font-figtree text-[40px] font-semibold leading-[44px]">
          {isSignup ? (
            <>Start with clarity.<br />Learn with confidence.</>
          ) : (
            <>Welcome back.</>
          )}
        </h2>
      </div>
    </section>
  )

  const formSection = (
    <section className={`w-121${isSignup ? ' h-190' : ''}`}>
      <h1 className="font-figtree text-[44px] font-semibold leading-13 tracking-[0%]">
        {isSignup ? 'Registration by email' : 'Log in to your account'}
      </h1>

      <form className={`mt-10 ${isSignup ? 'space-y-7' : 'space-y-8'}`} autoComplete="off" noValidate onSubmit={handleSubmit}>
        {isSignup ? (
          <div className="grid gap-7 sm:grid-cols-2">
            <div className="space-y-2">
              <span className="block font-figtree text-[24px] font-semibold leading-7 tracking-[0%] text-uape-white">First name</span>
              <input
                type="text"
                name="firstName"
                placeholder="John"
                value={fields.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`h-14 w-[228px] rounded-lg border bg-uape-form-bg px-5 py-4 text-base text-uape-white outline-none transition placeholder:text-uape-muted/60 focus:border-uape-accent ${fieldErrors.firstName ? 'border-red-500' : 'border-uape-border-soft'}`}
              />
              {fieldErrors.firstName && <FieldError msg={fieldErrors.firstName} />}
            </div>
            <div className="space-y-2">
              <span className="block font-figtree text-[24px] font-semibold leading-7 tracking-[0%] text-uape-white">Last name</span>
              <input
                type="text"
                name="lastName"
                placeholder="Doe"
                value={fields.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`h-14 w-[228px] rounded-lg border bg-uape-form-bg px-5 py-4 text-base text-uape-white outline-none transition placeholder:text-uape-muted/60 focus:border-uape-accent ${fieldErrors.lastName ? 'border-red-500' : 'border-uape-border-soft'}`}
              />
              {fieldErrors.lastName && <FieldError msg={fieldErrors.lastName} />}
            </div>
          </div>
        ) : null}

        <div className="space-y-3">
          <span className="block font-figtree text-[24px] font-semibold leading-7 tracking-[0%] text-uape-white">Your email</span>
          <input
            type="email"
            name="email"
            placeholder="example@gmail.com"
            value={fields.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`h-14 w-121 rounded-lg border bg-uape-form-bg px-5 py-4 text-base text-uape-white outline-none transition placeholder:text-uape-muted/60 focus:border-uape-accent ${fieldErrors.email ? 'border-red-500' : 'border-uape-border-soft'}`}
          />
          {fieldErrors.email && <FieldError msg={fieldErrors.email} />}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-figtree text-[24px] font-semibold leading-7 tracking-[0%] text-uape-white">Your password</span>
            {!isSignup && (
              <span className="cursor-not-allowed select-none text-sm text-uape-muted opacity-50">
                Forgot password?
              </span>
            )}
          </div>
          <div className="relative h-14">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter your password"
              value={fields.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`h-14 w-121 rounded-lg border bg-uape-form-bg px-5 py-4 pr-12 text-base text-uape-white outline-none transition placeholder:text-uape-muted/60 focus:border-uape-accent ${fieldErrors.password ? 'border-red-500' : 'border-uape-border-soft'}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center opacity-70 transition hover:opacity-100"
              aria-label="Toggle password visibility"
            >
              <img src={eyeIcon} alt="" className="h-5 w-5" />
            </button>
          </div>
          {fieldErrors.password && <FieldError msg={fieldErrors.password} />}
        </div>

        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="uape-orange-btn mt-10! h-14 w-121 text-base font-semibold disabled:opacity-60"
        >
          {loading ? (isSignup ? 'Signing up…' : 'Logging in…') : (isSignup ? 'Sign up' : 'Log in')}
        </button>
      </form>

      <div className="mt-10 flex flex-col gap-8">
        <div className="flex items-center gap-3 font-figtree text-base text-uape-muted">
          <span className="h-px flex-1 bg-uape-border-soft" />
          <span>Other {isSignup ? 'sign up' : 'log in'} options</span>
          <span className="h-px flex-1 bg-uape-border-soft" />
        </div>

        <div className="flex justify-center gap-6">
          <button
            type="button"
            disabled={googleLoading}
            onClick={() => loginWithGoogle()}
            className="flex h-13 w-40.5 items-center justify-center gap-3 rounded-lg border border-uape-border-soft bg-uape-surface px-3 py-2.5 pr-4.5 font-figtree text-[20px] font-medium leading-7 text-uape-white transition hover:border-uape-white/40 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <GoogleIcon />
            {googleLoading ? 'Signing in…' : 'Google'}
          </button>
          <button
            type="button"
            className="flex h-13 w-40.5 items-center justify-center gap-3 rounded-lg border border-uape-border-soft bg-uape-surface px-3 py-2.5 pr-4.5 font-figtree text-[20px] font-medium leading-7 text-uape-white transition hover:border-uape-white/40"
          >
            <GitHubIcon />
            GitHub
          </button>
        </div>
      </div>

      <p className="mt-10 text-center font-figtree text-base text-uape-muted">
        {isSignup ? 'Already have an account? ' : "Don't have an account? "}
        <Link
          className="font-semibold text-uape-white underline underline-offset-4"
          to={isSignup ? '/login' : '/signup'}
        >
          {isSignup ? 'Log in' : 'Sign up'}
        </Link>
      </p>
    </section>
  )

  return (
    <div className="flex min-h-screen flex-col bg-uape-bg text-uape-white">
      <SiteHeader compact />

      <main className={`uape-full-bleed-shell flex-1 ${isSignup ? 'py-25' : 'pt-9 pb-25'}`}>
        <div className={`${isSignup ? 'grid gap-[130px] lg:grid-cols-[484px_586px]' : 'grid items-center gap-20 lg:grid-cols-[586px_484px]'}`}>
          {isSignup ? (
            <>
              {formSection}
              {imageSection}
            </>
          ) : (
            <>
              {imageSection}
              {formSection}
            </>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

function FieldError({ msg }) {
  return (
    <p className="flex items-center gap-1.5 text-sm text-red-400 mt-1">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="shrink-0">
        <circle cx="7" cy="7" r="7" fill="#ef4444" fillOpacity="0.2" />
        <path d="M7 4v3.5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="7" cy="10" r="0.75" fill="#ef4444" />
      </svg>
      {msg}
    </p>
  )
}

function GoogleIcon() {
  return (
    <svg width="25" height="25" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.566 2.684-3.874 2.684-6.615z" fill="#4285F4" />
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853" />
      <path d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05" />
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 6.293C4.672 4.166 6.656 3.58 9 3.58z" fill="#EA4335" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="25" height="25" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 1.5C6.201 1.5 1.5 6.201 1.5 12c0 4.64 3.01 8.577 7.186 9.966.525.096.714-.228.714-.507 0-.252-.009-.918-.015-1.8-2.922.636-3.54-1.408-3.54-1.408-.477-1.212-1.165-1.536-1.165-1.536-.954-.651.072-.639.072-.639 1.055.074 1.611 1.083 1.611 1.083.937 1.605 2.46 1.141 3.06.873.095-.678.367-1.141.668-1.403-2.332-.266-4.785-1.166-4.785-5.19 0-1.146.41-2.083 1.082-2.817-.108-.266-.469-1.337.102-2.787 0 0 .882-.282 2.889 1.077A9.992 9.992 0 0 1 12 6.588c.891.004 1.79.12 2.631.351 2.006-1.359 2.887-1.077 2.887-1.077.572 1.45.211 2.521.103 2.787.674.734 1.08 1.671 1.08 2.817 0 4.035-2.457 4.921-4.797 5.182.378.324.714.963.714 1.941 0 1.402-.013 2.533-.013 2.877 0 .282.188.608.72.505A10.503 10.503 0 0 0 22.5 12C22.5 6.201 17.799 1.5 12 1.5Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default AuthPage
