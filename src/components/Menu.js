import React from 'react';
import { motion } from 'framer-motion';
import '../styles/menu.css';

// Menu section with animated tea item cards
const Menu = () => {
  const teaItems = [
    {
      id: 1,
      name: 'Masala Chaha',
      price: '₹40',
      description: 'Aromatic blend with traditional Indian spices'
    },
    {
      id: 2,
      name: 'Kadak Chaha',
      price: '₹35',
      description: 'Strong and bold, perfect for tea lovers'
    },
    {
      id: 3,
      name: 'Adrak Chaha',
      price: '₹45',
      description: 'Fresh ginger tea for warmth and wellness'
    },
    {
      id: 4,
      name: 'Elaichi Chaha',
      price: '₹50',
      description: 'Fragrant cardamom-infused premium tea'
    },
    {
      id: 5,
      name: 'Special Abhang Chaha',
      price: '₹60',
      description: 'Our signature blend - a tea lover\'s delight'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="menu" className="menu">
      <motion.div 
        className="menu-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2 
          className="section-title"
          variants={itemVariants}
        >
          Our Menu
        </motion.h2>

        <motion.div 
          className="menu-grid"
          variants={containerVariants}
        >
          {teaItems.map((item) => (
            <motion.div 
              key={item.id}
              className="menu-card"
              variants={itemVariants}
              whileHover={{ 
                y: -15,
                boxShadow: '0 20px 50px rgba(139, 69, 19, 0.25)'
              }}
            >
              <div className="menu-icon">
                <i className="fas fa-mug-hot"></i>
              </div>
              <h3>{item.name}</h3>
              <p className="menu-description">{item.description}</p>
              <motion.p 
                className="menu-price"
                whileHover={{ scale: 1.15 }}
              >
                {item.price}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Menu;
