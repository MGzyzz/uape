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
      <div className="uape-section-shell">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">Who the platform is for</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {audienceCards.map((card) => (
            <article key={card.title} className={`rounded-3xl p-6 ${card.bgColor}`}>
              <div className="mb-5 inline-flex rounded-2xl bg-white p-3">
                <card.Icon className={card.iconClass} />
              </div>
              <h3 className="text-lg font-bold text-white">{card.title}</h3>
              <p className="mt-2 text-sm text-white/80">{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AudienceSection
