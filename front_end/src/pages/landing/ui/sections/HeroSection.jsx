import { Link } from 'react-router-dom'
import DiagnosticTicker from '../../../../shared/ui/DiagnosticTicker.jsx'

function HeroSection() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 pb-20 pt-8 text-center sm:px-6 lg:px-8">
      <h1
        className="max-w-5xl font-bold text-white"
        style={{ fontSize: '76px', lineHeight: '80px', letterSpacing: '0%' }}
      >
        Learn programming based
        <br />
        on your real skill level
      </h1>
      <p
        className="mt-6 max-w-3xl font-normal text-uape-muted"
        style={{ fontSize: '16px', lineHeight: '24px', letterSpacing: '0%' }}
      >
        Most platforms guess what you need. <br /> UAPE measures your actual knowledge and builds a learning <br /> path
        that fits you &mdash; no more, no less.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/signup"
          className="rounded-[10px] bg-uape-accent px-7 py-3 text-base font-normal leading-6 text-uape-white transition hover:brightness-110"
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
