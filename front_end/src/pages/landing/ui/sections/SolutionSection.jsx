const solutionIcons = [
  { id: 'vector', src: '/assets/solution/icons/vector.svg' },
  { id: 'vector-1', src: '/assets/solution/icons/vector-1.svg' },
  { id: 'bug', src: '/assets/solution/icons/bug.svg' },
  { id: 'settings', src: '/assets/solution/icons/settings.svg' },
  { id: 'crown', src: '/assets/solution/icons/crown.svg' },
]

function SolutionSection() {
  return (
    <section id="solution" className="bg-uape-header">
      <div className="uape-section-shell flex flex-col gap-[60px] pt-[80px] pb-[100px]">
        <h2 className="font-figtree text-[44px] font-semibold leading-13">How UAPE helps you learn effectively</h2>

        <div className="flex flex-col gap-7">
          <div className="grid gap-7 md:grid-cols-[614px_558px]">
            <article className="uape-surface-card-strong relative h-[512px] w-[614px]">
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
                widthClass="w-[440px]"
              />
              <div className="absolute left-0 top-[376px] z-10 flex h-24 w-[614px] items-center justify-between">
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

            <article className="uape-surface-card-strong relative isolate h-[512px] w-[558px]">
              <CardTextContent
                title="We adapt learning to you"
                description="Content changes based on your knowledge and progress."
                widthClass="w-[411px]"
              />
              <div className="absolute inset-0 z-10 overflow-hidden rounded-3xl">
                <img
                  src="/assets/solution/frame-157.png"
                  alt=""
                  aria-hidden="true"
                  className="absolute left-[99px] top-[252px] z-20 h-[220px] w-[220px] rounded-[12px] object-cover"
                />
                <img
                  src="/assets/solution/frame-158.png"
                  alt=""
                  aria-hidden="true"
                  className="absolute left-[239px] top-[152px] z-10 h-[220px] w-[220px] rounded-[12px] object-cover"
                />
              </div>
            </article>
          </div>

          <div className="grid gap-7 md:grid-cols-[558px_614px]">
            <article className="uape-surface-card-strong relative h-[512px] w-[558px]">
              <CardTextContent
                title="We show your progress"
                description="You clearly see your level, growth, and next steps."
                widthClass="w-[353px]"
              />
              <div className="absolute left-[139px] top-[170px]">
                <img
                  src="/assets/solution/frame-231.png"
                  alt="67 percent progress ring"
                  className="h-[280px] w-[280px]"
                />
              </div>
            </article>

            <article className="uape-surface-card-strong relative h-[512px] w-[614px]">
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
                widthClass="w-[340px]"
              />
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}

function CardTextContent({ title, description, widthClass = 'w-[440px]' }) {
  return (
    <div className={`relative z-20 flex flex-col gap-3 px-10 py-10 ${widthClass}`}>
      <h3 className="font-figtree text-[32px] font-semibold leading-[36px] tracking-[0%] text-white">{title}</h3>
      <p className="font-figtree text-[16px] font-normal leading-6 tracking-[0%] text-[#FFFFFFC2]">{description}</p>
    </div>
  )
}

export default SolutionSection
