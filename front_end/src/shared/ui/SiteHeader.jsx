import { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FiSettings, FiLogOut } from 'react-icons/fi'
import BrandLogo from './BrandLogo.jsx'
import { getStoredUser, clearTokens } from '../../api/auth.js'

function UserAvatar({ firstName, lastName, photo }) {
  const initials = `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase()

  if (photo) {
    return (
      <img
        src={photo}
        alt={`${firstName} ${lastName}`}
        className="uape-radius-1000 h-10 w-10 object-cover"
      />
    )
  }

  return (
    <span
      className="uape-radius-1000 flex h-10 w-10 items-center justify-center bg-uape-accent text-sm font-semibold text-uape-white"
    >
      {initials}
    </span>
  )
}

function UserDropdown({ user, onLogout }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="uape-icon-button-reset flex items-center"
        aria-label="User menu"
      >
        <UserAvatar
          firstName={user.first_name}
          lastName={user.last_name}
          photo={user.photo ?? null}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-44 overflow-hidden rounded-xl border border-uape-border-soft bg-uape-form-bg shadow-lg">
          <span
            className="flex items-center gap-3 px-4 py-3 text-sm text-uape-muted opacity-40 cursor-not-allowed select-none"
          >
            <FiSettings size={15} />
            Settings
          </span>
          <button
            onClick={onLogout}
            className="flex w-full items-center gap-3 px-4 py-3 text-sm text-uape-muted transition hover:bg-white/5 hover:text-red-400"
          >
            <FiLogOut size={15} />
            Log out
          </button>
        </div>
      )}
    </div>
  )
}

function SiteHeader({ compact = false }) {
  const user = getStoredUser()
  const isAuth = Boolean(localStorage.getItem('access')) && Boolean(user)
  const navigate = useNavigate()

  const handleLogout = () => {
    clearTokens()
    navigate('/login')
  }

  if (isAuth) {
    return (
      <header
        className="uape-header-auth-bg sticky top-0 z-20 border-b border-uape-border-soft backdrop-blur-[80px]"
      >
        <div className="mx-auto grid w-full max-w-6xl grid-cols-3 items-center px-4 py-3 sm:px-6 lg:px-8">
          <BrandLogo />

          <nav className="hidden items-center justify-center gap-7 text-base font-normal leading-6 text-uape-muted lg:flex">
            <NavLink
              className={({ isActive }) =>
                `transition hover:text-uape-white${isActive ? ' font-semibold text-uape-white' : ''}`
              }
              to="/"
              end
            >
              Home
            </NavLink>
            <span className="opacity-40 cursor-not-allowed select-none">
              About Us
            </span>
            <span className="opacity-40 cursor-not-allowed select-none">
              My Learning
            </span>
          </nav>

          <div className="flex items-center justify-end gap-3">
            <span className="uape-header-user-name text-uape-white">
              {user.last_name} {user.first_name}
            </span>
            <UserDropdown user={user} onLogout={handleLogout} />
          </div>
        </div>
      </header>
    )
  }

  return (
    <header
      className="uape-header-guest-bg sticky top-0 z-20 backdrop-blur-[80px]"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <BrandLogo />
          {!compact ? (
            <nav className="hidden items-center gap-7 text-base font-normal leading-6 text-uape-muted lg:flex">
              <a className="transition hover:text-uape-white" href="#problems">
                Problems
              </a>
              <a className="transition hover:text-uape-white" href="#solution">
                Solution
              </a>
              <a className="transition hover:text-uape-white" href="#assessment">
                Assessment
              </a>
              <a className="transition hover:text-uape-white" href="#for-whom">
                For whom
              </a>
              <a className="transition hover:text-uape-white" href="#technology">
                Technology
              </a>
            </nav>
          ) : null}
        </div>

        <div className="flex items-center gap-4">
          <Link
            className="px-1 text-base font-normal leading-6 text-uape-muted transition hover:text-uape-white"
            to="/login"
          >
            Log in
          </Link>
          <Link
            className="rounded-lg bg-uape-accent px-4 py-2 text-base font-normal leading-6 text-uape-white transition hover:brightness-110"
            to="/signup"
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
