import './PasswordStrength.css'
import { FiCheck } from 'react-icons/fi'

export const PW_RULES = [
  { id: 'len',     label: 'At least 8 characters',          test: p => p.length >= 8 },
  { id: 'upper',   label: 'At least one uppercase letter',  test: p => /[A-Z]/.test(p) },
  { id: 'digit',   label: 'At least one number',            test: p => /\d/.test(p) },
  { id: 'special', label: 'At least one special character', test: p => /[^A-Za-z0-9]/.test(p) },
]

export function getPwStrength(pw) {
  if (!pw) return 0
  return PW_RULES.filter(r => r.test(pw)).length
}

export function validatePwRules(pw) {
  const failed = PW_RULES.find(r => !r.test(pw))
  return failed ? failed.label : null
}

function PasswordStrength({ password }) {
  if (!password) return null
  const score = getPwStrength(password)
  const level = score <= 1 ? 'weak' : score <= 3 ? 'medium' : 'strong'

  return (
    <div className="uape-pw-strength">
      <div className="uape-pw-bars">
        {[0, 1, 2, 3].map(i => (
          <div
            key={i}
            className={`uape-pw-bar${i < score ? ` uape-pw-bar--${level}` : ''}`}
          />
        ))}
      </div>
      <div className="uape-pw-rules">
        {PW_RULES.map(rule => {
          const ok = rule.test(password)
          return (
            <span key={rule.id} className={`uape-pw-rule${ok ? ' uape-pw-rule--ok' : ''}`}>
              <FiCheck size={11} />
              {rule.label}
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default PasswordStrength
