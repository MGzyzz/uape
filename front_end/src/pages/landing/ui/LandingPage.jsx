import SiteHeader from '../../../shared/ui/SiteHeader.jsx'
import SiteFooter from '../../../shared/ui/SiteFooter.jsx'
import HeroSection from './sections/HeroSection.jsx'
import ProblemsSection from './sections/ProblemsSection.jsx'
import SolutionSection from './sections/SolutionSection.jsx'
import TechnologySection from './sections/TechnologySection.jsx'
import HowItWorksSection from './sections/HowItWorksSection.jsx'
import AudienceSection from './sections/AudienceSection.jsx'
import AssessmentSection from './sections/AssessmentSection.jsx'
import BenefitsSection from './sections/BenefitsSection.jsx'
import FaqSection from './sections/FaqSection.jsx'
import CtaSection from './sections/CtaSection.jsx'

function LandingPage() {
  return (
    <div className="min-h-screen bg-uape-bg text-uape-white">
      <SiteHeader />
      <main>
        <HeroSection />
        <ProblemsSection />
        <SolutionSection />
        <TechnologySection />
        <HowItWorksSection />
        <AudienceSection />
        <AssessmentSection />
        <BenefitsSection />
        <FaqSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  )
}

export default LandingPage
