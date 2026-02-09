import React, { useState, useEffect } from "react";
import { fetchWithAuth } from "../api";

export default function DashboardUser() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProfile();
    loadBookings();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await fetchWithAuth("/api/users/me");
      const data = await res.json();
      if (res.ok) {
        setUser(data);
        setFormData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadBookings = async () => {
    try {
      const res = await fetchWithAuth("/api/bookings/my");
      const data = await res.json();
      if (res.ok) setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetchWithAuth("/api/users/me", {
        method: "PATCH",
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");
      setUser(data);
      window.dispatchEvent(
        new CustomEvent("toast", {
          detail: { message: "Profile updated successfully!", type: "success" },
        }),
      );
      setEditMode(false);
    } catch (err) {
      window.dispatchEvent(
        new CustomEvent("toast", {
          detail: { message: err.message || "Update failed", type: "error" },
        }),
      );
    } finally {
      setSaving(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      const res = await fetchWithAuth(`/api/bookings/${bookingId}/cancel`, {
        method: "PATCH",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Cancel failed");
      setBookings(bookings.map((b) => (b._id === bookingId ? data : b)));
      window.dispatchEvent(
        new CustomEvent("toast", {
          detail: {
            message: "Booking cancelled successfully",
            type: "success",
          },
        }),
      );
    } catch (err) {
      window.dispatchEvent(
        new CustomEvent("toast", {
          detail: { message: err.message || "Cancel failed", type: "error" },
        }),
      );
    }
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (!user)
    return <div className="error">Please log in to view your dashboard</div>;

  return (
    <div className="dashboard-user">
      <div className="dashboard-header">
        <h1>Welcome, {user.name}!</h1>
        <p>Manage your profile and bookings</p>
      </div>

      <div className="dashboard-grid">
        <section className="profile-section">
          <div className="section-header">
            <h2>My Profile</h2>
            <button
              className="btn btn-secondary"
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          {editMode ? (
            <form onSubmit={handleUpdateProfile} className="profile-form">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={formData.email} readOnly disabled />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </form>
          ) : (
            <div className="profile-info">
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone || "Not provided"}
              </p>
              <p>
                <strong>Address:</strong> {user.address || "Not provided"}
              </p>
              <p>
                <strong>Member Since:</strong>{" "}
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          )}
        </section>

        <section className="bookings-section">
          <div className="section-header">
            <h2>My Bookings</h2>
            <span className="booking-count">{bookings.length} booking(s)</span>
          </div>

          {bookings.length > 0 ? (
            <div className="bookings-list">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className={`booking-card status-${(booking.status || "").toLowerCase()}`}
                >
                  <div className="booking-header">
                    <h3>{booking.hotel?.name || "Hotel"}</h3>
                    <span
                      className={`status-badge ${(booking.status || "").toLowerCase()}`}
                    >
                      {booking.status}
                    </span>
                  </div>
                  <div className="booking-details">
                    <p>
                      <strong>Check-in:</strong>{" "}
                      {new Date(booking.checkIn).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Check-out:</strong>{" "}
                      {new Date(booking.checkOut).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Guests:</strong> {booking.guests}
                    </p>
                    {booking.hotel?.price && (
                      <p>
                        <strong>Price:</strong> ${booking.hotel.price}
                      </p>
                    )}
                  </div>
                  {booking.status === "Booked" && (
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
              <a href="/hotels" className="btn btn-primary">
                Browse Hotels
              </a>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
