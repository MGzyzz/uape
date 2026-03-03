import { Link } from 'react-router-dom'
import BrandLogo from './BrandLogo.jsx'

function SiteHeader({ compact = false }) {
  return (
    <header className="sticky top-0 z-20 bg-uape-header">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <BrandLogo />
          {!compact ? (
            <nav className="hidden items-center gap-7 text-base font-normal leading-6 text-uape-muted lg:flex">
              <a className="transition hover:text-uape-white" href="#problems">
                Problems
              </a>
              <a className="transition hover:text-uape-white" href="#solution">
                Solution
              </a>
              <a className="transition hover:text-uape-white" href="#assessment">
                Assessment
              </a>
              <a className="transition hover:text-uape-white" href="#for-whom">
                For whom
              </a>
              <a className="transition hover:text-uape-white" href="#technology">
                Technology
              </a>
            </nav>
          ) : null}
        </div>

        <div className="flex items-center gap-4">
          <Link
            className="px-1 text-base font-normal leading-6 text-uape-muted transition hover:text-uape-white"
            to="/login"
          >
            Log in
          </Link>
          <Link
            className="rounded-lg bg-uape-accent px-4 py-2 text-base font-normal leading-6 text-uape-white transition hover:brightness-110"
            to="/signup"
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
