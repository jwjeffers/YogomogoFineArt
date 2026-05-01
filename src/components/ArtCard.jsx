import React from 'react';
import './ArtCard.css';

export default function ArtCard({ img, title, medium, onDoubleClick }) {
  return (
    <div className="art-card" onDoubleClick={onDoubleClick}>
      <div className="img-wrapper">
        <img src={img} alt={title} />
      </div>
      <div className="art-info">
        <h3>{title}</h3>
        <p>{medium}</p>
      </div>
    </div>
  );
}
