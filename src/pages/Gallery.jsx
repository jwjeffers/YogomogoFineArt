import React, { useState, useEffect } from 'react';

export default function Gallery({ onArtworkDoubleClick }) {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    fetch('/api/data')
      .then(r => r.ok ? r.json() : fetch('/data.json').then(r => r.json()))
      .then(data => {
        const sorted = (data.artworks || []).sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
        setArtworks(sorted);
      })
      .catch(e => console.error(e));
  }, []);

  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '4rem', paddingRight: '2rem' }}>
      <div className="masonry-grid">
        {artworks.map(art => (
          <div key={art.id} className="artwork-card" onDoubleClick={() => onArtworkDoubleClick(art)}>
            <img src={art.img} alt={art.title} />
            
            <div className="artwork-hover-overlay">
              <span style={{ fontSize: '1.4rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '0.4rem', lineHeight: '1.2' }}>{art.title}</span>
              <span style={{ fontSize: '0.9rem', textAlign: 'center', color: '#ccc', letterSpacing: '0.05em' }}>{art.medium}</span>
            </div>

            {art.sold && (
              <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', color: '#fff', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '0.1em', background: 'transparent' }}>
                SOLD
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
