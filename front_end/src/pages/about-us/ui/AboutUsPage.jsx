import { Fragment } from 'react'
import SiteHeader from '../../../shared/ui/SiteHeader.jsx'
import SiteFooter from '../../../shared/ui/SiteFooter.jsx'
import heroImg from '../../../shared/assets/solution/Frame 440.png'
import storyImg from '../../../shared/assets/solution/Frame 473.png'
import differentImg from '../../../shared/assets/solution/Frame 496.png'
import rideIcon from '../../../shared/assets/solution/ride-icon.svg'
import eyeIcon from '../../../shared/assets/icons/Eye copy.svg'
import equalizerIcon from '../../../shared/assets/icons/Equalizer.svg'
import thunderIcon from '../../../shared/assets/icons/Thunder.svg'

const STATS = [
  { value: '1,200+', label: 'Learners explored personalized learning paths' },
  { value: '5,000+', label: 'Curated learning resources analyzed' },
  { value: '40+',    label: 'Skill areas covered in programming education' },
  { value: '85%',    label: 'Of users complete the skill assessment' },
]

function NumbersSection() {
  return (
    <section>
      <div className="uape-section-shell uape-about-numbers-inner">
        <h2 className="uape-about-numbers-heading">Uape in Numbers</h2>
        <div className="uape-about-numbers-stats">
          {STATS.map((stat, i) => (
            <Fragment key={stat.value}>
              {i > 0 && <div className="uape-about-numbers-divider" aria-hidden="true" />}
              <div className="uape-about-stat">
                <span className="uape-about-stat-value">{stat.value}</span>
                <span className="uape-about-stat-label">{stat.label}</span>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}

const BELIEFS = [
  {
    icon: eyeIcon,
    iconBg: '#30A14E3D',
    title: 'Clarity',
    text: 'Learners should always understand where they are in their learning journey.',
  },
  {
    icon: equalizerIcon,
    iconBg: '#B05BFF3D',
    title: 'Personalization',
    text: "Educational experiences should adapt to the learner's skills and goals.",
  },
  {
    icon: thunderIcon,
    iconBg: '#E66A183D',
    title: 'Efficiency',
    text: 'Time should be spent on meaningful learning, not on searching for the right content.',
  },
]

function WhatWeBelieveSection() {
  return (
    <section className="uape-about-believe-section">
      <div className="uape-section-shell uape-about-believe-inner">
        <div className="uape-about-believe-header">
          <h2 className="uape-about-believe-heading">What We Believe</h2>
          <p className="uape-about-believe-subtitle">Our philosophy is based on three principles:</p>
        </div>
        <div className="uape-about-believe-cards">
          {BELIEFS.map(({ icon, iconBg, title, text }) => (
            <div key={title} className="uape-about-believe-card">
              <div className="uape-about-believe-icon" style={{ background: iconBg }}>
                <img src={icon} alt="" aria-hidden="true" className="uape-about-believe-icon-img" />
              </div>
              <div className="uape-about-believe-card-body">
                <h3 className="uape-about-believe-card-title">{title}</h3>
                <p className="uape-about-believe-card-text">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const DIFFERENT_POINTS = [
  'Skill-based diagnostics to determine the starting point',
  'Personalized learning paths for different goals',
  'Curated resources instead of overwhelming course catalogs',
  'Progress tracking and structured learning',
  'Focus on efficiency and real skill development',
]

function WhatMakesDifferentSection() {
  return (
    <section className="uape-about-different-section">
      <div className="uape-section-shell uape-about-different-inner">
        <div className="uape-about-different-left">
          <h2 className="uape-about-different-heading">What Makes Uape Different</h2>
          <ul className="uape-about-different-list">
            {DIFFERENT_POINTS.map((point) => (
              <li key={point} className="uape-about-different-item">{point}</li>
            ))}
          </ul>
        </div>
        <div className="uape-about-different-right">
          <img src={differentImg} alt="" aria-hidden="true" className="uape-about-different-img" />
        </div>
      </div>
    </section>
  )
}

function StartLearningSmarterSection() {
  return (
    <section className="uape-about-cta-section">
      <div className="uape-section-shell uape-about-cta-wrapper">
        <div className="uape-about-cta-card">
          <div className="uape-about-cta-content">
            <div className="uape-about-cta-text-group">
              <h2 className="uape-about-cta-heading">Start Learning Smarter</h2>
              <div className="uape-about-cta-paragraphs">
                <p className="uape-about-cta-text">
                  Whether you are just starting your programming journey or looking to improve
                  your skills, UAPE helps you focus on what matters most.
                </p>
                <p className="uape-about-cta-text">
                  Discover your level, follow a personalized path, and grow your programming
                  skills with confidence.
                </p>
              </div>
            </div>
            <button className="uape-orange-btn uape-diagnostic-start-btn">
              Start diagnostic
            </button>
          </div>
          <img src={rideIcon} alt="" aria-hidden="true" className="uape-about-cta-icon" />
        </div>
      </div>
    </section>
  )
}

function OurStorySection() {
  return (
    <section className="uape-about-story-section">
      <div className="uape-section-shell uape-about-story-inner">
        <div className="uape-about-story-left">
          <img src={storyImg} alt="" aria-hidden="true" className="uape-about-story-img" />
        </div>
        <div className="uape-about-story-right">
          <h2 className="uape-about-story-heading">Our Story</h2>
          <div className="uape-about-story-paragraphs">
            <p className="uape-about-story-text">
              UAPE started as a response to a common problem faced by many learners in online
              education: the difficulty of navigating through thousands of courses without a
              clear direction.
            </p>
            <p className="uape-about-story-text">
              While exploring existing learning platforms, we noticed that many users struggle
              to identify where to start and which resources are actually relevant to their
              current level. This often leads to wasted time, frustration, and unfinished courses.
            </p>
            <p className="uape-about-story-text">
              UAPE was created as a concept for a more structured learning experience — a
              platform that helps learners identify their current knowledge, understand their
              skill gaps, and follow a clear learning path toward their goals.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function AboutDescription() {
  return (
    <section className="uape-about-desc-section">
      <div className="uape-section-shell uape-about-desc-inner">
        <h2 className="uape-about-desc-heading">About Us</h2>
        <div className="uape-about-desc-columns">
          <p className="uape-about-desc-text">
            UAPE is an educational platform designed to make learning programming more
            structured and efficient. Instead of overwhelming learners with endless courses,
            we focus on identifying skill levels and guiding users through personalized
            learning paths.
          </p>
          <p className="uape-about-desc-text">
            Our goal is to simplify the learning journey and help people focus on the skills
            that truly matter.
          </p>
        </div>
      </div>
    </section>
  )
}

function HeroBanner() {
  return (
    <section className="uape-about-hero">
      <div className="uape-section-shell">
        <div className="uape-about-hero-image">
          <img src={heroImg} alt="" aria-hidden="true" className="uape-about-hero-bg" />
          <div className="uape-about-hero-overlay" />
          <div className="uape-about-hero-text-layer">
            <h1 className="uape-about-hero-title">About Us</h1>
          </div>
        </div>
      </div>
    </section>
  )
}

function AboutUsPage() {
  return (
    <div className="uape-about-us-page min-h-screen bg-uape-bg text-uape-white">
      <SiteHeader />
      <main>
        <HeroBanner />
        <AboutDescription />
        <NumbersSection />
        <OurStorySection />
        <WhatWeBelieveSection />
        <WhatMakesDifferentSection />
        <StartLearningSmarterSection />
      </main>
      <SiteFooter />
    </div>
  )
}

export default AboutUsPage
