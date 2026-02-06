import React, { useState, useEffect } from 'react';
import decodeJwt from '../utils/decodeJwt';
import { fetchWithAuth } from '../api';

export default function DashboardSuperAdmin() {
  const [stats, setStats] = useState({
    totalHotels: 0,
    totalUsers: 0,
    totalBookings: 0,
    bookingStatus: { booked: 0, cancelled: 0, successful: 0 }
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const hotelsRes = await fetchWithAuth('/api/hotels');
      const hotels = await hotelsRes.json();
      
      setStats(prev => ({
        ...prev,
        totalHotels: Array.isArray(hotels) ? hotels.length : 0,
        totalUsers: 150, // Placeholder - would need actual endpoint
        totalBookings: 450, // Placeholder - would need actual endpoint
        bookingStatus: {
          booked: 250,
          successful: 150,
          cancelled: 50
        }
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="dashboard-super-admin">
      <div className="dashboard-header">
        <h1>Super Admin Dashboard</h1>
        <p>Manage all hotels, users, bookings, and blogs</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🏨</div>
          <div className="stat-content">
            <p className="stat-label">Total Hotels</p>
            <p className="stat-value">{stats.totalHotels}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <p className="stat-label">Total Users</p>
            <p className="stat-value">{stats.totalUsers}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <p className="stat-label">Total Bookings</p>
            <p className="stat-value">{stats.totalBookings}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <p className="stat-label">Total Revenue</p>
            <p className="stat-value">$95,240</p>
          </div>
        </div>
      </div>

      {/* Booking Status Breakdown */}
      <div className="booking-status">
        <h2>Booking Status</h2>
        <div className="status-cards">
          <div className="status-card booked">
            <h3>Booked</h3>
            <p className="status-value">{stats.bookingStatus.booked}</p>
          </div>
          <div className="status-card successful">
            <h3>Successful</h3>
            <p className="status-value">{stats.bookingStatus.successful}</p>
          </div>
          <div className="status-card cancelled">
            <h3>Cancelled</h3>
            <p className="status-value">{stats.bookingStatus.cancelled}</p>
          </div>
        </div>
      </div>

      {/* Admin Controls */}
      <div className="admin-controls">
        <h2>Admin Controls</h2>
        <div className="controls-grid">
          <div className="control-item">
            <h3>🏨 Hotel Management</h3>
            <p>Add, edit, or delete hotels</p>
            <button className="btn btn-primary">Manage Hotels</button>
          </div>
          <div className="control-item">
            <h3>👥 User Management</h3>
            <p>Manage user accounts and roles</p>
            <button className="btn btn-primary">Manage Users</button>
          </div>
          <div className="control-item">
            <h3>📅 Booking Management</h3>
            <p>View and manage all bookings</p>
            <button className="btn btn-primary">Manage Bookings</button>
          </div>
          <div className="control-item">
            <h3>📝 Blog Management</h3>
            <p>Create, edit, and delete blogs</p>
            <button className="btn btn-primary">Manage Blogs</button>
          </div>
        </div>
      </div>
    </div>
  );
}
