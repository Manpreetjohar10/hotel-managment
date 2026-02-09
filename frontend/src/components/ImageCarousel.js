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
  const normalized = images.map((src) => {
    if (!src) return '';
    const cleaned = String(src).replace(/\\/g, '/');
    if (cleaned.startsWith('http') || cleaned.startsWith('data:')) return cleaned;
    if (cleaned.startsWith('/')) return cleaned;
    return `/${cleaned}`;
  }).filter(Boolean);
  if (!normalized.length) return null;
  const prev = () => setIdx(i => (i - 1 + normalized.length) % normalized.length);
  const next = () => setIdx(i => (i + 1) % normalized.length);

  return (
    <div className="carousel">
      <div className="carousel-main">
        <button onClick={prev} className="carousel-nav prev" aria-label="Previous image">Prev</button>
        <div className="carousel-image-wrap" onClick={()=>setFullscreen(true)}>
          <img
            src={normalized[idx]}
            alt="hotel"
            className="carousel-image"
            onError={(e) => { e.currentTarget.src = '/hotels/images/img1.jpg'; }}
          />
        </div>
        <button onClick={next} className="carousel-nav next" aria-label="Next image">Next</button>
      </div>
      <div className="carousel-dots">
        {normalized.map((im,i)=> (
          <button key={i} onClick={()=>setIdx(i)} className={`carousel-dot ${i===idx ? 'active' : ''}`} aria-label={`Go to image ${i+1}`} />
        ))}
      </div>
      <div className="carousel-thumbs">
        {normalized.map((im,i)=> (
          <button key={im} onClick={()=>setIdx(i)} className={`carousel-thumb ${i===idx ? 'active' : ''}`} aria-label={`Thumbnail ${i+1}`}>
            <img
              src={im}
              alt={`thumb ${i+1}`}
              onError={(e) => { e.currentTarget.src = '/hotels/images/img1.jpg'; }}
            />
          </button>
        ))}
      </div>

      {fullscreen && (
        <div className="modal-backdrop" onMouseDown={()=>setFullscreen(false)}>
          <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center' }} onMouseDown={e=>e.stopPropagation()}>
            <div style={{ maxWidth:'95%', maxHeight:'95%' }}>
              <img src={normalized[idx]} alt="fullscreen" style={{ width:'100%', height:'auto', objectFit:'contain', borderRadius:6 }} />
              <div style={{ display:'flex', justifyContent:'center', gap:8, marginTop:8 }}>
                <button className="btn ghost" onClick={()=>setIdx(i => (i - 1 + normalized.length) % normalized.length)}>Prev</button>
                <button className="btn" onClick={()=>setFullscreen(false)}>Close</button>
                <button className="btn ghost" onClick={()=>setIdx(i => (i + 1) % normalized.length)}>Next</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
