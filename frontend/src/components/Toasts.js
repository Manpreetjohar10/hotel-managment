import React, { useEffect, useState } from 'react';

export default function Toasts(){
  const [items, setItems] = useState([]);

  useEffect(()=>{
    function handler(e){
      const t = { id: Date.now() + Math.random(), ...e.detail };
      setItems(s=>[t, ...s]);
      setTimeout(()=> setItems(s=>s.filter(x=>x.id!==t.id)), 4000);
    }
    window.addEventListener('toast', handler);
    return ()=> window.removeEventListener('toast', handler);
  },[]);

  if(!items.length) return null;
  return (
    <div style={{ position:'fixed', right:18, top:18, zIndex:10000, display:'flex', flexDirection:'column', gap:8 }}>
      {items.map(i=> (
        <div key={i.id} style={{ background: i.type==='error' ? '#fdecea' : '#e8f5e9', padding:10, borderRadius:6, boxShadow:'0 6px 18px rgba(0,0,0,0.08)' }}>
          <strong style={{ display:'block' }}>{i.title || (i.type==='error' ? 'Error' : 'Notice')}</strong>
          <div style={{ fontSize:13 }}>{i.message}</div>
        </div>
      ))}
    </div>
  );
}
