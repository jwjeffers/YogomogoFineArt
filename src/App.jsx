import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import DevAdmin from './pages/DevAdmin';
import Lightbox from './components/Lightbox';
import './App.css';

function App() {
  const isDevUrl = window.location.search.includes('dev');
  const [route, setRoute] = useState(isDevUrl ? 'dev' : 'gallery');
  const [activeLightbox, setActiveLightbox] = useState(null);
  const [activeBlogId, setActiveBlogId] = useState(null);

  const handleArtworkClick = (artwork) => {
    setActiveLightbox(artwork);
    if (route !== 'gallery' && route !== 'home') setRoute('gallery');
  };

  return (
    <div className="split-layout">
      {route !== 'dev' && <Sidebar currentRoute={route} setRoute={setRoute} handleArtworkClick={handleArtworkClick} />}
      
      <main className="main-panel">
        <Navbar currentRoute={route} setRoute={setRoute} />
        
        {(route === 'home' || route === 'gallery') && <Gallery onArtworkDoubleClick={handleArtworkClick} />}
        {route === 'about' && <About />}
        {route === 'blog' && <Blog setRoute={setRoute} setActiveBlogId={setActiveBlogId} />}
        {route === 'blogpost' && <BlogPost blogId={activeBlogId} onBack={() => { setRoute('blog'); setActiveBlogId(null); }} />}
        {route === 'dev' && <DevAdmin />}
      </main>

      {activeLightbox && <Lightbox artwork={activeLightbox} onClose={() => setActiveLightbox(null)} />}
    </div>
  );
}

export default App;
