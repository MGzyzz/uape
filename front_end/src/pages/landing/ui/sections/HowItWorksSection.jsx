import stepArrowIcon from '../../../../shared/assets/how-it-works/vector.svg'

const howItWorksSteps = [
  {
    step: 'Step 1',
    title: 'You choose a programming language',
    text: 'Start with the technology you want to learn.',
    offsetClass: 'lg:-mt-30',
  },
  {
    step: 'Step 2',
    title: 'You take a knowledge assessment',
    text: 'Practical and theoretical tasks instead of simple quizzes.',
    offsetClass: 'lg:mt-15',
  },
  {
    step: 'Step 3',
    title: 'The system analyzes the results',
    text: 'Your answers, code, and mistakes are evaluated.',
    offsetClass: 'lg:-mt-20',
  },
  {
    step: 'Step 4',
    title: 'You receive a personalized learning path',
    text: 'A clear plan tailored specifically to your level.',
    offsetClass: 'lg:mt-10',
    hasGlow: true,
  },
]

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative bg-uape-bg">
      {/* EDITABLE: здесь настраивается общий размер секции (ширина + внешние отступы). */}
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* EDITABLE: меняй --how-it-works-title-shift чтобы поднимать/опускать ТОЛЬКО заголовок. */}
        <div className="relative [--how-it-works-title-shift:0px] lg:[--how-it-works-title-shift:-35px]">
          <h2 className="font-figtree relative z-10 translate-y-[var(--how-it-works-title-shift)] text-center text-[44px] font-semibold leading-[52px] tracking-[0%]">
            How it works
          </h2>

          {/*
            EDITABLE:
            1) bottom-* у линии = высота пунктира.
            2) h-* у линии = толщина пунктира.
            3) repeating-linear-gradient = длина штриха и зазор.
          */}
          <div
            className="uape-how-dash-vars relative mt-14 lg:pt-20 lg:[--step-bottom:18px] lg:[--step-height:50px] lg:[--dash-h:21px] lg:[--dash-size:8px] lg:[--dash-gap:6px]"
          >
            <div className="uape-how-dash-line pointer-events-none absolute inset-x-5 hidden lg:block lg:bottom-[calc(var(--step-bottom)+var(--step-height)/2-var(--dash-h)/2)] lg:h-[var(--dash-h)]" />

            <div className="relative z-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {howItWorksSteps.map((item) => (
                <article
                  key={item.step}
                  className="relative isolate flex flex-col items-center text-center lg:min-h-[390px] lg:pb-16"
                >
                  {item.hasGlow && (
                    <div
                      className="uape-how-step-glow pointer-events-none absolute left-1/2 top-[30%] -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[72px]"
                    />
                  )}
                  <div className={`relative z-10 mx-auto max-w-[16rem] ${item.offsetClass}`}>
                    <h3 className="font-figtree text-[24px] font-semibold leading-7 tracking-[0%]">{item.title}</h3>
                    <p className="font-figtree mt-4 text-[16px] font-normal leading-6 tracking-[0%] text-[#f0f3f7b3]">
                      {item.text}
                    </p>
                  </div>

                  {/* flex-1 растягивает вертикальную линию, фиксируя бейдж у нижнего края */}
                  <div className="mt-5 flex flex-1 items-start justify-center lg:pb-[calc(var(--step-bottom)+var(--step-height)/2)]">
                    <span className="uape-how-step-connector h-full w-px" />
                  </div>

                  {/* EDITABLE: единый размер Step-блоков (h-*, w-*), и можно поднять/опустить через lg:mb-* */}
                  <span className="font-figtree relative z-20 mt-4 inline-flex h-12.5 w-35 items-center justify-center overflow-hidden rounded-[12px] border border-[#FFFFFF1F] bg-[#0F1215C9] px-4 text-[24px] font-medium leading-7 tracking-[0%] shadow-[0_8px_24px_rgba(0,0,0,0.6)] backdrop-blur-[4px] backdrop-saturate-150 lg:absolute lg:bottom-[var(--step-bottom)] lg:left-1/2 lg:h-[var(--step-height)] lg:-translate-x-1/2">
                    <span className="relative z-10 inline-flex items-center justify-center gap-2">
                      {item.step}
                      <img src={stepArrowIcon} alt="" aria-hidden="true" className="h-[18px] w-[18px] object-contain" />
                    </span>
                  </span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection
