import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const INITIAL_FORM = {
  name: '',
  email: '',
  password: '',
  confirm: ''
}

function validateForm({ name, email, password, confirm }) {
  if (password.length < 6) {
    return 'Password must be at least 6 characters.'
  }

  if (password !== confirm) {
    return 'Passwords do not match.'
  }

  if (!name || !email) {
    return 'Please complete every field.'
  }

  return ''
}

export default function Register() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const update = (field) => (event) => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: event.target.value
    }))
  }

  const submit = async (event) => {
    event.preventDefault()
    setError('')

    const validationError = validateForm(form)
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)

    try {
      await register(form.name, form.email, form.password)
      navigate('/')
    } catch (registrationError) {
      setError(registrationError.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-brand">
        NETFLIX <span>CLONE</span>
      </div>
      <form className="auth-card" onSubmit={submit}>
        <span className="section-eyebrow">Start your story</span>
        <h1>Create account</h1>
        <p className="auth-subtitle">
          Your next favorite is closer than you think.
        </p>
        {error && <div className="form-error">{error}</div>}
        <label>
          Full name
          <input
            value={form.name}
            onChange={update('name')}
            placeholder="Alex Morgan"
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={update('email')}
            placeholder="you@example.com"
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={form.password}
            onChange={update('password')}
            placeholder="At least 6 characters"
          />
        </label>
        <label>
          Confirm password
          <input
            type="password"
            value={form.confirm}
            onChange={update('confirm')}
            placeholder="Repeat your password"
          />
        </label>
        <button className="primary-button auth-submit" disabled={loading}>
          {loading ? 'Creating account...' : 'Create account'}
        </button>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </div>
  )
}
