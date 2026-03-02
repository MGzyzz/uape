import BrandLogo from './BrandLogo.jsx'

function SiteHeader({ compact = false }) {
  return (
    <header className="sticky top-0 z-20 border-b border-uape-border-soft bg-uape-bg/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <BrandLogo />

        <div className="flex items-center gap-3">
          {!compact ? (
            <nav className="hidden items-center gap-6 text-sm text-uape-muted lg:flex">
              <a className="transition hover:text-uape-white" href="#why-hard">
                Why hard
              </a>
              <a className="transition hover:text-uape-white" href="#how-help">
                How it works
              </a>
              <a className="transition hover:text-uape-white" href="#faq">
                FAQ
              </a>
            </nav>
          ) : null}

          <a
            className="rounded-xl border border-uape-border-soft px-4 py-2 text-sm font-medium text-uape-white transition hover:border-uape-white/40"
            href="/login"
          >
            Log in
          </a>
          <a
            className="rounded-xl bg-uape-accent px-4 py-2 text-sm font-semibold text-uape-white transition hover:brightness-110"
            href="/signup"
          >
            Sign up
          </a>
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
