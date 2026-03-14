import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import SiteHeader from '../../../shared/ui/SiteHeader.jsx'
import SiteFooter from '../../../shared/ui/SiteFooter.jsx'
import { getCachedResult, getAssessmentResults, setCachedResult } from '../../../api/assessment.js'
import { LANGUAGES } from '../data/diagnosticData.js'

const LEVEL_CONFIG = {
  beginner:     { label: 'Beginner',     color: '#22c55e' },
  intermediate: { label: 'Intermediate', color: '#3b82f6' },
  advanced:     { label: 'Advanced',     color: '#a855f7' },
}

export default function DiagnosticResultPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const lang = searchParams.get('lang') ?? 'python'
  const langMeta = LANGUAGES.find((l) => l.key === lang)

  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cached = getCachedResult(lang)
    if (cached) {
      setResult(cached)
      setLoading(false)
      return
    }
    getAssessmentResults()
      .then((list) => {
        const found = list.find((r) => r.language === lang)
        if (found) {
          setCachedResult(lang, found.level, found.score)
          setResult({ level: found.level, score: found.score })
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [lang])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-uape-bg text-uape-white">
        Loading...
      </div>
    )
  }

  if (!result) {
    return (
      <div className="flex min-h-screen flex-col bg-uape-bg text-uape-white">
        <SiteHeader />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <p className="mb-4">No result found for {langMeta?.label ?? lang}.</p>
            <button className="uape-orange-btn" onClick={() => navigate('/diagnostic/test')}>
              Take the test
            </button>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  const levelCfg = LEVEL_CONFIG[result.level] ?? LEVEL_CONFIG.beginner

  return (
    <div className="flex min-h-screen flex-col bg-uape-bg text-uape-white">
      <SiteHeader />
      <main className="flex flex-1 flex-col items-center justify-center gap-8 px-4 py-16">
        <div className="uape-diagnostic-result-card">
          <p className="uape-diagnostic-result-lang">
            {langMeta?.iconSrc && <img src={langMeta.iconSrc} alt="" aria-hidden="true" className="uape-diagnostic-result-lang-icon" />}
            {langMeta?.label ?? lang}
          </p>
          <p className="uape-diagnostic-result-label">Your Result</p>
          <p className={`uape-diagnostic-result-level uape-diagnostic-result-level--${result.level}`}>
            {levelCfg.label}
          </p>
          <p className="uape-diagnostic-result-score">
            {result.score} / 15 correct
          </p>
          <p className="uape-diagnostic-result-desc">
            Based on your answers, your current {langMeta?.label ?? lang} level is{' '}
            <strong>{levelCfg.label}</strong>. Your profile has been updated with personalized
            course recommendations.
          </p>
          <button
            className="uape-orange-btn uape-diagnostic-result-go-btn"
            onClick={() => navigate('/profile')}
          >
            Go to profile
          </button>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
