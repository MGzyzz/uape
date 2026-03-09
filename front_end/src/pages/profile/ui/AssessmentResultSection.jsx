import { useState } from 'react'
import bumerangIcon from '../../../shared/assets/icons/bumerang-icon.svg'

// TODO: replace MOCK_LEVEL with real data from assessment API when test backend is ready
// TODO: consider moving to /assessment-result page if UX requires dedicated route
const MOCK_LEVEL = 'beginner'

const LEVELS = ['beginner', 'intermediate', 'advanced']

const LEVEL_CONFIG = {
  beginner: {
    levelLabel: 'Beginner',
    tagline: 'There is something to strive',
    subtitleDesc:
      'You have a foundational understanding of basic concepts, but some areas require further practice and structured learning. Below is a breakdown of your strengths and areas for improvement.',
    strengths: [
      'Understanding of basic Python syntax',
      'Ability to work with variables and simple data types',
      'Familiarity with conditional statements (if/else)',
      'Basic understanding of loops',
      'Ability to read and understand simple code examples',
    ],
    growth: [
      'Writing functions independently',
      'Working with lists and dictionaries in practical tasks',
      'Understanding how to structure larger programs',
      'Debugging and error handling',
      'Applying concepts to real-world problems',
    ],
  },
  intermediate: {
    levelLabel: 'Intermediate',
    tagline: 'You are on the right track',
    subtitleDesc:
      'You have a solid understanding of Python fundamentals and can work with common programming concepts. However, some areas still require deeper practice and experience to reach a more advanced level. Below is a breakdown of your strengths and areas for improvement.',
    strengths: [
      'Good understanding of Python syntax and core concepts',
      'Ability to work with variables, data types, and basic data structures',
      'Confident use of conditional statements (if/else)',
      'Ability to write and use loops in practical scenarios',
      'Ability to read, understand, and modify existing code',
    ],
    growth: [
      'Writing more complex functions and reusable code',
      'Working with lists and dictionaries in more advanced tasks',
      'Structuring larger programs and organizing code efficiently',
      'Improving debugging skills and handling errors effectively',
      'Applying programming concepts to more complex real-world problems',
    ],
  },
  advanced: {
    levelLabel: 'Advanced',
    tagline: 'There is something to strive for',
    subtitleDesc:
      'You demonstrate a strong understanding of Python and can confidently apply programming concepts in practical tasks. You are comfortable working with core language features and structuring programs effectively.',
    strengths: [
      'Strong understanding of Python syntax and core concepts',
      'Confident use of functions, loops, and conditional logic',
      'Ability to work with common data structures',
      'Ability to read and understand complex code',
    ],
    growth: [
      'Designing larger and more scalable programs',
      'Writing more optimized and efficient code',
      'Exploring advanced Python tools and libraries',
    ],
  },
}

function AssessmentResultSection({ level = MOCK_LEVEL }) {
  const [activeLevel, setActiveLevel] = useState(level)
  const config = LEVEL_CONFIG[activeLevel] ?? LEVEL_CONFIG.beginner

  return (
    <section className="uape-assessment-result-section">
      <div className="uape-section-shell">
        {/* TODO: remove level switcher buttons when real assessment API is connected — level should come from backend */}
        <div className="uape-assessment-result-level-switcher">
          {LEVELS.map(l => (
            <button
              key={l}
              className={`uape-assessment-result-level-btn uape-assessment-result-level-btn--${l}${activeLevel === l ? ' uape-assessment-result-level-btn--active' : ''}`}
              onClick={() => setActiveLevel(l)}
            >
              {LEVEL_CONFIG[l].levelLabel}
            </button>
          ))}
        </div>
        <div className="uape-assessment-result-inner">

          {/* Left column */}
          <div className="uape-assessment-result-left">
            <div className="uape-assessment-result-title-group">
              <h2 className="uape-assessment-result-title">Your Assessment Results</h2>
              <p className="uape-assessment-result-subtitle">
                Based on your answers, your current Python level is <strong>{config.levelLabel}</strong>.
              </p>
              <p className="uape-assessment-result-subtitle">{config.subtitleDesc}</p>
            </div>
            <div className="uape-assessment-result-block">
              <h3 className="uape-assessment-result-block-title">Your Strengths</h3>
              <ul className="uape-assessment-result-list">
                {config.strengths.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="uape-assessment-result-block">
              <h3 className="uape-assessment-result-block-title">Areas for Further Growth</h3>
              <ul className="uape-assessment-result-list">
                {config.growth.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right column — result card */}
          <div className="uape-assessment-result-right">
            <div className={`uape-assessment-result-card uape-assessment-result-card--${activeLevel}`}>
              <img src={bumerangIcon} alt="" aria-hidden="true" className="uape-assessment-result-card-bg" />
              <p className="uape-assessment-result-card-label">Your Result</p>
              <div className={`uape-assessment-result-level-outer uape-assessment-result-level-outer--${activeLevel}`}>
                <div className={`uape-assessment-result-level-mid uape-assessment-result-level-mid--${activeLevel}`}>
                  <div className={`uape-assessment-result-level-inner uape-assessment-result-level-inner--${activeLevel}`}>
                    <span className={`uape-assessment-result-level-text uape-assessment-result-level-text--${activeLevel}`}>
                      {config.levelLabel}
                    </span>
                  </div>
                </div>
              </div>
              <p className="uape-assessment-result-tagline">{config.tagline}</p>
              {/* TODO: replace with real motivational text per level when copy is ready */}
              <p className="uape-assessment-result-desc">
                Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in
                hendrerit urna. Pellentesque sit amet sapien fringilla.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default AssessmentResultSection
