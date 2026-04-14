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

  return (
    <div className="page animate-fade-in container" style={{ paddingTop: '8rem', paddingBottom: '4rem', maxWidth: '800px', margin: '0 auto' }}>
      <button onClick={onBack} style={{ marginBottom: '2rem', background: 'transparent', color: 'var(--color-text-main)', border: '1px solid var(--color-border)', padding: '0.5rem 1rem', borderRadius: '20px', cursor: 'pointer' }}>
        &larr; Back to Journal
      </button>
      
      {blog.cover && <img src={blog.cover} alt={blog.title} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '2rem' }} />}
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{blog.title}</h1>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '3rem' }}>{blog.date}</p>
      
      <div style={{ lineHeight: '1.8', fontSize: '1.1rem', whiteSpace: 'pre-wrap' }}>
        {blog.content}
      </div>
    </div>
  );
}
