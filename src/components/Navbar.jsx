import React from 'react';
import './Navbar.css';

export default function Navbar({ currentRoute, setRoute }) {
  const routes = [ { id: 'home', label: 'Home' }, { id: 'gallery', label: 'Gallery' }, { id: 'about', label: 'About' } ];
  return (
    <nav className="navbar glass">
      <div className="container nav-container">
        <div className="logo" onClick={() => setRoute('home')}>Yogomogo Fine Art</div>
        <ul className="nav-links">
          {routes.map(r => (
            <li key={r.id}>
              <button className={`nav-link ${currentRoute === r.id ? 'active' : ''}`} onClick={() => setRoute(r.id)}>
                {r.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}