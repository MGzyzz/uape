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
  const initials = `${user.first_name?.[0] ?? ''}${user.last_name?.[0] ?? ''}`.toUpperCase()

  return (
    <section className="uape-profile-hero-section relative overflow-hidden">
      {/* Background image — full cover */}
      <img
        src={authPageBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover pointer-events-none select-none"
      />

      {/* Dark overlay */}
      <div className="uape-profile-hero-overlay absolute inset-0" />

      {/* Content */}
      <div className="uape-profile-hero-content relative mx-auto flex w-full max-w-6xl items-center px-4 sm:px-6 lg:px-8">
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
              Welcome back,<br />
              {user.first_name} {user.last_name}
            </h1>
            {/* TODO (backend): добавить поле profession в модель пользователя,
                возвращать его в /api/profile/ и сохранять через saveUser.
                Пока что отображается временная заглушка ниже. */}
            <div className="flex items-center gap-4">
              <span className="uape-profile-profession">Python Developer</span>
              <a href="#" className="uape-profile-hero-link">
                Add occupation and interests
              </a>
              <button
                onClick={() => navigate('/onboarding')}
                className="uape-profile-hero-link"
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                → Onboarding (temp)
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfilePage
