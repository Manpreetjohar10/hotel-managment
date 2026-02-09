import React, { useEffect, useState } from 'react';
import decodeJwt from '../utils/decodeJwt';
import LoginModal from './LoginModal';
import { fetchWithAuth } from '../api';

export default function AdminPanel(){
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', address: '', city: '', rating: 4, price: 100 });
  const [tokenInput, setTokenInput] = useState('');
  const [token, setToken] = useState(typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  async function load(){
    setLoading(true);
    try{
      const res = await fetchWithAuth('/api/hotels');
      const data = await res.json();
      setHotels(data);
    }catch(e){ console.error(e); }
    setLoading(false);
  }

  useEffect(()=>{ load(); }, []);

  async function handleCreate(e){
    e.preventDefault();
    try{
      const res = await fetchWithAuth('/api/hotels', { method: 'POST', body: JSON.stringify(form) });
      const body = await res.json();
      if(!res.ok) throw body;
      setForm({ name: '', address: '', city: '', rating: 4, price: 100 });
      window.dispatchEvent(new CustomEvent('toast', { detail: { message: 'Hotel created', type: 'success' } }));
      load();
    }catch(err){
      console.error(err);
      const msg = (err && err.message) || 'Create failed';
      window.dispatchEvent(new CustomEvent('toast', { detail: { message: msg, type: 'error' } }));
    }
  }

  async function handleDelete(id){
    if(!confirm('Delete this hotel?')) return;
    try{
      const res = await fetchWithAuth(`/api/hotels/${id}`, { method: 'DELETE' });
      const body = await res.json();
      if(!res.ok) throw body;
      window.dispatchEvent(new CustomEvent('toast', { detail: { message: 'Hotel deleted', type: 'success' } }));
      load();
    }catch(err){
      console.error(err);
      const msg = (err && err.message) || 'Delete failed';
      window.dispatchEvent(new CustomEvent('toast', { detail: { message: msg, type: 'error' } }));
    }
  }

  function setMockToken(){
    // create a mock admin token payload (not verifiable on server) - useful for UI only
    const mock = 'eyJhbGciOiJub25lIn0.eyJpZCI6Im1vY2siLCJyb2xlIjoic3VwZXJfYWRtaW4ifQ.';
    localStorage.setItem('token', mock);
    setToken(mock);
    setIsAdmin(true);
    window.dispatchEvent(new CustomEvent('toast', { detail: { message: 'Mock token saved', type: 'success' } }));
  }

  function saveManualToken(){
    if(!tokenInput) return alert('Enter a token');
    localStorage.setItem('token', tokenInput);
    setToken(tokenInput);
    setTokenInput('');
    const p = decodeJwt(tokenInput);
    setIsAdmin(!!(p && p.role === 'super_admin'));
  }

  function clearToken(){
    localStorage.removeItem('token');
    setToken('');
    setIsAdmin(false);
  }

  useEffect(()=>{
    const t = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if(t){ const p = decodeJwt(t); setIsAdmin(!!(p && p.role === 'super_admin')); }
  },[]);

  return (
    <div>
      <h2>Admin Panel</h2>

      <div className="admin-controls">
        <div>
          <strong>Options:</strong>
          <div style={{ display: 'inline-block', marginLeft: 8 }}>
            <button className="btn ghost" onClick={setMockToken}>Option A: Mock Login</button>
            <button className="btn ghost" onClick={()=>document.getElementById('token-input')?.focus()} style={{ marginLeft: 8 }}>Option B: Enter Token</button>
            <button className="btn ghost" onClick={clearToken} style={{ marginLeft: 8 }}>Option C: Clear Token</button>
          </div>
        </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap:8 }}>
            <input id="token-input" placeholder="Paste token..." value={tokenInput} onChange={e=>setTokenInput(e.target.value)} style={{ padding:8 }} />
            <button className="btn" onClick={saveManualToken} style={{ marginLeft:8 }}>Save Token</button>
            <div className="token-status">{token ? `Token: ${token.substring(0,8)}…` : 'Not logged'}</div>
          </div>
      </div>
        <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:12 }}>
          <button className="btn" onClick={()=>setShowLogin(true)}>Sign In / Register</button>
          <button className="btn ghost" onClick={setMockToken}>Option A: Mock Login</button>
          <div style={{ marginLeft: 'auto', color:'#666' }}>{isAdmin ? 'Admin' : (token ? 'Authenticated' : 'Not logged')}</div>
        </div>

        {showLogin && <LoginModal onClose={()=>setShowLogin(false)} onAuth={(t)=>{ setToken(t); const p = decodeJwt(t); setIsAdmin(!!(p && p.role==='super_admin')); }} />}

      {isAdmin ? (
        <form onSubmit={handleCreate} style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} required />
          <input placeholder="City" value={form.city} onChange={e=>setForm({...form, city: e.target.value})} required />
          <input placeholder="Address" value={form.address} onChange={e=>setForm({...form, address: e.target.value})} />
          <input type="number" placeholder="Price" value={form.price} onChange={e=>setForm({...form, price: Number(e.target.value)})} style={{ width: 90 }} />
          <input type="number" placeholder="Rating" value={form.rating} step="0.1" onChange={e=>setForm({...form, rating: Number(e.target.value)})} style={{ width: 90 }} />
          <button type="submit">Add</button>
        </form>
      ) : (
        <div style={{ marginBottom:16, color:'#666' }}>Create hotels visible to admins only. Log in as admin to add.</div>
      )}

      {loading ? <div>Loading...</div> : (
        <ul className="admin-list">
          {hotels.map(h=> (
            <li key={h._id} style={{ marginBottom: 8 }}>
              <strong>{h.name}</strong> — {h.city}
              {isAdmin && <button onClick={()=>handleDelete(h._id)} style={{ marginLeft: 12 }}>Delete</button>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
