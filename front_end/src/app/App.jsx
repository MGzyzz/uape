import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from '../pages/landing/ui/LandingPage.jsx'
import AuthPage from '../pages/auth/ui/AuthPage.jsx'
import ProfilePage from '../pages/profile/ui/ProfilePage.jsx'
import NotFoundPage from '../pages/not-found/ui/NotFoundPage.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<AuthPage mode="signup" />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
