import arrowUpIcon from '../../../../shared/assets/icons/ArrowUp.svg'

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
  return (
    <section id="faq" className="bg-uape-bg">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-16 text-center">
          <h2 className="uape-faq-heading font-semibold text-white">
            Got any questions?
          </h2>
          <h2 className="uape-faq-heading uape-faq-heading-muted font-semibold">
            We&apos;ve got answers
          </h2>
        </div>

        {/* FAQ list */}
        <div className="flex flex-col gap-24">
          {faqItems.map((item) => (
            <div key={item.q} className="border-b border-white/10 pb-6">
              <div className="flex items-start justify-between gap-6">
                <h3 className="uape-faq-question font-semibold text-white">
                  {item.q}
                </h3>
                <img src={arrowUpIcon} alt="" aria-hidden="true" className="mt-1 h-8 w-8 shrink-0" />
              </div>
              <p className="uape-faq-answer mt-4 text-uape-muted">
                {item.a}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default FaqSection
