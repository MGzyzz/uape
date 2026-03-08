import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import LandingPage from '../pages/landing/ui/LandingPage.jsx'
import AuthPage from '../pages/auth/ui/AuthPage.jsx'
import ProfilePage from '../pages/profile/ui/ProfilePage.jsx'
import OnboardingPage from '../pages/onboarding/ui/OnboardingPage.jsx'
import NotFoundPage from '../pages/not-found/ui/NotFoundPage.jsx'
import CourseDetailPage from '../pages/course-detail/ui/CourseDetailPage.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<AuthPage mode="signup" />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/onboarding" element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />
        <Route path="/playlist/:id" element={<CourseDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
