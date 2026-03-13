import SiteHeader from '../../../shared/ui/SiteHeader.jsx'
import SiteFooter from '../../../shared/ui/SiteFooter.jsx'
import bgImg from '../../../shared/assets/solution/Frame 503.png'

function DiagnosticPage() {
  return (
    <div className="min-h-screen bg-uape-bg text-uape-white">
      <SiteHeader />
      <main>
        <section className="uape-diagnostic-section">
          <div className="uape-section-shell uape-diagnostic-inner">

            <div className="uape-diagnostic-left">
              <div className="uape-diagnostic-text-group">
                <h1 className="uape-diagnostic-heading">
                  Take the assessment and get courses tailored to your level
                </h1>
                <div className="uape-diagnostic-body">
                  <p className="uape-diagnostic-paragraph">
                    Before we build your personalized learning path, we need to understand your
                    current knowledge. This short diagnostic will help us evaluate your Python
                    skills and identify areas where you can improve.
                  </p>
                  <p className="uape-diagnostic-paragraph">
                    The assessment includes a series of questions about programming concepts,
                    problem-solving.{' '}
                    <span className="uape-diagnostic-paragraph-medium">
                      It takes about 5–7 minutes to complete.
                    </span>
                  </p>
                  <p className="uape-diagnostic-paragraph">
                    Based on your results, we will recommend courses and resources that match
                    your level and help you progress faster.
                  </p>
                  <p className="uape-diagnostic-paragraph">
                    There are no penalties for mistakes — the goal is simply to understand
                    where you are now and guide you to the next step in your learning journey.
                  </p>
                </div>
              </div>
              <button className="uape-orange-btn uape-diagnostic-start-btn">
                Start diagnostic
              </button>
            </div>

            <div className="uape-diagnostic-right">
              <img src={bgImg} alt="" aria-hidden="true" className="uape-diagnostic-bg-img" />
            </div>

          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

export default DiagnosticPage
