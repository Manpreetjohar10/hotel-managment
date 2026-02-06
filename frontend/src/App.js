import React from 'react';
import HotelList from './components/HotelList';
import AdminPanel from './components/AdminPanel';

export default function App() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: 20 }}>
      <h1>MERN Hotel</h1>
      <HotelList />
      <hr />
      <AdminPanel />
    </div>
  );
}
