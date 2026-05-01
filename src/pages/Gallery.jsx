import React, { useState, useEffect } from 'react';

export default function Gallery({ onArtworkDoubleClick }) {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    fetch('/data.json?t=' + Date.now())
      .then(r => r.json())
      .then(data => {
        const sorted = (data.artworks || []).sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
        setArtworks(sorted);
      })
      .catch(e => console.error(e));
  }, []);

  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '4rem', paddingRight: '2rem' }}>
      <div className="packing-gallery-grid">
        {artworks.map(art => (
          <div 
            key={art.id} 
            className="artwork-card" 
            onDoubleClick={() => onArtworkDoubleClick(art)}
            style={{ 
              gridColumnEnd: art.width ? `span ${Math.round(art.width)}` : 'span 10',
              gridRowEnd: art.height ? `span ${Math.round(art.height)}` : 'span 10'
            }}
          >
            <img src={art.img} alt={art.title} />
            
            <div className="artwork-hover-overlay">
              <span style={{ fontSize: '1.4rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '0.4rem', lineHeight: '1.2' }}>{art.title}</span>
              <span style={{ fontSize: '0.9rem', textAlign: 'center', color: '#ccc', letterSpacing: '0.05em' }}>
                {art.medium} {art.width && art.height ? `— ${art.width}" x ${art.height}"` : ''}
              </span>
              <span style={{ fontSize: '0.8rem', textAlign: 'center', color: '#fff', marginTop: '0.5rem', fontWeight: 'bold', letterSpacing: '0.1em' }}>
                {art.sold ? 'SOLD' : (art.available ? 'AVAILABLE' : 'ARCHIVED')}
              </span>
            </div>


          </div>
        ))}
      </div>
    </div>
  );
}
