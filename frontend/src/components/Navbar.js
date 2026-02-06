import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import decodeJwt from '../utils/decodeJwt';

export default function Navbar({ onSignInClick }) {
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = decodeJwt(token);
        setUser(decoded);
      } catch (err) {
        console.error('Failed to decode token:', err);
      }
    }

    const handleLogout = () => {
      setUser(null);
      setShowMenu(false);
    };

    window.addEventListener('auth-logout', handleLogout);
    return () => window.removeEventListener('auth-logout', handleLogout);
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem('token');
    setUser(null);
    setShowMenu(false);
    window.dispatchEvent(new CustomEvent('toast', { detail: { message: 'Logged out successfully', type: 'success' } }));
  };

  const getDashboardPath = () => {
    if (!user) return '/';
    if (user.role === 'super_admin') return '/dashboard/admin';
    if (['manager', 'receptionist', 'waiter', 'cook'].includes(user.role)) return '/dashboard/employee';
    return '/dashboard/user';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <h1 className="navbar-title">🏨 MERN Hotel</h1>
          <p className="navbar-subtitle">Book Your Perfect Stay</p>
        </Link>

        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          ☰
        </button>

        {/* Navigation Menu */}
        <div className={`navbar-menu ${showMobileMenu ? 'active' : ''}`}>
          <div className="navbar-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/hotels" className="nav-link">Hotels</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/services" className="nav-link">Services</Link>
            <Link to="/blogs" className="nav-link">Blog</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </div>
        </div>

        {/* Auth Section */}
        <div className="navbar-actions">
          {user ? (
            <div className="user-menu">
              <button className="btn user-btn" onClick={() => setShowMenu(!showMenu)}>
                {user.email} ▼
              </button>
              {showMenu && (
                <div className="dropdown-menu">
                  <div className="dropdown-item disabled">{user.email}</div>
                  <Link to={getDashboardPath()} className="dropdown-item">
                    📊 My Dashboard
                  </Link>
                  <button className="btn btn-secondary dropdown-item" onClick={handleLogOut}>
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="btn btn-primary" onClick={onSignInClick}>
              Sign In / Register
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
