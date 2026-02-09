import React, { useState } from 'react';
import { setAuthToken } from '../api';

export default function LoginModal({ onClose, onAuth }){
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email:'', password:'' });
  const [loading, setLoading] = useState(false);

  async function submit(e){
    e.preventDefault();
    setLoading(true);
    try{
      const path = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
      const payload = {
        name: form.name?.trim(),
        email: form.email?.trim().toLowerCase(),
        password: form.password
      };
      if (mode === 'login') delete payload.name;
      const res = await fetch(path, { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json();
      if(!res.ok) throw data;
      setAuthToken(data.token);
      window.dispatchEvent(new CustomEvent('auth-login', { detail: { token: data.token } }));
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
            {mode === 'register' && (
              <div style={{ display:'flex', gap:8, marginBottom:8 }}>
                <label className="sr-only" htmlFor="login-name">Name</label>
                <input
                  id="login-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Full name"
                  value={form.name}
                  onChange={e=>setForm({...form, name:e.target.value})}
                  required
                />
              </div>
            )}
            <div style={{ display:'flex', gap:8, marginBottom:8 }}>
              <label className="sr-only" htmlFor="login-email">Email</label>
              <input
                id="login-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email"
                value={form.email}
                onChange={e=>setForm({...form, email:e.target.value})}
              />
              <label className="sr-only" htmlFor="login-password">Password</label>
              <input
                id="login-password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Password"
                value={form.password}
                onChange={e=>setForm({...form, password:e.target.value})}
              />
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
