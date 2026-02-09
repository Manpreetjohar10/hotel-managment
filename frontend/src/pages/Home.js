import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [activeTag, setActiveTag] = useState('All');

  const featured = [
    { title: 'Beachfront Escapes', desc: 'Sunrise views and ocean-side suites.', tag: 'Resort' },
    { title: 'City Business Stays', desc: 'Fast check-in near downtown hubs.', tag: 'Business' },
    { title: 'Mountain Retreats', desc: 'Quiet cabins with spa access.', tag: 'Nature' }
  ];

  const featuredFiltered = useMemo(() => (
    activeTag === 'All' ? featured : featured.filter((f) => f.tag === activeTag)
  ), [activeTag, featured]);

  const destinations = [
    { name: 'Dubai Marina', city: 'Dubai', price: 320, rating: 4.8, img: '/hotels/images/img19.jpg' },
    { name: 'Heritage Lane', city: 'New Delhi', price: 280, rating: 4.9, img: '/hotels/images/img16.jpg' },
    { name: 'Ocean Road', city: 'Seaside', price: 220, rating: 4.8, img: '/hotels/images/img4.jpg' },
    { name: 'Downtown Lights', city: 'Metropolis', price: 150, rating: 4.2, img: '/hotels/images/img13.jpg' },
    { name: 'Hillview Peaks', city: 'Hillview', price: 180, rating: 4.7, img: '/hotels/images/img10.jpg' },
    { name: 'Budget Smart', city: 'Smalltown', price: 60, rating: 3.6, img: '/hotels/images/img7.jpg' }
  ];

  const offers = [
    { title: 'Weekend Escape', badge: 'Limited Time', desc: 'Save 20% on 2-night stays.', cta: 'Book weekend' },
    { title: 'Business Saver', badge: 'Popular', desc: 'Free breakfast + late checkout.', cta: 'View deal' },
    { title: 'Family Package', badge: 'New', desc: 'Kids stay free in select hotels.', cta: 'Explore offer' }
  ];

  return (
    <div className="home-page">
      <section className="hero hero-interactive hero-luxe">
        <div className="hero-media" aria-hidden="true">
          <div className="hero-media-layer" />
          <div className="hero-media-glow" />
        </div>
        <div className="hero-content">
          <span className="hero-kicker">Premium Stays - Curated Comfort</span>
          <h1 className="hero-title">Reserve boutique hotels and resorts with confidence</h1>
          <p className="hero-subtitle">Flexible bookings, transparent pricing, and verified reviews across top destinations.</p>
          <div className="hero-actions">
            <Link to="/hotels" className="btn btn-hero">
              Explore Hotels
            </Link>
            <Link to="/contact" className="btn outline">
              Talk to Concierge
            </Link>
          </div>
          <div className="home-quick-filters">
            {['All', 'Resort', 'Business', 'Nature'].map((tag) => (
              <button
                key={tag}
                type="button"
                className={`chip ${activeTag === tag ? 'active' : ''}`}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-value">120+</div>
              <div className="hero-stat-label">Partner Hotels</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">4.8</div>
              <div className="hero-stat-label">Avg Rating</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">24/7</div>
              <div className="hero-stat-label">Guest Support</div>
            </div>
          </div>
        </div>
        <div className="hero-panel">
          <div className="hero-search">
            <h3>Find your stay</h3>
            <div className="hero-search-grid">
              <div>
                <label>Destination</label>
                <input type="text" placeholder="City, landmark, or hotel" />
              </div>
              <div>
                <label>Check-in</label>
                <input type="date" />
              </div>
              <div>
                <label>Check-out</label>
                <input type="date" />
              </div>
              <div>
                <label>Guests</label>
                <input type="number" min="1" defaultValue="2" />
              </div>
            </div>
            <div className="hero-extra">
              <div className="hero-extra-item">
                <span>Flexible dates</span>
                <strong>Save up to 18%</strong>
              </div>
              <div className="hero-extra-item">
                <span>Verified partners</span>
                <strong>4.8/5 ratings</strong>
              </div>
            </div>
            <Link to="/hotels" className="btn btn-primary fullwidth">
              Search Hotels
            </Link>
          </div>
        </div>
        <div className="hero-blobs" aria-hidden="true">
          <span className="blob blob-a" />
          <span className="blob blob-b" />
        </div>
      </section>

      <section className="logo-marquee">
        <div className="marquee-track">
          <span>Ritz Collection</span>
          <span>Regal Suites</span>
          <span>Azure Bay</span>
          <span>Grandline Hotels</span>
          <span>Summit Resorts</span>
          <span>Aria Stays</span>
          <span>Ritz Collection</span>
          <span>Regal Suites</span>
          <span>Azure Bay</span>
          <span>Grandline Hotels</span>
          <span>Summit Resorts</span>
          <span>Aria Stays</span>
        </div>
      </section>

      <section className="trust-bar">
        <div className="trust-item">Best Price Guarantee</div>
        <div className="trust-item">Free Cancellation Options</div>
        <div className="trust-item">Verified Reviews</div>
        <div className="trust-item">Secure Payments</div>
      </section>

      <section className="destinations">
        <div className="section-header">
          <h2 className="section-title">Popular destinations</h2>
          <Link to="/hotels" className="btn btn-secondary">Browse all</Link>
        </div>
        <div className="destination-grid">
          {destinations.map((d) => (
            <div key={d.name} className="destination-card hover-lift">
              <div className="destination-image">
                <img src={d.img} alt={d.name} />
                <span className="pill">{d.city}</span>
              </div>
              <div className="destination-body">
                <h3>{d.name}</h3>
                <div className="destination-meta">
                  <span>Rating {d.rating}</span>
                  <span>${d.price} / night</span>
                </div>
                <Link to="/hotels" className="btn small">View stay</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="offers">
        <div className="section-header">
          <h2 className="section-title">Exclusive offers</h2>
          <div className="offer-timer">Deal ends in <strong>02:14:32</strong></div>
        </div>
        <div className="offers-grid">
          {offers.map((o) => (
            <div key={o.title} className="offer-card hover-lift">
              <div className="offer-badge">{o.badge}</div>
              <h3>{o.title}</h3>
              <p>{o.desc}</p>
              <button className="btn small">{o.cta}</button>
            </div>
          ))}
        </div>
      </section>

      <section className="features">
        <h2>Why Guests Choose MERN Hotel</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">Premium</div>
            <h3>Verified Premium Stays</h3>
            <p>Handpicked hotels with consistent service and comfort.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">Value</div>
            <h3>Transparent Pricing</h3>
            <p>No hidden fees. Clear breakdown before you confirm.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">Secure</div>
            <h3>Secure Booking</h3>
            <p>Protected payments and instant confirmations.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">Support</div>
            <h3>Concierge Support</h3>
            <p>Help with room upgrades, late check-out, and more.</p>
          </div>
        </div>
      </section>

      <section className="parallax-band">
        <div className="parallax-content">
          <h2>Luxury rooms with curated experiences</h2>
          <p>From executive suites to sea-view villas, enjoy thoughtful amenities that elevate every stay.</p>
          <Link to="/hotels" className="btn">Explore luxury</Link>
        </div>
      </section>

      <section className="featured-stays">
        <div className="section-header">
          <h2 className="section-title">Featured stays curated for you</h2>
          <Link to="/hotels" className="btn btn-secondary">View all</Link>
        </div>
        <div className="featured-grid">
          {featuredFiltered.map((f) => (
            <div key={f.title} className="featured-card">
              <div className="featured-top">
                <span className="pill">{f.tag}</span>
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <div className="featured-actions">
                <Link to="/hotels" className="btn small">Explore</Link>
                <span className="featured-link">View details</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="reviews">
        <div className="section-header">
          <h2 className="section-title">Guest reviews</h2>
          <div className="rating-chip">Excellent 4.8/5</div>
        </div>
        <div className="review-track">
          <div className="review-card">"Seamless booking and impeccable service." - Ananya</div>
          <div className="review-card">"Loved the curated hotel picks and fast support." - Michael</div>
          <div className="review-card">"Great value for business stays." - Ravi</div>
          <div className="review-card">"Clean, modern, and reliable platform." - Sofia</div>
          <div className="review-card">"Will book again for sure." - Daniel</div>
        </div>
      </section>

      <section className="cta">
        <h2>Ready to book your next stay?</h2>
        <Link to="/hotels" className="btn btn-primary">
          Start Booking
        </Link>
      </section>
    </div>
  );
}
