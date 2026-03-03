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
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-figtree text-[44px] font-semibold leading-13">How UAPE helps you learn effectively</h2>

        <div className="mt-8 flex flex-col gap-4">
          <div className="grid gap-4 md:grid-cols-[6fr_5fr]">
            <article className="relative min-h-[360px] w-full overflow-hidden rounded-2xl border border-uape-border-soft bg-uape-surface-strong">
              <img
                src="/assets/solution/skill-level.jpg"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/25" />
              <div className="relative z-10 p-5">
                <h3 className="font-figtree text-[32px] font-semibold leading-9">We identify your real skill level</h3>
                <p className="font-figtree mt-3 text-[16px] font-normal leading-6 text-uape-muted">Not by guesses, but by actual tasks and code analysis.</p>
              </div>
              <div className="absolute bottom-5 left-5 right-5 z-10 flex items-center justify-between">
                {solutionIcons.map((icon) => (
                  <div
                    key={icon.id}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/20 backdrop-blur-sm"
                  >
                    <img src={icon.src} alt="" aria-hidden="true" className="h-6 w-6 object-contain" />
                  </div>
                ))}
              </div>
            </article>

            <article className="relative isolate min-h-90 w-full overflow-hidden rounded-2xl border border-uape-border-soft bg-uape-surface-strong">
              <div className="relative z-20 p-5">
                <h3 className="font-figtree text-[32px] font-semibold leading-9">We adapt learning to you</h3>
                <p className="font-figtree mt-3 text-[16px] font-normal leading-6 text-uape-muted">Content changes based on your knowledge and progress.</p>
              </div>
              <div className="absolute bottom-5 left-1/2 z-10 h-[205px] w-[82%] max-w-[360px] -translate-x-1/2">
                <img
                  src="/assets/solution/frame-157.png"
                  alt=""
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 z-20 h-auto w-[56%] max-w-[220px]"
                />
                <img
                  src="/assets/solution/frame-158.png"
                  alt=""
                  aria-hidden="true"
                  className="absolute right-0 -top-8 z-10 h-auto w-[56%] max-w-[220px]"
                />
              </div>
            </article>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <article className="relative min-h-[360px] w-full overflow-hidden rounded-2xl border border-uape-border-soft bg-uape-surface-strong p-5">
              <h3 className="font-figtree text-[32px] font-semibold leading-9">We show your progress</h3>
              <p className="font-figtree mt-3 text-[16px] font-normal leading-6 text-uape-muted">You clearly see your level, growth, and next steps.</p>
              <div className="mt-8 flex items-center justify-center">
                <img
                  src="/assets/solution/frame-231.png"
                  alt="67 percent progress ring"
                  className="h-auto w-full max-w-[220px]"
                />
              </div>
            </article>

            <article className="relative min-h-[360px] w-full overflow-hidden rounded-2xl border border-uape-border-soft bg-uape-surface-strong">
              <img
                src="/assets/solution/save-time.jpg"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="relative z-10 p-5">
                <h3 className="font-figtree text-[32px] font-semibold leading-9">We save your time</h3>
                <p className="font-figtree mt-3 text-[16px] font-normal leading-6 text-uape-muted">You focus only on what you really need to learn.</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SolutionSection
