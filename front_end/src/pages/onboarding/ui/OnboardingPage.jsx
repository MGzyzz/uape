import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BrandLogo from '../../../shared/ui/BrandLogo.jsx'
import { getOnboarding, saveOnboarding } from '../../../api/onboarding.js'
import { FIELDS, OCCUPATIONS, SKILLS } from '../data/quizData.js'
import paperIcon from '../../../shared/assets/icons/paper-icon.svg'

const TOTAL_STEPS = 3

// ─── Header ───────────────────────────────────────────────────────────────────

function OnboardingHeader({ onSaveExit }) {
  return (
    <header className="uape-header-auth-bg sticky top-0 z-20 border-b border-uape-border-soft backdrop-blur-[80px]">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <BrandLogo />
        <button className="uape-onboarding-save-exit" onClick={onSaveExit}>
          Save & exit
        </button>
      </div>
    </header>
  )
}

// ─── Progress bar ─────────────────────────────────────────────────────────────

function ProgressBar({ step }) {
  return (
    <div className="flex w-full">
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
        <div
          key={i}
          className={`uape-onboarding-progress-segment${i < step ? ' uape-onboarding-progress-segment-active' : ''}`}
        />
      ))}
    </div>
  )
}

// ─── Radio option ─────────────────────────────────────────────────────────────

function RadioOption({ label, selected, onSelect }) {
  return (
    <button
      type="button"
      className="flex items-center gap-3 text-left"
      onClick={onSelect}
    >
      <div className="uape-onboarding-radio-outer">
        {selected && <div className="uape-onboarding-radio-inner" />}
      </div>
      <span className="uape-onboarding-option-label">{label}</span>
    </button>
  )
}

// ─── Checkbox option ──────────────────────────────────────────────────────────

function CheckboxOption({ label, selected, onToggle }) {
  return (
    <button
      type="button"
      className="flex items-center gap-3 text-left"
      onClick={onToggle}
    >
      <div
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded"
        style={{
          background: selected ? '#eb4823' : '#ffffff',
        }}
      >
        {selected && <div className="h-2.5 w-2.5 bg-white" />}
      </div>
      <span className="uape-onboarding-option-label">{label}</span>
    </button>
  )
}

// ─── Steps ────────────────────────────────────────────────────────────────────

function Step1({ value, onChange }) {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="uape-onboarding-title">What field are you learning for?</h1>
      <div className="grid grid-cols-2 gap-x-16 gap-y-5">
        {FIELDS.map((field) => (
          <RadioOption
            key={field}
            label={field}
            selected={value === field}
            onSelect={() => onChange(field)}
          />
        ))}
      </div>
    </div>
  )
}

function Step2({ field, value, onChange }) {
  const options = OCCUPATIONS[field] ?? []
  return (
    <div className="flex flex-col gap-8">
      <h1 className="uape-onboarding-title">Which occupation are you learning for?</h1>
      <div className="grid grid-cols-2 gap-x-16 gap-y-5">
        {options.map((occ) => (
          <RadioOption
            key={occ}
            label={occ}
            selected={value === occ}
            onSelect={() => onChange(occ)}
          />
        ))}
      </div>
    </div>
  )
}

function Step3({ field, value, onChange }) {
  const options = SKILLS[field] ?? []

  function toggle(skill) {
    if (value.includes(skill)) {
      onChange(value.filter((s) => s !== skill))
    } else {
      onChange([...value, skill])
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="uape-onboarding-title">What skills are you interested in?</h1>
        <p className="uape-onboarding-info-text mt-2" style={{ color: '#ffffff8f' }}>
          Choose a few to start with. You can change these or follow more skills in the future.
        </p>
      </div>
      <div>
        <p className="uape-onboarding-option-label mb-4" style={{ color: '#eb4823', fontWeight: 600 }}>
          Popular with learners like you
        </p>
        <div className="grid grid-cols-2 gap-x-16 gap-y-5">
          {options.map((skill) => (
            <CheckboxOption
              key={skill}
              label={skill}
              selected={value.includes(skill)}
              onToggle={() => toggle(skill)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OnboardingPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [field, setField] = useState('')
  const [occupation, setOccupation] = useState('')
  const [skills, setSkills] = useState([])
  const [saving, setSaving] = useState(false)
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('access')) {
      navigate('/login')
      return
    }
    getOnboarding().then((data) => {
      if (data.field) setField(data.field)
      if (data.occupation) setOccupation(data.occupation)
      if (data.skills?.length) setSkills(data.skills)
      // Resume from saved step
      const resumeStep = Math.min(data.current_step + 1, TOTAL_STEPS)
      setStep(resumeStep || 1)
    }).catch(() => {})
  }, [navigate])

  async function handleSaveExit() {
    setSaving(true)
    try {
      await saveCurrentStep()
    } finally {
      setSaving(false)
      navigate('/profile')
    }
  }

  async function saveCurrentStep() {
    const payload = {}
    if (step >= 1 && field) payload.field = field
    if (step >= 2 && occupation) payload.occupation = occupation
    if (step >= 3) payload.skills = skills
    if (Object.keys(payload).length) {
      await saveOnboarding(payload)
    }
  }

  async function handleNext() {
    if (!canProceed()) {
      setShowError(true)
      return
    }
    setShowError(false)
    setSaving(true)
    try {
      await saveCurrentStep()
      if (step < TOTAL_STEPS) {
        setStep((s) => s + 1)
      } else {
        navigate('/profile')
      }
    } finally {
      setSaving(false)
    }
  }

  function canProceed() {
    if (step === 1) return Boolean(field)
    if (step === 2) return Boolean(occupation)
    if (step === 3) return skills.length > 0
    return false
  }

  return (
    <div className="flex min-h-screen flex-col bg-uape-bg text-uape-white">
      <OnboardingHeader onSaveExit={handleSaveExit} />
      <ProgressBar step={step} />

      <main className="flex flex-1 flex-col">
        {/* Info block */}
        {step === 1 && (
        <div className="mx-auto w-full max-w-2xl px-4 pt-12 sm:px-6">
          <div className="uape-onboarding-info-block">
            <img src={paperIcon} alt="" width={40} height={40} style={{ flexShrink: 0 }} />
            <p className="uape-onboarding-info-text">
              Answer a few questions to improve your material recommendations
            </p>
          </div>
        </div>
        )}

        {/* Step content */}
        <div className="mx-auto w-full max-w-2xl flex-1 px-4 pt-10 sm:px-6">
          {step === 1 && (
            <Step1 value={field} onChange={(v) => { setField(v); setOccupation(''); setSkills([]) }} />
          )}
          {step === 2 && (
            <Step2 field={field} value={occupation} onChange={setOccupation} />
          )}
          {step === 3 && (
            <Step3 field={field} value={skills} onChange={setSkills} />
          )}
        </div>

        {/* Back button — fixed bottom-left */}
        {step > 1 && (
          <div className="fixed bottom-8 left-8 z-30">
            <button
              className="uape-onboarding-back-btn"
              onClick={() => { setShowError(false); setStep((s) => s - 1) }}
            >
              Back
            </button>
          </div>
        )}

        {/* Error message */}
        {showError && (
          <div className="fixed bottom-24 right-8 z-30 rounded-lg bg-red-600/90 px-4 py-2 text-sm text-white">
            Please select at least one option
          </div>
        )}

        {/* Next button — fixed bottom-right */}
        <div className="fixed bottom-8 right-8 z-30">
          <button
            className="uape-orange-btn uape-onboarding-next-btn"
            onClick={handleNext}
            disabled={saving}
          >
            {step === TOTAL_STEPS ? 'Submit' : 'Next'}
          </button>
        </div>
      </main>
    </div>
  )
}
