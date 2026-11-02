import React, { useState, useEffect } from 'react';

const getColumnCount = () => {
  if (typeof window === 'undefined') return 3;
  if (window.innerWidth <= 650) return 1;
  if (window.innerWidth <= 1150) return 2;
  return 3;
};

export default function BlogPost({ blogId, onBack }) {
  const [blog, setBlog] = useState(null);
  const [expandedImage, setExpandedImage] = useState(null);
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
        const found = (data.blogs || []).find(b => b.id === blogId);
        setBlog(found);
      })
      .catch(e => console.error(e));
  }, [blogId]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setExpandedImage(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const renderTextWithLinks = (text) => {
    if (!text) return null;
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, i) => {
      if (part.match(/^https?:\/\//)) {
        return <a key={i} href={part} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline', fontWeight: 'bold' }}>{part}</a>;
      }
      return part;
    });
  };

  if (!blog) return null;

  const hasExtraImages = blog.images && blog.images.length > 0;
  const allImages = [
    ...(blog.cover ? [blog.cover] : []),
    ...(blog.images || [])
  ];

  const columns = Array.from({ length: numCols }, () => []);
  const colHeights = Array.from({ length: numCols }, () => 0);

  if (hasExtraImages) {
    // Place the text block at the top of the first column, then distribute all images into the shortest column
    columns[0].push({ type: 'text' });
    colHeights[0] += 0.9;

    allImages.forEach((imgUrl, idx) => {
      let shortestCol = 0;
      for (let c = 1; c < numCols; c++) {
        if (colHeights[c] < colHeights[shortestCol]) {
          shortestCol = c;
        }
      }
      const ratio = ratios[imgUrl] || 1.15;
      columns[shortestCol].push({ type: 'image', url: imgUrl, index: idx });
      colHeights[shortestCol] += ratio + 0.08;
    });
  }

  return (
    <div className="page animate-fade-in" style={{ paddingTop: '8rem', paddingBottom: '4rem', paddingLeft: '2rem', paddingRight: '2rem' }}>
      
      <button onClick={onBack} style={{ marginBottom: '2.5rem', background: 'transparent', color: 'var(--color-text-main)', border: '1px solid var(--color-border)', padding: '0.5rem 1rem', borderRadius: '20px', cursor: 'pointer' }}>
        &larr; Back to Studio Notes
      </button>

      {hasExtraImages ? (
        <div
          className="stacked-masonry-grid"
          style={{ gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))` }}
        >
          {columns.map((colItems, colIdx) => (
            <div key={colIdx} className="stacked-masonry-column">
              {colItems.map((item, itemIdx) => {
                if (item.type === 'text') {
                  return (
                    <div key="text-block" style={{ paddingBottom: '0.5rem' }}>
                      <h1 style={{ fontSize: '3.2rem', marginBottom: '0.75rem', lineHeight: '1.1' }}>{blog.title}</h1>
                      <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.75rem', fontWeight: '500' }}>{blog.date}</p>
                      <div style={{ lineHeight: '1.8', fontSize: '1.05rem', whiteSpace: 'pre-wrap', color: '#333' }}>
                        {renderTextWithLinks(blog.content)}
                      </div>
                    </div>
                  );
                }

                return (
                  <img
                    key={`${item.index}-${item.url}`}
                    src={item.url}
                    alt={`${blog.title} ${item.index}`}
                    onClick={() => setExpandedImage(item.url)}
                    onLoad={(e) => {
                      const { naturalWidth, naturalHeight } = e.currentTarget;
                      if (naturalWidth > 0 && naturalHeight > 0) {
                        const measured = naturalHeight / naturalWidth;
                        setRatios(prev => (prev[item.url] === measured ? prev : { ...prev, [item.url]: measured }));
                      }
                    }}
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      cursor: 'pointer'
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      ) : (
        /* Single Note Layout */
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {blog.cover && (
            <img 
              src={blog.cover} 
              alt={blog.title} 
              onClick={() => setExpandedImage(blog.cover)}
              style={{ width: '100%', maxHeight: '500px', objectFit: 'contain', marginBottom: '3rem', cursor: 'pointer' }} 
            />
          )}
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{blog.title}</h1>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '3rem' }}>{blog.date}</p>
          
          <div style={{ lineHeight: '1.8', fontSize: '1.1rem', whiteSpace: 'pre-wrap' }}>
            {renderTextWithLinks(blog.content)}
          </div>
        </div>
      )}

      {/* Expanded Lightbox View */}
      {expandedImage && (
        <div 
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            backgroundColor: 'rgba(26, 26, 26, 0.98)', zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem'
          }}
          onClick={() => setExpandedImage(null)}
        >
          <button 
            onClick={() => setExpandedImage(null)}
            style={{ position: 'absolute', top: '2.5rem', right: '3.5rem', color: '#fff', fontSize: '1rem', fontWeight: '500', letterSpacing: '0.05em', cursor: 'pointer', background: 'none', border: 'none' }}
          >
            CLOSE
          </button>
          <img src={expandedImage} alt="Expanded view" style={{ maxHeight: '90vh', maxWidth: '90vw', objectFit: 'contain' }} onClick={e => e.stopPropagation()} />
        </div>
      )}
      
    </div>
  );
}
