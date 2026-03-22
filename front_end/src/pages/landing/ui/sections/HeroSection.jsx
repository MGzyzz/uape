import { Link } from 'react-router-dom'
import { useAuth } from '../../../../app/AuthContext.jsx'
import heroVideo from '../../assets/2026-03-22 13-10-57.mp4'

function HeroSection() {
  const { isAuth } = useAuth()
  return (
    <section className="uape-hero-section uape-page-container uape-page-gutter flex flex-col items-center pt-30 text-center">
      <h1
        className="uape-hero-title relative z-2 max-w-5xl font-bold text-white"
      >
        Learn programming based
        <br />
        on your real skill level
      </h1>
      <p
        className="uape-hero-subtitle relative z-2 mt-4 font-normal text-uape-muted"
      >
        Most platforms guess what you need. <br /> UAPE measures your actual knowledge and builds a learning <br /> path
        that fits you &mdash; no more, no less.
      </p>

      <div className="relative z-2 mt-8 flex flex-wrap items-center justify-center gap-4 ml-5">
        <Link
          to={isAuth ? '/diagnostic' : '/login'}
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

      <div className="uape-hero-video-wrapper">
        <video
          className="uape-hero-video"
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
    </section>
  )
}

export default HeroSection
