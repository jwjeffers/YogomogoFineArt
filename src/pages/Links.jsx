import React from 'react';
import './Links.css';
import heroImage from '../assets/hero.png';

export default function Links() {
  return (
    <div className="links-page-container">
      <div className="links-profile-section">
        <img src={heroImage} alt="Jackson Jeffers" className="links-avatar" />
        <h1 className="links-title">Jackson Jeffers</h1>
        <p className="links-subtitle">Fine Art & Illustration</p>
      </div>
      <div className="links-buttons">
        <a href="/" className="link-button main-portfolio">View Portfolio</a>
        <a href="https://www.instagram.com/jacksonjeffersart/" target="_blank" rel="noreferrer" className="link-button instagram">Instagram</a>
      </div>
    </div>
  );
}
