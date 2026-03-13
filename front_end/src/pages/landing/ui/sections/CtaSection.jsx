import { Link } from 'react-router-dom'
import ctaImage from '../../../../shared/assets/solution/working-process.jpg'

function CtaSection() {
  return (
    <section className="relative">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[#181A1B]" aria-hidden="true" />
      <div className="uape-page-container uape-page-gutter relative z-10 grid gap-7 pb-20 lg:grid-cols-[586px_586px]">
        <article
          className="uape-shadow-soft-32 flex h-[420px] flex-col gap-8 rounded-[24px] bg-[#27292A] px-10 pb-[60px] pt-[60px]"
        >
          <h3 className="w-[506px] font-figtree text-[44px] font-semibold leading-[52px] tracking-[0%] text-white">
            Start learning with a clear understanding of your level
          </h3>
          <p className="w-[440px] font-figtree text-[16px] font-normal leading-6 tracking-[0%] text-[#FFFFFFC2]">
            UAPE helps you enhance your skills, expand you knowledge, and prepare for technical interviews with
            confidence.
          </p>
          <Link
            to={localStorage.getItem('access') ? '/diagnostic' : '/login'}
            className="uape-orange-btn font-figtree inline-flex h-12 w-[163px] items-center justify-center rounded-[8px] px-6 py-3 text-[16px] font-normal leading-6 tracking-[0%]"
          >
            Start diagnostic
          </Link>
        </article>

        <article
          className="uape-shadow-soft-32 relative h-[408px] overflow-hidden rounded-[24px]"
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
