import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  imageHoverZoomVariants,
  imageFocusRingVariants,
  imageOverlayVariants,
  cardFadeInVariants,
  containerVariants,
  sectionRevealVariants,
  modalBackdropVariants,
  modalContentVariants,
} from '../animations/variants';
import '../styles/gallery.css';

// Gallery section with image zoom & enhanced hover animations
const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('all');

  const images = [
    {
      id: 1,
      title: 'Premium Tea Cups',
      url: 'https://images.unsplash.com/photo-1597318015574-be8bdd81c236?w=400&h=300&fit=crop',
      category: 'cups'
    },
    {
      id: 2,
      title: 'Traditional Tea Stall',
      url: 'https://images.unsplash.com/photo-1597318015574-be8bdd81c236?w=400&h=300&fit=crop',
      category: 'stall'
    },
    {
      id: 3,
      title: 'Masala Chai',
      url: 'https://images.unsplash.com/photo-1597318015574-be8bdd81c236?w=400&h=300&fit=crop',
      category: 'drinks'
    },
    {
      id: 4,
      title: 'Tea Brewing',
      url: 'https://images.unsplash.com/photo-1597318015574-be8bdd81c236?w=400&h=300&fit=crop',
      category: 'brewing'
    },
    {
      id: 5,
      title: 'Indian Tea Shop',
      url: 'https://images.unsplash.com/photo-1597318015574-be8bdd81c236?w=400&h=300&fit=crop',
      category: 'stall'
    },
    {
      id: 6,
      title: 'Hot Beverages',
      url: 'https://images.unsplash.com/photo-1597318015574-be8bdd81c236?w=400&h=300&fit=crop',
      category: 'drinks'
    }
  ];

  const filteredImages = filter === 'all' ? images : images.filter(img => img.category === filter);

  return (
    <section id="gallery" className="gallery">
      <motion.div 
        className="gallery-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2 
          className="section-title"
          variants={sectionRevealVariants}
        >
          <i className="fas fa-image"></i> Photo Gallery
        </motion.h2>

        {/* Filter Buttons */}
        <motion.div 
          className="gallery-filters"
          variants={cardFadeInVariants}
        >
          {['all', 'cups', 'drinks', 'stall', 'brewing'].map((cat) => (
            <motion.button
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid with image zoom hover */}
        <motion.div 
          className="gallery-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={filter}
        >
          {filteredImages.map((image, idx) => (
            <motion.div 
              key={image.id}
              className="gallery-item"
              variants={cardFadeInVariants}
              custom={idx}
              initial="hidden"
              animate="visible"
              onClick={() => setSelectedImage(image)}
            >
              <div className="gallery-image-wrapper">
                <motion.img 
                  src={image.url} 
                  alt={image.title}
                  className="gallery-image"
                  variants={imageHoverZoomVariants}
                  initial="rest"
                  whileHover="hover"
                />
                {/* Overlay with focus ring animation */}
                <motion.div 
                  className="gallery-overlay"
                  variants={imageOverlayVariants}
                  initial="hidden"
                  whileHover="visible"
                >
                  <p>{image.title}</p>
                  <i className="fas fa-search-plus"></i>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox Modal - animated entrance/exit */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div 
              className="lightbox"
              variants={modalBackdropVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <motion.div 
                className="lightbox-content"
                variants={modalContentVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button className="lightbox-close" onClick={() => setSelectedImage(null)}>
                  <i className="fas fa-times"></i>
                </button>
                <img src={selectedImage.url} alt={selectedImage.title} />
                <p className="lightbox-title">{selectedImage.title}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default Gallery;
