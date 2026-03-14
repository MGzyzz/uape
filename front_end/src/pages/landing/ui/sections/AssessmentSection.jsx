import { Link } from 'react-router-dom'
import workplaceImg from '../../../../shared/assets/solution/workplace.png'
import { useAuth } from '../../../../app/AuthContext.jsx'

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
  const { isAuth } = useAuth()
  return (
    <section id="assessment" className="bg-uape-bg">
      <div className="uape-section-shell flex flex-col gap-[60px]">
        <h2 className="text-center font-figtree text-[44px] font-semibold leading-[52px] tracking-[0%] text-white">
          How we determine your level
        </h2>

        <div className="flex h-[744px] gap-14 overflow-hidden rounded-[24px] border-2 border-[#FFFFFF1F] bg-[#27292A] p-10">
          <div className="h-[656px] w-[369px] shrink-0 overflow-hidden rounded-[16px]">
            <img src={workplaceImg} alt="Workplace" className="block h-full w-full object-cover" />
          </div>

          <div className="flex h-[664px] w-[674px] flex-col justify-between gap-20">
            <div className="flex h-[528px] flex-col gap-10">
              {steps.map((step, i) => (
                <div
                  key={step.number}
                  className={`grid h-[112px] grid-cols-[88px_220px_262px] items-start gap-x-10 pb-10 ${
                    i === steps.length - 1 ? 'border-b-0' : ''
                  }`}
                  style={i === steps.length - 1 ? undefined : { borderBottom: '2px solid #FFFFFF1F' }}
                >
                  <span className="h-[72px] w-[88px] pt-[2px] font-figtree text-[68px] font-semibold leading-[72px] tracking-[0%] text-white">
                    {step.number}
                  </span>
                  <h3 className={`font-figtree text-[32px] font-semibold tracking-[0%] text-white ${i < 2 ? 'pt-[18px] leading-[36px]' : 'leading-[36px]'}`}>
                    {step.title}
                  </h3>
                  <p className={`font-figtree text-[16px] font-normal tracking-[0%] text-[#FFFFFFC2] ${i < 2 ? 'pt-[18px] leading-6' : 'leading-6'}`}>
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex h-14 items-center justify-between">
              <p className="w-[244px] font-figtree text-[20px] font-medium leading-7 tracking-[0%] text-white">
                Accurate assessment leads to smarter learning.
              </p>
              <Link
                to={isAuth ? '/diagnostic' : '/login'}
                className="uape-orange-btn inline-flex h-12 w-[163px] shrink-0 items-center justify-center rounded-lg px-6 py-3 text-[16px] font-normal leading-6"
              >
                Start diagnostic
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AssessmentSection
