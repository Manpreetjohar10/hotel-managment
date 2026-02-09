// Simple fetch wrapper that sends Authorization header and handles 401 globally
export async function fetchWithAuth(url, opts = {}){
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const headers = Object.assign({}, opts.headers || {});
  if(token) headers['Authorization'] = `Bearer ${token}`;
  const isFormData = typeof FormData !== 'undefined' && opts.body instanceof FormData;
  if(!isFormData){
    headers['Content-Type'] = headers['Content-Type'] || 'application/json';
  }
  const res = await fetch(url, Object.assign({}, opts, { headers }));
  if(res.status === 401){
    // auto logout
    localStorage.removeItem('token');
    window.dispatchEvent(new CustomEvent('toast', { detail: { message: 'Session expired - logged out', type: 'error' } }));
    window.dispatchEvent(new CustomEvent('auth-logout'));
    return res;
  }
  return res;
}

export function setAuthToken(token){
  if(token) localStorage.setItem('token', token);
  else localStorage.removeItem('token');
}
