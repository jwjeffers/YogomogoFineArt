import React from 'react';

export default function Navbar({ currentRoute, setRoute }) {
  return (
    <nav style={{ position: 'absolute', top: '3rem', right: '3rem', zIndex: 10 }}>
      <ul style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', fontWeight: '500', letterSpacing: '0.05em', alignItems: 'center' }}>
        <li style={{ cursor: 'pointer', color: currentRoute === 'home' || currentRoute === 'gallery' ? 'var(--color-text-main)' : 'var(--color-text-muted)' }} onClick={() => setRoute('gallery')}>PROJECTS</li>
        <li style={{ cursor: 'pointer', color: currentRoute === 'blog' ? 'var(--color-text-main)' : 'var(--color-text-muted)' }} onClick={() => setRoute('blog')}>STUDIO NOTES</li>
        <li style={{ cursor: 'pointer', color: currentRoute === 'about' ? 'var(--color-text-main)' : 'var(--color-text-muted)' }} onClick={() => setRoute('about')}>ABOUT</li>
        <li style={{ cursor: 'pointer', color: 'var(--color-text-muted)' }}><a href="https://www.instagram.com/jacksonjeffersart/" target="_blank" rel="noreferrer" style={{color: 'inherit', textDecoration: 'none'}}>INSTAGRAM</a></li>
      </ul>
    </nav>
  );
}
