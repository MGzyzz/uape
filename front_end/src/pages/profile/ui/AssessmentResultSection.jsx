import bumerangIcon from '../../../shared/assets/icons/bumerang-icon.svg'

const LANGUAGE_LABELS = {
  python: 'Python',
  javascript: 'JavaScript',
  java: 'Java',
  csharp: 'C#',
  cpp: 'C++',
}

function getLevelConfig(level, language) {
  const lang = LANGUAGE_LABELS[language] ?? language
  return {
    beginner: {
      levelLabel: 'Beginner',
      tagline: 'There is something to strive for',
      subtitleDesc: `You have a foundational understanding of basic concepts, but some areas require further practice and structured learning. Below is a breakdown of your ${lang} strengths and areas for improvement.`,
      strengths: [
        `Understanding of basic ${lang} syntax`,
        'Ability to work with variables and simple data types',
        'Familiarity with conditional statements (if/else)',
        'Basic understanding of loops',
        'Ability to read and understand simple code examples',
      ],
      growth: [
        'Writing functions independently',
        'Working with common data structures in practical tasks',
        'Understanding how to structure larger programs',
        'Debugging and error handling',
        'Applying concepts to real-world problems',
      ],
    },
    intermediate: {
      levelLabel: 'Intermediate',
      tagline: 'You are on the right track',
      subtitleDesc: `You have a solid understanding of ${lang} fundamentals and can work with common programming concepts. Some areas still require deeper practice. Below is a breakdown of your strengths and areas for improvement.`,
      strengths: [
        `Good understanding of ${lang} syntax and core concepts`,
        'Ability to work with variables, data types, and basic data structures',
        'Confident use of conditional statements and loops',
        'Ability to read, understand, and modify existing code',
        'Ability to write and use functions in practical scenarios',
      ],
      growth: [
        'Writing more complex functions and reusable code',
        'Working with data structures in more advanced tasks',
        'Structuring larger programs and organizing code efficiently',
        'Improving debugging skills and handling errors effectively',
        'Applying concepts to more complex real-world problems',
      ],
    },
    advanced: {
      levelLabel: 'Advanced',
      tagline: 'Strong foundation — keep pushing',
      subtitleDesc: `You demonstrate a strong understanding of ${lang} and can confidently apply programming concepts in practical tasks.`,
      strengths: [
        `Strong understanding of ${lang} syntax and core concepts`,
        'Confident use of functions, loops, and conditional logic',
        'Ability to work with common data structures',
        'Ability to read and understand complex code',
      ],
      growth: [
        'Designing larger and more scalable programs',
        'Writing more optimized and efficient code',
        `Exploring advanced ${lang} tools and libraries`,
      ],
    },
  }[level] ?? getLevelConfig('beginner', language)
}

function AssessmentResultSection({ level = 'beginner', language = 'python' }) {
  const config = getLevelConfig(level, language)

  return (
    <section className="uape-assessment-result-section">
      <div className="uape-section-shell">
        <div className="uape-assessment-result-inner">

          {/* Left column */}
          <div className="uape-assessment-result-left">
            <div className="uape-assessment-result-title-group">
              <h2 className="uape-assessment-result-title">Your Assessment Results</h2>
              <p className="uape-assessment-result-subtitle">
                Based on your answers, your current {LANGUAGE_LABELS[language] ?? language} level is{' '}
                <strong>{config.levelLabel}</strong>.
              </p>
              <p className="uape-assessment-result-subtitle">{config.subtitleDesc}</p>
            </div>
            <div className="uape-assessment-result-block">
              <h3 className="uape-assessment-result-block-title">Your Strengths</h3>
              <ul className="uape-assessment-result-list">
                {config.strengths.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="uape-assessment-result-block">
              <h3 className="uape-assessment-result-block-title">Areas for Further Growth</h3>
              <ul className="uape-assessment-result-list">
                {config.growth.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right column — result card */}
          <div className="uape-assessment-result-right">
            <div className={`uape-assessment-result-card uape-assessment-result-card--${level}`}>
              <img src={bumerangIcon} alt="" aria-hidden="true" className="uape-assessment-result-card-bg" />
              <p className="uape-assessment-result-card-label">Your Result</p>
              <div className={`uape-assessment-result-level-outer uape-assessment-result-level-outer--${level}`}>
                <div className={`uape-assessment-result-level-mid uape-assessment-result-level-mid--${level}`}>
                  <div className={`uape-assessment-result-level-inner uape-assessment-result-level-inner--${level}`}>
                    <span className={`uape-assessment-result-level-text uape-assessment-result-level-text--${level}`}>
                      {config.levelLabel}
                    </span>
                  </div>
                </div>
              </div>
              <p className="uape-assessment-result-tagline">{config.tagline}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default AssessmentResultSection
