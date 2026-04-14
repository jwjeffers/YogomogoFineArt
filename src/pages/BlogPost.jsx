import React, { useState, useEffect } from 'react';

export default function BlogPost({ blogId, onBack }) {
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch('/data.json')
      .then(r => r.json())
      .then(data => {
        const found = (data.blogs || []).find(b => b.id === blogId);
        setBlog(found);
      })
      .catch(e => console.error(e));
  }, [blogId]);

  if (!blog) return null;

  const hasExtraImages = blog.images && blog.images.length > 0;

  return (
    <div className="page animate-fade-in" style={{ paddingTop: '8rem', paddingBottom: '4rem', paddingLeft: '4rem', paddingRight: '4rem' }}>
      
      <button onClick={onBack} style={{ marginBottom: '3rem', background: 'transparent', color: 'var(--color-text-main)', border: '1px solid var(--color-border)', padding: '0.5rem 1rem', borderRadius: '20px', cursor: 'pointer' }}>
        &larr; Back to Studio Notes
      </button>

      {hasExtraImages ? (
        <div style={{ display: 'flex', gap: '4rem', flexDirection: window.innerWidth < 1000 ? 'column' : 'row' }}>
          
          {/* Left Side: Text Content */}
          <div style={{ flex: 1, maxWidth: '600px' }}>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', lineHeight: '1.1' }}>{blog.title}</h1>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '3rem', fontWeight: '500' }}>{blog.date}</p>
            
            <div style={{ lineHeight: '1.8', fontSize: '1.1rem', whiteSpace: 'pre-wrap', color: '#333' }}>
              {blog.content}
            </div>
          </div>

          {/* Right Side: Masonry Gallery */}
          <div style={{ flex: 1.2 }}>
            {blog.cover && (
              <img src={blog.cover} alt="Cover" style={{ width: '100%', marginBottom: '1.5rem', display: 'block' }} />
            )}
            <div className="masonry-grid" style={{ columnCount: 2 }}>
              {blog.images.map((imgUrl, i) => (
                <img 
                  key={i} 
                  src={imgUrl} 
                  alt={`${blog.title} detail ${i}`} 
                  style={{ 
                    width: '100%', 
                    marginBottom: '1rem', 
                    breakInside: 'avoid', 
                    display: 'block' 
                  }} 
                />
              ))}
            </div>
          </div>
          
        </div>
      ) : (
        /* Original Single Column Layout */
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {blog.cover && <img src={blog.cover} alt={blog.title} style={{ width: '100%', maxHeight: '500px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', marginBottom: '3rem' }} />}
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{blog.title}</h1>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '3rem' }}>{blog.date}</p>
          
          <div style={{ lineHeight: '1.8', fontSize: '1.1rem', whiteSpace: 'pre-wrap' }}>
            {blog.content}
          </div>
        </div>
      )}
      
    </div>
  );
}
