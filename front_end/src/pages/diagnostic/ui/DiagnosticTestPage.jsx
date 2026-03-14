import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BrandLogo from '../../../shared/ui/BrandLogo.jsx'
import { LANGUAGES, DIAGNOSTIC_DATA, TYPE_LABELS } from '../data/diagnosticData.js'
import { getCachedResult, setCachedResult, submitAssessment } from '../../../api/assessment.js'
import paperIcon from '../../../shared/assets/icons/paper-icon.svg'

const TOTAL_QUESTIONS = 15

// ─── Header ───────────────────────────────────────────────────────────────────

function DiagnosticHeader({ onExit }) {
  return (
    <header className="uape-header-auth-bg sticky top-0 z-20 border-b border-uape-border-soft backdrop-blur-[80px]">
      <div className="uape-section-shell uape-onboarding-navbar-shell">
        <div className="uape-onboarding-logo">
          <BrandLogo />
        </div>
        <button className="uape-onboarding-save-exit" onClick={onExit}>
          Save & exit
        </button>
      </div>
    </header>
  )
}

// ─── Progress bar ─────────────────────────────────────────────────────────────

function ProgressBar({ answered }) {
  return (
    <div className="flex w-full">
      {Array.from({ length: TOTAL_QUESTIONS }).map((_, i) => (
        <div
          key={i}
          className={`uape-onboarding-progress-segment${i < answered ? ' uape-onboarding-progress-segment-active' : ''}`}
        />
      ))}
    </div>
  )
}

// ─── Language selector (step 0) ───────────────────────────────────────────────

function LanguageStep({ selected, onSelect }) {
  function renderCard(lang) {
    return (
      <button
        key={lang.key}
        type="button"
        className="uape-diagnostic-lang-btn"
        style={{ borderColor: selected === lang.key ? lang.color : 'rgba(255,255,255,0.12)' }}
        onClick={() => onSelect(lang.key)}
      >
        <img src={lang.iconSrc} alt="" aria-hidden="true" className="uape-diagnostic-lang-svg" />
        <span className="uape-onboarding-option-label">{lang.label}</span>
      </button>
    )
  }

  return (
    <div className="uape-diagnostic-lang-step">
      <div className="uape-diagnostic-lang-info-block">
        <img src={paperIcon} alt="" aria-hidden="true" className="uape-diagnostic-lang-info-icon" />
        <p className="uape-diagnostic-lang-info-text">
          Answer questions and solve problems of varying difficulty so we can determine your exact level
        </p>
      </div>
      <div className="uape-diagnostic-lang-lower">
        <h1 className="uape-diagnostic-lang-title">Select a programming language</h1>
        <div className="uape-diagnostic-lang-grid">
          <div className="uape-diagnostic-lang-col">
            {LANGUAGES.slice(0, 3).map(renderCard)}
          </div>
          <div className="uape-diagnostic-lang-col">
            {LANGUAGES.slice(3).map(renderCard)}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Code editor with one editable blank line (mini_task) ─────────────────────

function CodeEditor({ codeLines, blankPlaceholder, value, onChange }) {
  return (
    <div className="uape-diagnostic-code-editor">
      {codeLines.map((line, i) =>
        line === null ? (
          <div key={i} className="uape-diagnostic-code-editor-line uape-diagnostic-code-editor-line--blank">
            <span className="uape-diagnostic-code-editor-linenum">{i + 1}</span>
            <div className="uape-diagnostic-code-editor-blank-wrap">
              <input
                className="uape-diagnostic-code-editor-input"
                placeholder={blankPlaceholder}
                value={value ?? ''}
                onChange={(e) => onChange(e.target.value)}
                autoComplete="off"
                spellCheck={false}
              />
            </div>
          </div>
        ) : (
          <div key={i} className="uape-diagnostic-code-editor-line">
            <span className="uape-diagnostic-code-editor-linenum">{i + 1}</span>
            <span className="uape-diagnostic-code-editor-text">{line}</span>
          </div>
        )
      )}
    </div>
  )
}

// ─── Question (steps 1–15) ────────────────────────────────────────────────────

function QuestionStep({ question, selectedAnswer, textAnswer, onSelect, onTextChange, questionNumber }) {
  if (!question) return (
    <p className="uape-assessment-result-subtitle">
      Question not available. Please check the question bank.
    </p>
  )

  const isMiniTask = question.type === 'mini_task'

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <span className="uape-diagnostic-type-badge">{TYPE_LABELS[question.type]}</span>
        <span className="uape-diagnostic-question-num">Question {questionNumber} of {TOTAL_QUESTIONS}</span>
      </div>
      <h2 className="uape-onboarding-title">{question.question}</h2>

      {isMiniTask ? (
        <CodeEditor
          codeLines={question.codeLines}
          blankPlaceholder={question.blankPlaceholder}
          value={textAnswer}
          onChange={onTextChange}
        />
      ) : (
        <>
          {question.code && (
            <pre className="uape-diagnostic-code-block">{question.code}</pre>
          )}
          <div className="flex flex-col gap-3">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                type="button"
                className={`uape-diagnostic-option-btn${selectedAnswer === idx ? ' uape-diagnostic-option-btn--selected' : ''}`}
                onClick={() => onSelect(idx)}
              >
                <span className="uape-diagnostic-option-radio">
                  {selectedAnswer === idx ? (
                    <span className="uape-diagnostic-option-radio-dot" />
                  ) : null}
                </span>
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DiagnosticTestPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [language, setLanguage] = useState('')
  const [answers, setAnswers] = useState(Array(TOTAL_QUESTIONS).fill(null))
  const [textAnswers, setTextAnswers] = useState(Array(TOTAL_QUESTIONS).fill(''))
  const [showError, setShowError] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const questions = language ? DIAGNOSTIC_DATA[language] : []
  const currentQuestion = step >= 1 ? questions[step - 1] : null
  const currentAnswer = step >= 1 ? answers[step - 1] : null
  const currentTextAnswer = step >= 1 ? textAnswers[step - 1] : ''
  const isMiniTask = currentQuestion?.type === 'mini_task'

  function handleExit() {
    navigate('/profile')
  }

  function canProceed() {
    if (step === 0) return Boolean(language)
    if (isMiniTask) return (currentTextAnswer ?? '').trim() !== ''
    return currentAnswer !== null
  }

  async function handleNext() {
    if (!canProceed()) {
      setShowError(true)
      return
    }
    setShowError(false)

    if (step === 0) {
      const cached = getCachedResult(language)
      if (cached) {
        navigate(`/diagnostic/result?lang=${language}`)
        return
      }
      setStep(1)
      return
    }

    if (step === TOTAL_QUESTIONS) {
      await handleSubmit()
      return
    }

    setStep((s) => s + 1)
  }

  function handleBack() {
    setShowError(false)
    if (step > 0) setStep((s) => s - 1)
  }

  function selectAnswer(idx) {
    setAnswers((prev) => {
      const next = [...prev]
      next[step - 1] = idx
      return next
    })
  }

  function setTextAnswer(text) {
    setTextAnswers((prev) => {
      const next = [...prev]
      next[step - 1] = text
      return next
    })
  }

  useEffect(() => {
    function onKeyDown(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return

      if (e.key === 'Enter') {
        e.preventDefault()
        handleNext()
        return
      }

      if (step >= 1 && !isMiniTask && currentQuestion) {
        const num = parseInt(e.key, 10)
        if (num >= 1 && num <= (currentQuestion.options?.length ?? 0)) {
          selectAnswer(num - 1)
        }
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [step, isMiniTask, currentQuestion, answers, textAnswers, language, submitting])

  async function handleSubmit() {
    setSubmitting(true)
    // mini_task is not auto-scored
    const score = answers.reduce((acc, ans, i) => {
      if (questions[i].type === 'mini_task') return acc
      return acc + (ans === questions[i].answer ? 1 : 0)
    }, 0)

    try {
      const data = await submitAssessment(language, score)
      setCachedResult(language, data.level, data.score)
      navigate(`/diagnostic/result?lang=${language}`)
    } catch (err) {
      const data = err.response?.data
      if (data?.detail === 'already_exists') {
        setCachedResult(language, data.level, data.score)
        navigate(`/diagnostic/result?lang=${language}`)
      } else {
        setShowError(true)
        setSubmitting(false)
      }
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-uape-bg text-uape-white">
      <DiagnosticHeader onExit={handleExit} />

      {step >= 1 && <ProgressBar answered={step} />}

      <main className="flex flex-1 flex-col">
        <div className="mx-auto w-full max-w-2xl flex-1 px-4 pt-10 sm:px-6">
          {step === 0 && (
            <LanguageStep selected={language} onSelect={(l) => { setLanguage(l); setShowError(false) }} />
          )}
          {step >= 1 && currentQuestion && (
            <QuestionStep
              question={currentQuestion}
              selectedAnswer={currentAnswer}
              textAnswer={currentTextAnswer}
              onSelect={selectAnswer}
              onTextChange={setTextAnswer}
              questionNumber={step}
            />
          )}
        </div>

        <div className="uape-onboarding-nav-row">
          {step > 0 ? (
            <button className="uape-onboarding-back-btn" onClick={handleBack}>
              Back
            </button>
          ) : (
            <span />
          )}
          <button
            className="uape-orange-btn uape-onboarding-next-btn"
            onClick={handleNext}
            disabled={submitting}
          >
            {step === TOTAL_QUESTIONS ? 'Submit' : 'Next'}
          </button>
        </div>

        {showError && (
          <div className="uape-diagnostic-error-toast">
            {step === 0
              ? 'Please select a language'
              : step === TOTAL_QUESTIONS
              ? 'Failed to submit. Try again.'
              : isMiniTask
              ? 'Please type your answer'
              : 'Please select an answer'}
          </div>
        )}
      </main>
    </div>
  )
}
