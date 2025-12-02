import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/navbar.css';

// Navigation component with smooth scrolling
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = ['Home', 'About', 'Gallery', 'Menu', 'Feedback', 'Contact'];

  // Detect scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section
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
    >
      <div className="navbar-container">
        {/* Logo */}
        <motion.div 
          className="navbar-logo"
          whileHover={{ scale: 1.05 }}
        >
          <i className="fas fa-mug-hot"></i>
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
              className={activeSection === item.toLowerCase() ? 'active' : ''}
            >
              <a href={`#${item.toLowerCase()}`}>
                <span>{item}</span>
                {activeSection === item.toLowerCase() && (
                  <motion.div 
                    className="nav-indicator"
                    layoutId="activeIndicator"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
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
