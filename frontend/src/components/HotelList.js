import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import BookingForm from './BookingForm';
import ImageCarousel from './ImageCarousel';
import { fetchWithAuth } from '../api';

export default function HotelList() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('newest');
  const [modalHotel, setModalHotel] = useState(null);

  async function load() {
    setLoading(true);
    try {
      const res = await fetchWithAuth('/api/hotels');
      const data = await res.json();
      setHotels(data);
    } catch (err) {
      console.error(err);
      window.dispatchEvent(new CustomEvent('toast', { detail: { message: 'Failed to load hotels', type: 'error' } }));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const filtered = hotels
    .filter(h => (h.name + ' ' + (h.city||'')).toLowerCase().includes(query.toLowerCase()))
    .sort((a,b) => {
      if (sort === 'priceAsc') return a.price - b.price;
      if (sort === 'priceDesc') return b.price - a.price;
      if (sort === 'rating') return b.rating - a.rating;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  if (loading) return <div>Loading hotels...</div>;
  if (!hotels.length) return <div>No hotels found.</div>;

  return (
    <div>
      <div className="controls">
        <input className="" placeholder="Search by name or city" value={query} onChange={e => setQuery(e.target.value)} />
        <select value={sort} onChange={e=>setSort(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="priceAsc">Price ↑</option>
          <option value="priceDesc">Price ↓</option>
          <option value="rating">Rating</option>
        </select>
        <button className="btn" onClick={load}>Refresh</button>
      </div>

      <div className="hotel-grid">
        {filtered.map(h => (
          <article className="hotel-card grid-card" key={h._id}>
            <div className="grid-thumb">
              {h.images && h.images[0] ? <img src={h.images[0]} alt="thumb" className="hotel-image" /> : <div className="hotel-image" />}
            </div>
            <div className="grid-body">
              <h3 className="hotel-title">{h.name}</h3>
              <div className="hotel-meta">{h.address} — {h.city}</div>
              <div className="hotel-meta">Rating: {h.rating} • Price: ${h.price}</div>
            </div>
            <div className="grid-actions">
              <button className="btn ghost" onClick={() => setModalHotel(h)}>Details</button>
            </div>
          </article>
        ))}
      </div>

      {modalHotel && (
        <Modal title={modalHotel.name} onClose={()=>setModalHotel(null)}>
          <div>
            {modalHotel.images && modalHotel.images.length ? (
              <div style={{ marginBottom:12 }}>
                <ImageCarousel images={modalHotel.images} />
              </div>
            ) : null}
            <p><strong>Address:</strong> {modalHotel.address} — {modalHotel.city}</p>
            <p>{modalHotel.description || 'No description available.'}</p>
            <div style={{ marginTop: 8 }}>
              <strong>Price:</strong> ${modalHotel.price} • <strong>Rating:</strong> {modalHotel.rating}
            </div>
            <div style={{ marginTop: 12 }}>
              <BookingForm hotelId={modalHotel._id} availableRooms={modalHotel.availableRooms} onBooked={()=>{ setModalHotel(null); load(); }} />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
