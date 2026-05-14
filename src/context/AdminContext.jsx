import { createContext, useContext, useState, useEffect } from 'react';
import { destinations as seedDestinations, blogPosts as seedBlogPosts } from '../data/touristicData';

const AdminContext = createContext(null);

// ── Asset imports for seeds ────────────────────────────────────────────────
import peoplespark      from '../assets/peoplespark.jpg';
import alinsyawanfalls  from '../assets/alinsyawanfalls.jpg';
import punodviewdeck    from '../assets/punodviewdeck.jpg';
import guiobcave        from '../assets/guiobcave.jpg';
import sancarloscathedral from '../assets/sancarloscathedral.jpg';
import magoonfalls      from '../assets/magoonfalls.jpg';
import lapuscave        from '../assets/lapuscave.jpg';
import codcodriceterraces from '../assets/codcodriceterraces.jpg';
import heroImg          from '../assets/Image1.jpg';

const seedGallery = [
  { id: 1, title: 'Peoples Park',         url: peoplespark },
  { id: 2, title: 'Alinsyawan Falls',     url: alinsyawanfalls },
  { id: 3, title: 'Punod View Deck',      url: punodviewdeck },
  { id: 4, title: 'Gui-ob Cave',          url: guiobcave },
  { id: 5, title: 'San Carlos Cathedral', url: sancarloscathedral },
  { id: 6, title: 'Magon-On Falls',       url: magoonfalls },
  { id: 7, title: 'Lapus Cave',           url: lapuscave },
  { id: 8, title: 'CodCod Rice Terraces', url: codcodriceterraces },
];

const seedPageBgs = {
  home:         { label: 'Home Hero',           image: heroImg },
  destinations: { label: 'Destinations Header', image: '' },
  blog:         { label: 'Blog Header',         image: '' },
  about:        { label: 'About Header',        image: '' },
  contact:      { label: 'Contact Header',      image: '' },
};

// ── IndexedDB helpers ──────────────────────────────────────────────────────
const DB_NAME    = 'TurismoAdminDB';
const DB_VERSION = 1;
const STORE      = 'keyval';

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => e.target.result.createObjectStore(STORE);
    req.onsuccess  = (e) => resolve(e.target.result);
    req.onerror    = (e) => reject(e.target.error);
  });
}

async function dbGet(key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx  = db.transaction(STORE, 'readonly');
    const req = tx.objectStore(STORE).get(key);
    req.onsuccess = (e) => resolve(e.target.result ?? null);
    req.onerror   = (e) => reject(e.target.error);
  });
}

async function dbSet(key, value) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx  = db.transaction(STORE, 'readwrite');
    const req = tx.objectStore(STORE).put(value, key);
    req.onsuccess = () => resolve();
    req.onerror   = (e) => reject(e.target.error);
  });
}

// ── Provider ───────────────────────────────────────────────────────────────
export function AdminProvider({ children }) {
  const [destinations, setDestinations] = useState(seedDestinations.map((d) => ({ ...d })));
  const [blogPosts,    setBlogPosts]    = useState(seedBlogPosts);
  const [gallery,      setGallery]      = useState(seedGallery);
  const [pageBgs,      setPageBgs]      = useState(seedPageBgs);
  const [ready,        setReady]        = useState(false);

  // Load all data from IndexedDB on mount
  useEffect(() => {
    async function loadAll() {
      try {
        const [d, b, g, p] = await Promise.all([
          dbGet('destinations'),
          dbGet('blogPosts'),
          dbGet('gallery'),
          dbGet('pageBgs'),
        ]);
        if (d) setDestinations(d);
        if (b) setBlogPosts(b);
        if (g) setGallery(g);
        if (p) {
          // Merge with seed so new pages added in code still appear
          setPageBgs({ ...seedPageBgs, ...p });
        }
      } catch (err) {
        console.warn('IndexedDB load failed, using seeds:', err);
      } finally {
        setReady(true);
      }
    }
    loadAll();
  }, []);

  // Persist whenever state changes (skip before initial load)
  useEffect(() => { if (ready) dbSet('destinations', destinations).catch(console.warn); }, [destinations, ready]);
  useEffect(() => { if (ready) dbSet('blogPosts',    blogPosts).catch(console.warn);    }, [blogPosts,    ready]);
  useEffect(() => { if (ready) dbSet('gallery',      gallery).catch(console.warn);      }, [gallery,      ready]);
  useEffect(() => { if (ready) dbSet('pageBgs',      pageBgs).catch(console.warn);      }, [pageBgs,      ready]);

  // ── Destinations CRUD ────────────────────────────────────────────────────
  function addDestination(item)        { setDestinations((p) => [...p, { ...item, id: Date.now() }]); }
  function updateDestination(id, item) { setDestinations((p) => p.map((d) => d.id === id ? { ...d, ...item } : d)); }
  function deleteDestination(id)       { setDestinations((p) => p.filter((d) => d.id !== id)); }

  // ── Blog Posts CRUD ──────────────────────────────────────────────────────
  function addBlogPost(item)        { setBlogPosts((p) => [...p, { ...item, id: Date.now() }]); }
  function updateBlogPost(id, item) { setBlogPosts((p) => p.map((x) => x.id === id ? { ...x, ...item } : x)); }
  function deleteBlogPost(id)       { setBlogPosts((p) => p.filter((x) => x.id !== id)); }

  // ── Gallery CRUD ─────────────────────────────────────────────────────────
  function addGalleryItem(item)        { setGallery((p) => [...p, { ...item, id: Date.now() }]); }
  function updateGalleryItem(id, item) { setGallery((p) => p.map((g) => g.id === id ? { ...g, ...item } : g)); }
  function deleteGalleryItem(id)       { setGallery((p) => p.filter((g) => g.id !== id)); }

  // ── Page Backgrounds ─────────────────────────────────────────────────────
  function updatePageBg(pageId, image) {
    setPageBgs((p) => ({ ...p, [pageId]: { ...p[pageId], image } }));
  }
  function resetPageBg(pageId) {
    setPageBgs((p) => ({ ...p, [pageId]: { ...p[pageId], image: seedPageBgs[pageId]?.image ?? '' } }));
  }

  return (
    <AdminContext.Provider value={{
      destinations, addDestination, updateDestination, deleteDestination,
      blogPosts,    addBlogPost,    updateBlogPost,    deleteBlogPost,
      gallery,      addGalleryItem, updateGalleryItem, deleteGalleryItem,
      pageBgs,      updatePageBg,   resetPageBg,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used inside AdminProvider');
  return ctx;
}
