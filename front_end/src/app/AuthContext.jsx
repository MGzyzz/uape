import { createContext, useContext, useState } from 'react'
import { getStoredUser, clearTokens as _clearTokens } from '../api/auth.js'
import { clearCachedResults } from '../api/assessment.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser)
  const isAuth = Boolean(localStorage.getItem('access')) && Boolean(user)

  function logout() {
    _clearTokens()
    clearCachedResults()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isAuth, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext)
}
