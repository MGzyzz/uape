const solutionIcons = [
  { id: 'vector', src: '/assets/solution/icons/vector.svg' },
  { id: 'vector-1', src: '/assets/solution/icons/vector-1.svg' },
  { id: 'crown', src: '/assets/solution/icons/crown.svg' },
  { id: 'settings', src: '/assets/solution/icons/settings.svg' },
  { id: 'bug', src: '/assets/solution/icons/bug.svg' },
]

function SolutionSection() {
  return (
    <section id="solution" className="bg-uape-header">
      <div className="uape-section-shell">
        <h2 className="font-figtree text-[44px] font-semibold leading-13">How UAPE helps you learn effectively</h2>

        <div className="mt-8 flex flex-col gap-4">
          <div className="grid gap-4 md:grid-cols-[6fr_5fr]">
            <article className="uape-surface-card-strong relative h-[512px] w-full">
              <img
                src="/assets/solution/skill-level.jpg"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/25" />
              <CardTextContent
                title="We identify your real skill level"
                description="Not by guesses, but by actual tasks and code analysis."
              />
              <div className="absolute bottom-5 left-0 right-0 z-10 flex items-center justify-between">
                {solutionIcons.map((icon) => (
                  <div
                    key={icon.id}
                    className="flex h-24 w-24 items-center justify-center gap-[10px] rounded-[1000px] border border-white/30 bg-white/20 p-6 backdrop-blur-sm"
                  >
                    <img src={icon.src} alt="" aria-hidden="true" className="h-12 w-12 object-contain" />
                  </div>
                ))}
              </div>
            </article>

            <article className="uape-surface-card-strong relative isolate h-[512px] w-full">
              <CardTextContent
                title="We adapt learning to you"
                description="Content changes based on your knowledge and progress."
              />
              <div className="absolute inset-0 z-10 overflow-hidden rounded-3xl">
                <img
                  src="/assets/solution/frame-157.png"
                  alt=""
                  aria-hidden="true"
                  className="absolute bottom-14 left-[72px] z-20 h-[220px] w-[220px] rounded-[12px] object-cover"
                />
                <img
                  src="/assets/solution/frame-158.png"
                  alt=""
                  aria-hidden="true"
                  className="absolute right-[72px] top-[152px] z-10 h-[220px] w-[220px] rounded-[12px] object-cover"
                />
              </div>
            </article>
          </div>

          <div className="grid gap-4 md:grid-cols-[5fr_6fr]">
            <article className="uape-surface-card-strong relative h-[512px] w-full">
              <CardTextContent
                title="We show your progress"
                description="You clearly see your level, growth, and next steps."
              />
              <div className="mt-5 flex items-center justify-center px-5">
                <img
                  src="/assets/solution/frame-231.png"
                  alt="67 percent progress ring"
                  className="h-[280px] w-[280px]"
                />
              </div>
            </article>

            <article className="uape-surface-card-strong relative h-[512px] w-full">
              <img
                src="/assets/solution/save-time.jpg"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
              <CardTextContent
                title="We save your time"
                description="You focus only on what you really need to learn."
              />
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}

function CardTextContent({ title, description }) {
  return (
    <div className="relative z-20 flex flex-col gap-3 px-9 py-8">
      <h3 className="uape-card-title-lg">{title}</h3>
      <p className="uape-card-text">{description}</p>
    </div>
  )
}

export default SolutionSection
