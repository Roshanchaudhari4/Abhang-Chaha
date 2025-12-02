import React from 'react';
import { motion } from 'framer-motion';
import {
  containerVariants,
  cardFadeInVariants,
  cardHoverVariants,
  sectionRevealVariants,
  textRevealVariants,
  hoverGlowVariants,
} from '../animations/variants';
import '../styles/about.css';

// About section with card layout and hover animations
const About = () => {
  const features = [
    {
      icon: 'fa-leaf',
      title: 'Premium Quality',
      description: 'We source the finest tea leaves from across India',
      color: '#2D5016'
    },
    {
      icon: 'fa-fire',
      title: 'Traditional Recipe',
      description: 'Authentic recipes passed down through generations',
      color: '#FF6B35'
    },
    {
      icon: 'fa-heart',
      title: 'Made with Love',
      description: 'Every cup is crafted with care and passion',
      color: '#E63946'
    }
  ];

  const stats = [
    { number: '500+', label: 'Happy Customers' },
    { number: '15+', label: 'Tea Varieties' },
    { number: '10 yrs', label: 'Experience' }
  ];

  return (
    <section id="about" className="about">
      <motion.div 
        className="about-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2 
          className="section-title"
          variants={sectionRevealVariants}
        >
          <i className="fas fa-info-circle"></i> About Abhang Chaha
        </motion.h2>

        {/* About Description with text reveal */}
        <motion.p 
          className="about-description"
          variants={textRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          Abhang Chaha is a cozy tea shop dedicated to bringing you the finest 
          tea experiences. We believe in the power of a perfect cup of tea to 
          bring people together. Our mission is to serve traditional Indian chai 
          with a modern twist, made from the freshest ingredients.
        </motion.p>

        {/* Stats Section - Animated counters */}
        <motion.div 
          className="stats-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              className="stat-card"
              variants={cardFadeInVariants}
              custom={index}
              whileHover="hover"
            >
              <motion.div 
                className="stat-number"
                variants={cardHoverVariants}
                initial="rest"
                whileHover="hover"
              >
                {stat.number}
              </motion.div>
              <p>{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid with hover lift */}
        <motion.div 
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="feature-card"
              variants={cardFadeInVariants}
              custom={index}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              {/* Card Container with hover lift & glow */}
              <motion.div
                variants={cardHoverVariants}
                initial="rest"
                whileHover="hover"
                style={{ width: '100%', height: '100%' }}
              >
                {/* Rotating Icon */}
                <motion.div 
                  className="feature-icon"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  style={{ color: feature.color }}
                  whileHover={{ scale: 1.2, rotate: 0 }}
                >
                  <i className={`fas ${feature.icon}`}></i>
                </motion.div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
