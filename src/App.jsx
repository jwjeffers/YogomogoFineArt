import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import About from './pages/About';
import ArtworkPage from './pages/ArtworkPage';

function App() {
  const [route, setRoute] = useState('home');
  const [activeArtwork, setActiveArtwork] = useState(null);

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
      </main>
      <Footer />
    </div>
  );
}

export default App;
