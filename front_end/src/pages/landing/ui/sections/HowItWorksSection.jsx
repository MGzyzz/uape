import stepArrowIcon from '../../../../shared/assets/how-it-works/vector.svg'

const howItWorksSteps = [
  {
    step: 'Step 1',
    title: 'You choose a programming language',
    text: 'Start with the technology you want to learn.',
    textBox: { left: 0, top: 0, width: 279, height: 116 },
    line: { left: 138, top: 136, height: 260 },
    badge: { left: 65, top: 416, width: 148 },
  },
  {
    step: 'Step 2',
    title: 'You take a knowledge assessment',
    text: 'Practical and theoretical tasks instead of simple quizzes.',
    textBox: { left: 307, top: 188, width: 279, height: 116 },
    line: { left: 445, top: 324, height: 72 },
    badge: { left: 371, top: 416, width: 151 },
  },
  {
    step: 'Step 3',
    title: 'The system analyzes the results',
    text: 'Your answers, code, and mistakes are evaluated.',
    textBox: { left: 614, top: 60, width: 279, height: 116 },
    line: { left: 753, top: 196, height: 200 },
    badge: { left: 679, top: 416, width: 151 },
  },
  {
    step: 'Step 4',
    title: 'You receive a personalized learning path',
    text: 'A clear plan tailored specifically to your level.',
    textBox: { left: 921, top: 160, width: 279, height: 144 },
    line: { left: 1060, top: 324, height: 72 },
    badge: { left: 984, top: 416, width: 153 },
    hasGlow: true,
  },
]

const bottomMarkers = Array.from({ length: 99 }, (_, index) => index)

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative overflow-hidden bg-uape-bg">
      <div className="uape-page-container uape-page-gutter py-16">
        <div className="flex flex-col gap-[60px] lg:hidden">
          <h2 className="text-center font-figtree text-[44px] font-semibold leading-[52px] tracking-[0%]">
            How it works
          </h2>

          <div className="grid gap-10 sm:grid-cols-2">
            {howItWorksSteps.map((item) => (
              <article key={item.step} className="relative rounded-[24px] border border-[#FFFFFF1F] bg-[#0F1215C9] p-8 text-center">
                <h3 className="font-figtree text-[24px] font-semibold leading-7 tracking-[0%] text-white">{item.title}</h3>
                <p className="mt-3 font-figtree text-[16px] font-normal leading-6 tracking-[0%] text-[#FFFFFFC2]">
                  {item.text}
                </p>
                <span className="mt-6 inline-flex h-16 items-center justify-center gap-4 rounded-[12px] border border-[#FFFFFF1F] bg-[#0F1215C9] px-[18px] shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-[4px]">
                  <span className="font-figtree text-[24px] font-medium leading-7 tracking-[0%] text-white">{item.step}</span>
                  <img src={stepArrowIcon} alt="" aria-hidden="true" className="h-7 w-7 object-contain" />
                </span>
              </article>
            ))}
          </div>
        </div>

        <div className="relative hidden h-[592px] flex-col gap-[60px] lg:flex">
          <h2 className="relative z-10 h-[52px] text-center font-figtree text-[44px] font-semibold leading-[52px] tracking-[0%] text-white">
            How it works
          </h2>

          <div className="relative z-10 h-[480px] w-[1200px]">
            <div aria-hidden="true" className="absolute left-0 top-[436px] h-6 w-[1200px]">
              <div className="absolute inset-0 flex items-center justify-between">
                {bottomMarkers.map((marker) => (
                  <span key={marker} className="block h-6 w-[6px] bg-[#EAF27C]" />
                ))}
              </div>
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(90deg, rgba(8, 9, 10, 0.56) 0%, rgba(8, 9, 10, 0) 100%)',
                }}
              />
            </div>

            {howItWorksSteps.map((item) => (
              <article key={item.step} className="absolute inset-0">
                <div
                  className="absolute flex flex-col items-center gap-3 text-center"
                  style={{
                    left: `${item.textBox.left}px`,
                    top: `${item.textBox.top}px`,
                    width: `${item.textBox.width}px`,
                    minHeight: `${item.textBox.height}px`,
                  }}
                >
                  <h3 className="font-figtree text-[24px] font-semibold leading-7 tracking-[0%] text-white">
                    {item.title}
                  </h3>
                  <p className="font-figtree text-[16px] font-normal leading-6 tracking-[0%] text-[#FFFFFFC2]">
                    {item.text}
                  </p>
                </div>

                <span
                  aria-hidden="true"
                  className="absolute w-[2px]"
                  style={{
                    left: `${item.line.left}px`,
                    top: `${item.line.top}px`,
                    height: `${item.line.height}px`,
                    background: 'linear-gradient(180deg, #EAF27C 0%, rgba(234, 242, 124, 0) 100%)',
                  }}
                />

                <div
                  className="absolute inline-flex h-16 items-center justify-center gap-4 overflow-hidden rounded-[12px] border border-[#FFFFFF1F] px-[18px] shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
                  style={{
                    left: `${item.badge.left}px`,
                    top: `${item.badge.top}px`,
                    width: `${item.badge.width}px`,
                    background: '#181A1B8F',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                  }}
                >
                  <span className="whitespace-nowrap font-figtree text-[24px] font-medium leading-7 tracking-[0%] text-white">{item.step}</span>
                  <img src={stepArrowIcon} alt="" aria-hidden="true" className="h-7 w-7 object-contain" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection
