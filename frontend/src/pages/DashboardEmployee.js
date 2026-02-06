import React, { useState, useEffect } from 'react';
import decodeJwt from '../utils/decodeJwt';

export default function DashboardEmployee() {
  const [user, setUser] = useState(null);
  const [greeting, setGreeting] = useState('');

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
    
    updateGreeting();
    const interval = setInterval(updateGreeting, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const getRoleLabel = (role) => {
    const labels = {
      manager: 'Manager',
      receptionist: 'Receptionist',
      waiter: 'Waiter',
      cook: 'Cook'
    };
    return labels[role] || role;
  };

  const updateGreeting = () => {
    const now = new Date();
    const hour = now.getHours();
    
    let greetingText = '';
    if (hour >= 3 && hour < 11.833) { // 3:00 AM - 11:50 AM
      greetingText = 'Good Morning';
    } else if (hour >= 11.833 && hour < 16.016) { // 11:51 AM - 4:00 PM
      greetingText = 'Good Afternoon';
    } else if (hour >= 16.016 && hour < 19.016) { // 4:01 PM - 7:00 PM
      greetingText = 'Good Evening';
    } else { // 7:01 PM - 3:00 AM
      greetingText = 'Good Night';
    }
    
    setGreeting(greetingText);
  };

  if (!user) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard-employee">
      <div className="greeting-card">
        <h1 className="greeting-text">
          {greeting}, <span className="user-name">{user.name}</span>!
        </h1>
        <p className="role-badge">{getRoleLabel(user.role)}</p>
        <div className="greeting-decoration">
          {greeting === 'Good Morning' && '🌅'}
          {greeting === 'Good Afternoon' && '☀️'}
          {greeting === 'Good Evening' && '🌆'}
          {greeting === 'Good Night' && '🌙'}
        </div>
      </div>

      {/* Quick Links */}
      <section className="quick-links">
        <h2>Quick Actions</h2>
        <div className="links-grid">
          <div className="link-card">
            <h3>📋 View Tasks</h3>
            <p>Check your assigned tasks for today</p>
          </div>
          <div className="link-card">
            <h3>📞 Guest Inquiries</h3>
            <p>Respond to pending guest requests</p>
          </div>
          <div className="link-card">
            <h3>📊 Reports</h3>
            <p>View daily performance reports</p>
          </div>
          <div className="link-card">
            <h3>⚙️ Settings</h3>
            <p>Manage your account preferences</p>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="info-section">
        <h2>Current Time</h2>
        <div className="time-display">
          <p className="large-time">{new Date().toLocaleTimeString()}</p>
          <p className="date-display">{new Date().toLocaleDateString('en-US', { 
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
          })}</p>
        </div>
      </section>
    </div>
  );
}
