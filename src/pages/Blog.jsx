import React, { useState, useEffect } from 'react';

export default function Blog({ setRoute, setActiveBlogId }) {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then(r => r.json())
      .then(data => setBlogs(data.blogs || []))
      .catch(e => console.error(e));
  }, []);

  return (
    <div className="page animate-fade-in container" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>Studio Notes</h1>
      <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginBottom: '4rem' }}>
        Thoughts, processes, and updates.
      </p>

      {blogs.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>No posts yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', maxWidth: '800px', margin: '0 auto' }}>
          {blogs.map(blog => (
            <div key={blog.id} style={{ display: 'flex', gap: '2rem', cursor: 'pointer', background: '#fff', padding: '1.5rem', borderRadius: 'var(--radius-md)', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }} onClick={() => { setActiveBlogId(blog.id); setRoute('blogpost'); }}>
              {blog.cover && <img src={blog.cover} alt={blog.title} style={{ width: '200px', height: '150px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />}
              <div>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{blog.date}</p>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{blog.title}</h3>
                <p style={{ color: 'var(--color-text-muted)' }}>{blog.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

