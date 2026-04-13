import React from 'react';
import ArtCard from '../components/ArtCard';
import p1 from '../assets/painting1.png';
import p2 from '../assets/painting2.png';

export default function Home({ setRoute, onArtworkDoubleClick }) {
  return (
    <div className="page animate-fade-in">
      <header className="hero container" style={{ paddingTop: '8rem', paddingBottom: '4rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Modern Art & Comfort</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto 2rem' }}>
          Discover fine art that brings warmth, elegance, and life to any space. Explore realism, abstract, and fantasy oil paintings.
        </p>
        <button onClick={() => setRoute('gallery')} style={{ padding: '0.8rem 2rem', background: 'var(--color-text-main)', color: '#fff', borderRadius: '30px', fontSize: '1rem' }}>
          View Gallery
        </button>
      </header>

      <section className="featured container" style={{ background: '#fff', padding: '4rem 2rem', borderRadius: 'var(--radius-md)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2rem' }}>Featured Works</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <ArtCard 
            img={p1} 
            title="Geometry in Warmth" 
            medium="Oil on Canvas" 
            onDoubleClick={() => onArtworkDoubleClick({ img: p1, title: "Geometry in Warmth", medium: "Oil on Canvas" })} 
          />
          <ArtCard 
            img={p2} 
            title="Abstract Terracotta" 
            medium="Oil on Panel" 
            onDoubleClick={() => onArtworkDoubleClick({ img: p2, title: "Abstract Terracotta", medium: "Oil on Panel" })} 
          />
        </div>
      </section>
    </div>
  );
}
