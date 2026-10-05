import { createContext, useContext, useState } from 'react'
import { loginUser, registerUser } from '../services/api'

const AuthContext = createContext(null)

function getSavedUser() {
  try {
    const savedUser = localStorage.getItem('netflix-user')

    if (!savedUser || savedUser === 'undefined' || savedUser === 'null') {
      localStorage.removeItem('netflix-user')
      return null
    }

    const parsedUser = JSON.parse(savedUser)

    if (!parsedUser || typeof parsedUser !== 'object') {
      localStorage.removeItem('netflix-user')
      return null
    }

    return parsedUser
  } catch (error) {
    localStorage.removeItem('netflix-user')
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getSavedUser)

  const login = async (email, password) => {
    if (!email || !password) {
      throw new Error('Please enter your email and password.')
    }

    const response = await loginUser({
      email,
      password
    })

    if (!response || !response.user) {
      throw new Error('Invalid response from server.')
    }

    const nextUser = response.user

    localStorage.setItem(
      'netflix-user',
      JSON.stringify(nextUser)
    )

    setUser(nextUser)

    return nextUser
  }

  const register = async (name, email, password) => {
    if (!name || !email || !password) {
      throw new Error('Please complete every field.')
    }

    const response = await registerUser({
      name,
      email,
      password
    })

    const nextUser = response.user || {
      name,
      email
    }

    localStorage.setItem(
      'netflix-user',
      JSON.stringify(nextUser)
    )

    setUser(nextUser)

    return nextUser
  }

  const logout = () => {
    localStorage.removeItem('netflix-user')
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)