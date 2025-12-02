import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/hero.css';

// Hero section with animated heading and CTA button
const Hero = () => {
  const [hoveredButton, setHoveredButton] = useState(null);

  const handleVisitClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMenuClick = () => {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: 'easeOut' },
    },
  };

  const floatVariants = {
    animate: {
      y: [0, -20, 0],
      transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  return (
    <section id="home" className="hero">
      <div className="hero-background">
        {/* Gradient overlay */}
        <div className="hero-gradient"></div>
        
        {/* Animated leaf decoration */}
        <motion.div 
          className="tea-leaf-decoration tea-leaf-1"
          animate={{ rotate: 360, opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        >
          <i className="fas fa-leaf"></i>
        </motion.div>

        <motion.div 
          className="tea-leaf-decoration tea-leaf-2"
          animate={{ rotate: -360, opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          <i className="fas fa-leaf"></i>
        </motion.div>
      </div>

      <motion.div 
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="hero-icon"
          variants={itemVariants}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <i className="fas fa-mug-hot"></i>
        </motion.div>

        <motion.h1 
          className="hero-title"
          variants={itemVariants}
        >
          Welcome to <span className="brand-highlight">Abhang Chaha</span>
        </motion.h1>

        <motion.p 
          className="hero-tagline"
          variants={itemVariants}
        >
          ☕ Chaha jo dil jeet le ☕
        </motion.p>

        <motion.p 
          className="hero-subtitle"
          variants={itemVariants}
        >
          Experience the warmth of authentic Indian tea culture
        </motion.p>

        <motion.div 
          className="hero-buttons"
          variants={itemVariants}
        >
          <motion.button 
            className="hero-btn primary-btn"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 15px 40px rgba(139, 69, 19, 0.5)'
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleMenuClick}
            onHoverStart={() => setHoveredButton('menu')}
            onHoverEnd={() => setHoveredButton(null)}
          >
            <i className="fas fa-utensils"></i> Explore Menu
          </motion.button>

          <motion.button 
            className="hero-btn secondary-btn"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 15px 40px rgba(45, 80, 22, 0.5)'
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleVisitClick}
            onHoverStart={() => setHoveredButton('contact')}
            onHoverEnd={() => setHoveredButton(null)}
          >
            <i className="fas fa-phone"></i> Get In Touch
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Animated decorative cups */}
      <motion.div 
        className="floating-cup floating-cup-1"
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <i className="fas fa-mug-hot"></i>
      </motion.div>
      <motion.div 
        className="floating-cup floating-cup-2"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <i className="fas fa-mug-hot"></i>
      </motion.div>
    </section>
  );
};

export default Hero;
