import { BugIcon, GraduationCapIcon, PlantIcon, SearchIcon } from '../../../../shared/ui/AudienceIcons.jsx'

const audienceCards = [
  {
    title: 'Beginners',
    text: 'Who want a clear and structured start.',
    bgColor: 'bg-uape-green',
    Icon: PlantIcon,
    iconClass: 'text-[#30A14E]',
  },
  {
    title: 'Students',
    text: 'Who want to strengthen their knowledge and prepare for exams or interviews.',
    bgColor: 'bg-uape-blue-glow',
    Icon: GraduationCapIcon,
    iconClass: 'text-[#4183C4]',
  },
  {
    title: 'Self-taught learners',
    text: 'Who feel gaps in their knowledge and want structure.',
    bgColor: 'bg-uape-violet-glow',
    Icon: SearchIcon,
    iconClass: 'text-[#B05BFF]',
  },
  {
    title: 'Junior developers',
    text: 'Who want to grow faster and understand their real level.',
    bgColor: 'bg-uape-amber-glow',
    Icon: BugIcon,
    iconClass: 'text-[#FEBE02]',
  },
]

function AudienceSection() {
  return (
    <section id="for-whom">
      <div className="uape-section-shell flex flex-col gap-[60px]">
        <h2 className="text-center font-figtree text-[44px] font-semibold leading-[52px] tracking-[0%] text-white">
          Who the platform is for
        </h2>
        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-4">
          {audienceCards.map((card) => (
            <article
              key={card.title}
              className={`flex min-h-[244px] flex-col gap-6 rounded-[24px] border border-uape-border-soft px-6 pb-8 pt-6 ${card.bgColor}`}
            >
              <div className="inline-flex h-[60px] w-[60px] items-center justify-center rounded-[12px] border border-uape-border-soft bg-white p-3">
                <card.Icon className={card.iconClass} />
              </div>
              <h3 className="w-[231px] font-figtree text-[24px] font-semibold leading-7 tracking-[0%] text-white">
                {card.title}
              </h3>
              <p className="w-[231px] font-figtree text-[16px] font-normal leading-6 tracking-[0%] text-[#FFFFFFC2]">
                {card.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AudienceSection
