import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SiteHeader from '../../../shared/ui/SiteHeader.jsx'
import SiteFooter from '../../../shared/ui/SiteFooter.jsx'
import authImage from '../../../shared/assets/solution/auth.jpg'
import welcomeBackImage from '../../../shared/assets/solution/welcome-back.png'
import eyeIcon from '../../../shared/assets/icons/Eye.svg'
import { register, login, saveTokens } from '../../../api/auth.js'

function AuthPage({ mode }) {
  const isSignup = mode === 'signup'
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [fields, setFields] = useState({
    firstName: '', lastName: '', email: '', password: '',
  })

  const handleChange = (e) => {
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
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
      navigate('/')
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
    <section className="relative overflow-hidden rounded-3xl">
      <img
        src={isSignup ? authImage : welcomeBackImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        style={isSignup
          ? { transform: 'translateX(-35%) rotate(270deg) scale(1.5)', transformOrigin: 'center' }
          : undefined
        }
      />
      <div className={`relative flex h-full items-end p-8 sm:p-10 ${isSignup ? 'min-h-130' : 'min-h-190'}`}>
        <h2 className="text-3xl font-bold leading-tight sm:text-4xl [text-shadow:0_2px_12px_rgba(0,0,0,0.8)]">
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
    <section className="rounded-lg p-6 sm:p-10">
      <h1 className="text-3xl font-bold sm:text-4xl">
        {isSignup ? 'Registration by email' : 'Log in by email'}
      </h1>

      <form className="mt-8 space-y-5" autoComplete="off" onSubmit={handleSubmit}>
        {isSignup ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="block text-xl font-medium text-uape">First name</span>
              <input
                type="text"
                name="firstName"
                placeholder="John"
                value={fields.firstName}
                onChange={handleChange}
                required
                className="h-12 w-full rounded-lg border border-uape-border-soft bg-uape-form-bg px-4 text-base text-uape-white outline-none transition placeholder:text-uape-muted/60 focus:border-uape-accent mb-2"
              />
            </label>
            <label className="space-y-2">
              <span className="block text-xl font-medium text-uape">Last name</span>
              <input
                type="text"
                name="lastName"
                placeholder="Doe"
                value={fields.lastName}
                onChange={handleChange}
                required
                className="h-12 w-full rounded-lg border border-uape-border-soft bg-uape-form-bg px-4 text-base text-uape-white outline-none transition placeholder:text-uape-muted/60 focus:border-uape-accent"
              />
            </label>
          </div>
        ) : null}

        <label className="space-y-2">
          <span className="block text-xl font-medium text-uape">Your email</span>
          <input
            type="email"
            name="email"
            placeholder="example@gmail.com"
            value={fields.email}
            onChange={handleChange}
            required
            className="h-12 w-full rounded-lg border border-uape-border-soft bg-uape-form-bg px-4 text-base text-uape-white outline-none transition placeholder:text-uape-muted/60 focus:border-uape-accent mb-5"
          />
        </label>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xl font-medium text-uape">Your password</span>
            {!isSignup && (
              <Link
                to="/forgot-password"
                className="text-sm text-uape-muted transition hover:text-uape-white"
              >
                Forgot password?
              </Link>
            )}
          </div>
          <div className="relative h-12">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter your password"
              value={fields.password}
              onChange={handleChange}
              required
              className="h-12 w-full rounded-lg border border-uape-border-soft bg-uape-form-bg px-4 pr-12 text-base text-uape-white outline-none transition placeholder:text-uape-muted/60 focus:border-uape-accent"
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
        </div>

        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-10! h-12 w-full rounded-lg bg-uape-accent text-base font-semibold text-uape-white transition hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (isSignup ? 'Signing up…' : 'Logging in…') : (isSignup ? 'Sign up' : 'Log in')}
        </button>
      </form>

      <div className="my-7 flex items-center gap-4 text-sm text-uape-muted">
        <span className="h-px flex-1 bg-uape-border-soft" />
        <span>Other {isSignup ? 'sign up' : 'log in'} options</span>
        <span className="h-px flex-1 bg-uape-border-soft" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className="flex items-center justify-center gap-3 rounded-lg border border-uape-border-soft bg-uape-surface px-5 py-3.5 text-sm font-medium text-uape-white transition hover:border-uape-white/40"
        >
          <GoogleIcon />
          Google
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-3 rounded-lg border border-uape-border-soft bg-uape-surface px-5 py-3.5 text-sm font-medium text-uape-white transition hover:border-uape-white/40"
        >
          <FacebookIcon />
          Facebook
        </button>
      </div>

      <p className="mt-7 text-center text-sm text-uape-muted">
        {isSignup ? 'Already have an account? ' : 'No account yet? '}
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

      <main className="mx-auto w-full flex-1 max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className={`grid gap-6 ${isSignup ? 'lg:grid-cols-[1fr_1.2fr]' : 'lg:grid-cols-[1.2fr_1fr]'}`}>
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

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.566 2.684-3.874 2.684-6.615z" fill="#4285F4" />
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853" />
      <path d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05" />
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 6.293C4.672 4.166 6.656 3.58 9 3.58z" fill="#EA4335" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M18 9a9 9 0 1 0-10.406 8.891v-6.29H5.313V9h2.281V7.019c0-2.252 1.341-3.497 3.396-3.497.984 0 2.013.176 2.013.176v2.213H11.93c-1.117 0-1.465.693-1.465 1.404V9h2.492l-.398 2.601H10.47v6.29A9.003 9.003 0 0 0 18 9z" fill="#1877F2" />
      <path d="M12.559 11.601L12.957 9H10.47V7.315c0-.711.348-1.404 1.464-1.404h1.074V1.698S11.98 1.522 10.996 1.522c-2.055 0-3.397 1.245-3.397 3.497V9H5.318v2.601h2.281v6.29a9.074 9.074 0 0 0 2.875 0v-6.29h2.085z" fill="white" />
    </svg>
  )
}

export default AuthPage
