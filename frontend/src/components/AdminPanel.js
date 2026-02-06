import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminPanel(){
  const [hotels, setHotels] = useState([]);

  useEffect(()=>{
    async function load(){
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/admin/hotels', { headers: { Authorization: `Bearer ${token}` } });
      setHotels(res.data);
    }
    load().catch(console.error);
  },[]);

  return (
    <div>
      <h2>Admin Panel</h2>
      <ul>
        {hotels.map(h=> <li key={h._id}>{h.name} — {h.city}</li>)}
      </ul>
    </div>
  );
}
