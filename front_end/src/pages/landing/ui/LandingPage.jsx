import SiteHeader from '../../../shared/ui/SiteHeader.jsx'
import DiagnosticTicker from '../../../shared/ui/DiagnosticTicker.jsx'

const struggleCards = [
  {
    title: 'It’s unclear where to start',
    text: 'Beginners don’t know what to learn first and what really matters.',
    iconBg: 'bg-uape-green',
    iconPath:
      'M18 28.5C19.2426 28.5 20.25 29.5074 20.25 30.75C20.25 31.9926 19.2426 33 18 33C16.7574 33 15.75 31.9926 15.75 30.75C15.75 29.5074 16.7574 28.5 18 28.5ZM18 3C22.9705 3 27 7.02944 27 12C27 15.2469 25.8711 16.9361 22.9889 19.3847C20.0979 21.8406 19.5 22.9454 19.5 25.5H16.5C16.5 21.789 17.6805 19.9578 21.0465 17.0984C23.3219 15.1653 24 14.1506 24 12C24 8.68629 21.3137 6 18 6C14.6863 6 12 8.68629 12 12V13.5H9V12C9 7.02944 13.0294 3 18 3Z',
  },
  {
    title: 'Courses are either too difficult or too basic',
    text: 'The same content is shown to everyone, regardless of their level.',
    iconBg: 'bg-uape-blue-glow',
    iconPath:
      'M18 32.995C9.71572 32.995 3 26.2793 3 17.995C3 9.71074 9.71572 2.995 18 2.995C26.2842 2.995 33 9.71074 33 17.995C33 26.2793 26.2842 32.995 18 32.995ZM18 29.995V5.995C11.3726 5.995 6 11.3676 6 17.995C6 24.6224 11.3726 29.995 18 29.995Z',
  },
  {
    title: 'No sense of progress',
    text: 'It’s hard to understand how far you’ve come and what level you’re at.',
    iconBg: 'bg-uape-violet-glow',
    iconPath:
      'M3 18C3 26.2842 9.71572 33 18 33C26.2842 33 33 26.2842 33 18C33 9.71572 26.2842 3 18 3C9.71572 3 3 9.71572 3 18ZM30 18C30 24.6275 24.6275 30 18 30C11.3726 30 6 24.6275 6 18C6 11.3726 11.3726 6 18 6C24.6275 6 30 11.3726 30 18ZM18 18V9C20.4854 9 22.7353 10.0074 24.3639 11.636L18 18Z',
  },
  {
    title: 'Too much unnecessary content',
    text: 'You spend time on topics you already know or will never use.',
    iconBg: 'bg-uape-amber-glow',
    iconPath:
      'M25.5 9H33V12H30V31.5C30 32.3284 29.3284 33 28.5 33H7.5C6.67158 33 6 32.3284 6 31.5V12H3V9H10.5V4.5C10.5 3.67158 11.1716 3 12 3H24C24.8284 3 25.5 3.67158 25.5 4.5V9ZM13.5 16.5V25.5H16.5V16.5H13.5ZM19.5 16.5V25.5H22.5V16.5H19.5ZM13.5 6V9H22.5V6H13.5Z',
  },
]

const audienceCards = [
  {
    title: 'Beginners',
    text: 'Start from zero with a realistic roadmap.',
    color: 'from-uape-green/40 to-uape-green/15',
  },
  {
    title: 'Students',
    text: 'Practice-oriented learning to build portfolio projects.',
    color: 'from-uape-blue-glow/40 to-uape-blue-glow/10',
  },
  {
    title: 'Career switchers',
    text: 'Structured path with clear skill checkpoints.',
    color: 'from-uape-violet-glow/40 to-uape-violet-glow/10',
  },
  {
    title: 'Junior developers',
    text: 'Fill the gaps and prepare for technical interviews.',
    color: 'from-uape-amber-glow/40 to-uape-amber-glow/10',
  },
]

const faqItems = [
  {
    q: 'What is UAPE?',
    a: 'UAPE is an adaptive learning platform that adjusts tasks and content to your current skill level.',
  },
  {
    q: 'How does the AI assessment work?',
    a: 'You solve practical tasks, and the platform maps your strengths and weak areas to personalize your path.',
  },
  {
    q: 'Is UAPE for complete beginners?',
    a: 'Yes. Beginner mode starts with fundamentals and gradually increases difficulty.',
  },
  {
    q: 'Can I track my progress?',
    a: 'Yes, dashboards show topic completion, performance trends, and recommended next steps.',
  },
]

function LandingPage() {
  return (
    <div className="min-h-screen bg-uape-bg text-uape-white">
      <SiteHeader />

      <main>
        <section className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 pb-20 pt-8 text-center sm:px-6 lg:px-8">
          <h1 className="max-w-5xl text-4xl font-extrabold leading-[1.05] sm:text-6xl lg:text-7xl">
            Learn programming based
            <br />
            on your real skill level
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-uape-muted sm:text-lg">
            Most platforms guess what you need. <br /> UAPE measures your actual knowledge and builds a learning <br /> path that fits you
            &mdash; no more, no less.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="/signup"
              className="rounded-[10px] bg-uape-accent px-7 py-3 text-base font-medium text-uape-white transition hover:brightness-110"
            >
              Start diagnostic
            </a>
            <a
              href="#solution"
              className="rounded-[10px] bg-white px-7 py-3 text-base font-medium text-[#0e1011] transition hover:bg-white/90"
            >
              How does it work?
            </a>
          </div>

          <DiagnosticTicker />
        </section>

        <section id="problems" className="bg-uape-bg">
  <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
    <h2 className="text-center text-2xl font-bold sm:text-3xl">Why is learning programming hard?</h2>
    <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {struggleCards.map((card) => (
        <article key={card.title} className="rounded-2xl border border-uape-border-soft bg-uape-surface p-5">
          <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${card.iconBg}`}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d={card.iconPath} fill="white" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold">{card.title}</h3>
          <p className="mt-3 text-sm text-uape-muted">{card.text}</p>
        </article>
      ))}
    </div>
  </div>
</section>

        <section id="solution" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold sm:text-3xl">How UAPE helps you learn effectively</h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <article className="relative overflow-hidden rounded-2xl border border-uape-border-soft bg-uape-surface-strong" style={{ minHeight: '360px' }}>
              <img
                src="/assets/solution/skill-level.jpg"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/25" />
              <div className="relative z-10 p-5">
                <h3 className="text-lg font-semibold">We identify your real skill level</h3>
                <p className="mt-1 text-sm text-uape-muted">Not by guesses, but by actual tasks and code analysis.</p>
              </div>
              <div className="absolute bottom-5 left-5 z-10 flex gap-3">
                {['</>', '>_', '{ }', '[ ]', '*'].map((icon) => (
                  <div
                    key={icon}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-sm backdrop-blur-sm"
                  >
                    {icon}
                  </div>
                ))}
              </div>
            </article>

            <article className="relative overflow-hidden rounded-2xl border border-uape-border-soft bg-uape-surface-strong" style={{ minHeight: '360px' }}>
              <div className="relative z-10 p-5">
                <h3 className="text-lg font-semibold">We adapt learning to you</h3>
                <p className="mt-1 text-sm text-uape-muted">Content changes based on your knowledge and progress.</p>
              </div>
              <img
                src="/frame-157.png"
                alt=""
                aria-hidden="true"
                className="absolute bottom-5 left-5 z-10 h-auto w-[44%] max-w-[235px]"
              />
              <img
                src="/assets/solution/frame-158.png"
                alt=""
                aria-hidden="true"
                className="absolute bottom-[72px] right-5 z-20 h-auto w-[40%] max-w-[190px]"
              />
            </article>

            <article className="relative overflow-hidden rounded-2xl border border-uape-border-soft bg-uape-surface-strong p-5" style={{ minHeight: '360px' }}>
              <h3 className="text-lg font-semibold">We show your progress</h3>
              <p className="mt-1 text-sm text-uape-muted">You clearly see your level, growth, and next steps.</p>
              <div className="mt-8 flex items-center justify-center">
                <img
                  src="/assets/solution/frame-231.png"
                  alt="67 percent progress ring"
                  className="h-auto w-full max-w-[220px]"
                />
              </div>
            </article>

            <article className="relative overflow-hidden rounded-2xl border border-uape-border-soft bg-uape-surface-strong" style={{ minHeight: '360px' }}>
              <img
                src="/assets/solution/save-time.jpg"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="relative z-10 p-5">
                <h3 className="text-lg font-semibold">We save your time</h3>
                <p className="mt-1 text-sm text-uape-muted">You focus only on what you really need to learn.</p>
              </div>
            </article>
          </div>
        </section>

        <section id="technology" className="border-y border-uape-border-soft bg-uape-overlay/30">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div>
              <h2 className="text-2xl font-bold">Programming languages we support</h2>
              <p className="mt-3 max-w-2xl text-uape-muted">
                Start with one stack or combine multiple tracks: frontend, backend, and algorithms.
              </p>
              <a
                href="/signup"
                className="mt-5 inline-flex rounded-xl bg-uape-accent px-6 py-3 text-sm font-semibold transition hover:brightness-110"
              >
                Get started
              </a>
            </div>

            <div className="grid grid-cols-3 gap-3 text-sm">
              {['JavaScript', 'Python', 'HTML', 'CSS', 'Django', 'React', 'C++', 'C', 'Go'].map((item) => (
                <div key={item} className="rounded-xl border border-uape-border-soft bg-uape-surface px-4 py-3 text-center text-uape-muted">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">How it works</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {[
              'Step 1: Initial assessment',
              'Step 2: Skill map generation',
              'Step 3: Adaptive lessons',
              'Step 4: Progress and feedback',
            ].map((step) => (
              <article
                key={step}
                className="rounded-2xl border border-uape-lime/20 bg-[radial-gradient(circle_at_50%_0%,#eaf27c33_0%,#0f1112_65%)] p-5"
              >
                <p className="text-sm text-uape-lime">{step}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="for-whom" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">Who the platform is for</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {audienceCards.map((card) => (
              <article
                key={card.title}
                className={`rounded-2xl border border-uape-border-soft bg-gradient-to-br p-5 ${card.color}`}
              >
                <h3 className="text-lg font-semibold">{card.title}</h3>
                <p className="mt-2 text-sm text-uape-muted">{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="assessment" className="border-y border-uape-border-soft bg-uape-overlay/30">
          <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:px-8">
            <div className="rounded-2xl border border-uape-border-soft bg-[radial-gradient(circle_at_30%_40%,#54c7ff55_0%,#132436_40%,#0f1112_90%)]" />
            <article className="rounded-2xl border border-uape-border-soft bg-uape-surface p-6">
              <h2 className="text-2xl font-bold">How we determine your level</h2>
              <div className="mt-5 space-y-4">
                {[
                  'Task simulation in real scenarios',
                  'Quick interview and topic checks',
                  'Filling in missing code blocks',
                  'Mini challenges with time limits',
                ].map((item, index) => (
                  <div key={item} className="flex gap-4 border-b border-uape-border-soft pb-4 last:border-b-0">
                    <span className="text-3xl font-bold text-uape-muted">{String(index + 1).padStart(2, '0')}</span>
                    <p className="pt-1 text-uape-muted">{item}</p>
                  </div>
                ))}
              </div>
              <a
                href="/signup"
                className="mt-6 inline-flex rounded-xl bg-uape-accent px-6 py-3 text-sm font-semibold transition hover:brightness-110"
              >
                Join now
              </a>
            </article>
          </div>
        </section>

        <section id="faq" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">Got any questions? We&apos;ve got answers</h2>
          <div className="mx-auto mt-8 max-w-4xl space-y-3">
            {faqItems.map((item) => (
              <details key={item.q} className="rounded-xl border border-uape-border-soft bg-uape-surface p-5">
                <summary className="cursor-pointer list-none text-base font-semibold">{item.q}</summary>
                <p className="mt-3 text-sm text-uape-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-6xl gap-4 px-4 pb-20 sm:px-6 lg:grid-cols-2 lg:px-8">
          <article className="rounded-2xl border border-uape-border-soft bg-uape-surface p-6">
            <h3 className="max-w-md text-2xl font-bold">Start learning with a clear understanding of your level</h3>
            <p className="mt-3 text-uape-muted">Adaptive programming education for measurable outcomes.</p>
            <a
              href="/signup"
              className="mt-6 inline-flex rounded-xl bg-uape-accent px-6 py-3 text-sm font-semibold transition hover:brightness-110"
            >
              Start now
            </a>
          </article>
          <div className="rounded-2xl border border-uape-border-soft bg-[linear-gradient(120deg,#1f2730_5%,#2d3f4f_35%,#111314_95%)]" />
        </section>
      </main>

      <footer className="border-t border-uape-border-soft bg-[radial-gradient(circle_at_5%_0%,#313d4f88_0%,#0f1112_40%)]">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-3xl font-bold tracking-wide text-uape-lime sm:text-5xl">YOU&apos;RE ADAPTIVE PROGRAMMING EDUCATION</p>
          <div className="mt-8 flex flex-col justify-between gap-6 border-t border-uape-border-soft pt-6 text-uape-muted md:flex-row md:items-center">
            <div>
              <p>Project developed as part of a final qualification work</p>
              <p className="mt-2">&copy; Copyright 2026 UAPE</p>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-uape-white">
              <a href="mailto:example@gmail.com">example@gmail.com</a>
              <a href="tel:+77777777777">+7 777 777 7777</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage

