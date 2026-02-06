import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('toast', { 
      detail: { message: 'Thank you! We will get back to you soon.', type: 'success' } 
    }));
    setFormData({ name: '', email: '', message: '' });
  };

  const handleMapClick = () => {
    // Redirect to a random hotel location on Google Maps
    const hotels = [
      { name: 'Grand Plaza', coords: '40.7128,-74.0060' }, // NYC
      { name: 'Sea View Resort', coords: '34.0522,-118.2437' }, // LA
      { name: 'Mountain Retreat', coords: '39.7392,-104.9903' }, // Denver
      { name: 'City Lights Suites', coords: '41.8781,-87.6298' } // Chicago
    ];
    const randomHotel = hotels[Math.floor(Math.random() * hotels.length)];
    window.open(
      `https://www.google.com/maps/search/${randomHotel.name}/@${randomHotel.coords},15z`,
      '_blank'
    );
  };

  return (
    <div className="contact-page">
      <div className="page-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you</p>
      </div>

      <div className="contact-content">
        <div className="contact-grid">
          {/* Contact Form */}
          <section className="contact-form-section">
            <h2>Get in Touch</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows="6"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </section>

          {/* Contact Info */}
          <section className="contact-info-section">
            <h2>Contact Information</h2>
            <div className="contact-info">
              <div className="info-item">
                <h3>📍 Address</h3>
                <p>123 Main Street, Metropolis, MC 12345</p>
              </div>
              <div className="info-item">
                <h3>📞 Phone</h3>
                <p>+1 (555) 123-4567</p>
              </div>
              <div className="info-item">
                <h3>📧 Email</h3>
                <p>support@mernhotel.com</p>
              </div>
              <div className="info-item">
                <h3>🕐 Hours</h3>
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday - Sunday: 10:00 AM - 4:00 PM</p>
              </div>
            </div>
          </section>
        </div>

        {/* Map Section */}
        <section className="map-section">
          <h2>Find Our Hotel Locations</h2>
          <p>Click the map below to explore our partner hotels on Google Maps</p>
          <div className="map-container" onClick={handleMapClick}>
            <img 
              src="https://via.placeholder.com/800x400?text=Click+to+View+Locations+on+Google+Maps" 
              alt="hotel locations map"
              className="map-image"
            />
            <div className="map-overlay">
              <p>🗺️ Click to View Hotel Locations</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
