import React, { useState, useEffect } from 'react';

const getColumnCount = () => {
  if (typeof window === 'undefined') return 3;
  if (window.innerWidth <= 650) return 1;
  if (window.innerWidth <= 1150) return 2;
  return 3;
};

export default function Blog({ setRoute, setActiveBlogId }) {
  const [blogs, setBlogs] = useState([]);
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
      .then(data => setBlogs(data.blogs || []))
      .catch(e => console.error(e));
  }, []);

  const columns = Array.from({ length: numCols }, () => []);
  const colHeights = Array.from({ length: numCols }, () => 0);

  blogs.forEach((blog) => {
    let shortestCol = 0;
    for (let c = 1; c < numCols; c++) {
      if (colHeights[c] < colHeights[shortestCol]) {
        shortestCol = c;
      }
    }
    const ratio = ratios[blog.id] || 1;
    columns[shortestCol].push(blog);
    colHeights[shortestCol] += ratio + 0.35;
  });

  return (
    <div className="page animate-fade-in" style={{ paddingTop: '8rem', paddingBottom: '4rem', paddingLeft: '1rem', paddingRight: '2rem' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>Studio Notes</h1>
      <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginBottom: '4rem' }}>
        Thoughts, processes, and updates.
      </p>

      {blogs.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>No posts yet.</p>
      ) : (
        <div
          className="stacked-masonry-grid"
          style={{ gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))` }}
        >
          {columns.map((colItems, colIdx) => (
            <div key={colIdx} className="stacked-masonry-column">
              {colItems.map(blog => (
                <div
                  key={blog.id}
                  onClick={() => { setActiveBlogId(blog.id); setRoute('blogpost'); }}
                  style={{
                    width: '100%',
                    cursor: 'pointer',
                    background: '#fff',
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                  }}
                >
                  {blog.cover && (
                    <img
                      src={blog.cover}
                      alt={blog.title}
                      onLoad={(e) => {
                        const { naturalWidth, naturalHeight } = e.currentTarget;
                        if (naturalWidth > 0 && naturalHeight > 0) {
                          const measured = naturalHeight / naturalWidth;
                          setRatios(prev => (prev[blog.id] === measured ? prev : { ...prev, [blog.id]: measured }));
                        }
                      }}
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  )}
                  <div style={{ padding: '1.25rem 1.5rem' }}>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '0.4rem' }}>{blog.date}</p>
                    <h3 style={{ fontSize: '1.35rem', marginBottom: '0.6rem', lineHeight: '1.25' }}>{blog.title}</h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.5' }}>{blog.excerpt}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
