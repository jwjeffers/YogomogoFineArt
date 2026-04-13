import React from 'react';
import ArtCard from '../components/ArtCard';
import p1 from '../assets/painting1.png';
import p2 from '../assets/painting2.png';
import p3 from '../assets/painting3.png';

export default function Gallery({ onArtworkDoubleClick }) {
  const artworks = [
    { id: 1, img: p1, title: "Geometry in Warmth", medium: "Oil on Canvas, 24x36" },
    { id: 2, img: p2, title: "Abstract Terracotta", medium: "Oil on Panel, 18x24" },
    { id: 3, img: p3, title: "Minimalist Vase", medium: "Oil on Canvas, 30x40" }
  ];

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
