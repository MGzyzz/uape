import { Link } from 'react-router-dom'
import { FaJava } from 'react-icons/fa'
import { SiCplusplus, SiCss3, SiGo, SiHtml5, SiPython, SiReact } from 'react-icons/si'
import csharpIcon from '../../../../shared/assets/tech-icons/csharp.svg'

const technologyItems = [
  { name: 'JavaScript', iconKey: 'javascript', iconBg: 'bg-transparent' },
  { name: 'React', iconKey: 'react', icon: SiReact, iconBg: 'bg-[#1f2732]', iconColor: 'text-[#61dafb]' },
  { name: 'HTML', iconKey: 'html', icon: SiHtml5, iconBg: 'bg-[#f0672a]', iconColor: 'text-white' },
  { name: 'CSS', iconKey: 'css', icon: SiCss3, iconBg: 'bg-[#2d5fe8]', iconColor: 'text-white' },
  { name: 'Python', iconKey: 'python', icon: SiPython, iconBg: 'bg-[#202a3a]' },
  { name: 'Java', iconKey: 'java', iconBg: 'bg-[#eef2f5]' },
  { name: 'C++', iconKey: 'cplusplus', icon: SiCplusplus, iconBg: 'bg-[#1f2732]', iconColor: 'text-[#65b5ff]' },
  { name: 'C#', iconKey: 'csharp', iconBg: 'bg-[#1f2732]' },
  { name: 'GO', iconKey: 'go', icon: SiGo, iconBg: 'bg-[#1f2732]', iconColor: 'text-[#47c3be]' },
]

function TechnologyIcon({ item }) {
  if (item.iconKey === 'javascript') {
    return (
      <span className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#f7df1e]">
        <span className="text-[1.6rem] font-extrabold leading-none text-[#1b2635]">JS</span>
      </span>
    )
  }

  if (item.iconKey === 'python') {
    return (
      <span className="relative block h-9 w-9">
        <SiPython
          className="absolute inset-0 h-full w-full text-[#3B82C4]"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 52%, 0 52%)' }}
          aria-hidden="true"
        />
        <SiPython
          className="absolute inset-0 h-full w-full text-[#f7d047]"
          style={{ clipPath: 'polygon(0 48%, 100% 48%, 100% 100%, 0 100%)' }}
          aria-hidden="true"
        />
      </span>
    )
  }

  if (item.iconKey === 'java') {
    return (
      <span className="flex h-12 w-12 flex-col items-center justify-center">
        <FaJava className="h-9 w-9 text-[#f68026]" aria-hidden="true" />
        <span className="-mt-0.5 text-[0.6rem] font-semibold leading-none text-[#f68026]">Java</span>
      </span>
    )
  }

  if (item.iconKey === 'csharp') {
    return <img src={csharpIcon} alt="" aria-hidden="true" className="h-9 w-9 object-contain" />
  }

  if (item.iconKey === 'go') {
    return <SiGo className="h-9 w-10 text-[#28c9c3]" aria-hidden="true" />
  }

  const Icon = item.icon
  return <Icon className={`h-9 w-9 ${item.iconColor}`} aria-hidden="true" />
}

function TechnologySection() {
  return (
    <section id="technology" className="bg-uape-bg">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-8">
        <div className="max-w-[360px]">
          <h2 className="font-figtree text-[32px] font-semibold leading-9">
            Programming languages we support
          </h2>
          <p className="font-figtree mt-4 text-[16px] font-normal leading-6 text-[#f0f3f7c2]">
            We conduct diagnostics and provide personalized courses in these programming languages.
          </p>
          <Link
            to="/signup"
            className="font-figtree mt-7 inline-flex rounded-lg bg-uape-accent px-6 py-3 text-[16px] font-normal leading-6 text-uape-white transition hover:brightness-110"
          >
            Start diagnostic
          </Link>
        </div>

        <div className="grid w-full max-w-[620px] grid-cols-1 gap-x-9 gap-y-6 sm:grid-cols-2 xl:grid-cols-3">
          {technologyItems.map((item) => (
            <div key={item.name} className="flex items-center gap-3">
              <span className={`flex h-14 w-14 items-center justify-center rounded-[18px] ${item.iconBg}`}>
                <TechnologyIcon item={item} />
              </span>
              <span className="font-figtree text-[24px] font-semibold leading-7 text-white">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechnologySection
