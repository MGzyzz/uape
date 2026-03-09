import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SiteHeader from '../../../shared/ui/SiteHeader.jsx'
import SiteFooter from '../../../shared/ui/SiteFooter.jsx'
import { getStoredUser, getProfile, saveUser } from '../../../api/auth.js'
import { getOnboarding } from '../../../api/onboarding.js'
import authPageBg from '../../../shared/assets/solution/auth-page.png'
import WhatToLearnNextSection from './WhatToLearnNextSection.jsx'
import AssessmentResultSection from './AssessmentResultSection.jsx'

function ProfilePage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(getStoredUser)
  const [occupation, setOccupation] = useState(null)
  const hasAccessToken = Boolean(localStorage.getItem('access'))

  useEffect(() => {
    if (!hasAccessToken || !user) {
      navigate('/login')
      return
    }

    let ignore = false

    getProfile()
      .then(profile => {
        if (ignore) return

        const updated = {
          first_name: profile.first_name,
          last_name: profile.last_name,
          photo: profile.avatar ?? null,
        }

        saveUser(updated)
        setUser(prev => {
          if (
            prev?.first_name === updated.first_name &&
            prev?.last_name === updated.last_name &&
            prev?.photo === updated.photo
          ) {
            return prev
          }
          return updated
        })
      })
      .catch(() => {})

    getOnboarding()
      .then(data => {
        if (ignore) return
        setOccupation(data.occupation ?? null)
      })
      .catch(() => {})

    return () => {
      ignore = true
    }
  }, [hasAccessToken, navigate])

  if (!user) return null

  return (
    <div className="flex min-h-screen flex-col bg-uape-bg text-uape-white">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection user={user} occupation={occupation} />
        <AssessmentResultSection />
        <WhatToLearnNextSection />
      </main>
      <SiteFooter />
    </div>
  )
}

function HeroSection({ user, occupation }) {
  const navigate = useNavigate()
  const initials = `${user.first_name?.[0] ?? ''}${user.last_name?.[0] ?? ''}`.toUpperCase()

  return (
    <section>
      {/* Welcome area — above background image */}
      <div className="uape-page-container uape-profile-welcome-gutter flex items-center py-8">
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
            {occupation ? (
              <div className="uape-profile-occupation-btn">
                <span className="uape-profile-occupation-label">{occupation}</span>
                <button
                  className="uape-profile-hero-link uape-profile-edit-link"
                  onClick={() => navigate('/onboarding')}
                >
                  Edit occupation and interests
                </button>
              </div>
            ) : (
              <button
                className="uape-profile-hero-link uape-profile-occupation-btn"
                onClick={() => navigate('/onboarding')}
              >
                Add occupation and interests
              </button>
            )}
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
        <div className="uape-profile-hero-content uape-page-container uape-page-gutter relative flex items-center">
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
        className="uape-orange-btn uape-learn-primary-btn uape-diagnostic-start-btn"
        onClick={() => navigate('/onboarding')}
      >
        Start diagnostic
      </button>
    </div>
  )
}

export default ProfilePage
