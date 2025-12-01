import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/navbar.css';

// Navigation component with smooth scrolling
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = ['Home', 'About', 'Gallery', 'Menu', 'Feedback', 'Contact'];

  const handleNavClick = (item) => {
    const element = document.getElementById(item.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <motion.nav 
      className="navbar"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="navbar-container">
        {/* Logo */}
        <motion.div 
          className="navbar-logo"
          whileHover={{ scale: 1.05 }}
        >
          <i className="fas fa-leaf"></i>
          <span>Abhang Chaha</span>
        </motion.div>

        {/* Hamburger Menu */}
        <div 
          className={`hamburger ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Nav Items */}
        <motion.ul 
          className={`nav-items ${isOpen ? 'active' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {navItems.map((item, index) => (
            <motion.li 
              key={index}
              whileHover={{ scale: 1.1 }}
              onClick={() => handleNavClick(item)}
            >
              <a href={`#${item.toLowerCase()}`}>{item}</a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.nav>
  );
};

export default Navbar;
