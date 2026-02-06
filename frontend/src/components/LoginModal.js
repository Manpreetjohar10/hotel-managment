import React, { useState } from 'react';
import { setAuthToken } from '../api';

export default function LoginModal({ onClose, onAuth }){
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ email:'', password:'' });
  const [loading, setLoading] = useState(false);

  async function submit(e){
    e.preventDefault();
    setLoading(true);
    try{
      const path = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
      const res = await fetch(path, { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if(!res.ok) throw data;
      setAuthToken(data.token);
      window.dispatchEvent(new CustomEvent('toast', { detail: { message: mode==='login' ? 'Logged in' : 'Registered', type:'success' } }));
      onAuth && onAuth(data.token);
      onClose && onClose();
    }catch(e){ window.dispatchEvent(new CustomEvent('toast', { detail: { message: e.message || 'Auth failed', type:'error' } })); }
    setLoading(false);
  }

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="modal" onMouseDown={e=>e.stopPropagation()}>
        <div className="modal-header">
          <strong>{mode === 'login' ? 'Sign In' : 'Register'}</strong>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div style={{ marginBottom:8 }}>
            <button className="btn" onClick={()=>setMode('login')} disabled={mode==='login'}>Login</button>
            <button className="btn ghost" onClick={()=>setMode('register')} style={{ marginLeft:8 }} disabled={mode==='register'}>Register</button>
          </div>
          <form onSubmit={submit}>
            <div style={{ display:'flex', gap:8, marginBottom:8 }}>
              <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
              <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
            </div>
            <div style={{ display:'flex', justifyContent:'flex-end' }}>
              <button className="btn" type="submit" disabled={loading}>{loading ? 'Please wait...' : (mode==='login' ? 'Login' : 'Register')}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
