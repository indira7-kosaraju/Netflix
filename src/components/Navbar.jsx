import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { LogOut, Menu, Search, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const links = [['Home', '/'], ['TV Shows', '/tv-shows'], ['Movies', '/movies'], ['My List', '/my-list']]
  const handleLogout = () => { logout(); navigate('/login') }
  return <header className="navbar">
    <Link className="brand" to="/">NETFLIX <span>CLONE</span></Link>
    <button className="icon-button menu-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
    <nav className={open ? 'nav-links is-open' : 'nav-links'}>{links.map(([label, path]) => <NavLink key={path} to={path} onClick={() => setOpen(false)}>{label}</NavLink>)}</nav>
    <div className="nav-actions"><Link className="icon-button" to="/search" aria-label="Search"><Search /></Link>{user ? <><Link className="profile-link" to="/profile"><span className="avatar">{user.name?.[0] || 'A'}</span><span className="profile-name">{user.name?.split(' ')[0]}</span></Link><button className="icon-button logout-button" onClick={handleLogout} aria-label="Log out"><LogOut /></button></> : <Link className="sign-in-link" to="/login">Sign in</Link>}</div>
  </header>
}
