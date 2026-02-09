import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: 'Contact Form',
          message: formData.message
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to send message');
      window.dispatchEvent(new CustomEvent('toast', { 
        detail: { message: 'Thank you! We will get back to you soon.', type: 'success' } 
      }));
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      window.dispatchEvent(new CustomEvent('toast', { 
        detail: { message: err.message || 'Failed to send message', type: 'error' } 
      }));
    }
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
                <h3>Address</h3>
                <p>221B MG Road, Bengaluru, Karnataka 560001</p>
              </div>
              <div className="info-item">
                <h3>Phone</h3>
                <p>+91 80 4123 4567</p>
              </div>
              <div className="info-item">
                <h3>Email</h3>
                <p>support@mernhotel.in</p>
              </div>
              <div className="info-item">
                <h3>Hours</h3>
                <p>Monday - Friday: 9:30 AM - 6:30 PM</p>
                <p>Saturday - Sunday: 10:00 AM - 5:00 PM</p>
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
              src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22800%22%20height%3D%22400%22%20viewBox%3D%220%200%20800%20400%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230f4c81%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%230b3356%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22url(%23g)%22%2F%3E%3Ccircle%20cx%3D%22160%22%20cy%3D%22140%22%20r%3D%2260%22%20fill%3D%22rgba(255%2C255%2C255%2C0.15)%22%2F%3E%3Ccircle%20cx%3D%22620%22%20cy%3D%22300%22%20r%3D%2290%22%20fill%3D%22rgba(255%2C255%2C255%2C0.12)%22%2F%3E%3Crect%20x%3D%22120%22%20y%3D%2290%22%20width%3D%22560%22%20height%3D%22220%22%20rx%3D%2218%22%20fill%3D%22rgba(255%2C255%2C255%2C0.18)%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2252%25%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%22%20font-size%3D%2222%22%20fill%3D%22%23ffffff%22%20font-weight%3D%22600%22%3EClick%20to%20View%20Hotel%20Locations%3C%2Ftext%3E%3C%2Fsvg%3E" 
              alt="hotel locations map"
              className="map-image"
            />
            <div className="map-overlay">
              <p>Click to View Hotel Locations</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

