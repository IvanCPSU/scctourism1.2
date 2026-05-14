import { createContext, useContext, useState } from 'react';
import { destinations as seedDestinations, blogPosts as seedBlogPosts } from '../data/touristicData';

// ── All available images from src/assets ──────────────────────────────────
import img_alinsyawanfalls   from '../assets/alinsyawanfalls.jpg';
import img_codcodriceterraces from '../assets/codcodriceterraces.jpg';
import img_guiobcave         from '../assets/guiobcave.jpg';
import img_hero              from '../assets/hero.png';
import img_Image1            from '../assets/Image1.jpg';
import img_lapuscave         from '../assets/lapuscave.jpg';
import img_magoonfalls       from '../assets/magoonfalls.jpg';
import img_mayanapeak        from '../assets/mayanapeak.jpg';
import img_peoplespark       from '../assets/peoplespark.jpg';
import img_punodviewdeck     from '../assets/punodviewdeck.jpg';
import img_sancarloscathedral from '../assets/sancarloscathedral.jpg';
import img_scclogo1          from '../assets/scclogo1.png';
import img_sipawayisland     from '../assets/sipawayisland.jpg';
import img_Tourismlogo       from '../assets/Tourismlogo1.1.png';

// Exported so Admin can show a picker
export const ASSET_IMAGES = [
  { name: 'alinsyawanfalls.jpg',    src: img_alinsyawanfalls },
  { name: 'codcodriceterraces.jpg', src: img_codcodriceterraces },
  { name: 'guiobcave.jpg',          src: img_guiobcave },
  { name: 'hero.png',               src: img_hero },
  { name: 'Image1.jpg',             src: img_Image1 },
  { name: 'lapuscave.jpg',          src: img_lapuscave },
  { name: 'magoonfalls.jpg',        src: img_magoonfalls },
  { name: 'mayanapeak.jpg',         src: img_mayanapeak },
  { name: 'peoplespark.jpg',        src: img_peoplespark },
  { name: 'punodviewdeck.jpg',      src: img_punodviewdeck },
  { name: 'sancarloscathedral.jpg', src: img_sancarloscathedral },
  { name: 'scclogo1.png',           src: img_scclogo1 },
  { name: 'sipawayisland.jpg',      src: img_sipawayisland },
  { name: 'Tourismlogo1.1.png',     src: img_Tourismlogo },
];

// ── Gallery seed ───────────────────────────────────────────────────────────
const seedGallery = [
  { id: 1, title: 'Peoples Park',         url: img_peoplespark },
  { id: 2, title: 'Alinsyawan Falls',     url: img_alinsyawanfalls },
  { id: 3, title: 'Punod View Deck',      url: img_punodviewdeck },
  { id: 4, title: 'Gui-ob Cave',          url: img_guiobcave },
  { id: 5, title: 'San Carlos Cathedral', url: img_sancarloscathedral },
  { id: 6, title: 'Magon-On Falls',       url: img_magoonfalls },
  { id: 7, title: 'Lapus Cave',           url: img_lapuscave },
  { id: 8, title: 'CodCod Rice Terraces', url: img_codcodriceterraces },
];

// ── Page backgrounds seed ──────────────────────────────────────────────────
export const seedPageBgs = {
  home:         { label: 'Home Hero',           image: img_Image1 },
  destinations: { label: 'Destinations Header', image: img_mayanapeak },
  blog:         { label: 'Blog Header',         image: img_alinsyawanfalls },
  about:        { label: 'About Header',        image: img_peoplespark },
  contact:      { label: 'Contact Header',      image: img_sancarloscathedral },
};

// ── Context ────────────────────────────────────────────────────────────────
const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [destinations, setDestinations] = useState(seedDestinations.map((d) => ({ ...d })));
  const [blogPosts,    setBlogPosts]    = useState(seedBlogPosts);
  const [gallery,      setGallery]      = useState(seedGallery);
  const [pageBgs,      setPageBgs]      = useState(seedPageBgs);

  // ── Destinations CRUD ──────────────────────────────────────────────────
  function addDestination(item)        { setDestinations((p) => [...p, { ...item, id: Date.now() }]); }
  function updateDestination(id, item) { setDestinations((p) => p.map((d) => d.id === id ? { ...d, ...item } : d)); }
  function deleteDestination(id)       { setDestinations((p) => p.filter((d) => d.id !== id)); }

  // ── Blog Posts CRUD ────────────────────────────────────────────────────
  function addBlogPost(item)        { setBlogPosts((p) => [...p, { ...item, id: Date.now() }]); }
  function updateBlogPost(id, item) { setBlogPosts((p) => p.map((x) => x.id === id ? { ...x, ...item } : x)); }
  function deleteBlogPost(id)       { setBlogPosts((p) => p.filter((x) => x.id !== id)); }

  // ── Gallery CRUD ───────────────────────────────────────────────────────
  function addGalleryItem(item)        { setGallery((p) => [...p, { ...item, id: Date.now() }]); }
  function updateGalleryItem(id, item) { setGallery((p) => p.map((g) => g.id === id ? { ...g, ...item } : g)); }
  function deleteGalleryItem(id)       { setGallery((p) => p.filter((g) => g.id !== id)); }

  // ── Page Backgrounds ───────────────────────────────────────────────────
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
