import React, { useState } from 'react';

export default function About() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    formData.append("access_key", "536f80c7-53a5-4de6-85ee-1e10020074e3");
    formData.append("subject", "General Website Contact");
    formData.append("from_name", "Jackson Jeffers Studio");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setIsSuccess(true);
      } else {
        alert("Something went wrong communicating with the network. Please try again.");
      }
    } catch (err) {
      alert("Network error. Please try again later.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="page animate-fade-in container" style={{ paddingTop: '8rem', paddingBottom: '4rem', maxWidth: '800px' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>About the Artist</h1>
      
      <div style={{ background: '#fff', padding: '3rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--color-text-main)', fontSize: '1.5rem' }}>Artist Bio</h3>
        <p style={{ marginBottom: '2.5rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
          Jackson Jeffers is an oil painter based in Raleigh, NC. Since 2023, he has been studying under Alia El-Bermani in Raleigh, developing a practice rooted in direct observation and traditional oil technique. He is currently focused on an ongoing study of fine art still life, figurative work, and illustration.
        </p>

        <div style={{ borderTop: '1px solid #eaeaea', paddingTop: '2rem', marginBottom: '3rem' }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--color-text-main)', fontSize: '1.5rem' }}>Artist Statement</h3>
          <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
            As a still life artist, my work focuses on celebrating the qualities of objects and their depictions within oil paint. I am drawn to the weight, surface, and quiet character of familiar things, and the dialogue between a physical subject and its translation into pigment and brushwork.
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            Driven by a desire to create environments of visual peace, my paintings balance rich color palettes with nuanced lighting to invite the viewer to slow down and look closely.
          </p>
        </div>
        
        <div style={{ borderTop: '1px solid #eaeaea', paddingTop: '2rem' }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--color-text-main)', fontSize: '1.5rem' }}>Contact</h3>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
            <a href="mailto:inquiries@jjeffers-studio.com" style={{ color: 'var(--color-text-main)', textDecoration: 'underline', fontWeight: 'bold' }}>
              inquiries@jjeffers-studio.com
            </a>
          </p>

          {isSuccess ? (
            <div style={{ background: '#f9f9f9', padding: '3rem 2rem', borderRadius: '8px', textAlign: 'center', border: '1px solid #eaeaea' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '400', marginBottom: '1rem' }}>Sent Successfully.</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>Thank you. Jackson Jeffers Studio will be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: '#fdfdfd', padding: '2rem', borderRadius: '8px', border: '1px solid #eaeaea' }}>
              
              <input type="checkbox" name="botcheck" style={{ display: 'none' }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem', color: '#555', fontWeight: '600' }}>Your Email</label>
                <input type="email" name="email" required style={{ background: '#fff', border: '1px solid #ddd', color: '#000', padding: '0.8rem', outline: 'none', borderRadius: '4px' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem', color: '#555', fontWeight: '600' }}>Phone Number (Optional)</label>
                <input type="tel" name="phone" style={{ background: '#fff', border: '1px solid #ddd', color: '#000', padding: '0.8rem', outline: 'none', borderRadius: '4px' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem', color: '#555', fontWeight: '600' }}>Message</label>
                <textarea name="message" required placeholder="How can we help you?" style={{ background: '#fff', border: '1px solid #ddd', color: '#000', padding: '0.8rem', minHeight: '150px', outline: 'none', resize: 'vertical', borderRadius: '4px' }}></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                style={{ marginTop: '1rem', padding: '1.2rem', background: '#000', color: '#fff', border: 'none', cursor: isSubmitting ? 'not-allowed' : 'pointer', fontWeight: '600', borderRadius: '4px', letterSpacing: '0.05em' }}
              >
                {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
