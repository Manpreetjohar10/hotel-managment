import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Discover Your Perfect Hotel Stay</h1>
          <p className="hero-subtitle">Book premium accommodations at the best prices worldwide</p>
          <Link to="/hotels" className="btn btn-hero">
            Explore Hotels Now
          </Link>
        </div>
        <div className="hero-image">
          <img src="https://via.placeholder.com/600x400?text=Luxury+Hotels" alt="luxury hotel" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🏨</div>
            <h3>Premium Hotels</h3>
            <p>Access to thousands of handpicked hotels worldwide</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Best Prices</h3>
            <p>Guaranteed lowest prices with exclusive deals</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Secure Booking</h3>
            <p>Safe and secure payment processing</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Top Ratings</h3>
            <p>Voted best hotel booking platform</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Guests Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p className="testimonial-text">"Excellent service and beautiful rooms. Highly recommended!"</p>
            <p className="testimonial-author">- Sarah Johnson</p>
          </div>
          <div className="testimonial-card">
            <p className="testimonial-text">"Best hotel booking experience ever. Will definitely book again."</p>
            <p className="testimonial-author">- Michael Chen</p>
          </div>
          <div className="testimonial-card">
            <p className="testimonial-text">"Great prices and friendly staff. Perfect for family vacation."</p>
            <p className="testimonial-author">- Emily Rodriguez</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Ready to Book Your Next Getaway?</h2>
        <Link to="/hotels" className="btn btn-primary">
          Start Booking
        </Link>
      </section>
    </div>
  );
}
