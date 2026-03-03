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
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold sm:text-3xl">Why UAPE is not just another course</h2>

        <div className="mt-8 grid gap-4 md:grid-cols-[3fr_2fr]">
          {/* Left: image */}
          <div className="overflow-hidden rounded-3xl">
            <img
              src={teamWorkImg}
              alt="Team working together"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Right: feature cards */}
          <div className="flex flex-col gap-6">
            {features.map((item) => (
              <div
                key={item.text}
                className="flex flex-1 flex-col justify-between rounded-3xl bg-uape-form-bg px-6 pb-6 pt-4"
              >
                <img src={item.icon} alt="" aria-hidden="true" className="h-11 w-11" />
                <p className="mt-4 text-xl font-medium leading-7 text-white">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default BenefitsSection
