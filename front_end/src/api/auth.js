import client from './client'

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
 * Remove tokens from localStorage (logout).
 */
export function clearTokens() {
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')
}
