import React, { useState, useEffect } from 'react';

export default function Lightbox({ artwork, onClose }) {
  const [isInquiring, setIsInquiring] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!artwork) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    formData.append("access_key", "536f80c7-53a5-4de6-85ee-1e10020074e3");
    formData.append("subject", `New Inquiry: ${artwork.title}`);
    formData.append("from_name", "Jackson Jeffers Studio Contact Form");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setIsSuccess(true);
      } else {
        alert("Something went wrong communicating with the mail server. Please try again.");
      }
    } catch (err) {
      alert("Network error. Please try again later.");
    }
    setIsSubmitting(false);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, width: '100vw', height: '100vh',
      backgroundColor: 'rgba(26, 26, 26, 0.98)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }} onClick={onClose}>
      
      <button 
        onClick={onClose}
        style={{ position: 'absolute', top: '2.5rem', right: '3.5rem', color: '#fff', fontSize: '1rem', fontWeight: '500', letterSpacing: '0.05em', cursor: 'pointer', background: 'none', border: 'none' }}
      >
        CLOSE
      </button>

      <div 
        className="lightbox-content-wrapper" style={{ display: 'flex', maxWidth: '1400px', width: '100%', height: '80vh', gap: '4rem', flexDirection: 'row' }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <img src={artwork.img} alt={artwork.title} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
        </div>
        
        <div style={{ flex: 1, color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {isSuccess ? (
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '2rem', fontWeight: '400', marginBottom: '1rem' }}>Sent Successfully.</h3>
              <p style={{ color: '#aaa', lineHeight: '1.6' }}>Thank you for your interest.<br/>Jackson Jeffers Studio will be in touch shortly.</p>
              <button 
                onClick={onClose}
                style={{ marginTop: '2rem', padding: '1rem 2rem', background: '#fff', color: '#000', border: 'none', cursor: 'pointer', fontWeight: '600' }}
              >
                RETURN TO ONLINE GALLERY
              </button>
            </div>
          ) : isInquiring ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '400', marginBottom: '1rem', borderBottom: '1px solid #333', paddingBottom: '1rem' }}>
                Inquire about {artwork.title}
              </h3>
              
              <input type="checkbox" name="botcheck" style={{ display: 'none' }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <label style={{ fontSize: '0.8rem', color: '#aaa' }}>Your Email</label>
                <input type="email" name="email" required style={{ background: 'transparent', border: '1px solid #555', color: '#fff', padding: '0.8rem', outline: 'none' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <label style={{ fontSize: '0.8rem', color: '#aaa' }}>Phone Number (Optional)</label>
                <input type="tel" name="phone" style={{ background: 'transparent', border: '1px solid #555', color: '#fff', padding: '0.8rem', outline: 'none' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <label style={{ fontSize: '0.8rem', color: '#aaa' }}>Message</label>
                <textarea name="message" required defaultValue={`I am writing to inquire about purchasing "${artwork.title}"...`} style={{ background: 'transparent', border: '1px solid #555', color: '#fff', padding: '0.8rem', minHeight: '120px', outline: 'none', resize: 'vertical' }}></textarea>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  style={{ flex: 1, padding: '1rem', background: '#fff', color: '#000', border: 'none', cursor: isSubmitting ? 'not-allowed' : 'pointer', fontWeight: '600' }}
                >
                  {isSubmitting ? 'SENDING...' : 'SEND INQUIRY'}
                </button>
                <button 
                  type="button" 
                  onClick={() => setIsInquiring(false)}
                  style={{ flex: 1, padding: '1rem', background: 'transparent', color: '#fff', border: '1px solid #555', cursor: 'pointer' }}
                >
                  CANCEL
                </button>
              </div>
            </form>
          ) : (
             <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '600', fontFamily: 'var(--font-sans)', letterSpacing: '-0.02em', margin: 0 }}>
                  {artwork.title.toUpperCase()}
                </h2>
              </div>
              <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '2rem' }}>
                {artwork.medium} {artwork.date && `? ${artwork.date}`}
              </p>
              <p style={{ lineHeight: '1.6', fontSize: '0.95rem', marginBottom: '3rem', whiteSpace: 'pre-wrap' }}>
                {artwork.description || "No description provided."}
              </p>
              
              {artwork.available && (
                <button 
                  onClick={() => setIsInquiring(true)}
                  style={{
                    width: 'fit-content',
                    padding: '1rem 2rem',
                    border: '1px solid #fff',
                    color: '#fff',
                    background: 'transparent',
                    fontSize: '0.8rem',
                    letterSpacing: '0.1em',
                    cursor: 'pointer',
                    transition: 'background 0.2s, color 0.2s'
                  }}
                  onMouseOver={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000'; }}
                  onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fff'; }}
                >
                  INQUIRE TO PURCHASE
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
