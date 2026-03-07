import { Link } from 'react-router-dom'
import DiagnosticTicker from '../../../../shared/ui/DiagnosticTicker.jsx'

function HeroSection() {
  return (
    <section className="uape-page-container uape-page-gutter flex flex-col items-center pb-20 pt-30 text-center">
      <h1
        className="uape-hero-title max-w-5xl font-bold text-white"
      >
        Learn programming based
        <br />
        on your real skill level
      </h1>
      <p
        className="uape-hero-subtitle mt-4 font-normal text-uape-muted"
      >
        Most platforms guess what you need. <br /> UAPE measures your actual knowledge and builds a learning <br /> path
        that fits you &mdash; no more, no less.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4 ml-5">
        <Link
          to="/signup"
          className="uape-orange-btn px-6 py-3 text-base font-normal leading-6"
        >
          Start diagnostic
        </Link>
        <a
          href="#solution"
          className="rounded-lg bg-white px-6 py-3 text-base font-normal leading-6 text-uape-bg transition hover:bg-white/90"
        >
          How does it work?
        </a>
      </div>

      <DiagnosticTicker />
    </section>
  )
}

export default HeroSection
