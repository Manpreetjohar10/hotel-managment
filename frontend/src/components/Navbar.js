import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import decodeJwt from '../utils/decodeJwt';

export default function Navbar({ onSignInClick }) {
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, right: 0 });
  const menuButtonRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const syncFromToken = () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = decodeJwt(token);
          setUser(decoded);
          return;
        } catch (err) {
          console.error('Failed to decode token:', err);
        }
      }
      setUser(null);
    };

    syncFromToken();

    const handleLogout = () => {
      setUser(null);
      setShowMenu(false);
    };

    const handleLogin = () => {
      syncFromToken();
    };

    const handleStorage = (e) => {
      if (e.key === 'token') syncFromToken();
    };

    window.addEventListener('auth-logout', handleLogout);
    window.addEventListener('auth-login', handleLogin);
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('auth-logout', handleLogout);
      window.removeEventListener('auth-login', handleLogin);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  useEffect(() => {
    if (!showMenu) return;
    const updatePos = () => {
      const rect = menuButtonRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMenuPos({
        top: Math.round(rect.bottom + 8),
        right: Math.round(window.innerWidth - rect.right)
      });
    };
    updatePos();
    window.addEventListener('resize', updatePos);
    window.addEventListener('scroll', updatePos, true);
    const onDocClick = (e) => {
      if (menuButtonRef.current && menuButtonRef.current.contains(e.target)) return;
      setShowMenu(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => {
      window.removeEventListener('resize', updatePos);
      window.removeEventListener('scroll', updatePos, true);
      document.removeEventListener('mousedown', onDocClick);
    };
  }, [showMenu]);

  const handleLogOut = () => {
    localStorage.removeItem('token');
    setUser(null);
    setShowMenu(false);
    window.dispatchEvent(new CustomEvent('auth-logout'));
    window.dispatchEvent(new CustomEvent('toast', { detail: { message: 'Logged out successfully', type: 'success' } }));
    navigate('/');
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
          <h1 className="navbar-title">MERN Hotel</h1>
          <p className="navbar-subtitle">Book Your Perfect Stay</p>
        </Link>

        <button
          className="mobile-menu-toggle"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          type="button"
        >
          Menu
        </button>

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

        <div className="navbar-actions">
          {user ? (
            <div className="user-menu">
              <button
                className="btn user-btn"
                onClick={() => setShowMenu(!showMenu)}
                type="button"
                ref={menuButtonRef}
              >
                {user.email}
              </button>
              {showMenu && createPortal(
                <div
                  className="dropdown-menu"
                  style={{ position: 'fixed', top: menuPos.top, right: menuPos.right }}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <div className="dropdown-item disabled">{user.email}</div>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => {
                      setShowMenu(false);
                      navigate(getDashboardPath());
                    }}
                  >
                    My Dashboard
                  </button>
                  <button type="button" className="dropdown-item" onClick={handleLogOut}>
                    Log out
                  </button>
                </div>,
                document.body
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
