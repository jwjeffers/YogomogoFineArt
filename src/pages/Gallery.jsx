import React, { useState, useEffect } from 'react';

export default function Gallery({ onArtworkDoubleClick }) {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    fetch('/api/data')
      .then(r => r.ok ? r.json() : fetch('/data.json').then(r => r.json()))
      .then(data => setArtworks(data.artworks || []))
      .catch(e => console.error(e));
  }, []);

  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '4rem', paddingRight: '2rem' }}>
      <div className="masonry-grid">
        {artworks.map(art => (
          <img 
            key={art.id} 
            src={art.img} 
            alt={art.title} 
            onDoubleClick={() => onArtworkDoubleClick(art)}
            style={{ 
              width: '100%', 
              marginBottom: '1rem', 
              breakInside: 'avoid', 
              cursor: 'pointer',
              display: 'block'
            }} 
          />
        ))}
      </div>
    </div>
  );
}
