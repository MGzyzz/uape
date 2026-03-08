import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  if (!localStorage.getItem('access')) {
    return <Navigate to="/login" replace />
  }
  return children
}
