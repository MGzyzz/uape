import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import ProtectedRoute from './ProtectedRoute.jsx'

const LandingPage        = lazy(() => import('../pages/landing/ui/LandingPage.jsx'))
const AuthPage           = lazy(() => import('../pages/auth/ui/AuthPage.jsx'))
const ProfilePage        = lazy(() => import('../pages/profile/ui/ProfilePage.jsx'))
const OnboardingPage     = lazy(() => import('../pages/onboarding/ui/OnboardingPage.jsx'))
const NotFoundPage       = lazy(() => import('../pages/not-found/ui/NotFoundPage.jsx'))
const CourseDetailPage   = lazy(() => import('../pages/course-detail/ui/CourseDetailPage.jsx'))
const VerifyEmailSentPage = lazy(() => import('../pages/auth/ui/VerifyEmailSentPage.jsx'))
const VerifyEmailPage    = lazy(() => import('../pages/auth/ui/VerifyEmailPage.jsx'))
const FavoritesPage      = lazy(() => import('../pages/favorites/ui/FavoritesPage.jsx'))
const AboutUsPage        = lazy(() => import('../pages/about-us/ui/AboutUsPage.jsx'))
const DiagnosticPage     = lazy(() => import('../pages/diagnostic/ui/DiagnosticPage.jsx'))
const DiagnosticTestPage = lazy(() => import('../pages/diagnostic/ui/DiagnosticTestPage.jsx'))
const DiagnosticResultPage = lazy(() => import('../pages/diagnostic/ui/DiagnosticResultPage.jsx'))

function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-uape-bg">
      <div className="uape-spinner" />
    </div>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<AuthPage mode="signup" />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/verify-email-sent" element={<VerifyEmailSentPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/favorites" element={<ProtectedRoute><FavoritesPage /></ProtectedRoute>} />
        <Route path="/onboarding" element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/diagnostic" element={<DiagnosticPage />} />
        <Route path="/diagnostic/test" element={<ProtectedRoute><DiagnosticTestPage /></ProtectedRoute>} />
        <Route path="/diagnostic/result" element={<ProtectedRoute><DiagnosticResultPage /></ProtectedRoute>} />
        <Route path="/playlist/:id" element={<CourseDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
