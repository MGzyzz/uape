import { Link } from 'react-router-dom'
import DiagnosticTicker from '../../../../shared/ui/DiagnosticTicker.jsx'

function HeroSection() {
  return (
    <section className="uape-page-container uape-page-gutter flex flex-col items-center pb-20 pt-8 text-center">
      <h1
        className="uape-hero-title max-w-5xl font-bold text-white"
      >
        Learn programming based
        <br />
        on your real skill level
      </h1>
      <p
        className="uape-hero-subtitle mt-6 font-normal text-uape-muted"
      >
        Most platforms guess what you need. <br /> UAPE measures your actual knowledge and builds a learning <br /> path
        that fits you &mdash; no more, no less.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/signup"
          className="uape-orange-btn rounded-[10px] px-7 py-3 text-base font-normal leading-6"
        >
          Start diagnostic
        </Link>
        <a
          href="#solution"
          className="rounded-[10px] bg-white px-7 py-3 text-base font-normal leading-6 text-uape-bg transition hover:bg-white/90"
        >
          How does it work?
        </a>
      </div>

      <DiagnosticTicker />
    </section>
  )
}

export default HeroSection
