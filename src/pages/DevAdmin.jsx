import React, { useState, useEffect } from 'react';

export default function DevAdmin() {
  const [data, setData] = useState({ artworks: [], blogs: [] });
  const [isLocal, setIsLocal] = useState(true);
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);

  const [activeTab, setActiveTab] = useState('artworks');
  const [editingArtwork, setEditingArtwork] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);
  
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

  const handleSaveArtwork = async (e) => {
    e.preventDefault();
    const form = e.target;
    let imgUrl = form.imgText.value;
    if (form.imgFile.files[0]) {
      imgUrl = await uploadImage(form.imgFile.files[0]);
    }
    const newArt = {
      id: editingArtwork ? editingArtwork.id : Date.now().toString(),
      title: form.title.value,
      medium: form.medium.value,
      description: form.description.value,
      date: form.date.value,
      img: imgUrl
    };
    
    let newArtworks = [...data.artworks];
    if (editingArtwork) {
      const idx = newArtworks.findIndex(a => a.id === editingArtwork.id);
      if (idx !== -1) newArtworks[idx] = newArt;
    } else {
      newArtworks.push(newArt);
    }
    
    await saveData({ ...data, artworks: newArtworks });
    setEditingArtwork(null);
    form.reset();
  };

  const handleDeleteArtwork = async (id) => {
    if (!window.confirm("Delete this artwork?")) return;
    await saveData({ ...data, artworks: data.artworks.filter(a => a.id !== id) });
    if (editingArtwork && editingArtwork.id === id) setEditingArtwork(null);
  };

  const handleSaveBlog = async (e) => {
    e.preventDefault();
    const form = e.target;
    let coverUrl = form.coverText.value;
    if (form.coverFile.files[0]) {
      coverUrl = await uploadImage(form.coverFile.files[0]);
    }
    const newBlog = {
      id: editingBlog ? editingBlog.id : Date.now().toString(),
      title: form.title.value,
      date: form.date.value || new Date().toISOString().split('T')[0],
      excerpt: form.excerpt.value,
      content: form.content.value,
      cover: coverUrl
    };
    
    let newBlogs = [...data.blogs];
    if (editingBlog) {
      const idx = newBlogs.findIndex(b => b.id === editingBlog.id);
      if (idx !== -1) newBlogs[idx] = newBlog;
    } else {
      newBlogs.push(newBlog);
    }
    
    await saveData({ ...data, blogs: newBlogs });
    setEditingBlog(null);
    form.reset();
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    await saveData({ ...data, blogs: data.blogs.filter(b => b.id !== id) });
    if (editingBlog && editingBlog.id === id) setEditingBlog(null);
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
        <button onClick={() => {setActiveTab('artworks'); setEditingArtwork(null);}} style={{ padding: '0.5rem 1rem', background: activeTab==='artworks'?'#000':'#eee', color: activeTab==='artworks'?'#fff':'#000', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Manage Artworks</button>
        <button onClick={() => {setActiveTab('blogs'); setEditingBlog(null);}} style={{ padding: '0.5rem 1rem', background: activeTab==='blogs'?'#000':'#eee', color: activeTab==='blogs'?'#fff':'#000', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Manage Journal</button>
      </div>

      {activeTab === 'artworks' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <h3>Current Artworks</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              {(data.artworks || []).map(a => (
                <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f9f9f9', borderRadius: '8px', border: editingArtwork?.id === a.id ? '2px solid black' : 'none' }}>
                  <span>{a.title} {a.date && <span style={{color: 'gray', fontSize:'0.8em'}}>({a.date})</span>}</span>
                  <div>
                    <button onClick={() => setEditingArtwork(a)} style={{ color: 'blue', border: 'none', background: 'none', cursor: 'pointer', marginRight: '1rem' }}>Edit</button>
                    <button onClick={() => handleDeleteArtwork(a.id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3>{editingArtwork ? 'Edit Artwork' : 'Add New Artwork'}</h3>
            {editingArtwork && <button onClick={() => setEditingArtwork(null)} style={{ marginBottom: '1rem', color: 'gray', border: 'none', background: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Cancel Edit / Add New</button>}
            
            <form key={editingArtwork ? editingArtwork.id : 'new'} onSubmit={handleSaveArtwork} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              <input name="title" defaultValue={editingArtwork?.title || ''} placeholder="Title" required style={{ padding: '0.5rem' }} />
              <input name="medium" defaultValue={editingArtwork?.medium || ''} placeholder="Medium (e.g., Oil on Canvas)" required style={{ padding: '0.5rem' }} />
              <input name="date" type="date" defaultValue={editingArtwork?.date || ''} placeholder="Completed Date" style={{ padding: '0.5rem' }} />
              <textarea name="description" defaultValue={editingArtwork?.description || ''} placeholder="Description..." style={{ padding: '0.5rem', minHeight: '100px' }}></textarea>
              <div>
                <label>Upload Image:</label><br/>
                <input type="file" name="imgFile" accept="image/*" />
              </div>
              <div>
                <label>OR Existing Image URL:</label><br/>
                <input name="imgText" defaultValue={editingArtwork?.img || ''} placeholder="/uploads/..." style={{ padding: '0.5rem', width: '100%' }} />
              </div>
              <button type="submit" style={{ padding: '0.5rem', background: '#000', color: '#fff', border: 'none', cursor: 'pointer' }}>
                {editingArtwork ? 'Save Artwork' : 'Add Artwork'}
              </button>
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
                <div key={b.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f9f9f9', borderRadius: '8px', border: editingBlog?.id === b.id ? '2px solid black' : 'none' }}>
                  <span>{b.title}</span>
                  <div>
                    <button onClick={() => setEditingBlog(b)} style={{ color: 'blue', border: 'none', background: 'none', cursor: 'pointer', marginRight: '1rem' }}>Edit</button>
                    <button onClick={() => handleDeleteBlog(b.id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3>{editingBlog ? 'Edit Post' : 'Add New Post'}</h3>
            {editingBlog && <button onClick={() => setEditingBlog(null)} style={{ marginBottom: '1rem', color: 'gray', border: 'none', background: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Cancel Edit / Add New</button>}

            <form key={editingBlog ? editingBlog.id : 'new'} onSubmit={handleSaveBlog} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              <input name="title" defaultValue={editingBlog?.title || ''} placeholder="Post Title" required style={{ padding: '0.5rem' }} />
              <input name="date" type="date" defaultValue={editingBlog?.date || ''} required style={{ padding: '0.5rem' }} />
              <textarea name="excerpt" defaultValue={editingBlog?.excerpt || ''} placeholder="Short excerpt summary..." required style={{ padding: '0.5rem' }}></textarea>
              <textarea name="content" defaultValue={editingBlog?.content || ''} placeholder="Full blog content..." required style={{ padding: '0.5rem', minHeight: '150px' }}></textarea>
              <div>
                <label>Upload Cover Image:</label><br/>
                <input type="file" name="coverFile" accept="image/*" />
              </div>
              <div><label>OR Existing Cover URL:</label><br/><input name="coverText" defaultValue={editingBlog?.cover || ''} placeholder="/uploads/..." style={{ padding: '0.5rem', width: '100%' }} /></div>
              <button type="submit" style={{ padding: '0.5rem', background: '#000', color: '#fff', border: 'none', cursor: 'pointer' }}>
                {editingBlog ? 'Save Post' : 'Add Post'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
