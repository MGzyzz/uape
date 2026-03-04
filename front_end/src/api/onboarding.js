import client from './client'

export async function getOnboarding() {
  const res = await client.get('/onboarding/')
  return res.data
}

export async function saveOnboarding(data) {
  const res = await client.patch('/onboarding/', data)
  return res.data
}
