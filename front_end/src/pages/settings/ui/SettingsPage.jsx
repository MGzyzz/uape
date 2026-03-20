import './SettingsPage.css'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiUser, FiShield, FiCamera, FiEye, FiEyeOff, FiCheck } from 'react-icons/fi'
import SiteHeader from '../../../shared/ui/SiteHeader.jsx'
import SiteFooter from '../../../shared/ui/SiteFooter.jsx'
import { useAuth } from '../../../app/AuthContext.jsx'
import { getProfile, updateProfile, saveUser, changePassword } from '../../../api/auth.js'

const TABS = [
  { id: 'profile',  label: 'Profile',  icon: FiUser },
  { id: 'security', label: 'Security', icon: FiShield },
]

/* ─── Profile Tab ────────────────────────────────────────────────────────── */

function ProfileTab({ setUser }) {
  const [profile, setProfile] = useState(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [bio, setBio] = useState('')
  const [phone, setPhone] = useState('')
  const [avatarPreview, setAvatarPreview] = useState(null)
  const [avatarFile, setAvatarFile] = useState(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState(null)
  const fileRef = useRef(null)

  useEffect(() => {
    getProfile().then(data => {
      setProfile(data)
      setFirstName(data.first_name ?? '')
      setLastName(data.last_name ?? '')
      setBio(data.bio ?? '')
      setPhone(data.phone ?? '')
    }).catch(() => {})
  }, [])

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setAvatarFile(file)
    setAvatarPreview(URL.createObjectURL(file))
  }

  const handleSave = async () => {
    setSaving(true)
    setError(null)
    setSaved(false)
    try {
      const fd = new FormData()
      fd.append('first_name', firstName)
      fd.append('last_name', lastName)
      fd.append('bio', bio)
      fd.append('phone', phone)
      if (avatarFile) fd.append('avatar', avatarFile)

      const updated = await updateProfile(fd)
      setProfile(updated)

      const newUser = {
        first_name: updated.first_name,
        last_name:  updated.last_name,
        photo:      updated.avatar ?? null,
      }
      saveUser(newUser)
      setUser(prev => ({ ...prev, ...newUser }))
      setAvatarFile(null)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      setError(err?.response?.data?.detail ?? 'Failed to save. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const displayAvatar = avatarPreview ?? profile?.avatar ?? null
  const initials = `${profile?.first_name?.[0] ?? ''}${profile?.last_name?.[0] ?? ''}`.toUpperCase()

  if (!profile) {
    return (
      <div className="uape-settings-tab-loading">
        <div className="uape-spinner" />
      </div>
    )
  }

  return (
    <div className="uape-settings-tab-content">
      <h2 className="uape-settings-section-title">Profile Information</h2>

      {/* Avatar */}
      <div className="uape-settings-avatar-row">
        <button
          className="uape-settings-avatar-btn"
          onClick={() => fileRef.current?.click()}
          aria-label="Change avatar"
          type="button"
        >
          <div className="uape-settings-avatar-circle">
            {displayAvatar ? (
              <img src={displayAvatar} alt="avatar" className="uape-settings-avatar-img" />
            ) : (
              <span className="uape-settings-avatar-initials">{initials}</span>
            )}
            <div className="uape-settings-avatar-overlay">
              <FiCamera size={22} />
            </div>
          </div>
        </button>
        <div className="uape-settings-avatar-hint">
          <p className="uape-settings-avatar-hint-title">Profile photo</p>
          <p className="uape-settings-avatar-hint-text">JPG or PNG, max 5 MB. Will be cropped to 400×400 px.</p>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png"
          className="uape-settings-file-input"
          onChange={handleAvatarChange}
        />
      </div>

      {/* Fields */}
      <div className="uape-settings-fields">
        <div className="uape-settings-field-row">
          <div className="uape-settings-field">
            <label className="uape-settings-label">First name</label>
            <input
              className="uape-settings-input"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
          </div>
          <div className="uape-settings-field">
            <label className="uape-settings-label">Last name</label>
            <input
              className="uape-settings-input"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </div>
        </div>

        <div className="uape-settings-field">
          <label className="uape-settings-label">Email</label>
          <input
            className="uape-settings-input uape-settings-input--readonly"
            value={profile.email}
            readOnly
          />
        </div>

        <div className="uape-settings-field">
          <label className="uape-settings-label">Phone</label>
          <input
            className="uape-settings-input"
            type="tel"
            value={phone}
            placeholder="+7 (___) ___-__-__"
            onChange={e => setPhone(e.target.value)}
          />
        </div>

        <div className="uape-settings-field">
          <label className="uape-settings-label">Bio</label>
          <textarea
            className="uape-settings-textarea"
            value={bio}
            placeholder="Tell us a little about yourself..."
            rows={4}
            onChange={e => setBio(e.target.value)}
          />
        </div>
      </div>

      {error && <p className="uape-settings-error">{error}</p>}

      <div className="uape-settings-actions">
        {saved && (
          <span className="uape-settings-saved-badge">
            <FiCheck size={14} /> Saved
          </span>
        )}
        <button
          className="uape-orange-btn uape-settings-save-btn"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save changes'}
        </button>
      </div>
    </div>
  )
}

/* ─── Security Tab ───────────────────────────────────────────────────────── */

function SecurityTab() {
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNext, setShowNext] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!current) e.current = 'Required'
    if (!next) e.next = 'Required'
    else if (next.length < 8) e.next = 'At least 8 characters'
    if (next !== confirm) e.confirm = 'Passwords do not match'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSaving(true)
    setErrors({})
    setSaved(false)
    try {
      changePassword({ current_password: current, new_password: next })
      setCurrent(''); setNext(''); setConfirm('')
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      const data = err?.response?.data ?? {}
      setErrors({
        current: data.current_password,
        next:    data.new_password,
        form:    data.detail,
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="uape-settings-tab-content">
      <h2 className="uape-settings-section-title">Change Password</h2>
      <p className="uape-settings-section-sub">
        Use a strong password you don&apos;t use anywhere else.
      </p>

      <form className="uape-settings-fields" onSubmit={handleSubmit} noValidate>
        {errors.form && <p className="uape-settings-error">{errors.form}</p>}

        <div className="uape-settings-field">
          <label className="uape-settings-label">Current password</label>
          <div className="uape-settings-pw-wrap">
            <input
              className={`uape-settings-input${errors.current ? ' uape-settings-input--error' : ''}`}
              type={showCurrent ? 'text' : 'password'}
              value={current}
              autoComplete="current-password"
              onChange={e => setCurrent(e.target.value)}
            />
            <button
              type="button"
              className="uape-settings-pw-eye"
              onClick={() => setShowCurrent(v => !v)}
              aria-label="Toggle visibility"
            >
              {showCurrent ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </button>
          </div>
          {errors.current && <p className="uape-settings-field-error">{errors.current}</p>}
        </div>

        <div className="uape-settings-field">
          <label className="uape-settings-label">New password</label>
          <div className="uape-settings-pw-wrap">
            <input
              className={`uape-settings-input${errors.next ? ' uape-settings-input--error' : ''}`}
              type={showNext ? 'text' : 'password'}
              value={next}
              autoComplete="new-password"
              onChange={e => setNext(e.target.value)}
            />
            <button
              type="button"
              className="uape-settings-pw-eye"
              onClick={() => setShowNext(v => !v)}
              aria-label="Toggle visibility"
            >
              {showNext ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </button>
          </div>
          {errors.next && <p className="uape-settings-field-error">{errors.next}</p>}
        </div>

        <div className="uape-settings-field">
          <label className="uape-settings-label">Confirm new password</label>
          <input
            className={`uape-settings-input${errors.confirm ? ' uape-settings-input--error' : ''}`}
            type="password"
            value={confirm}
            autoComplete="new-password"
            onChange={e => setConfirm(e.target.value)}
          />
          {errors.confirm && <p className="uape-settings-field-error">{errors.confirm}</p>}
        </div>

        <div className="uape-settings-actions">
          {saved && (
            <span className="uape-settings-saved-badge">
              <FiCheck size={14} /> Password updated
            </span>
          )}
          <button
            className="uape-orange-btn uape-settings-save-btn"
            type="submit"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Update password'}
          </button>
        </div>
      </form>
    </div>
  )
}

/* ─── Main Page ──────────────────────────────────────────────────────────── */

function SettingsPage() {
  const navigate = useNavigate()
  const { user, isAuth, setUser } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')

  useEffect(() => {
    if (!isAuth) navigate('/login')
  }, [isAuth, navigate])

  if (!user) return null

  return (
    <div className="flex min-h-screen flex-col bg-uape-bg text-uape-white">
      <SiteHeader />
      <main className="flex-1">
        <div className="uape-settings-page">
          <div className="uape-settings-header">
            <h1 className="uape-settings-page-title">Settings</h1>
          </div>

          <div className="uape-settings-layout">
            {/* Sidebar */}
            <nav className="uape-settings-sidebar">
              {TABS.map(tab => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    className={`uape-settings-tab-btn${activeTab === tab.id ? ' uape-settings-tab-btn--active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <Icon size={18} />
                    {tab.label}
                  </button>
                )
              })}
            </nav>

            {/* Content */}
            <div className="uape-settings-content">
              {activeTab === 'profile'  && <ProfileTab setUser={setUser} />}
              {activeTab === 'security' && <SecurityTab />}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

export default SettingsPage
