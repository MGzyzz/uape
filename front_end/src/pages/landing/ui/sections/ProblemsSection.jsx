const struggleCards = [
  {
    title: 'It\u2019s unclear where to start',
    text: 'Beginners don\u2019t know what to learn first and what really matters.',
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
    text: 'It\u2019s hard to understand how far you\u2019ve come and what level you\u2019re at.',
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

function ProblemsSection() {
  return (
    <section id="problems" className="bg-uape-bg">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-figtree text-center text-[44px] font-semibold leading-13">Why is learning programming hard?</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {struggleCards.map((card) => (
            <article key={card.title} className="rounded-2xl border border-uape-border-soft bg-uape-surface p-5">
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${card.iconBg}`}>
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d={card.iconPath} fill="white" />
                </svg>
              </div>
              <h3 className="font-figtree text-[24px] font-semibold leading-7">{card.title}</h3>
              <p className="font-figtree mt-3 text-[16px] font-normal leading-6 text-uape-muted">{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProblemsSection
