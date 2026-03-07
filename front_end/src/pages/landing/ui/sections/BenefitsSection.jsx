import teamWorkImg from '../../../../shared/assets/solution/team-work.png'
import carouselIcon from '../../../../shared/assets/icons/Carousel.svg'
import roadIcon from '../../../../shared/assets/icons/Road.svg'
import listCheckIcon from '../../../../shared/assets/icons/ListCheck.svg'

const features = [
  { icon: carouselIcon, text: 'Personalized learning for each user' },
  { icon: roadIcon, text: 'Adaptive paths based on real skills' },
  { icon: listCheckIcon, text: 'Objective assessment of your level before learning' },
]

function BenefitsSection() {
  return (
    <section id="benefits" className="bg-uape-bg">
      <div className="uape-section-shell flex flex-col gap-[60px]">
        <h2 className="font-figtree text-[44px] font-semibold leading-[52px] tracking-[0%] text-white">
          Why UAPE is not just another course
        </h2>

        <div className="grid gap-7 md:grid-cols-[791px_382px]">
          {/* Left: image */}
          <div className="h-[524px] w-[791px] overflow-hidden rounded-[24px]">
            <img
              src={teamWorkImg}
              alt="Team working together"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Right: feature cards */}
          <div className="flex h-[524px] w-[382px] flex-col gap-7">
            {features.map((item) => (
              <div
                key={item.text}
                className="flex h-[156px] flex-col rounded-[24px] bg-uape-form-bg px-6 pb-6 pt-6"
              >
                <img
                  src={item.icon}
                  alt=""
                  aria-hidden="true"
                  className="h-11 w-11"
                />
                <p className="mt-auto w-[333px] font-figtree text-[20px] font-medium leading-7 tracking-[0%] text-white">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default BenefitsSection
