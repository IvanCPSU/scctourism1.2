import { useState } from 'react';
import { useAdmin, ASSET_IMAGES } from '../context/AdminContext';
import '../styles/Admin.css';

// ─── Asset Picker ─────────────────────────────────────────────────────────────
// Shows a grid of all images in src/assets so the user can pick one.
function AssetPicker({ value, onChange, label = 'Image' }) {
  const [open, setOpen] = useState(false);

  const selected = ASSET_IMAGES.find((a) => a.src === value);

  return (
    <div className="form-group">
      <label>{label}</label>

      {/* Current selection preview */}
      <div className="asset-picker-trigger" onClick={() => setOpen((o) => !o)}>
        {value ? (
          <>
            <img src={value} alt="selected" className="asset-thumb-selected" />
            <span className="asset-name-selected">{selected?.name ?? 'Custom'}</span>
          </>
        ) : (
          <span className="asset-placeholder">Click to choose an image from assets…</span>
        )}
        <span className="asset-picker-arrow">{open ? '▲' : '▼'}</span>
      </div>

      {/* Grid of available assets */}
      {open && (
        <div className="asset-grid">
          {ASSET_IMAGES.map((asset) => (
            <div
              key={asset.name}
              className={`asset-grid-item ${value === asset.src ? 'selected' : ''}`}
              onClick={() => { onChange(asset.src); setOpen(false); }}
            >
              <img src={asset.src} alt={asset.name} />
              <span>{asset.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── DESTINATIONS TAB ────────────────────────────────────────────────────────
function DestinationsTab() {
  const { destinations, addDestination, updateDestination, deleteDestination } = useAdmin();
  const empty = { name: '', location: '', description: '', image: '', activities: '', openingHours: '', rating: '', lat: '', lng: '' };
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  function set(field, val) { setForm((f) => ({ ...f, [field]: val })); }

  function openAdd() { setForm(empty); setEditId(null); setShowForm(true); }
  function openEdit(d) {
    setForm({ ...d, activities: Array.isArray(d.activities) ? d.activities.join(', ') : d.activities });
    setEditId(d.id);
    setShowForm(true);
  }
  function cancel() { setShowForm(false); setEditId(null); }

  function submit(e) {
    e.preventDefault();
    const payload = {
      ...form,
      rating: parseFloat(form.rating) || 0,
      lat: parseFloat(form.lat) || null,
      lng: parseFloat(form.lng) || null,
      activities: form.activities.split(',').map((a) => a.trim()).filter(Boolean),
    };
    if (editId) updateDestination(editId, payload);
    else addDestination(payload);
    setShowForm(false);
    setEditId(null);
  }

  return (
    <div className="tab-content">
      <div className="tab-toolbar">
        <h2>Destinations <span className="count-badge">{destinations.length}</span></h2>
        <button className="btn-add" onClick={openAdd}>+ Add Destination</button>
      </div>

      {showForm && (
        <form className="admin-form" onSubmit={submit}>
          <h3>{editId ? 'Edit Destination' : 'New Destination'}</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Name *</label>
              <input required value={form.name} onChange={(e) => set('name', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Location *</label>
              <input required value={form.location} onChange={(e) => set('location', e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label>Description *</label>
            <textarea required rows={3} value={form.description} onChange={(e) => set('description', e.target.value)} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Activities (comma-separated)</label>
              <input value={form.activities} onChange={(e) => set('activities', e.target.value)} placeholder="Hiking, Swimming, Photography" />
            </div>
            <div className="form-group">
              <label>Opening Hours</label>
              <input value={form.openingHours} onChange={(e) => set('openingHours', e.target.value)} placeholder="8:00 AM - 5:00 PM" />
            </div>
            <div className="form-group form-group-sm">
              <label>Rating (0–5)</label>
              <input type="number" min="0" max="5" step="0.1" value={form.rating} onChange={(e) => set('rating', e.target.value)} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Latitude</label>
              <input type="number" step="any" placeholder="e.g. 10.4928" value={form.lat} onChange={(e) => set('lat', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Longitude</label>
              <input type="number" step="any" placeholder="e.g. 123.4142" value={form.lng} onChange={(e) => set('lng', e.target.value)} />
            </div>
            <div className="form-group form-group-sm" style={{ justifyContent: 'flex-end' }}>
              <a href="https://www.latlong.net/" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: '0.78rem', color: '#2a9d8f', marginTop: 'auto', paddingBottom: '0.5rem' }}>
                🌐 Find coordinates
              </a>
            </div>
          </div>
          <AssetPicker value={form.image} onChange={(v) => set('image', v)} />
          <div className="form-actions">
            <button type="submit" className="btn-save">{editId ? 'Save Changes' : 'Add Destination'}</button>
            <button type="button" className="btn-cancel" onClick={cancel}>Cancel</button>
          </div>
        </form>
      )}

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr><th>Image</th><th>Name</th><th>Location</th><th>Coordinates</th><th>Rating</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {destinations.map((d) => (
              <tr key={d.id}>
                <td><img src={d.image} alt={d.name} className="table-thumb" /></td>
                <td>{d.name}</td>
                <td>{d.location}</td>
                <td style={{ fontSize: '0.78rem', color: '#888' }}>
                  {d.lat && d.lng ? `${parseFloat(d.lat).toFixed(4)}, ${parseFloat(d.lng).toFixed(4)}` : '—'}
                </td>
                <td>⭐ {d.rating}</td>
                <td className="action-cell">
                  <button className="btn-edit" onClick={() => openEdit(d)}>Edit</button>
                  <button className="btn-delete" onClick={() => { if (confirm(`Delete "${d.name}"?`)) deleteDestination(d.id); }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── BLOG POSTS TAB ──────────────────────────────────────────────────────────
function BlogTab() {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost } = useAdmin();
  const empty = { title: '', author: '', date: '', category: '', excerpt: '', content: '', image: '', featured: false };
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  function set(field, val) { setForm((f) => ({ ...f, [field]: val })); }
  function openAdd() { setForm(empty); setEditId(null); setShowForm(true); }
  function openEdit(p) { setForm(p); setEditId(p.id); setShowForm(true); }
  function cancel() { setShowForm(false); setEditId(null); }

  function submit(e) {
    e.preventDefault();
    if (editId) updateBlogPost(editId, form);
    else addBlogPost(form);
    setShowForm(false);
    setEditId(null);
  }

  return (
    <div className="tab-content">
      <div className="tab-toolbar">
        <h2>Articles <span className="count-badge">{blogPosts.length}</span></h2>
        <button className="btn-add" onClick={openAdd}>+ Add Article</button>
      </div>

      {showForm && (
        <form className="admin-form" onSubmit={submit}>
          <h3>{editId ? 'Edit Article' : 'New Article'}</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Title *</label>
              <input required value={form.title} onChange={(e) => set('title', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Author *</label>
              <input required value={form.author} onChange={(e) => set('author', e.target.value)} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Date</label>
              <input type="date" value={form.date} onChange={(e) => set('date', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Category</label>
              <input value={form.category} onChange={(e) => set('category', e.target.value)} placeholder="Travel Guide, Adventure…" />
            </div>
            <div className="form-group form-group-sm featured-check">
              <label>
                <input type="checkbox" checked={form.featured} onChange={(e) => set('featured', e.target.checked)} />
                &nbsp;Featured
              </label>
            </div>
          </div>
          <div className="form-group">
            <label>Excerpt</label>
            <textarea rows={2} value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Content *</label>
            <textarea required rows={5} value={form.content} onChange={(e) => set('content', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Image URL (external link)</label>
            <input
              type="text"
              placeholder="https://example.com/image.jpg"
              value={form.image}
              onChange={(e) => set('image', e.target.value)}
            />
            {form.image && <img src={form.image} alt="preview" className="image-preview" />}
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-save">{editId ? 'Save Changes' : 'Add Article'}</button>
            <button type="button" className="btn-cancel" onClick={cancel}>Cancel</button>
          </div>
        </form>
      )}

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr><th>Image</th><th>Title</th><th>Author</th><th>Category</th><th>Featured</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {blogPosts.map((p) => (
              <tr key={p.id}>
                <td><img src={p.image} alt={p.title} className="table-thumb" /></td>
                <td>{p.title}</td>
                <td>{p.author}</td>
                <td>{p.category}</td>
                <td>{p.featured ? '✅' : '—'}</td>
                <td className="action-cell">
                  <button className="btn-edit" onClick={() => openEdit(p)}>Edit</button>
                  <button className="btn-delete" onClick={() => { if (confirm(`Delete "${p.title}"?`)) deleteBlogPost(p.id); }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── GALLERY TAB ─────────────────────────────────────────────────────────────
function GalleryTab() {
  const { gallery, addGalleryItem, updateGalleryItem, deleteGalleryItem } = useAdmin();
  const empty = { title: '', url: '' };
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  function set(field, val) { setForm((f) => ({ ...f, [field]: val })); }
  function openAdd() { setForm(empty); setEditId(null); setShowForm(true); }
  function openEdit(g) { setForm(g); setEditId(g.id); setShowForm(true); }
  function cancel() { setShowForm(false); setEditId(null); }

  function submit(e) {
    e.preventDefault();
    if (editId) updateGalleryItem(editId, form);
    else addGalleryItem(form);
    setShowForm(false);
    setEditId(null);
  }

  return (
    <div className="tab-content">
      <div className="tab-toolbar">
        <h2>Gallery <span className="count-badge">{gallery.length}</span></h2>
        <button className="btn-add" onClick={openAdd}>+ Add Photo</button>
      </div>

      {showForm && (
        <form className="admin-form" onSubmit={submit}>
          <h3>{editId ? 'Edit Photo' : 'New Photo'}</h3>
          <div className="form-group">
            <label>Title *</label>
            <input required value={form.title} onChange={(e) => set('title', e.target.value)} />
          </div>
          <AssetPicker value={form.url} onChange={(v) => set('url', v)} label="Photo" />
          <div className="form-actions">
            <button type="submit" className="btn-save">{editId ? 'Save Changes' : 'Add Photo'}</button>
            <button type="button" className="btn-cancel" onClick={cancel}>Cancel</button>
          </div>
        </form>
      )}

      <div className="gallery-admin-grid">
        {gallery.map((g) => (
          <div key={g.id} className="gallery-admin-card">
            <img src={g.url} alt={g.title} />
            <div className="gallery-admin-info">
              <span>{g.title}</span>
              <div className="action-cell">
                <button className="btn-edit" onClick={() => openEdit(g)}>Edit</button>
                <button className="btn-delete" onClick={() => { if (confirm(`Delete "${g.title}"?`)) deleteGalleryItem(g.id); }}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PAGE BACKGROUNDS TAB ────────────────────────────────────────────────────
function PageBgsTab() {
  const { pageBgs, updatePageBg, resetPageBg } = useAdmin();

  return (
    <div className="tab-content">
      <div className="tab-toolbar">
        <h2>Page Backgrounds</h2>
      </div>
      <p style={{ color: '#666', marginTop: '-0.5rem' }}>
        Choose an image from <code>src/assets</code> for each page header. Add new images to that folder and re-run the dev server to see them here.
      </p>

      <div className="pagebg-grid">
        {Object.entries(pageBgs).map(([pageId, { label, image }]) => (
          <div key={pageId} className="pagebg-card">
            <div
              className="pagebg-preview"
              style={{
                backgroundImage: image
                  ? `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)), url(${image})`
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <span className="pagebg-label">{label}</span>
            </div>
            <div className="pagebg-controls">
              <AssetPicker value={image} onChange={(v) => updatePageBg(pageId, v)} label="Background Image" />
              <div className="pagebg-actions">
                <button className="btn-cancel" onClick={() => resetPageBg(pageId)}>Reset to default</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN ADMIN PAGE ─────────────────────────────────────────────────────────
const TABS = ['Destinations', 'Articles', 'Gallery', 'Page Backgrounds'];

function Admin() {
  const [activeTab, setActiveTab] = useState('Destinations');

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>⚙️ Admin Dashboard</h1>
        <p>Manage destinations, articles, gallery, and page backgrounds — all images come from <code>src/assets/</code></p>
      </div>

      <div className="admin-tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`admin-tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="admin-body">
        {activeTab === 'Destinations'     && <DestinationsTab />}
        {activeTab === 'Articles'         && <BlogTab />}
        {activeTab === 'Gallery'          && <GalleryTab />}
        {activeTab === 'Page Backgrounds' && <PageBgsTab />}
      </div>
    </div>
  );
}

export default Admin;
