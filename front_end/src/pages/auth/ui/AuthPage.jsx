import SiteHeader from '../../../shared/ui/SiteHeader.jsx'

function AuthPage({ mode }) {
  const isSignup = mode === 'signup'

  return (
    <div className="min-h-screen bg-uape-bg text-uape-white">
      <SiteHeader compact />

      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <section className="rounded-2xl border border-uape-border-soft bg-uape-bg p-6 sm:p-10">
            <h1 className="text-3xl font-bold sm:text-5xl">{isSignup ? 'Registration by email' : 'Log in by email'}</h1>

            <form className="mt-8 space-y-6" autoComplete="off">
              {isSignup ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2">
                    <span className="block text-sm font-medium text-uape-muted">First name</span>
                    <input
                      type="text"
                      placeholder="John"
                      className="h-12 w-full rounded-xl border border-uape-border-soft bg-uape-surface px-4 text-base text-uape-white outline-none transition placeholder:text-uape-muted/80 focus:border-uape-accent"
                    />
                  </label>
                  <label className="space-y-2">
                    <span className="block text-sm font-medium text-uape-muted">Last name</span>
                    <input
                      type="text"
                      placeholder="Doe"
                      className="h-12 w-full rounded-xl border border-uape-border-soft bg-uape-surface px-4 text-base text-uape-white outline-none transition placeholder:text-uape-muted/80 focus:border-uape-accent"
                    />
                  </label>
                </div>
              ) : null}

              <label className="space-y-2">
                <span className="block text-sm font-medium text-uape-muted">Your email</span>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  className="h-12 w-full rounded-xl border border-uape-border-soft bg-uape-surface px-4 text-base text-uape-white outline-none transition placeholder:text-uape-muted/80 focus:border-uape-accent"
                />
              </label>

              <label className="space-y-2">
                <span className="block text-sm font-medium text-uape-muted">Your password</span>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="h-12 w-full rounded-xl border border-uape-border-soft bg-uape-surface px-4 text-base text-uape-white outline-none transition placeholder:text-uape-muted/80 focus:border-uape-accent"
                />
              </label>

              {!isSignup ? (
                <label className="inline-flex cursor-pointer items-center gap-3 text-sm text-uape-muted">
                  <input type="checkbox" className="size-4 rounded border-uape-border-soft bg-uape-surface" />
                  Remember me
                </label>
              ) : null}

              <button
                type="submit"
                className="h-12 w-full rounded-xl bg-uape-accent text-base font-semibold text-uape-white transition hover:brightness-110"
              >
                {isSignup ? 'Sign up' : 'Log in'}
              </button>
            </form>

            <div className="my-8 flex items-center gap-4 text-sm text-uape-muted">
              <span className="h-px flex-1 bg-uape-border-soft" />
              <span>Other {isSignup ? 'sign up' : 'log in'} options</span>
              <span className="h-px flex-1 bg-uape-border-soft" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="rounded-xl border border-uape-border-soft bg-uape-surface px-4 py-3 text-sm font-medium text-uape-white transition hover:border-uape-white/40"
              >
                Google
              </button>
              <button
                type="button"
                className="rounded-xl border border-uape-border-soft bg-uape-surface px-4 py-3 text-sm font-medium text-uape-white transition hover:border-uape-white/40"
              >
                Facebook
              </button>
            </div>

            <p className="mt-7 text-sm text-uape-muted">
              {isSignup ? 'Already have an account? ' : 'No account yet? '}
              <a className="font-semibold text-uape-white underline underline-offset-4" href={isSignup ? '/login' : '/signup'}>
                {isSignup ? 'Log in' : 'Sign up'}
              </a>
            </p>
          </section>

          <section className="relative overflow-hidden rounded-3xl border border-uape-border-soft bg-[radial-gradient(circle_at_70%_15%,#ff9f36_0%,#eb4823_30%,#60111a_60%,#0f1112_95%)] p-8 sm:p-10">
            <div className="absolute inset-0 bg-[linear-gradient(150deg,#ffffff05_0%,#00000040_60%)]" />
            <div className="relative flex h-full min-h-[320px] items-end">
              <h2 className="max-w-md text-3xl font-bold leading-tight sm:text-5xl">
                Start with clarity.
                <br />
                Learn with confidence.
              </h2>
            </div>
          </section>
        </div>
      </main>

      <footer className="mt-12 border-t border-uape-border-soft bg-[radial-gradient(circle_at_10%_5%,#2b344388_0%,#0f1112_40%)]">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-3xl font-bold tracking-wide text-uape-lime sm:text-5xl">YOU&apos;RE ADAPTIVE PROGRAMMING EDUCATION</p>
          <div className="mt-8 flex flex-col justify-between gap-6 border-t border-uape-border-soft pt-6 text-uape-muted md:flex-row md:items-center">
            <div>
              <p>Project developed as part of a final qualification work</p>
              <p className="mt-2">&copy; Copyright 2026 UAPE</p>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-uape-white">
              <a href="mailto:example@gmail.com">example@gmail.com</a>
              <a href="tel:+77777777777">+7 777 777 7777</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default AuthPage
