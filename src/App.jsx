import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Gallery from './pages/Gallery';
import About from './pages/About';
import ArtworkPage from './pages/ArtworkPage';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import DevAdmin from './pages/DevAdmin';
import './App.css';

function App() {
  const isDevUrl = window.location.search.includes('dev');
  const [route, setRoute] = useState(isDevUrl ? 'dev' : 'gallery');
  const [activeArtwork, setActiveArtwork] = useState(null);
  const [activeBlogId, setActiveBlogId] = useState(null);

  const handleArtworkClick = (artwork) => {
    setActiveArtwork(artwork);
    setRoute('artwork');
  };

  return (
    <div className="split-layout">
      {route !== 'dev' && <Sidebar currentRoute={route} setRoute={setRoute} handleArtworkClick={handleArtworkClick} />}
      
      <main className="main-panel">
        <Navbar currentRoute={route} setRoute={setRoute} />
        
        {(route === 'home' || route === 'gallery') && <Gallery onArtworkDoubleClick={handleArtworkClick} />}
        {route === 'about' && <About />}
        {route === 'artwork' && <ArtworkPage artwork={activeArtwork} onBack={() => { setRoute('gallery'); setActiveArtwork(null); }} />}
        {route === 'blog' && <Blog setRoute={setRoute} setActiveBlogId={setActiveBlogId} />}
        {route === 'blogpost' && <BlogPost blogId={activeBlogId} onBack={() => { setRoute('blog'); setActiveBlogId(null); }} />}
        {route === 'dev' && <DevAdmin />}
      </main>
    </div>
  );
}

export default App;
