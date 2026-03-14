import client from './client'

const LS_KEY = 'assessmentResults'

export function getCachedResults() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY)) ?? {}
  } catch {
    return {}
  }
}

export function setCachedResult(language, level, score) {
  const current = getCachedResults()
  current[language] = { level, score }
  localStorage.setItem(LS_KEY, JSON.stringify(current))
}

export function getCachedResult(language) {
  return getCachedResults()[language] ?? null
}

export async function submitAssessment(language, score) {
  const res = await client.post('/assessment/submit/', { language, score })
  return res.data
}

export async function getAssessmentResults() {
  const res = await client.get('/assessment/results/')
  return res.data
}
