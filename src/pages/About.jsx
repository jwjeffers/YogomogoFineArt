import React from 'react';

export default function About() {
  return (
    <div className="page animate-fade-in container" style={{ paddingTop: '8rem', paddingBottom: '4rem', maxWidth: '800px' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>About the Artist</h1>
      
      <div style={{ background: '#fff', padding: '3rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--color-text-main)' }}>Jackson Jeffers</h3>
        <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
          I am an oil painter inspired by the comfort of modern life and the intrigue of classical realism. My work dances between vivid still lifes and abstract explorations of warm, inviting colors.
        </p>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '3rem' }}>
          Through my art, I aim to create pieces that not only capture the eye but provide a sense of peace and modern comfort to any environment they inhabit.
        </p>
        
        <div style={{ borderTop: '1px solid #eaeaea', paddingTop: '2rem' }}>
          <h3 style={{ marginBottom: '0.5rem', color: 'var(--color-text-main)' }}>Contact</h3>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            For all commissions, gallery representation, and artwork inquiries, the best way to reach the studio is directly at:{' '}
            <a href="mailto:inquiries@jjeffers-studio.com" style={{ color: 'var(--color-text-main)', textDecoration: 'underline', fontWeight: 'bold' }}>
              inquiries@jjeffers-studio.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
