import React, { useState } from 'react';
import { fetchWithAuth } from '../api';

export default function BookingForm({ hotelId, onBooked, availableRooms }){
  const [form, setForm] = useState({ name:'', email:'', checkIn:'', checkOut:'', guests:1 });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  async function handleSubmit(e){
    e.preventDefault();
    const errs = {};
    if(!form.name || form.name.length < 2) errs.name = 'Enter your name';
    if(!form.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = 'Enter a valid email';
    if(!form.checkIn) errs.checkIn = 'Select check-in';
    if(!form.checkOut) errs.checkOut = 'Select check-out';
    if(form.checkIn && form.checkOut && new Date(form.checkIn) >= new Date(form.checkOut)) errs.checkOut = 'Check-out must be after check-in';
    if(form.guests < 1) errs.guests = 'Guests must be at least 1';
    if(typeof availableRooms === 'number' && form.guests > availableRooms) errs.guests = 'Not enough available rooms';
    setErrors(errs);
    if(Object.keys(errs).length) return;

    if(!token){
      window.dispatchEvent(new CustomEvent('toast', { detail: { message: 'You must be logged in to book.', type: 'error' } }));
      return;
    }

    setLoading(true);
    try{
      const res = await fetchWithAuth('/api/bookings', {
        method:'POST',
        body: JSON.stringify({ hotelId, ...form })
      });
      const data = await res.json();
      if(!res.ok) throw new Error(data.message || 'Booking failed');
      window.dispatchEvent(new CustomEvent('toast', { detail: { message: 'Booking successful', type: 'success' } }));
      onBooked && onBooked(data);
    }catch(e){ window.dispatchEvent(new CustomEvent('toast', { detail: { message: e.message || 'Booking failed', type: 'error' } })); }
    setLoading(false);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <input placeholder="Your name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
            {errors.name && <div style={{ color:'crimson', fontSize:13 }}>{errors.name}</div>}
          </div>
          <div className="col">
            <input type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
            {errors.email && <div style={{ color:'crimson', fontSize:13 }}>{errors.email}</div>}
          </div>
        </div>
        <div className="row" style={{ marginTop:8 }}>
          <div className="col">
            <label>Check-in</label>
            <input type="date" value={form.checkIn} onChange={e=>setForm({...form, checkIn:e.target.value})} />
            {errors.checkIn && <div style={{ color:'crimson', fontSize:13 }}>{errors.checkIn}</div>}
          </div>
          <div className="col">
            <label>Check-out</label>
            <input type="date" value={form.checkOut} onChange={e=>setForm({...form, checkOut:e.target.value})} />
            {errors.checkOut && <div style={{ color:'crimson', fontSize:13 }}>{errors.checkOut}</div>}
          </div>
        </div>
        <div style={{ marginTop:8 }}>
          <label>Guests</label>
          <input type="number" min="1" value={form.guests} onChange={e=>setForm({...form, guests:Number(e.target.value)})} style={{ width:80, marginLeft:8 }} />
          {errors.guests && <div style={{ color:'crimson', fontSize:13 }}>{errors.guests}</div>}
        </div>
        <div className="form-actions">
          <button className="btn" type="submit" disabled={loading}>{loading ? 'Booking...' : 'Book Now'}</button>
        </div>
      </form>
    </div>
  );
}
