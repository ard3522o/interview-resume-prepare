import React from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth'
import '../style/navbar.scss'

const Navbar = () => {
  const { user, handleLogout } = useAuth()
  const navigate = useNavigate()

  const onLogout = async () => {
    await handleLogout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand">
          <span className="navbar__logo">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span className="navbar__name">ResuMind</span>
        </Link>

        <div className="navbar__links">
          {user ? (
            <>
              <Link to="/dashboard" className="navbar__link">Dashboard</Link>
              <button className="navbar__btn navbar__btn--ghost" onClick={onLogout}>
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar__link">Log In</Link>
              <Link to="/register" className="navbar__btn navbar__btn--primary">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
