import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchWithAuth } from '../api';

export default function HotelList() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('recommended');
  const [saved, setSaved] = useState({});
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    rating: '0',
    amenities: []
  });
  const [searchForm, setSearchForm] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 2
  });
  const localFallbacks = Array.from({ length: 21 }, (_, i) => `/hotels/images/img${i + 1}.jpg`);

  async function load() {
    setLoading(true);
    try {
      const res = await fetchWithAuth('/api/hotels');
      const data = await res.json();
      setHotels(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      window.dispatchEvent(new CustomEvent('toast', { detail: { message: 'Failed to load hotels', type: 'error' } }));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const resolveImage = (src) => {
    if (!src) return '';
    const cleaned = String(src).replace(/\\/g, '/');
    if (cleaned.startsWith('http') || cleaned.startsWith('data:')) return cleaned;
    if (cleaned.startsWith('/')) return cleaned;
    return `/${cleaned}`;
  };

  const amenityOptions = Array.from(
    new Set(hotels.flatMap(h => h.amenities || []))
  ).sort();

  const filtered = hotels
    .filter(h => {
      const text = `${h.name} ${h.city || ''} ${h.address || ''}`.toLowerCase();
      const q = (query || searchForm.destination || '').toLowerCase();
      if (q && !text.includes(q)) return false;
      if (filters.minPrice && h.price < Number(filters.minPrice)) return false;
      if (filters.maxPrice && h.price > Number(filters.maxPrice)) return false;
      if (filters.rating && h.rating < Number(filters.rating)) return false;
      if (filters.amenities.length) {
        const hotelAmenities = new Set(h.amenities || []);
        const hasAll = filters.amenities.every(a => hotelAmenities.has(a));
        if (!hasAll) return false;
      }
      return true;
    })
    .sort((a,b) => {
      if (sort === 'priceAsc') return a.price - b.price;
      if (sort === 'priceDesc') return b.price - a.price;
      if (sort === 'rating') return b.rating - a.rating;
      if (sort === 'name') return a.name.localeCompare(b.name);
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  if (loading) return <div className="loading">Loading hotels...</div>;
  if (!hotels.length) return <div className="error">No hotels found.</div>;

  return (
    <div className="hotels-page">
      <div className="promo-banner">
        <div>
          <strong>Member Deals</strong> • Save 10% on selected stays
        </div>
        <div className="promo-actions">
          <span className="pill">Ends in 02:14:32</span>
          <Link to="/contact" className="btn small">Unlock</Link>
        </div>
      </div>
      <div className="hotels-hero">
        <div>
          <h1>Find your next stay</h1>
          <p>Search by destination and compare prices from verified hotel partners.</p>
        </div>
        <div className="hotels-search">
          <div className="hotels-search-grid">
            <div>
              <label>Destination</label>
              <input
                type="text"
                placeholder="City, landmark, or hotel"
                value={searchForm.destination}
                onChange={(e) => setSearchForm({ ...searchForm, destination: e.target.value })}
              />
            </div>
            <div>
              <label>Check-in</label>
              <input
                type="date"
                value={searchForm.checkIn}
                onChange={(e) => setSearchForm({ ...searchForm, checkIn: e.target.value })}
              />
            </div>
            <div>
              <label>Check-out</label>
              <input
                type="date"
                value={searchForm.checkOut}
                onChange={(e) => setSearchForm({ ...searchForm, checkOut: e.target.value })}
              />
            </div>
            <div>
              <label>Guests</label>
              <input
                type="number"
                min="1"
                value={searchForm.guests}
                onChange={(e) => setSearchForm({ ...searchForm, guests: Number(e.target.value) })}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="hotels-layout">
        <aside className="hotels-sidebar">
          <h3>Filters</h3>
          <div className="filter-group">
            <label>Search</label>
            <input
              placeholder="Hotel or city"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label>Price range</label>
            <div className="filter-row">
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
              />
            </div>
          </div>
          <div className="filter-group">
            <label>Minimum rating</label>
            <select
              value={filters.rating}
              onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
            >
              <option value="0">Any</option>
              <option value="3">3.0+</option>
              <option value="4">4.0+</option>
              <option value="4.5">4.5+</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Amenities</label>
            <div className="filter-chips">
              {amenityOptions.map(a => (
                <button
                  key={a}
                  type="button"
                  className={`chip ${filters.amenities.includes(a) ? 'active' : ''}`}
                  onClick={() => {
                    const next = filters.amenities.includes(a)
                      ? filters.amenities.filter(x => x !== a)
                      : [...filters.amenities, a];
                    setFilters({ ...filters, amenities: next });
                  }}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
          <button className="btn btn-secondary" onClick={() => setFilters({ minPrice: '', maxPrice: '', rating: '0', amenities: [] })}>
            Clear filters
          </button>
        </aside>

        <section className="hotels-results">
          <div className="results-bar">
            <div>
              <strong>{filtered.length}</strong> stays found
            </div>
            <div className="results-actions">
              <select value={sort} onChange={e=>setSort(e.target.value)}>
                <option value="recommended">Recommended</option>
                <option value="rating">Top Rated</option>
                <option value="priceAsc">Price Low to High</option>
                <option value="priceDesc">Price High to Low</option>
                <option value="name">Name</option>
              </select>
              <button className="btn" onClick={load}>Refresh</button>
            </div>
          </div>

          <div className="hotel-grid booking-grid stagger-grid">
            {filtered.map((h, idx) => {
              const fallbackSrc = localFallbacks[idx % localFallbacks.length];
              const primarySrc = resolveImage(h.images && h.images[0] ? h.images[0] : fallbackSrc);
              const reviewCount = 120 + idx * 18;
              const distance = (0.6 + idx * 0.3).toFixed(1);
              const strikePrice = Math.round(h.price * 1.25);
              return (
              <article className="hotel-card grid-card booking-card hover-lift" key={h._id} style={{ animationDelay: `${idx * 40}ms` }}>
                <div className="grid-thumb">
                  <div className="deal-ribbon">Deal</div>
                  {h.images && h.images[0] ? (
                    <img
                      src={primarySrc}
                      alt={`${h.name} thumbnail`}
                      className="hotel-image"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = fallbackSrc;
                      }}
                    />
                  ) : (
                    <img
                      src={fallbackSrc}
                      alt={`${h.name} thumbnail`}
                      className="hotel-image"
                    />
                  )}
                </div>
                <div className="grid-body">
                  <div className="hotel-header-row">
                    <h3 className="hotel-title">{h.name}</h3>
                    <span className="rating-pill">{h.rating} / 5</span>
                  </div>
                  <div className="hotel-meta">{h.address} - {h.city}</div>
                  <div className="hotel-submeta">
                    <span>{distance} km from center</span>
                    <span className="dot">•</span>
                    <span>{reviewCount} reviews</span>
                  </div>
                  <div className="hotel-tags">
                    <span className="badge success badge-anim">Free cancellation</span>
                    <span className="badge primary badge-anim">Pay at property</span>
                    <span className="badge warning badge-anim">Limited rooms</span>
                  </div>
                  <div className="hotel-meta">Amenities: {h.amenities?.slice(0, 4).join(', ')}</div>
                </div>
                <div className="grid-actions booking-actions">
                  <div className="price-block">
                    <div className="price-strike">${strikePrice}</div>
                    <div className="price">${h.price}</div>
                    <div className="price-note">per night</div>
                    <div className="save-note">Save 20% today</div>
                  </div>
                  <div className="action-row">
                    <button
                      type="button"
                      className={`btn ghost ${saved[h._id] ? 'saved' : ''}`}
                      onClick={() => setSaved((prev) => ({ ...prev, [h._id]: !prev[h._id] }))}
                    >
                      {saved[h._id] ? 'Saved' : 'Save'}
                    </button>
                    <Link to={`/hotels/${h._id}`} className="btn">See availability</Link>
                  </div>
                </div>
              </article>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
