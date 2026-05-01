import React from 'react';

export default function ArtworkPage({ artwork, onBack }) {
  if (!artwork) return null;
  return (
    <div className="page animate-fade-in container" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
      <button 
        onClick={onBack} 
        style={{ 
          marginBottom: '2rem', 
          background: 'transparent', 
          color: 'var(--color-text-main)', 
          border: '1px solid var(--color-border)', 
          padding: '0.5rem 1rem', 
          borderRadius: '20px', 
          cursor: 'pointer' 
        }}
      >
        &larr; Back
      </button>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'start' }}>
        <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          <img src={artwork.img} alt={artwork.title} style={{ width: '100%', display: 'block' }} />
        </div>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{artwork.title}</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', marginBottom: '2rem' }}>{artwork.medium}</p>
          <div style={{ background: '#fff', padding: '2rem', borderRadius: 'var(--radius-md)', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>About this piece</h3>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
              A beautiful piece of fine art showcasing delicate textures and masterful lighting. This classic composition brings an elegant presence to any space.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
