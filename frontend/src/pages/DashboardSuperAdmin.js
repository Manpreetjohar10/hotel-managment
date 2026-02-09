import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchWithAuth } from '../api';

export default function DashboardSuperAdmin() {
  const [stats, setStats] = useState({
    totalHotels: 0,
    totalUsers: 0,
    totalBookings: 0,
    totalRevenue: 0,
    bookingStatus: { booked: 0, cancelled: 0, successful: 0 }
  });
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [messages, setMessages] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [hotelForm, setHotelForm] = useState({
    name: '',
    address: '',
    city: '',
    price: 120,
    rating: 4.2,
    totalRooms: 10,
    availableRooms: 10
  });
  const [loading, setLoading] = useState(true);
  const [savingHotel, setSavingHotel] = useState(false);
  const [activePanel, setActivePanel] = useState('overview');

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    setLoading(true);
    await Promise.all([fetchStats(), fetchUsers(), fetchBookings(), fetchBlogs(), fetchMessages(), fetchHotels()]);
    setLoading(false);
  };

  const fetchStats = async () => {
    try {
      const res = await fetchWithAuth('/api/admin/stats');
      const data = await res.json();
      if (res.ok) {
        setStats({
          totalHotels: data.totalHotels || 0,
          totalUsers: data.totalUsers || 0,
          totalBookings: data.totalBookings || 0,
          totalRevenue: data.totalRevenue || 0,
          bookingStatus: data.bookingStatus || { booked: 0, cancelled: 0, successful: 0 }
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetchWithAuth('/api/admin/users');
      const data = await res.json();
      if (res.ok) setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await fetchWithAuth('/api/admin/bookings');
      const data = await res.json();
      if (res.ok) setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBlogs = async () => {
    try {
      const res = await fetchWithAuth('/api/blogs/admin');
      const data = await res.json();
      if (res.ok) setBlogs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await fetchWithAuth('/api/admin/messages');
      const data = await res.json();
      if (res.ok) setMessages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchHotels = async () => {
    try {
      const res = await fetchWithAuth('/api/hotels');
      const data = await res.json();
      if (res.ok) setHotels(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const updateBookingStatus = async (bookingId, status) => {
    try {
      const res = await fetchWithAuth(`/api/admin/bookings/${bookingId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Update failed');
      setBookings(bookings.map(b => (b._id === bookingId ? data : b)));
      await fetchStats();
      window.dispatchEvent(new CustomEvent('toast', {
        detail: { message: 'Booking status updated', type: 'success' }
      }));
    } catch (err) {
      window.dispatchEvent(new CustomEvent('toast', {
        detail: { message: err.message || 'Update failed', type: 'error' }
      }));
    }
  };

  const handleAddHotel = async (e) => {
    e.preventDefault();
    setSavingHotel(true);
    try {
      const res = await fetchWithAuth('/api/hotels', {
        method: 'POST',
        body: JSON.stringify(hotelForm)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Create failed');
      setHotelForm({ name: '', address: '', city: '', price: 120, rating: 4.2, totalRooms: 10, availableRooms: 10 });
      await fetchHotels();
      await fetchStats();
      window.dispatchEvent(new CustomEvent('toast', { detail: { message: 'Hotel added', type: 'success' } }));
    } catch (err) {
      window.dispatchEvent(new CustomEvent('toast', { detail: { message: err.message || 'Create failed', type: 'error' } }));
    } finally {
      setSavingHotel(false);
    }
  };

  const handleDeleteHotel = async (id) => {
    if (!confirm('Delete this hotel?')) return;
    try {
      const res = await fetchWithAuth(`/api/hotels/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Delete failed');
      await fetchHotels();
      await fetchStats();
      window.dispatchEvent(new CustomEvent('toast', { detail: { message: 'Hotel deleted', type: 'success' } }));
    } catch (err) {
      window.dispatchEvent(new CustomEvent('toast', { detail: { message: err.message || 'Delete failed', type: 'error' } }));
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value || 0);
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="admin-dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Operational overview for hotels, bookings, users, and content.</p>
        </div>
        <button className="btn btn-secondary" onClick={loadAll}>Refresh Data</button>
      </div>

      <div className="admin-tabs">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'hotels', label: 'Hotels' },
          { id: 'bookings', label: 'Bookings' },
          { id: 'users', label: 'Users' },
          { id: 'messages', label: 'Messages' },
          { id: 'blogs', label: 'Blogs' }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`tab-btn ${activePanel === tab.id ? 'active' : ''}`}
            onClick={() => setActivePanel(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activePanel === 'overview' && (
        <>
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Total Hotels</div>
          <div className="kpi-value">{stats.totalHotels}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Total Users</div>
          <div className="kpi-value">{stats.totalUsers}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Total Bookings</div>
          <div className="kpi-value">{stats.totalBookings}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Total Revenue</div>
          <div className="kpi-value">{formatCurrency(stats.totalRevenue)}</div>
        </div>
      </div>

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

      <div className="admin-quick-actions">
        <div className="action-card">
          <h3>Manage Hotels</h3>
          <p>Create and update hotel listings, pricing, and rooms.</p>
          <button type="button" className="btn" onClick={() => setActivePanel('hotels')}>Open Hotels</button>
        </div>
        <div className="action-card">
          <h3>Manage Blogs</h3>
          <p>Publish announcements, travel guides, and promotions.</p>
          <button type="button" className="btn" onClick={() => setActivePanel('blogs')}>Open Blogs</button>
        </div>
        <div className="action-card">
          <h3>Review Bookings</h3>
          <p>Approve, update, or resolve booking requests.</p>
          <button className="btn" onClick={() => { fetchBookings(); setActivePanel('bookings'); }}>Open Bookings</button>
        </div>
      </div>
        </>
      )}

      <div className="admin-panels">
        {activePanel === 'hotels' && (
        <section className="admin-panel">
          <div className="admin-section-header">
            <h2>Hotel Management</h2>
          </div>
          <form className="admin-form" onSubmit={handleAddHotel}>
            <input placeholder="Name" value={hotelForm.name} onChange={(e)=>setHotelForm({ ...hotelForm, name: e.target.value })} required />
            <input placeholder="City" value={hotelForm.city} onChange={(e)=>setHotelForm({ ...hotelForm, city: e.target.value })} required />
            <input placeholder="Address" value={hotelForm.address} onChange={(e)=>setHotelForm({ ...hotelForm, address: e.target.value })} />
            <input type="number" placeholder="Price" value={hotelForm.price} onChange={(e)=>setHotelForm({ ...hotelForm, price: Number(e.target.value) })} />
            <input type="number" placeholder="Rating" step="0.1" value={hotelForm.rating} onChange={(e)=>setHotelForm({ ...hotelForm, rating: Number(e.target.value) })} />
            <input type="number" placeholder="Total Rooms" value={hotelForm.totalRooms} onChange={(e)=>setHotelForm({ ...hotelForm, totalRooms: Number(e.target.value) })} />
            <input type="number" placeholder="Available Rooms" value={hotelForm.availableRooms} onChange={(e)=>setHotelForm({ ...hotelForm, availableRooms: Number(e.target.value) })} />
            <div className="admin-form-actions">
              <button className="btn" type="submit" disabled={savingHotel}>{savingHotel ? 'Saving...' : 'Add Hotel'}</button>
            </div>
          </form>
          <div className="admin-table">
            <div className="admin-table-row admin-table-head">
              <div>Hotel</div>
              <div>City</div>
              <div>Rating</div>
              <div>Action</div>
            </div>
            {hotels.slice(0, 8).map(h => (
              <div key={h._id} className="admin-table-row">
                <div>{h.name}</div>
                <div>{h.city}</div>
                <div>{h.rating}</div>
                <div>
                  <button className="btn btn-danger" onClick={() => handleDeleteHotel(h._id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        </section>
        )}

        {activePanel === 'users' && (
        <section className="admin-panel">
          <div className="admin-section-header">
            <h2>Recent Users</h2>
            <button className="btn btn-secondary" onClick={fetchUsers}>Refresh</button>
          </div>
          <div className="admin-table">
            <div className="admin-table-row admin-table-head">
              <div>Name</div>
              <div>Email</div>
              <div>Role</div>
              <div>Joined</div>
            </div>
            {users.slice(0, 6).map(u => (
              <div key={u._id} className="admin-table-row">
                <div>{u.name}</div>
                <div>{u.email}</div>
                <div className="capitalize">{u.role}</div>
                <div>{new Date(u.createdAt).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        </section>
        )}

        {activePanel === 'bookings' && (
        <section className="admin-panel">
          <div className="admin-section-header">
            <h2>Latest Bookings</h2>
            <button className="btn btn-secondary" onClick={fetchBookings}>Refresh</button>
          </div>
          <div className="admin-table">
            <div className="admin-table-row admin-table-head">
              <div>Hotel</div>
              <div>Guest</div>
              <div>Dates</div>
              <div>Status</div>
            </div>
            {bookings.slice(0, 6).map(b => (
              <div key={b._id} className="admin-table-row">
                <div>{b.hotel?.name || 'Hotel'}</div>
                <div>{b.user?.name || b.name}</div>
                <div>{new Date(b.checkIn).toLocaleDateString()} - {new Date(b.checkOut).toLocaleDateString()}</div>
                <div>
                  <select
                    value={b.status}
                    onChange={(e) => updateBookingStatus(b._id, e.target.value)}
                    className="admin-status-select"
                  >
                    <option value="Booked">Booked</option>
                    <option value="Successful">Successful</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </section>
        )}

        {activePanel === 'messages' && (
        <section className="admin-panel">
          <div className="admin-section-header">
            <h2>Recent Messages</h2>
            <button className="btn btn-secondary" onClick={fetchMessages}>Refresh</button>
          </div>
          <div className="admin-table">
            <div className="admin-table-row admin-table-head">
              <div>Name</div>
              <div>Email</div>
              <div>Subject</div>
              <div>Received</div>
            </div>
            {messages.slice(0, 6).map(m => (
              <div key={m._id} className="admin-table-row">
                <div>{m.name}</div>
                <div>{m.email}</div>
                <div>{m.subject || 'General'}</div>
                <div>{new Date(m.createdAt).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        </section>
        )}

        {activePanel === 'blogs' && (
        <section className="admin-panel">
          <div className="admin-section-header">
            <h2>Recent Blogs</h2>
            <button className="btn btn-secondary" onClick={fetchBlogs}>Refresh</button>
          </div>
          <div className="admin-blog-list">
            {blogs.slice(0, 6).map(b => (
              <div key={b._id} className="admin-blog-item">
                <div className="admin-blog-thumb">
                  {b.image ? <img src={b.image} alt={b.title} /> : <div className="admin-blog-fallback">Blog</div>}
                </div>
                <div className="admin-blog-info">
                  <div className="admin-blog-title">{b.title}</div>
                  <div className="admin-blog-meta">{b.category} • {b.published ? 'Published' : 'Draft'}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
        )}
      </div>
    </div>
  );
}
