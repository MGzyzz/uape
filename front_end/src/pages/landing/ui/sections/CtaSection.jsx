import './CtaSection.css'
import { Link } from 'react-router-dom'
import ctaImage from '../../assets/working-process.png'
import { useAuth } from '../../../../app/AuthContext.jsx'

function CtaSection() {
  const { isAuth } = useAuth()
  return (
    <section className="uape-cta-section">
      <div className="uape-page-container uape-page-gutter uape-cta-grid">
        <article className="uape-cta-card">
          <h3 className="uape-cta-title">
            Start learning with a clear understanding of your level
          </h3>
          <p className="uape-cta-desc">
            UAPE helps you enhance your skills, expand you knowledge, and prepare for technical interviews with
            confidence.
          </p>
          <Link
            to={isAuth ? '/diagnostic' : '/login'}
            className="uape-orange-btn uape-cta-btn"
          >
            Start diagnostic
          </Link>
        </article>

        <article className="uape-cta-image-card">
          <img
            src={ctaImage}
            alt="Developer working at a desk with code on monitor"
            className="uape-cta-image"
          />
        </article>
      </div>
    </section>
  )
}

export default CtaSection
