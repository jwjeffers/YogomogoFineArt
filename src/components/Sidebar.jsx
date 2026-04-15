import React, { useState, useEffect } from 'react';

export default function Sidebar({ currentRoute, setRoute, handleArtworkClick }) {
  const [artworks, setArtworks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch('/api/data')
      .then(r => r.ok ? r.json() : fetch('/data.json').then(r => r.json()))
      .then(d => setArtworks(d.artworks || []))
      .catch(e => console.error(e));
  }, []);

  const handleNavClick = (action) => {
    action();
    setIsOpen(false);
  };

  return (
    <>
      <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
        {isOpen ? '?' : '?'}
      </button>

      <div className={sidebar-overlay } onClick={() => setIsOpen(false)}></div>

      <aside className={sidebar }>
        <h1 
          onClick={() => handleNavClick(() => setRoute('gallery'))} 
          style={{ fontSize: '1.4rem', fontWeight: '700', letterSpacing: '-0.02em', cursor: 'pointer', marginBottom: '4rem' }}
        >
          JACKSON JEFFERS STUDIO
        </h1>
        
        <div style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--color-text-main)', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>
          WORK <sup>({artworks.length})</sup>
        </div>
        
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.85rem', fontWeight: '500', color: 'var(--color-text-muted)' }}>
          {artworks.map(art => (
            <li 
              key={art.id} 
              onClick={() => handleNavClick(() => handleArtworkClick(art))}
              style={{ cursor: 'pointer', transition: 'color 0.2s', color: 'var(--color-text-muted)' }}
              onMouseOver={e => e.currentTarget.style.color = 'var(--color-hover)'}
              onMouseOut={e => e.currentTarget.style.color = 'var(--color-text-muted)'}
            >
              {art.title.toUpperCase()}
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
