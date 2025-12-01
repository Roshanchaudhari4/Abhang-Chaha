import React from 'react';
import { motion } from 'framer-motion';
import '../styles/hero.css';

// Hero section with animated heading and CTA button
const Hero = () => {
  const handleVisitClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <motion.div 
          className="tea-leaf-decoration"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
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
        <motion.h1 
          className="hero-title"
          variants={itemVariants}
        >
          Welcome to Abhang Chaha
        </motion.h1>

        <motion.p 
          className="hero-tagline"
          variants={itemVariants}
        >
          "Chaha jo dil jeet le"
        </motion.p>

        <motion.button 
          className="hero-btn"
          variants={itemVariants}
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 10px 30px rgba(139, 69, 19, 0.4)'
          }}
          whileTap={{ scale: 0.95 }}
          onClick={handleVisitClick}
        >
          Visit Us
        </motion.button>
      </motion.div>

      {/* Animated decorative cups */}
      <motion.div 
        className="floating-cup floating-cup-1"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
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
