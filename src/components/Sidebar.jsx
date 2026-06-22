import React, { useState, useEffect } from 'react';

export default function Sidebar({ setRoute, handleArtworkClick }) {
  const [artworks, setArtworks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredArt, setHoveredArt] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetch('/data.json?t=' + Date.now())
      .then(r => r.json())
      .then(d => setArtworks(d.artworks || []))
      .catch(e => console.error(e));
  }, []);

  const handleNavClick = (action) => {
    action();
    setIsOpen(false);
  };

  // Calculate tooltip position with safe boundaries
  const offset = 15;
  let leftPos = mousePos.x + offset;
  let topPos = mousePos.y + offset;

  if (typeof window !== 'undefined') {
    if (leftPos + 180 > window.innerWidth) {
      leftPos = mousePos.x - 180 - offset;
    }
    if (topPos + 180 > window.innerHeight) {
      topPos = mousePos.y - 180 - offset;
    }
  }

  return (
    <>
      <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
        {isOpen ? '?' : '?'}
      </button>

      <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(false)}></div>

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
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
              onMouseOver={e => {
                e.currentTarget.style.color = 'var(--color-hover)';
                setHoveredArt(art);
              }}
              onMouseMove={e => {
                setMousePos({ x: e.clientX, y: e.clientY });
              }}
              onMouseOut={e => {
                e.currentTarget.style.color = 'var(--color-text-muted)';
                setHoveredArt(null);
              }}
            >
              {art.title.toUpperCase()}
              <span style={{ color: '#bbb', marginLeft: '0.5rem', fontSize: '0.7rem', fontWeight: 'normal' }}>
                {art.sold ? 'SOLD' : (art.available ? 'AVAILABLE' : 'ARCHIVED')}
              </span>
            </li>
          ))}
        </ul>
      </aside>

      {hoveredArt && hoveredArt.img && (
        <div 
          className="sidebar-preview-tooltip"
          style={{
            left: `${leftPos}px`,
            top: `${topPos}px`,
          }}
        >
          <img 
            src={hoveredArt.img} 
            alt={hoveredArt.title} 
            className="sidebar-preview-image"
          />
        </div>
      )}
    </>
  );
}
