import React, { useState, useEffect } from 'react';

export default function DevAdmin() {
  const [data, setData] = useState({ artworks: [], blogs: [] });
  const [isLocal, setIsLocal] = useState(true);
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);

  // Form states
  const [activeTab, setActiveTab] = useState('artworks');
  
  useEffect(() => {
    fetch('/api/data')
      .then(r => {
        if (!r.ok) throw new Error('API not available');
        return r.json();
      })
      .then(d => {
        setData(d);
        setIsLocal(true);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setIsLocal(false);
        setLoading(false);
      });
  }, []);

  const saveData = async (newData) => {
    try {
      await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData)
      });
      setData(newData);
    } catch (e) {
      alert("Error saving data");
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const { url } = await res.json();
    return url;
  };

  const handlePublish = async () => {
    if (!window.confirm("Send all changes live to Vercel? This takes about 30 seconds to reflect online.")) return;
    setPublishing(true);
    try {
      const res = await fetch('/api/publish', { method: 'POST' });
      const result = await res.json();
      if (result.success) alert("Successfully sent! Vercel is now building your site update online.");
      else alert("Failed: " + result.error);
    } catch (e) {
      alert("Error triggered during publish.");
    }
    setPublishing(false);
  };

  const handleAddArtwork = async (e) => {
    e.preventDefault();
    const form = e.target;
    let imgUrl = form.imgText.value;
    if (form.imgFile.files[0]) {
      imgUrl = await uploadImage(form.imgFile.files[0]);
    }
    const newArt = {
      id: Date.now().toString(),
      title: form.title.value,
      medium: form.medium.value,
      description: form.description.value,
      img: imgUrl
    };
    await saveData({ ...data, artworks: [...data.artworks, newArt] });
    form.reset();
  };

  const handleDeleteArtwork = async (id) => {
    if (!window.confirm("Delete this artwork?")) return;
    await saveData({ ...data, artworks: data.artworks.filter(a => a.id !== id) });
  };

  const handleAddBlog = async (e) => {
    e.preventDefault();
    const form = e.target;
    let coverUrl = form.coverText.value;
    if (form.coverFile.files[0]) {
      coverUrl = await uploadImage(form.coverFile.files[0]);
    }
    const newBlog = {
      id: Date.now().toString(),
      title: form.title.value,
      date: new Date().toISOString().split('T')[0],
      excerpt: form.excerpt.value,
      content: form.content.value,
      cover: coverUrl
    };
    await saveData({ ...data, blogs: [...data.blogs, newBlog] });
    form.reset();
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    await saveData({ ...data, blogs: data.blogs.filter(b => b.id !== id) });
  };

  if (loading) return <div className="page container" style={{paddingTop: '8rem'}}>Loading config...</div>;

  if (!isLocal) {
    return (
      <div className="page container" style={{paddingTop: '8rem', textAlign: 'center'}}>
        <h1>Dev Mode Unavailable</h1>
        <p>This mode requires the local dev-server to be running. It is safely disabled in production.</p>
      </div>
    );
  }

  return (
    <div className="page container" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem' }}>Dev Mode Dashboard</h1>
        <button 
          onClick={handlePublish} 
          disabled={publishing}
          style={{ padding: '0.8rem 2rem', background: '#000', color: '#fff', borderRadius: '30px', border: 'none', cursor: publishing ? 'not-allowed' : 'pointer', fontSize: '1rem', fontWeight: 'bold' }}
        >
          {publishing ? 'Publishing...' : 'Upload to Live Website (Vercel)'}
        </button>
      </div>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button onClick={() => setActiveTab('artworks')} style={{ padding: '0.5rem 1rem', background: activeTab==='artworks'?'#000':'#eee', color: activeTab==='artworks'?'#fff':'#000', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Manage Artworks</button>
        <button onClick={() => setActiveTab('blogs')} style={{ padding: '0.5rem 1rem', background: activeTab==='blogs'?'#000':'#eee', color: activeTab==='blogs'?'#fff':'#000', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Manage Journal</button>
      </div>

      {activeTab === 'artworks' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <h3>Current Artworks</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              {(data.artworks || []).map(a => (
                <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f9f9f9', borderRadius: '8px' }}>
                  <span>{a.title}</span>
                  <button onClick={() => handleDeleteArtwork(a.id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>Delete</button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3>Add New Artwork</h3>
            <form onSubmit={handleAddArtwork} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              <input name="title" placeholder="Title" required style={{ padding: '0.5rem' }} />
              <input name="medium" placeholder="Medium (e.g., Oil on Canvas)" required style={{ padding: '0.5rem' }} />
              <textarea name="description" placeholder="Description..." style={{ padding: '0.5rem', minHeight: '100px' }}></textarea>
              <div>
                <label>Upload Image:</label><br/>
                <input type="file" name="imgFile" accept="image/*" />
              </div>
              <div>
                <label>OR Image URL (if existing):</label><br/>
                <input name="imgText" placeholder="/uploads/..." style={{ padding: '0.5rem', width: '100%' }} />
              </div>
              <button type="submit" style={{ padding: '0.5rem', background: '#000', color: '#fff', border: 'none', cursor: 'pointer' }}>Add Artwork</button>
            </form>
          </div>
        </div>
      )}

      {activeTab === 'blogs' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <h3>Current Journal Posts</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              {(data.blogs || []).map(b => (
                <div key={b.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f9f9f9', borderRadius: '8px' }}>
                  <span>{b.title}</span>
                  <button onClick={() => handleDeleteBlog(b.id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>Delete</button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3>Add New Post</h3>
            <form onSubmit={handleAddBlog} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              <input name="title" placeholder="Post Title" required style={{ padding: '0.5rem' }} />
              <textarea name="excerpt" placeholder="Short excerpt summary..." required style={{ padding: '0.5rem' }}></textarea>
              <textarea name="content" placeholder="Full blog content..." required style={{ padding: '0.5rem', minHeight: '150px' }}></textarea>
              <div>
                <label>Upload Cover Image:</label><br/>
                <input type="file" name="coverFile" accept="image/*" />
              </div>
              <div><label>OR Existing Cover URL:</label><br/><input name="coverText" placeholder="/uploads/..." style={{ padding: '0.5rem', width: '100%' }} /></div>
              <button type="submit" style={{ padding: '0.5rem', background: '#000', color: '#fff', border: 'none', cursor: 'pointer' }}>Add Post</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
