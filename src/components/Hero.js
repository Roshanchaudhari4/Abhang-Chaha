import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  titleVariants, 
  textRevealVariants, 
  buttonRippleVariants,
  floatVariants,
  containerVariants,
  cardFadeInVariants 
} from '../animations/variants';
import '../styles/hero.css';

// Hero section with enhanced animations
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

  // Text fade + slide animation
  const textItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: custom * 0.15, ease: 'easeOut' },
    }),
  };

  // Gentle pulse animation for hero elements
  const pulseVariants = {
    animate: {
      opacity: [1, 0.8, 1],
      transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  return (
    <section id="home" className="hero">
      <div className="hero-background">
        {/* Gradient overlay */}
        <div className="hero-gradient"></div>
        
        {/* Animated leaf decoration - continuous rotation */}
        <motion.div 
          className="tea-leaf-decoration tea-leaf-1"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          style={{ opacity: 0.3 }}
        >
          <i className="fas fa-leaf"></i>
        </motion.div>

        <motion.div 
          className="tea-leaf-decoration tea-leaf-2"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          style={{ opacity: 0.15 }}
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
        {/* Floating mug icon with gentle pulse */}
        <motion.div 
          className="hero-icon"
          custom={0}
          variants={textItemVariants}
          animate="animate"
          initial="hidden"
        >
          <motion.i 
            className="fas fa-mug-hot"
            variants={pulseVariants}
            animate="animate"
          />
        </motion.div>

        {/* Main title with fade + slide */}
        <motion.h1 
          className="hero-title"
          custom={1}
          variants={textItemVariants}
        >
          Welcome to <span className="brand-highlight">Abhang Chaha</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p 
          className="hero-tagline"
          custom={2}
          variants={textItemVariants}
        >
          ☕ Chaha jo dil jeet le ☕
        </motion.p>

        {/* Subtitle */}
        <motion.p 
          className="hero-subtitle"
          custom={3}
          variants={textItemVariants}
        >
          Experience the warmth of authentic Indian tea culture
        </motion.p>

        {/* CTA Buttons with ripple hover effect */}
        <motion.div 
          className="hero-buttons"
          custom={4}
          variants={textItemVariants}
        >
          {/* Explore Menu Button */}
          <motion.button 
            className="hero-btn primary-btn"
            variants={buttonRippleVariants}
            onClick={handleMenuClick}
            onHoverStart={() => setHoveredButton('menu')}
            onHoverEnd={() => setHoveredButton(null)}
          >
            <i className="fas fa-utensils"></i> Explore Menu
          </motion.button>

          {/* Get In Touch Button */}
          <motion.button 
            className="hero-btn secondary-btn"
            variants={buttonRippleVariants}
            onClick={handleVisitClick}
            onHoverStart={() => setHoveredButton('contact')}
            onHoverEnd={() => setHoveredButton(null)}
          >
            <i className="fas fa-phone"></i> Get In Touch
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Floating decorative cups - subtle float animation */}
      <motion.div 
        className="floating-cup floating-cup-1"
        variants={floatVariants}
        animate="animate"
      >
        <i className="fas fa-mug-hot"></i>
      </motion.div>

      <motion.div 
        className="floating-cup floating-cup-2"
        variants={floatVariants}
        animate="animate"
      >
        <i className="fas fa-leaf"></i>
      </motion.div>
    </section>
  );
};

export default Hero;
