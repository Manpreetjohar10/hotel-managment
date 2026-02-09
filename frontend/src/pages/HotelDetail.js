import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ImageCarousel from '../components/ImageCarousel';
import BookingForm from '../components/BookingForm';
import { fetchWithAuth } from '../api';

export default function HotelDetail() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const fallbackImages = Array.from({ length: 6 }, (_, i) => `/hotels/images/img${i + 1}.jpg`);
  const roomTypes = [
    { name: 'Deluxe King', beds: '1 King Bed', size: '32 m²', perks: ['City view', 'Breakfast included'], priceAdd: 0 },
    { name: 'Executive Suite', beds: '1 King + Sofa', size: '48 m²', perks: ['Lounge access', 'Late checkout'], priceAdd: 80 },
    { name: 'Family Room', beds: '2 Queen Beds', size: '42 m²', perks: ['Kids stay free', 'Extra space'], priceAdd: 40 }
  ];
  const highlights = [
    { label: 'Check-in', value: '2:00 PM' },
    { label: 'Check-out', value: '11:00 AM' },
    { label: 'Free cancel', value: '48 hrs prior' },
    { label: 'Wi-Fi', value: 'Included' }
  ];
  const nearby = [
    { name: 'City Center', distance: '0.8 km' },
    { name: 'Business District', distance: '1.2 km' },
    { name: 'Shopping Plaza', distance: '0.5 km' },
    { name: 'Airport Shuttle', distance: '25 min' }
  ];
  const reviews = [
    { name: 'Ananya', text: 'Excellent service and spotless rooms.' },
    { name: 'Michael', text: 'Great location and smooth check-in.' },
    { name: 'Ravi', text: 'Perfect for business trips.' }
  ];

  useEffect(() => {
    load();
  }, [id]);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetchWithAuth(`/api/hotels/${id}`);
      const data = await res.json();
      if (res.ok) setHotel(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading hotel...</div>;
  if (!hotel) return <div className="error">Hotel not found</div>;

  return (
    <div className="hotel-detail-page">
      <div className="hotel-detail-hero">
        <Link to="/hotels" className="back-link hotel-back-link">Back to hotels</Link>
        <h1>{hotel.name}</h1>
        <p>{hotel.address} - {hotel.city}</p>
        <div className="hotel-detail-tags">
          <span className="badge success badge-anim">Free cancellation</span>
          <span className="badge primary badge-anim">Pay at property</span>
          <span className="badge warning badge-anim">Limited rooms</span>
        </div>
      </div>

      <div className="hotel-detail-grid">
        <section className="hotel-detail-main">
          {((hotel.images && hotel.images.length) || fallbackImages.length) ? (
            <div className="hotel-gallery">
              <ImageCarousel images={[...(hotel.images || []), ...fallbackImages]} />
            </div>
          ) : null}
          <div className="detail-card detail-highlights">
            {highlights.map((h) => (
              <div key={h.label} className="highlight-item">
                <div className="highlight-label">{h.label}</div>
                <div className="highlight-value">{h.value}</div>
              </div>
            ))}
          </div>
          <div className="detail-card">
            <h2>About this stay</h2>
            <p>{hotel.description || 'A premium stay with curated amenities and smooth service.'}</p>
            <div className="hotel-meta">Rating: {hotel.rating} - {hotel.amenities?.slice(0, 3).join(', ')}</div>
          </div>
          <div className="detail-card">
            <h2>Choose your room</h2>
            <div className="room-grid">
              {roomTypes.map((r) => (
                <div key={r.name} className="room-card">
                  <div className="room-header">
                    <div>
                      <h3>{r.name}</h3>
                      <div className="room-meta">{r.beds} - {r.size}</div>
                    </div>
                    <div className="room-price">
                      <div className="price">${hotel.price + r.priceAdd}</div>
                      <div className="price-note">per night</div>
                    </div>
                  </div>
                  <div className="room-perks">
                    {r.perks.map((p) => (
                      <span key={p} className="badge primary">{p}</span>
                    ))}
                  </div>
                  <button className="btn small">Select room</button>
                </div>
              ))}
            </div>
          </div>
          <div className="detail-card">
            <h2>Amenities</h2>
            <div className="amenities-grid">
              {(hotel.amenities || []).map(a => (
                <span key={a} className="pill">{a}</span>
              ))}
            </div>
          </div>
          <div className="detail-card">
            <h2>Nearby</h2>
            <div className="nearby-list">
              {nearby.map((n) => (
                <div key={n.name} className="nearby-item">
                  <span>{n.name}</span>
                  <span className="nearby-distance">{n.distance}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="detail-card">
            <h2>Policies</h2>
            <ul className="policy-list">
              <li>Check-in from 2:00 PM</li>
              <li>Check-out until 11:00 AM</li>
              <li>Pets not allowed</li>
              <li>Government ID required at check-in</li>
            </ul>
          </div>
          <div className="detail-card">
            <h2>Guest reviews</h2>
            <div className="review-grid">
              {reviews.map((r) => (
                <div key={r.name} className="review-mini">
                  <strong>{r.name}</strong>
                  <p>{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="hotel-detail-sidebar">
          <div className="price-panel">
            <div className="price">${hotel.price}</div>
            <div className="price-note">per night</div>
            <div className="rating-pill">Guest rating {hotel.rating}</div>
          </div>
          <div className="detail-card sticky-card">
            <h3>Reserve your room</h3>
            <BookingForm
              hotelId={hotel._id}
              availableRooms={hotel.availableRooms}
            />
          </div>
          <div className="detail-card highlight-card">
            <h3>Why book with us</h3>
            <ul className="policy-list">
              <li>Instant confirmation</li>
              <li>Secure payments</li>
              <li>24/7 guest support</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
