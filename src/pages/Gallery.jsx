import React, { useState, useEffect } from 'react';

const getSortTime = (item) => {
  const raw = item.endDate || item.startDate || (item.date ? item.date.split(' to ').pop() : '');
  const t = Date.parse(raw);
  return Number.isNaN(t) ? 0 : t;
};

const getColumnCount = () => {
  if (typeof window === 'undefined') return 3;
  if (window.innerWidth <= 650) return 1;
  if (window.innerWidth <= 1150) return 2;
  return 3;
};

export default function Gallery({ onArtworkDoubleClick }) {
  const [artworks, setArtworks] = useState([]);
  const [ratios, setRatios] = useState({});
  const [numCols, setNumCols] = useState(getColumnCount);

  useEffect(() => {
    const handleResize = () => setNumCols(getColumnCount());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetch('/data.json?t=' + Date.now())
      .then(r => r.json())
      .then(data => {
        const sorted = [...(data.artworks || [])].sort((a, b) => getSortTime(b) - getSortTime(a));
        setArtworks(sorted);
      })
      .catch(e => console.error(e));
  }, []);

  // Distribute artworks into the shortest column so pieces stack tightly like blairatherholtart.com/works
  const columns = Array.from({ length: numCols }, () => []);
  const colHeights = Array.from({ length: numCols }, () => 0);

  artworks.forEach((art) => {
    let shortestCol = 0;
    for (let c = 1; c < numCols; c++) {
      if (colHeights[c] < colHeights[shortestCol]) {
        shortestCol = c;
      }
    }
    const w = parseFloat(art.width);
    const h = parseFloat(art.height);
    const ratio = ratios[art.id] || (w > 0 && h > 0 ? h / w : 1.2);
    columns[shortestCol].push(art);
    colHeights[shortestCol] += ratio + 0.08;
  });

  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '4rem', paddingLeft: '1rem', paddingRight: '2rem' }}>
      <div
        className="stacked-masonry-grid"
        style={{ gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))` }}
      >
        {columns.map((colItems, colIdx) => (
          <div key={colIdx} className="stacked-masonry-column">
            {colItems.map(art => (
              <div
                key={art.id}
                className="artwork-card"
                onDoubleClick={() => onArtworkDoubleClick(art)}
              >
                <img
                  src={art.img}
                  alt={art.title}
                  onLoad={(e) => {
                    const { naturalWidth, naturalHeight } = e.currentTarget;
                    if (naturalWidth > 0 && naturalHeight > 0) {
                      const measured = naturalHeight / naturalWidth;
                      setRatios(prev => (prev[art.id] === measured ? prev : { ...prev, [art.id]: measured }));
                    }
                  }}
                />

                <div className="artwork-hover-overlay">
                  <span style={{ fontSize: '1.4rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '0.4rem', lineHeight: '1.2' }}>
                    {art.title}
                  </span>
                  <span style={{ fontSize: '0.9rem', textAlign: 'center', color: '#eee', letterSpacing: '0.05em' }}>
                    {art.medium} {art.width && art.height ? `— ${art.width}" x ${art.height}"` : ''}
                  </span>
                  <span style={{ fontSize: '0.8rem', textAlign: 'center', color: '#fff', marginTop: '0.5rem', fontWeight: 'bold', letterSpacing: '0.1em' }}>
                    {art.sold ? 'SOLD' : (art.available ? 'AVAILABLE' : 'ARCHIVED')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
