import React from 'react';
import { motion } from 'framer-motion';
import '../styles/about.css';

// About section with card layout and hover animations
const About = () => {
  const features = [
    {
      icon: 'fa-leaf',
      title: 'Premium Quality',
      description: 'We source the finest tea leaves from across India'
    },
    {
      icon: 'fa-fire',
      title: 'Traditional Recipe',
      description: 'Authentic recipes passed down through generations'
    },
    {
      icon: 'fa-heart',
      title: 'Made with Love',
      description: 'Every cup is crafted with care and passion'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

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
          variants={itemVariants}
        >
          About Abhang Chaha
        </motion.h2>

        <motion.p 
          className="about-description"
          variants={itemVariants}
        >
          Abhang Chaha is a cozy tea shop dedicated to bringing you the finest 
          tea experiences. We believe in the power of a perfect cup of tea to 
          bring people together. Our mission is to serve traditional Indian chai 
          with a modern twist, made from the freshest ingredients.
        </motion.p>

        <motion.div 
          className="features-grid"
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="feature-card"
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                boxShadow: '0 15px 40px rgba(139, 69, 19, 0.2)'
              }}
            >
              <i className={`fas ${feature.icon}`}></i>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
