import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SiteHeader from '../../../shared/ui/SiteHeader.jsx'
import SiteFooter from '../../../shared/ui/SiteFooter.jsx'
import { getStoredUser, getProfile, saveUser } from '../../../api/auth.js'
import authPageBg from '../../../shared/assets/solution/auth-page.png'
import WhatToLearnNextSection from './WhatToLearnNextSection.jsx'

function ProfilePage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(getStoredUser)

  useEffect(() => {
    if (!localStorage.getItem('access') || !user) {
      navigate('/login')
      return
    }
    getProfile().then(profile => {
      const updated = {
        first_name: profile.first_name,
        last_name: profile.last_name,
        photo: profile.avatar ?? null,
      }
      saveUser(updated)
      setUser(updated)
    }).catch(() => {})
  }, [])

  if (!user) return null

  return (
    <div className="flex min-h-screen flex-col bg-uape-bg text-uape-white">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection user={user} />
        <WhatToLearnNextSection />
      </main>
      <SiteFooter />
    </div>
  )
}

function HeroSection({ user }) {
  const navigate = useNavigate()
  const initials = `${user.first_name?.[0] ?? ''}${user.last_name?.[0] ?? ''}`.toUpperCase()

  return (
    <section>
      {/* Welcome area — above background image */}
      <div className="mx-auto flex w-full max-w-6xl items-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          {/* Avatar */}
          <div className="uape-profile-avatar-shell shrink-0 overflow-hidden">
            {user.photo ? (
              <img
                src={user.photo}
                alt={`${user.first_name} ${user.last_name}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center bg-uape-accent text-2xl font-semibold text-uape-white">
                {initials}
              </span>
            )}
          </div>

          {/* Text */}
          <div className="flex flex-col gap-2">
            <h1 className="uape-profile-hero-title">
              Welcome back, {user.first_name} {user.last_name}
            </h1>
            <a href="#" className="uape-profile-hero-link">
              Add occupation and interests
            </a>
          </div>
        </div>
      </div>

      {/* Background image area — diagnostic card inside */}
      <div className="uape-profile-hero-image-area relative overflow-hidden">
        <img
          src={authPageBg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover pointer-events-none select-none"
        />
        <div className="uape-profile-hero-overlay absolute inset-0" />
        <div className="uape-profile-hero-content relative mx-auto flex w-full max-w-6xl items-center px-4 sm:px-6 lg:px-8">
          <DiagnosticCard navigate={navigate} />
        </div>
      </div>
    </section>
  )
}

function DiagnosticCard({ navigate }) {
  return (
    <div className="uape-diagnostic-card">
      <h2 className="uape-diagnostic-card-title">Not sure where to start?</h2>
      <p className="uape-diagnostic-card-text">
        Take a quick assessment and get courses that match your real skill level.
      </p>
      <button
        className="uape-learn-primary-btn uape-diagnostic-start-btn"
        onClick={() => navigate('/onboarding')}
      >
        Start diagnostic
      </button>
    </div>
  )
}

export default ProfilePage
