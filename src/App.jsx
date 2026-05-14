import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import DevAdmin from './pages/DevAdmin';
import Links from './pages/Links';
import Lightbox from './components/Lightbox';
import './App.css';

function App() {
  const initPath = decodeURIComponent(window.location.pathname.replace(/^\/+/, ''));
  const isDevUrl = window.location.search.includes('dev');
  
  let initialRoute = 'gallery';
  if (isDevUrl) initialRoute = 'dev';
  else if (initPath === 'links') initialRoute = 'links';
  else if (initPath === 'about') initialRoute = 'about';
  else if (initPath === 'blog') initialRoute = 'blog';
  else if (initPath === 'dev') initialRoute = 'dev';

  const [route, setRoute] = useState(initialRoute);
  const [activeLightbox, setActiveLightbox] = useState(null);
  const [activeBlogId, setActiveBlogId] = useState(null);
  const [data, setData] = useState({ blogs: [], artworks: [] });
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    fetch('/data.json?t=' + Date.now())
      .then(r => r.json())
      .then(d => {
        const newData = { blogs: d.blogs || [], artworks: d.artworks || [] };
        setData(newData);
        setDataLoaded(true);
        
        if (initPath && !['links', 'about', 'blog', 'dev'].includes(initPath)) {
          const blog = newData.blogs.find(b => b.title.replace(/\s+/g, '_') === initPath);
          if (blog) {
            setRoute('blogpost');
            setActiveBlogId(blog.id);
            return;
          }
          const artwork = newData.artworks.find(a => a.title.replace(/\s+/g, '_') === initPath);
          if (artwork) {
            setRoute('gallery');
            setActiveLightbox(artwork);
            return;
          }
        }
      })
      .catch(e => console.error(e));
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const path = decodeURIComponent(window.location.pathname.replace(/^\/+/, ''));
      if (path === 'links') {
        setRoute('links'); setActiveLightbox(null); setActiveBlogId(null);
      } else if (path === 'about') {
        setRoute('about'); setActiveLightbox(null); setActiveBlogId(null);
      } else if (path === 'blog') {
        setRoute('blog'); setActiveLightbox(null); setActiveBlogId(null);
      } else if (path === 'dev' || window.location.search.includes('dev')) {
        setRoute('dev'); setActiveLightbox(null); setActiveBlogId(null);
      } else if (path) {
        const blog = data.blogs.find(b => b.title.replace(/\s+/g, '_') === path);
        if (blog) {
          setRoute('blogpost'); setActiveBlogId(blog.id); setActiveLightbox(null);
          return;
        }
        const artwork = data.artworks.find(a => a.title.replace(/\s+/g, '_') === path);
        if (artwork) {
          setRoute('gallery'); setActiveLightbox(artwork); setActiveBlogId(null);
          return;
        }
        setRoute('gallery'); setActiveLightbox(null); setActiveBlogId(null);
      } else {
        setRoute('gallery'); setActiveLightbox(null); setActiveBlogId(null);
      }
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [data]);

  useEffect(() => {
    if (!dataLoaded) return;
    
    let newPath = '/';
    if (activeLightbox) {
      newPath = `/${activeLightbox.title.replace(/\s+/g, '_')}`;
    } else if (route === 'blogpost' && activeBlogId) {
      const blog = data.blogs.find(b => b.id === activeBlogId);
      if (blog) newPath = `/${blog.title.replace(/\s+/g, '_')}`;
    } else if (route === 'dev' || route === 'links' || route === 'about' || route === 'blog') {
      newPath = `/${route}`;
    }

    const currentPath = decodeURIComponent(window.location.pathname);
    if (currentPath !== newPath) {
      window.history.pushState({}, '', encodeURI(newPath));
    }
  }, [route, activeLightbox, activeBlogId, dataLoaded, data]);

  const handleArtworkClick = (artwork) => {
    setActiveLightbox(artwork);
    if (route !== 'gallery' && route !== 'home') setRoute('gallery');
  };

  if (route === 'links') {
    return <Links />;
  }

  if (!dataLoaded && initPath && !['links', 'about', 'blog', 'dev'].includes(initPath)) {
    return null; 
  }

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
