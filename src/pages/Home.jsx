import React, { useState, useEffect } from 'react';
import ArtCard from '../components/ArtCard';

export default function Home({ setRoute, onArtworkDoubleClick }) {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    fetch('/data.json?t=' + Date.now())
      .then(r => r.json())
      .then(data => setFeatured((data.artworks || []).slice(0, 2)))
      .catch(e => console.error(e));
  }, []);

  return (
    <div className="page animate-fade-in">
      <header className="hero container" style={{ paddingTop: '8rem', paddingBottom: '4rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Modern Art & Comfort</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto 2rem' }}>
          Discover fine art that brings warmth, elegance, and life to any space. Explore realism, abstract, and fantasy oil paintings.
        </p>
        <button onClick={() => setRoute('gallery')} style={{ padding: '0.8rem 2rem', background: 'var(--color-text-main)', color: '#fff', borderRadius: '30px', fontSize: '1rem', cursor: 'pointer', border: 'none' }}>
          View Gallery
        </button>
      </header>

      <section className="featured container" style={{ background: '#fff', padding: '4rem 2rem', borderRadius: 'var(--radius-md)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2rem' }}>Featured Works</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {featured.map(art => (
             <ArtCard 
               key={art.id}
               img={art.img} 
               title={art.title} 
               medium={art.medium} 
               onDoubleClick={() => onArtworkDoubleClick(art)} 
             />
          ))}
        </div>
      </section>
    </div>
  );
}
