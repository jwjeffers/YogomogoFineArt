import React from 'react';
import './Navbar.css';

export default function Navbar({ currentRoute, setRoute }) {
  return (
    <nav className="navbar">
      <div className="logo" onClick={() => setRoute('home')}>
        Yogomogo Art
      </div>
      <ul className="nav-links">
        <li className={currentRoute === 'home' ? 'active' : ''} onClick={() => setRoute('home')}>Home</li>
        <li className={currentRoute === 'gallery' ? 'active' : ''} onClick={() => setRoute('gallery')}>Gallery</li>
        <li className={currentRoute === 'blog' ? 'active' : ''} onClick={() => setRoute('blog')}>Journal</li>
        <li className={currentRoute === 'about' ? 'active' : ''} onClick={() => setRoute('about')}>About</li>
      </ul>
    </nav>
  );
}
