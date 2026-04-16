import React from 'react';

export default function Navbar({ currentRoute, setRoute }) {
  return (
    <nav className="top-navbar">
      <ul className="top-navbar-list">
        <li className={`nav-item ${currentRoute === 'home' || currentRoute === 'gallery' ? 'active' : ''}`} onClick={() => setRoute('gallery')}>PROJECTS</li>
        <li className={`nav-item ${currentRoute === 'blog' ? 'active' : ''}`} onClick={() => setRoute('blog')}>STUDIO NOTES</li>
        <li className={`nav-item ${currentRoute === 'about' ? 'active' : ''}`} onClick={() => setRoute('about')}>ABOUT</li>
        <li className="nav-item"><a href="https://www.instagram.com/jacksonjeffersart/" target="_blank" rel="noreferrer" style={{color: 'inherit', textDecoration: 'none'}}>INSTAGRAM</a></li>
      </ul>
    </nav>
  );
}
