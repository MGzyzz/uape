import client from './client'

const MEDIA_BASE = (import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api').replace(/\/api\/?$/, '')

/**
 * Register a new user.
 * @param {{ first_name: string, last_name: string, email: string, password: string }} data
 * @returns {{ access: string, refresh: string }}
 */
export async function register(data) {
  const response = await client.post('/auth/register/', data)
  return response.data
}

/**
 * Log in with email and password.
 * @param {{ email: string, password: string }} data
 * @returns {{ access: string, refresh: string }}
 */
export async function login(data) {
  const response = await client.post('/auth/login/', data)
  return response.data
}

/**
 * Save tokens to localStorage after a successful auth.
 * @param {{ access: string, refresh: string }} tokens
 */
export function saveTokens({ access, refresh }) {
  localStorage.setItem('access', access)
  localStorage.setItem('refresh', refresh)
}

/**
 * Save user info to localStorage.
 * @param {{ first_name: string, last_name: string, photo?: string|null }} user
 */
export function saveUser({ first_name, last_name, photo = null }) {
  localStorage.setItem('user', JSON.stringify({ first_name, last_name, photo }))
}

/**
 * Fetch the current user's profile from the API.
 * @returns {{ first_name: string, last_name: string, avatar: string|null, bio: string, phone: string }}
 */
export async function getProfile() {
  const response = await client.get('/profile/')
  const data = response.data
  if (data.avatar && !data.avatar.startsWith('http')) {
    data.avatar = `${MEDIA_BASE}${data.avatar}`
  }
  return data
}

/**
 * Get stored user info from localStorage.
 * @returns {{ first_name: string, last_name: string } | null}
 */
export function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem('user'))
  } catch {
    return null
  }
}

/**
 * Remove tokens and user from localStorage (logout).
 */
export function clearTokens() {
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')
  localStorage.removeItem('user')
}
