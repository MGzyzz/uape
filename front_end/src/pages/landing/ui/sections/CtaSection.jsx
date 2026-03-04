import { Link } from 'react-router-dom'
import ctaImage from '../../../../shared/assets/solution/working-process.jpg'

function CtaSection() {
  return (
    <section className="relative">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[#181A1B]" aria-hidden="true" />
      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-4 px-4 pb-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <article
          className="uape-shadow-soft-32 rounded-[24px] bg-[#27292A] p-8 md:p-10"
        >
          <h3 className="font-figtree text-[44px] font-semibold leading-[52px] tracking-[0%] text-white">
            Start learning with a clear understanding of your level
          </h3>
          <p className="font-figtree mt-6 text-[16px] font-normal leading-6 tracking-[0%] text-[#FFFFFFC2]">
            UAPE helps you enhance your skills, expand you knowledge, and prepare for technical interviews with
            confidence.
          </p>
          <Link
            to="/signup"
            className="font-figtree mt-8 inline-flex rounded-[8px] bg-[#EB4823] px-6 py-3 text-[16px] font-normal leading-6 tracking-[0%] text-white transition hover:brightness-110"
          >
            Start diagnostic
          </Link>
        </article>

        <article
          className="uape-shadow-soft-32 relative min-h-[320px] overflow-hidden rounded-[24px] md:min-h-[420px]"
        >
          <img
            src={ctaImage}
            alt="Developer working at a desk with code on monitor"
            className="h-full w-full object-cover"
          />
        </article>
      </div>
    </section>
  )
}

export default CtaSection
