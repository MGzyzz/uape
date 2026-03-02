import SiteHeader from '../../../shared/ui/SiteHeader.jsx'

const struggleCards = [
  {
    title: 'Hard to know where to start',
    text: 'Too many scattered sources and no clear path for beginners.',
    tone: 'bg-uape-green/25',
  },
  {
    title: 'Courses do not fit your level',
    text: 'Materials are often too basic or too advanced from day one.',
    tone: 'bg-uape-blue-glow/25',
  },
  {
    title: 'No measure of progress',
    text: 'Without checkpoints, motivation drops quickly.',
    tone: 'bg-uape-violet-glow/25',
  },
  {
    title: 'Too much theory, not enough practice',
    text: 'Real coding tasks are usually missing in classic courses.',
    tone: 'bg-uape-amber-glow/25',
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
        <section className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 pb-20 pt-14 text-center sm:px-6 lg:px-8">
          <p className="mb-4 inline-flex rounded-full border border-uape-border-soft bg-uape-surface px-4 py-1 text-xs tracking-[0.2em] text-uape-muted uppercase">
            UAPE learning platform
          </p>
          <h1 className="max-w-3xl text-3xl font-extrabold leading-tight sm:text-5xl">
            Learn programming based on your real skill level
          </h1>
          <p className="mt-5 max-w-2xl text-base text-uape-muted sm:text-lg">
            Personalized path, practical tasks, and transparent progress so you know exactly where you are growing.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="/signup"
              className="rounded-xl bg-uape-accent px-6 py-3 text-sm font-semibold text-uape-white transition hover:brightness-110"
            >
              Sign up free
            </a>
            <a
              href="/login"
              className="rounded-xl border border-uape-border-soft px-6 py-3 text-sm font-semibold text-uape-white transition hover:border-uape-white/40"
            >
              Log in
            </a>
          </div>

          <div className="mt-12 grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <article className="rounded-2xl border border-uape-border-soft bg-uape-surface p-4 text-left">
              <p className="text-xs text-uape-muted">Adaptive map</p>
              <h3 className="mt-2 text-lg font-semibold">Your path</h3>
              <p className="mt-2 text-sm text-uape-muted">Curriculum updates as your skills grow.</p>
            </article>
            <article className="rounded-2xl border border-uape-border-soft bg-uape-surface p-4 text-left">
              <p className="text-xs text-uape-muted">Dynamic tasks</p>
              <h3 className="mt-2 text-lg font-semibold">Practice first</h3>
              <p className="mt-2 text-sm text-uape-muted">Tasks tuned to your current level.</p>
            </article>
            <article className="rounded-2xl border border-uape-border-soft bg-uape-surface p-4 text-left">
              <p className="text-xs text-uape-muted">Progress report</p>
              <h3 className="mt-2 text-lg font-semibold">Track growth</h3>
              <p className="mt-2 text-sm text-uape-muted">Visual analytics for each topic.</p>
            </article>
            <article className="rounded-2xl border border-uape-border-soft bg-uape-surface p-4 text-left">
              <p className="text-xs text-uape-muted">Mentor-ready</p>
              <h3 className="mt-2 text-lg font-semibold">Real outcomes</h3>
              <p className="mt-2 text-sm text-uape-muted">Build a portfolio with practical projects.</p>
            </article>
          </div>
        </section>

        <section id="why-hard" className="border-y border-uape-border-soft bg-uape-overlay/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold sm:text-3xl">Why is learning programming hard?</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {struggleCards.map((card) => (
                <article key={card.title} className={`rounded-2xl border border-uape-border-soft p-5 ${card.tone}`}>
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                  <p className="mt-3 text-sm text-uape-muted">{card.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="how-help" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold sm:text-3xl">How UAPE helps you learn effectively</h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <article className="overflow-hidden rounded-2xl border border-uape-border-soft bg-uape-surface">
              <div className="h-48 bg-[radial-gradient(circle_at_35%_50%,#3ec486_0%,#173a2d_45%,#0f1112_90%)]" />
              <div className="p-5">
                <h3 className="text-lg font-semibold">We identify your real skill level</h3>
                <p className="mt-2 text-sm text-uape-muted">Initial diagnostics let you skip generic content and start at the right point.</p>
              </div>
            </article>

            <article className="overflow-hidden rounded-2xl border border-uape-border-soft bg-uape-surface">
              <div className="h-48 bg-[radial-gradient(circle_at_65%_35%,#4f6ad4_0%,#242b4f_45%,#0f1112_90%)]" />
              <div className="p-5">
                <h3 className="text-lg font-semibold">We adapt learning to you</h3>
                <p className="mt-2 text-sm text-uape-muted">Your learning track updates continuously based on speed and accuracy.</p>
              </div>
            </article>

            <article className="rounded-2xl border border-uape-border-soft bg-uape-surface p-5">
              <h3 className="text-lg font-semibold">We show your progress</h3>
              <div className="mt-4 flex items-center gap-4 rounded-xl bg-uape-bg p-4">
                <div className="size-28 rounded-full border-8 border-uape-lime/30 border-t-uape-lime" />
                <div>
                  <p className="text-3xl font-bold text-uape-lime">67%</p>
                  <p className="text-sm text-uape-muted">Current milestone complete</p>
                </div>
              </div>
            </article>

            <article className="overflow-hidden rounded-2xl border border-uape-border-soft bg-uape-surface">
              <div className="h-48 bg-[linear-gradient(115deg,#23272a_15%,#4a3e3a_45%,#1e2023_90%)]" />
              <div className="p-5">
                <h3 className="text-lg font-semibold">We save your time</h3>
                <p className="mt-2 text-sm text-uape-muted">Focus on what matters and avoid repeating what you already know.</p>
              </div>
            </article>
          </div>
        </section>

        <section className="border-y border-uape-border-soft bg-uape-overlay/30">
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

        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
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

        <section className="border-y border-uape-border-soft bg-uape-overlay/30">
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
