import React, { useEffect, useState } from 'react';

export default function HotelList() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHotels() {
      try {
        const res = await fetch('/api/hotels');
        const data = await res.json();
        setHotels(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchHotels();
  }, []);

  if (loading) return <div>Loading hotels...</div>;
  if (!hotels.length) return <div>No hotels found.</div>;

  return (
    <div>
      {hotels.map(h => (
        <div key={h._id} style={{ border: '1px solid #ddd', padding: 12, marginBottom: 8 }}>
          <h3 style={{ margin: 0 }}>{h.name}</h3>
          <div>{h.address} — {h.city}</div>
          <div>Rating: {h.rating} • Price: ${h.price}</div>
        </div>
      ))}
    </div>
  );
}
