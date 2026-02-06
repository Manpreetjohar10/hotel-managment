import React, { useState, useEffect } from 'react';
import decodeJwt from '../utils/decodeJwt';

export default function DashboardUser() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = decodeJwt(token);
        setUser(decoded);
        setFormData({
          name: decoded.name || '',
          email: decoded.email || '',
          phone: '',
          address: ''
        });
      } catch (err) {
        console.error('Failed to decode token:', err);
      }
    }
    
    // Mock bookings data
    setBookings([
      {
        _id: '1',
        hotelId: 'hotel1',
        hotelName: 'Grand Plaza',
        checkIn: '2026-02-15',
        checkOut: '2026-02-18',
        status: 'Booked',
        price: 450
      },
      {
        _id: '2',
        hotelId: 'hotel2',
        hotelName: 'Sea View Resort',
        checkIn: '2026-03-10',
        checkOut: '2026-03-15',
        status: 'Successful',
        price: 1100
      }
    ]);
    setLoading(false);
  }, []);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('toast', { 
      detail: { message: 'Profile updated successfully!', type: 'success' } 
    }));
    setEditMode(false);
  };

  const handleCancelBooking = (bookingId) => {
    setBookings(bookings.map(b => 
      b._id === bookingId ? { ...b, status: 'Cancelled' } : b
    ));
    window.dispatchEvent(new CustomEvent('toast', { 
      detail: { message: 'Booking cancelled successfully', type: 'success' } 
    }));
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (!user) return <div className="error">Please log in to view your dashboard</div>;

  return (
    <div className="dashboard-user">
      <div className="dashboard-header">
        <h1>Welcome, {user.name}!</h1>
        <p>Manage your profile and bookings</p>
      </div>

      <div className="dashboard-grid">
        {/* Profile Section */}
        <section className="profile-section">
          <div className="section-header">
            <h2>👤 My Profile</h2>
            <button 
              className="btn btn-secondary"
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {editMode ? (
            <form onSubmit={handleUpdateProfile} className="profile-form">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  readOnly
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
              <button type="submit" className="btn btn-primary">Save Changes</button>
            </form>
          ) : (
            <div className="profile-info">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {formData.phone || 'Not provided'}</p>
              <p><strong>Address:</strong> {formData.address || 'Not provided'}</p>
              <p><strong>Member Since:</strong> {new Date(user.iat * 1000).toLocaleDateString()}</p>
            </div>
          )}
        </section>

        {/* Bookings Section */}
        <section className="bookings-section">
          <div className="section-header">
            <h2>📅 My Bookings</h2>
            <span className="booking-count">{bookings.length} booking(s)</span>
          </div>

          {bookings.length > 0 ? (
            <div className="bookings-list">
              {bookings.map(booking => (
                <div key={booking._id} className={`booking-card status-${booking.status.toLowerCase()}`}>
                  <div className="booking-header">
                    <h3>{booking.hotelName}</h3>
                    <span className={`status-badge ${booking.status.toLowerCase()}`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="booking-details">
                    <p>
                      <strong>Check-in:</strong> {new Date(booking.checkIn).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Check-out:</strong> {new Date(booking.checkOut).toLocaleDateString()}
                    </p>
                    <p><strong>Price:</strong> ${booking.price}</p>
                  </div>
                  {booking.status === 'Booked' && (
                    <button
                      className="btn btn-danger"
                      onClick={() => handleCancelBooking(booking._id)}
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="no-bookings">
              <p>You don't have any bookings yet. Start exploring!</p>
              <a href="/hotels" className="btn btn-primary">Browse Hotels</a>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
