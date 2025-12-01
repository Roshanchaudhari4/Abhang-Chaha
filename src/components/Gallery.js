import React from 'react';
import { motion } from 'framer-motion';
import '../styles/gallery.css';

// Gallery section with hover zoom animations
const Gallery = () => {
  const images = [
    {
      id: 1,
      title: 'Premium Tea Cups',
      url: 'https://images.unsplash.com/photo-1597318015574-be8bdd81c236?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      title: 'Traditional Tea Stall',
      url: 'https://images.unsplash.com/photo-1597318015574-be8bdd81c236?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      title: 'Masala Chai',
      url: 'https://images.unsplash.com/photo-1597318015574-be8bdd81c236?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      title: 'Tea Brewing',
      url: 'https://images.unsplash.com/photo-1597318015574-be8bdd81c236?w=400&h=300&fit=crop'
    },
    {
      id: 5,
      title: 'Indian Tea Shop',
      url: 'https://images.unsplash.com/photo-1597318015574-be8bdd81c236?w=400&h=300&fit=crop'
    },
    {
      id: 6,
      title: 'Hot Beverages',
      url: 'https://images.unsplash.com/photo-1597318015574-be8bdd81c236?w=400&h=300&fit=crop'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

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
          variants={itemVariants}
        >
          Photo Gallery
        </motion.h2>

        <motion.div 
          className="gallery-grid"
          variants={containerVariants}
        >
          {images.map((image) => (
            <motion.div 
              key={image.id}
              className="gallery-item"
              variants={itemVariants}
              whileHover={{ scale: 1.08 }}
            >
              <div className="gallery-image-wrapper">
                <img 
                  src={image.url} 
                  alt={image.title}
                  className="gallery-image"
                />
                <div className="gallery-overlay">
                  <p>{image.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Gallery;
