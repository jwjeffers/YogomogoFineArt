import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import About from './pages/About';
import ArtworkPage from './pages/ArtworkPage';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import DevAdmin from './pages/DevAdmin';

function App() {
  const [route, setRoute] = useState('home');
  const [activeArtwork, setActiveArtwork] = useState(null);
  const [activeBlogId, setActiveBlogId] = useState(null);

  const handleArtworkDoubleClick = (artwork) => {
    setActiveArtwork(artwork);
    setRoute('artwork');
  };

  return (
    <div className="app">
      <Navbar currentRoute={route} setRoute={setRoute} />
      <main style={{ minHeight: '80vh' }}>
        {route === 'home' && <Home setRoute={setRoute} onArtworkDoubleClick={handleArtworkDoubleClick} />}
        {route === 'gallery' && <Gallery onArtworkDoubleClick={handleArtworkDoubleClick} />}
        {route === 'about' && <About />}
        {route === 'artwork' && <ArtworkPage artwork={activeArtwork} onBack={() => { setRoute('gallery'); setActiveArtwork(null); }} />}
        {route === 'blog' && <Blog setRoute={setRoute} setActiveBlogId={setActiveBlogId} />}
        {route === 'blogpost' && <BlogPost blogId={activeBlogId} onBack={() => { setRoute('blog'); setActiveBlogId(null); }} />}
        {route === 'dev' && <DevAdmin />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
