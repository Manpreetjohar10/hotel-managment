import React, { useEffect, useState } from 'react';

export default function ImageCarousel({ images = [] }){
  const [idx, setIdx] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  useEffect(()=>{
    function onKey(e){
      if(!fullscreen) return;
      if(e.key === 'ArrowLeft') setIdx(i => (i - 1 + images.length) % images.length);
      if(e.key === 'ArrowRight') setIdx(i => (i + 1) % images.length);
      if(e.key === 'Escape') setFullscreen(false);
    }
    window.addEventListener('keydown', onKey);
    return ()=> window.removeEventListener('keydown', onKey);
  },[fullscreen, images.length]);

  if(!images || images.length === 0) return null;
  const prev = () => setIdx(i => (i - 1 + images.length) % images.length);
  const next = () => setIdx(i => (i + 1) % images.length);

  return (
    <div>
      <div style={{ display:'flex', gap:12, alignItems:'center' }}>
        <button onClick={prev} className="btn ghost">◀</button>
        <img src={images[idx]} alt="hotel" style={{ width: '100%', maxHeight: 360, objectFit: 'cover', borderRadius:8, cursor:'zoom-in' }} onClick={()=>setFullscreen(true)} />
        <button onClick={next} className="btn ghost">▶</button>
      </div>
      <div style={{ display:'flex', gap:6, justifyContent:'center', marginTop:8 }}>
        {images.map((im,i)=> (
          <button key={i} onClick={()=>setIdx(i)} style={{ width:10, height:10, borderRadius:10, border:'none', background: i===idx ? '#0b5fff' : '#ddd', cursor:'pointer' }} aria-label={`Go to image ${i+1}`} />
        ))}
      </div>

      {fullscreen && (
        <div className="modal-backdrop" onMouseDown={()=>setFullscreen(false)}>
          <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center' }} onMouseDown={e=>e.stopPropagation()}>
            <div style={{ maxWidth:'95%', maxHeight:'95%' }}>
              <img src={images[idx]} alt="fullscreen" style={{ width:'100%', height:'auto', objectFit:'contain', borderRadius:6 }} />
              <div style={{ display:'flex', justifyContent:'center', gap:8, marginTop:8 }}>
                <button className="btn ghost" onClick={()=>setIdx(i => (i - 1 + images.length) % images.length)}>Prev</button>
                <button className="btn" onClick={()=>setFullscreen(false)}>Close</button>
                <button className="btn ghost" onClick={()=>setIdx(i => (i + 1) % images.length)}>Next</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
