import React, { useEffect } from 'react';

export default function Lightbox({ artwork, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!artwork) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, width: '100vw', height: '100vh',
      backgroundColor: 'rgba(26, 26, 26, 0.98)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }} onClick={onClose}>
      
      <button 
        onClick={onClose}
        style={{ position: 'absolute', top: '2.5rem', right: '3.5rem', color: '#fff', fontSize: '1rem', fontWeight: '500', letterSpacing: '0.05em', cursor: 'pointer', background: 'none', border: 'none' }}
      >
        CLOSE
      </button>

      <div 
        style={{ display: 'flex', maxWidth: '1400px', width: '100%', height: '80vh', gap: '4rem', flexDirection: window.innerWidth < 800 ? 'column' : 'row' }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <img src={artwork.img} alt={artwork.title} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
        </div>
        
        <div style={{ flex: 1, color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '600', fontFamily: 'var(--font-sans)', letterSpacing: '-0.02em', margin: 0 }}>
              {artwork.title.toUpperCase()}
            </h2>
          </div>
          <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '2rem' }}>
            {artwork.medium} {artwork.date && `? ${artwork.date}`}
          </p>
          <p style={{ lineHeight: '1.6', fontSize: '0.95rem', marginBottom: '3rem', whiteSpace: 'pre-wrap' }}>
            {artwork.description || "No description provided."}
          </p>
          
          {artwork.available && (
            <button 
              onClick={() => window.location.href = `mailto:inquiries@jjeffers-studio.com?subject=Inquiry: ${artwork.title}`}
              style={{
                width: 'fit-content',
                padding: '1rem 2rem',
                border: '1px solid #fff',
                color: '#fff',
                background: 'transparent',
                fontSize: '0.8rem',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                transition: 'background 0.2s, color 0.2s'
              }}
              onMouseOver={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fff'; }}
            >
              INQUIRE TO PURCHASE
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
