import React from 'react';

export default function Footer() {
  return (
    <footer style={{ padding: '3rem 0', textAlign: 'center', color: 'var(--color-text-muted)', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
      <p>&copy; {new Date().getFullYear()} Yogomogo Fine Art. All Rights Reserved.</p>
    </footer>
  );
}
