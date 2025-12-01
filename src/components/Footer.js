import React from 'react';
import { motion } from 'framer-motion';
import '../styles/footer.css';

// Footer component with social media links
const Footer = () => {
  const socialLinks = [
    {
      icon: 'fab fa-instagram',
      url: '#',
      label: 'Instagram'
    },
    {
      icon: 'fab fa-whatsapp',
      url: '#',
      label: 'WhatsApp'
    }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <motion.footer 
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="footer-container">
        {/* Brand Section */}
        <motion.div 
          className="footer-brand"
          whileHover={{ scale: 1.05 }}
        >
          <i className="fas fa-leaf"></i>
          <h3>Abhang Chaha</h3>
          <p>"Chaha jo dil jeet le"</p>
        </motion.div>

        {/* Social Links */}
        <motion.div 
          className="footer-social"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h4>Follow Us</h4>
          <div className="social-icons">
            {socialLinks.map((link, index) => (
              <motion.a 
                key={index}
                href={link.url}
                title={link.label}
                className="social-link"
                whileHover={{ 
                  scale: 1.2,
                  rotate: 10
                }}
                whileTap={{ scale: 0.9 }}
              >
                <i className={link.icon}></i>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div 
          className="footer-links"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#menu">Menu</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </motion.div>
      </div>

      {/* Copyright */}
      <motion.div 
        className="footer-bottom"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <p>© {currentYear} Abhang Chaha. All Rights Reserved.</p>
        <p>Made with <i className="fas fa-heart"></i> for tea lovers</p>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
