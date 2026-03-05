import workplaceImg from '../../../../shared/assets/solution/workplace.jpg'

const steps = [
  {
    number: '01',
    title: 'Test questions',
    description: 'To check core concepts and theory.',
  },
  {
    number: '02',
    title: 'Code analysis',
    description: 'We evaluate how you write and understand code.',
  },
  {
    number: '03',
    title: 'Filling in missing code',
    description: 'To test logic, structure, and attention to detail.',
  },
  {
    number: '04',
    title: 'Mini challenges',
    description: 'Small practical tasks close to real problems.',
  },
]

function AssessmentSection() {
  const [firstStep, ...remainingSteps] = steps

  return (
    <section id="assessment" className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-3xl border-2 border-[#FFFFFF1F] bg-[#27292A]">
        <div className="grid lg:grid-cols-2">
          <div className="px-4 pb-4 pt-6 sm:px-5 sm:pb-5 sm:pt-7">
            <img src={workplaceImg} alt="Workplace" className="block h-auto w-full rounded-[2rem]" />
          </div>

          <div className="flex h-full flex-col px-6 pb-4 pt-6 sm:px-8 sm:pb-5 sm:pt-7 lg:px-10 lg:pb-5 lg:pt-7">
            <div
              key={firstStep.number}
              className="grid grid-cols-[4.5rem_1fr_1fr] items-start gap-x-6 border-b-2 border-[#FFFFFF1F] pb-6"
            >
              <span className="text-5xl font-bold leading-none">{firstStep.number}</span>
              <h3 className="pt-2 text-lg font-bold">{firstStep.title}</h3>
              <p className="pt-2 text-xs text-uape-muted">{firstStep.description}</p>
            </div>

            <div className="flex flex-1 flex-col">
              {remainingSteps.map((step, i) => (
                <div
                  key={step.number}
                  className={`grid flex-1 grid-cols-[4.5rem_1fr_1fr] items-center gap-x-6 py-4 ${
                    i < remainingSteps.length - 1 ? 'border-b-2 border-[#FFFFFF1F]' : ''
                  }`}
                >
                  <span className="text-5xl font-bold leading-none">{step.number}</span>
                  <h3 className="text-lg font-bold">{step.title}</h3>
                  <p className="text-xs text-uape-muted">{step.description}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-5 pt-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-6">
              <p className="max-w-[20ch] text-lg leading-snug">
                Accurate assessment
                <br />
                leads to smarter learning.
              </p>
              <button
                type="button"
                disabled
                className="inline-flex w-fit shrink-0 items-center justify-center rounded-xl bg-uape-accent px-6 py-3 font-semibold opacity-50 cursor-not-allowed sm:justify-self-end"
              >
                Start diagnostic
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AssessmentSection
