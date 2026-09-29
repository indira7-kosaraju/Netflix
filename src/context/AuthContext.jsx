import { createContext, useContext, useState } from 'react'
const AuthContext = createContext(null)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('netflix-user') || 'null'))
  const login = (email, password, name = 'Alex Morgan') => { if (!email || !password) throw new Error('Please enter your email and password.'); const nextUser = { name, email }; localStorage.setItem('netflix-user', JSON.stringify(nextUser)); setUser(nextUser); return nextUser }
  const register = (name, email, password) => login(email, password, name)
  const logout = () => { localStorage.removeItem('netflix-user'); setUser(null) }
  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>
}
// The hook lives beside its provider so auth wiring stays easy to replace later.
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)