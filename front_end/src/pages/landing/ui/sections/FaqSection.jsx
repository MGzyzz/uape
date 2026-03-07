import { useState } from 'react'

const faqItems = [
  {
    q: 'What is UAPE?',
    a: 'UAPE is an adaptive learning platform that helps you find the right programming courses based on your actual skill level. Instead of offering the same content to everyone, the system analyzes your knowledge and builds a personalized learning path.',
  },
  {
    q: 'How does the skill assessment work?',
    a: 'UAPE is an adaptive learning platform that helps you find the right programming courses based on your actual skill level. Instead of offering the same content to everyone, the system analyzes your knowledge and builds a personalized learning path.',
  },
  {
    q: 'Is UAPE a course platform?',
    a: 'UAPE is an adaptive learning platform that helps you find the right programming courses based on your actual skill level. Instead of offering the same content to everyone, the system analyzes your knowledge and builds a personalized learning path.',
  },
  {
    q: 'Do I need prior programming experience?',
    a: 'UAPE is an adaptive learning platform that helps you find the right programming courses based on your actual skill level. Instead of offering the same content to everyone, the system analyzes your knowledge and builds a personalized learning path.',
  },
  {
    q: 'How are courses selected for me?',
    a: 'UAPE is an adaptive learning platform that helps you find the right programming courses based on your actual skill level. Instead of offering the same content to everyone, the system analyzes your knowledge and builds a personalized learning path.',
  },
  {
    q: 'Is the content free?',
    a: 'UAPE is an adaptive learning platform that helps you find the right programming courses based on your actual skill level. Instead of offering the same content to everyone, the system analyzes your knowledge and builds a personalized learning path.',
  },
  {
    q: 'How is UAPE different from other learning platforms?',
    a: 'UAPE is an adaptive learning platform that helps you find the right programming courses based on your actual skill level. Instead of offering the same content to everyone, the system analyzes your knowledge and builds a personalized learning path.',
  },
]

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0)

  const toggle = (index) => setOpenIndex(openIndex === index ? null : index)

  return (
    <section id="faq" className="bg-uape-bg">
      <div className="uape-page-container uape-page-gutter flex flex-col items-center gap-25 py-16">

        {/* Heading */}
        <div className="h-[104px] w-[386px] text-center">
          <h2 className="uape-faq-heading font-semibold text-white">
            Got any questions?
          </h2>
          <h2 className="uape-faq-heading uape-faq-heading-muted font-semibold">
            We&apos;ve got answers
          </h2>
        </div>

        {/* FAQ list */}
        <div className="flex w-[792px] flex-col gap-[60px]">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div key={item.q} className="border-b border-white/10 pb-6">
                <button
                  onClick={() => toggle(index)}
                  className="uape-icon-button-reset flex h-8 w-[790px] items-start justify-between gap-10 text-left"
                >
                  <h3 className="uape-faq-question w-[718px] font-semibold text-white">
                    {item.q}
                  </h3>
                  <span
                    className={`uape-faq-toggle-icon mt-1 shrink-0${isOpen ? ' uape-faq-toggle-icon-open' : ''}`}
                    aria-hidden="true"
                    style={{ transform: isOpen ? 'rotate(0deg)' : 'rotate(180deg)' }}
                  >
                    <ArrowIcon />
                  </span>
                </button>
                {isOpen && (
                  <p className="uape-faq-answer mt-5 w-[688px] text-uape-muted">
                    {item.a}
                  </p>
                )}
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

function ArrowIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="h-8 w-8">
      <path
        d="M17.3336 10.4381V26.6668H14.667V10.4381L7.51502 17.59L5.62939 15.7044L16.0003 5.3335L26.3712 15.7044L24.4856 17.59L17.3336 10.4381Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default FaqSection
