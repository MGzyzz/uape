import LandingPage from '../pages/landing/ui/LandingPage.jsx'
import AuthPage from '../pages/auth/ui/AuthPage.jsx'
import NotFoundPage from '../pages/not-found/ui/NotFoundPage.jsx'

function normalizePathname(pathname) {
  if (!pathname || pathname === '/') {
    return '/'
  }

  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
}

function App() {
  const pathname = normalizePathname(window.location.pathname)

  if (pathname === '/') {
    return <LandingPage />
  }

  if (pathname === '/signup') {
    return <AuthPage mode="signup" />
  }

  if (pathname === '/login') {
    return <AuthPage mode="login" />
  }

  return <NotFoundPage />
}

export default App
