import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { navItemVariants, mobileMenuVariants } from '../animations/variants';
import '../styles/navbar.css';

// Navigation component with smooth scrolling & enhanced animations
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = ['Home', 'About', 'Gallery', 'Menu', 'Feedback', 'Contact'];

  // Detect scroll position for navbar shadow appearance
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on viewport position
      for (let item of navItems) {
        const section = document.getElementById(item.toLowerCase());
        if (section && window.scrollY >= section.offsetTop - 100) {
          setActiveSection(item.toLowerCase());
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (item) => {
    const element = document.getElementById(item.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
      setActiveSection(item.toLowerCase());
    }
  };

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      // Scroll-based shadow animation
      style={{
        boxShadow: scrolled 
          ? '0 4px 20px rgba(0, 0, 0, 0.1)' 
          : '0 2px 8px rgba(0, 0, 0, 0.05)',
      }}
    >
      <div className="navbar-container">
        {/* Logo with hover scale */}
        <motion.div 
          className="navbar-logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <i className="fas fa-mug-hot"></i>
          <span>Abhang Chaha</span>
        </motion.div>

        {/* Hamburger Menu - Mobile */}
        <motion.div 
          className={`hamburger ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.95 }}
        >
          <span></span>
          <span></span>
          <span></span>
        </motion.div>

        {/* Nav Items with staggered animations */}
        <motion.ul 
          className={`nav-items ${isOpen ? 'active' : ''}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {navItems.map((item, index) => (
            <motion.li 
              key={index}
              variants={navItemVariants}
              initial="rest"
              whileHover="hover"
              onClick={() => handleNavClick(item)}
              className={activeSection === item.toLowerCase() ? 'active' : ''}
            >
              <a href={`#${item.toLowerCase()}`}>
                <span>{item}</span>
                {/* Animated underline for active section */}
                {activeSection === item.toLowerCase() && (
                  <motion.div 
                    className="nav-indicator"
                    layoutId="activeIndicator"
                    transition={{ type: 'spring', stiffness: 380, damping: 40 }}
                  />
                )}
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.nav>
  );
};

export default Navbar;
