import { Link, NavLink, useNavigate } from 'react-router-dom'
import BrandLogo from './BrandLogo.jsx'
import { getStoredUser, clearTokens } from '../../api/auth.js'

function UserAvatar({ firstName, lastName, photo }) {
  const initials = `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase()

  if (photo) {
    return (
      <img
        src={photo}
        alt={`${firstName} ${lastName}`}
        className="h-10 w-10 object-cover"
        style={{ borderRadius: '1000px' }}
      />
    )
  }

  return (
    <span
      className="flex h-10 w-10 items-center justify-center bg-uape-accent text-sm font-semibold text-uape-white"
      style={{ borderRadius: '1000px' }}
    >
      {initials}
    </span>
  )
}

function SiteHeader({ compact = false }) {
  const user = getStoredUser()
  const isAuth = Boolean(localStorage.getItem('access')) && Boolean(user)
  const navigate = useNavigate()

  if (isAuth) {
    // TODO: убрать кнопку выхода после проверки
    const handleLogout = () => {
      clearTokens()
      navigate('/login')
    }

    return (
      <header
        className="sticky top-0 z-20 border-b border-uape-border-soft backdrop-blur-[80px]"
        style={{ background: '#141719c2' }}
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
            <NavLink
              className={({ isActive }) =>
                `transition hover:text-uape-white${isActive ? ' font-semibold text-uape-white' : ''}`
              }
              to="/about"
            >
              About Us
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `transition hover:text-uape-white${isActive ? ' font-semibold text-uape-white' : ''}`
              }
              to="/my-learning"
            >
              My Learning
            </NavLink>
          </nav>

          <div className="flex items-center justify-end gap-3">
            {/* TODO: убрать кнопку выхода после проверки */}
            <button
              onClick={handleLogout}
              className="text-sm text-uape-muted transition hover:text-uape-white"
            >
              Выйти
            </button>
            <span
              className="text-uape-white"
              style={{ fontFamily: 'Figtree', fontWeight: 500, fontSize: '16px', lineHeight: '20px', letterSpacing: '0%' }}
            >
              {user.last_name} {user.first_name}
            </span>
            <UserAvatar
              firstName={user.first_name}
              lastName={user.last_name}
              photo={user.photo ?? null}
            />
          </div>
        </div>
      </header>
    )
  }

  return (
    <header
      className="sticky top-0 z-20 backdrop-blur-[80px]"
      style={{ background: '#181A1Bc2' }}
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
