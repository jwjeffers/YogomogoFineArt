import React, { useState, useEffect } from 'react';
import ArtCard from '../components/ArtCard';

export default function Gallery({ onArtworkDoubleClick }) {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then(r => r.json())
      .then(data => setArtworks(data.artworks || []))
      .catch(e => console.error("Could not load data.json", e));
  }, []);

  return (
    <div className="page animate-fade-in container" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>The Collection</h1>
      <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginBottom: '4rem' }}>
        A curated selection of still lifes, abstract pieces, and realism.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '3rem' }}>
        {artworks.map(art => (
          <ArtCard 
            key={art.id} 
            img={art.img} 
            title={art.title} 
            medium={art.medium} 
            onDoubleClick={() => onArtworkDoubleClick(art)} 
          />
        ))}
      </div>
    </div>
  );
}
