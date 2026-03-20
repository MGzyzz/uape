import './DiagnosticTestPage.css'
import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Editor from '@monaco-editor/react'
import { LANGUAGES, DIAGNOSTIC_DATA } from '../data/diagnosticData.js'
import { getCachedResult, setCachedResult, submitAssessment } from '../../../api/assessment.js'
import BrandLogo from '../../../shared/ui/BrandLogo.jsx'
import paperIcon from '../../../shared/assets/icons/paper-icon.svg'
import checkIcon from '../../../shared/assets/icons/arrow-correct-right.svg'
import checkboxIcon from '../../../shared/assets/icons/checkbox-icon.svg'
import arrowLeftIcon from '../assets/Arrow left.png'

const TOTAL_QUESTIONS = 36

const MONACO_LANG = {
  python: 'python',
  javascript: 'javascript',
  java: 'java',
  csharp: 'csharp',
  cpp: 'cpp',
}

// Page 1: all theory, Page 2: find_error + what_output, Page 3: mini_task
function buildPages(questions) {
  const theory  = questions.filter((q) => q.type === 'theory')
  const codeMcq = questions.filter((q) => q.type === 'find_error' || q.type === 'what_output')
  const mini    = questions.filter((q) => q.type === 'mini_task')

  const pages = []
  if (theory.length)  pages.push({ start: 0, questions: theory })
  if (codeMcq.length) pages.push({ start: theory.length, questions: codeMcq })
  mini.forEach((q, i) => pages.push({ start: theory.length + codeMcq.length + i, questions: [q] }))
  return pages
}

// ─── Header ───────────────────────────────────────────────────────────────────

function DiagnosticHeader({ onExit, onBack, step, totalPages }) {
  const totalSteps = (totalPages || 3) + 1
  const pct = Math.round(((step + 1) / totalSteps) * 100)
  return (
    <header className="uape-header-auth-bg sticky top-0 z-20 border-b border-uape-border-soft backdrop-blur-[80px]">
      <div className="uape-section-shell uape-diagnostic-navbar-shell">
        <div className="uape-diagnostic-navbar-left-group">
          {step === 0 ? (
            <BrandLogo />
          ) : (
            <>
              <button className="uape-diagnostic-header-back-btn" onClick={onBack}>
                <img src={arrowLeftIcon} alt="" className="uape-diagnostic-back-icon" />
                <span>Back</span>
              </button>
              <div className="uape-diagnostic-navbar-info">
                <span className="uape-diagnostic-navbar-title">Test questions</span>
                <span className="uape-diagnostic-navbar-count">{TOTAL_QUESTIONS} Questions</span>
              </div>
            </>
          )}
        </div>
        <button className="uape-diagnostic-save-exit" onClick={onExit}>
          Save & exit
        </button>
      </div>
      <div className="uape-diagnostic-progress-wrap">
        <div className="uape-diagnostic-progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </header>
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
        <span className="uape-diagnostic-option-label">{lang.label}</span>
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

// ─── Monaco read-only code block (find_error / what_output) ──────────────────

function MonacoCodeBlock({ code, language }) {
  const lineCount = (code || '').split('\n').length
  const height = lineCount * 21 + 28
  return (
    <div className="uape-diagnostic-monaco-block">
      <Editor
        height={height}
        language={MONACO_LANG[language] || 'plaintext'}
        value={code || ''}
        theme="vs-dark"
        options={{
          readOnly: true,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          lineHeight: 21,
          renderLineHighlight: 'none',
          scrollbar: { vertical: 'hidden', horizontal: 'hidden', alwaysConsumeMouseWheel: false },
          overviewRulerLanes: 0,
          overviewRulerBorder: false,
          contextmenu: false,
          folding: false,
          glyphMargin: false,
          padding: { top: 12, bottom: 12 },
        }}
      />
    </div>
  )
}

// ─── Monaco full code editor (mini_task) ──────────────────────────────────────

function MonacoCodeEditor({ value, onChange, language }) {
  return (
    <div className="uape-diagnostic-monaco-editor">
      <Editor
        height={300}
        language={MONACO_LANG[language] || 'plaintext'}
        value={value ?? ''}
        theme="vs-dark"
        onChange={(val) => onChange(val ?? '')}
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          lineHeight: 21,
          tabSize: 2,
          automaticLayout: true,
          overviewRulerLanes: 0,
          overviewRulerBorder: false,
          padding: { top: 12, bottom: 12 },
        }}
      />
    </div>
  )
}

// ─── Radio option ─────────────────────────────────────────────────────────────

function RadioOption({ label, selected, onSelect }) {
  return (
    <button type="button" className="uape-diagnostic-q-option" onClick={onSelect}>
      <div className={`uape-diagnostic-radio-outer${selected ? ' uape-diagnostic-radio-outer--active' : ''}`}>
        {selected && <div className="uape-diagnostic-radio-inner" />}
      </div>
      <span className="uape-diagnostic-option-label">{label}</span>
    </button>
  )
}

// ─── Checkbox option ──────────────────────────────────────────────────────────

function CheckboxOption({ label, selected, onToggle }) {
  return (
    <button type="button" className="uape-diagnostic-q-option" onClick={onToggle}>
      {selected
        ? <img src={checkIcon} alt="" width={20} height={20} />
        : <img src={checkboxIcon} alt="" width={20} height={20} className="uape-diagnostic-checkbox-inactive" />
      }
      <span className="uape-diagnostic-option-label">{label}</span>
    </button>
  )
}

// ─── Single question block ─────────────────────────────────────────────────────

function QuestionBlock({ question, globalIndex, selectedAnswer, textAnswer, onSelect, onToggle, onTextChange, isUnanswered, isActive, language }) {
  const isMiniTask = question.type === 'mini_task'
  const isMulti = question.multi === true
  const selectedArr = Array.isArray(selectedAnswer) ? selectedAnswer : []

  return (
    <div
      className={`uape-diagnostic-q-row${isActive ? ' uape-diagnostic-q-row--active' : ''}`}
      data-qidx={globalIndex}
    >
      <span className={`uape-diagnostic-q-num${isUnanswered ? ' uape-diagnostic-q-num--error' : ''}`}>{globalIndex + 1}.</span>
      <div className="uape-diagnostic-q-content">
        <p className="uape-diagnostic-q-text">{question.question}</p>

        {isMiniTask ? (
          <MonacoCodeEditor
            value={textAnswer}
            onChange={onTextChange}
            language={language}
          />
        ) : (
          <>
            {question.code && (
              <MonacoCodeBlock code={question.code} language={language} />
            )}
            <div className="uape-diagnostic-q-options">
              {question.options.map((option, idx) =>
                isMulti ? (
                  <CheckboxOption
                    key={idx}
                    label={option}
                    selected={selectedArr.includes(idx)}
                    onToggle={() => onToggle(idx)}
                  />
                ) : (
                  <RadioOption
                    key={idx}
                    label={option}
                    selected={selectedAnswer === idx}
                    onSelect={() => onSelect(idx)}
                  />
                )
              )}
            </div>
          </>
        )}
      </div>
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
  const [submitFailed, setSubmitFailed] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [unansweredSet, setUnansweredSet] = useState(new Set())
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0)

  const sortedQuestions = language ? [
    ...DIAGNOSTIC_DATA[language].filter((q) => q.type === 'theory'),
    ...DIAGNOSTIC_DATA[language].filter((q) => q.type === 'find_error' || q.type === 'what_output'),
    ...DIAGNOSTIC_DATA[language].filter((q) => q.type === 'mini_task'),
  ] : []

  const pages = sortedQuestions.length ? buildPages(sortedQuestions) : []
  const totalPages = pages.length
  const currentPage = step >= 1 ? pages[step - 1] : null

  function handleExit() {
    navigate('/profile')
  }

  function isPageAnswered(page) {
    return page.questions.every((q, i) => {
      const idx = page.start + i
      if (q.type === 'mini_task') return (textAnswers[idx] ?? '').trim() !== ''
      if (q.multi) return Array.isArray(answers[idx]) && answers[idx].length > 0
      return answers[idx] !== null
    })
  }

  function canProceed() {
    if (step === 0) return Boolean(language)
    if (!currentPage) return false
    return isPageAnswered(currentPage)
  }

  async function handleSubmit() {
    setSubmitting(true)
    const score = answers.reduce((acc, ans, i) => {
      const q = sortedQuestions[i]
      if (!q || q.type === 'mini_task') return acc
      if (q.multi) {
        const correct = Array.isArray(q.answer) ? [...q.answer].sort() : [q.answer]
        const selected = Array.isArray(ans) ? [...ans].sort() : []
        return acc + (JSON.stringify(correct) === JSON.stringify(selected) ? 1 : 0)
      }
      return acc + (ans === q.answer ? 1 : 0)
    }, 0)

    try {
      const data = await submitAssessment(language, score)
      setCachedResult(language, data.level, data.score)
      navigate('/diagnostic', { state: { scrollToResult: true } })
    } catch {
      setSubmitFailed(true)
      setSubmitting(false)
    }
  }

  async function handleNext() {
    if (!canProceed()) {
      setShowError(true)
      if (currentPage) {
        const missed = new Set(
          currentPage.questions
            .map((_, i) => currentPage.start + i)
            .filter((globalIdx) => {
              const q = sortedQuestions[globalIdx]
              if (!q) return false
              if (q.type === 'mini_task') return (textAnswers[globalIdx] ?? '').trim() === ''
              if (q.multi) return !(Array.isArray(answers[globalIdx]) && answers[globalIdx].length > 0)
              return answers[globalIdx] === null
            })
        )
        setUnansweredSet(missed)
      }
      return
    }
    setShowError(false)
    setSubmitFailed(false)
    setUnansweredSet(new Set())

    if (step === 0) {
      const cached = getCachedResult(language)
      if (cached) {
        navigate('/diagnostic', { state: { scrollToResult: true } })
        return
      }
      setStep(1)
      setActiveQuestionIdx(pages[0]?.start ?? 0)
      return
    }

    if (step === totalPages) {
      await handleSubmit()
      return
    }

    setStep((s) => s + 1)
    setActiveQuestionIdx(pages[step]?.start ?? 0)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleBack() {
    setShowError(false)
    if (step > 0) {
      setStep((s) => s - 1)
      setActiveQuestionIdx(pages[step - 2]?.start ?? 0)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function selectAnswer(globalIdx, answerIdx) {
    setAnswers((prev) => {
      const next = [...prev]
      next[globalIdx] = answerIdx
      return next
    })
  }

  function toggleMultiAnswer(globalIdx, answerIdx) {
    setAnswers((prev) => {
      const next = [...prev]
      const current = Array.isArray(next[globalIdx]) ? next[globalIdx] : []
      next[globalIdx] = current.includes(answerIdx)
        ? current.filter((i) => i !== answerIdx)
        : [...current, answerIdx]
      return next
    })
  }

  function setTextAnswer(globalIdx, text) {
    setTextAnswers((prev) => {
      const next = [...prev]
      next[globalIdx] = text
      return next
    })
  }

  const handleNextRef = useRef(handleNext)
  useLayoutEffect(() => { handleNextRef.current = handleNext })

  const kbStateRef = useRef({ currentPage, activeQuestionIdx, answers, selectAnswer })
  useLayoutEffect(() => {
    kbStateRef.current = { currentPage, activeQuestionIdx, answers, selectAnswer }
  })

  useEffect(() => {
    function onKeyDown(e) {
      // Never intercept events from inside Monaco editor or native inputs
      if (e.target.tagName === 'INPUT') return
      if (e.target.tagName === 'TEXTAREA') return
      if (e.target.closest?.('.monaco-editor')) return

      if (e.key === 'Enter') {
        e.preventDefault()
        handleNextRef.current()
        return
      }

      if (e.key === 'Tab') {
        e.preventDefault()
        const { currentPage: page, activeQuestionIdx: activeIdx, answers: ans, selectAnswer: select } = kbStateRef.current
        if (!page) return

        const localIdx = activeIdx - page.start
        const q = page.questions[localIdx]

        // Auto-select first answer for current question if it's a single-select MCQ and unanswered
        if (q && q.type !== 'mini_task' && !q.multi && ans[activeIdx] === null) {
          select(activeIdx, 0)
        }

        // Advance to next question on this page
        const nextLocalIdx = localIdx + 1
        if (nextLocalIdx < page.questions.length) {
          const nextGlobalIdx = page.start + nextLocalIdx
          setActiveQuestionIdx(nextGlobalIdx)
          setTimeout(() => {
            document.querySelector(`[data-qidx="${nextGlobalIdx}"]`)
              ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }, 30)
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const isLastPage = step === totalPages

  return (
    <div className="flex min-h-screen flex-col bg-uape-bg text-uape-white">
      <DiagnosticHeader onExit={handleExit} onBack={handleBack} step={step} totalPages={totalPages} />

      <main className="flex flex-1 flex-col">
        <div className="mx-auto w-full max-w-2xl flex-1 px-4 pt-10 sm:px-6">
          {step === 0 && (
            <LanguageStep
              selected={language}
              onSelect={(l) => { setLanguage(l); setShowError(false) }}
            />
          )}

          {step >= 1 && currentPage && (
            <div className="uape-diagnostic-questions-page">
              {currentPage.questions.map((question, i) => {
                const globalIdx = currentPage.start + i
                return (
                  <QuestionBlock
                    key={question.id}
                    question={question}
                    globalIndex={globalIdx}
                    selectedAnswer={answers[globalIdx]}
                    textAnswer={textAnswers[globalIdx]}
                    isUnanswered={unansweredSet.has(globalIdx)}
                    isActive={globalIdx === activeQuestionIdx}
                    onSelect={(idx) => selectAnswer(globalIdx, idx)}
                    onToggle={(idx) => toggleMultiAnswer(globalIdx, idx)}
                    onTextChange={(text) => setTextAnswer(globalIdx, text)}
                    language={language}
                  />
                )
              })}
            </div>
          )}

          <div className="uape-diagnostic-submit-row">
            <button
              className="uape-orange-btn uape-diagnostic-submit-btn"
              onClick={handleNext}
              disabled={submitting || (step === 0 && !language)}
            >
              {step > 0 && isLastPage ? 'Submit' : 'Next'}
            </button>
          </div>
        </div>

        {showError && (
          <div className="uape-diagnostic-error-toast">
            {step === 0
              ? 'Please select a language'
              : 'Please answer all questions on this page'}
          </div>
        )}
        {submitFailed && (
          <div className="uape-diagnostic-error-toast">
            Failed to submit. Try again.
          </div>
        )}
      </main>
    </div>
  )
}
