import React from 'react';
import { motion } from 'framer-motion';
import {
  cardFadeInVariants,
  hoverBounceVariants,
  hoverGlowVariants,
  containerVariants,
  sectionRevealVariants,
} from '../animations/variants';
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
      variants={sectionRevealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.div 
        className="footer-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Brand Section - Fade in */}
        <motion.div 
          className="footer-brand"
          variants={cardFadeInVariants}
          whileHover="hover"
        >
          <motion.i 
            className="fas fa-leaf"
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          ></motion.i>
          <h3>Abhang Chaha</h3>
          <p>"Chaha jo dil jeet le"</p>
        </motion.div>

        {/* Social Links - Bounce on hover */}
        <motion.div 
          className="footer-social"
          variants={cardFadeInVariants}
          custom={1}
        >
          <h4>Follow Us</h4>
          <motion.div 
            className="social-icons"
            variants={containerVariants}
          >
            {socialLinks.map((link, index) => (
              <motion.a 
                key={index}
                href={link.url}
                title={link.label}
                className="social-link"
                variants={hoverBounceVariants}
                initial="rest"
                whileHover="hover"
                whileTap={{ scale: 0.85 }}
              >
                <i className={link.icon}></i>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Quick Links - Fade in with stagger */}
        <motion.div 
          className="footer-links"
          variants={cardFadeInVariants}
          custom={2}
        >
          <h4>Quick Links</h4>
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.li variants={cardFadeInVariants}>
              <motion.a href="#home" whileHover={{ x: 5 }}>Home</motion.a>
            </motion.li>
            <motion.li variants={cardFadeInVariants}>
              <motion.a href="#menu" whileHover={{ x: 5 }}>Menu</motion.a>
            </motion.li>
            <motion.li variants={cardFadeInVariants}>
              <motion.a href="#gallery" whileHover={{ x: 5 }}>Gallery</motion.a>
            </motion.li>
            <motion.li variants={cardFadeInVariants}>
              <motion.a href="#contact" whileHover={{ x: 5 }}>Contact</motion.a>
            </motion.li>
          </motion.ul>
        </motion.div>
      </motion.div>

      {/* Copyright - Fade in with heart pulse */}
      <motion.div 
        className="footer-bottom"
        variants={cardFadeInVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.8 }}
      >
        <p>© {currentYear} Abhang Chaha. All Rights Reserved.</p>
        <p>
          Made with{' '}
          <motion.i 
            className="fas fa-heart"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ color: '#E63946' }}
          />{' '}
          for tea lovers
        </p>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
