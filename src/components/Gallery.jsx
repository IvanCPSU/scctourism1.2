import { useState } from 'react';
import '../styles/Gallery.css';

// Local asset imports — add more images to src/assets/ and import them here
import image1 from '../assets/Image1.jpg';

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    { id: 1, title: "Palo Alto Dam",   url: image1 },  // replace with actual photo
    { id: 2, title: "Waterfall",       url: image1 },  // replace with actual photo
    { id: 3, title: "Mountain Vista",  url: image1 },  // replace with actual photo
    { id: 4, title: "Local Market",    url: image1 },  // replace with actual photo
    { id: 5, title: "Cathedral",       url: image1 },  // replace with actual photo
    { id: 6, title: "Sunset View",     url: image1 },  // replace with actual photo
  ];

  return (
    <section className="gallery">
      <div className="gallery-container">
        <h2>Photo Gallery</h2>
        <p className="gallery-subtitle">Explore the beauty of San Carlos City</p>

        <div className="gallery-grid">
          {galleryImages.map((image) => (
            <div 
              key={image.id} 
              className="gallery-item"
              onClick={() => setSelectedImage(image)}
            >
              <img src={image.url} alt={image.title} />
              <div className="gallery-overlay">
                <p>{image.title}</p>
              </div>
            </div>
          ))}
        </div>

        {selectedImage && (
          <div className="gallery-modal" onClick={() => setSelectedImage(null)}>
            <div className="gallery-modal-content">
              <button className="modal-close" onClick={() => setSelectedImage(null)}>×</button>
              <img src={selectedImage.url} alt={selectedImage.title} />
              <p>{selectedImage.title}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Gallery;
