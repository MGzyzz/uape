import './PasswordStrength.css'
import { FiCheck } from 'react-icons/fi'
import { PW_RULES, getPwStrength } from './pwRules.js'

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
