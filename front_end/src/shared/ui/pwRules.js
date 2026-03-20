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
