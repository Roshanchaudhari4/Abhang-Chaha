import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  containerVariants,
  cardFadeInVariants,
  cardHoverVariants,
  buttonRippleVariants,
  sectionRevealVariants,
  hoverGlowVariants,
  hoverBounceVariants,
} from '../animations/variants';
import Checkout from './Checkout';
import '../styles/menu.css';

// Menu section with animated tea item cards
const Menu = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const teaItems = [
    {
      id: 1,
      name: 'Masala Chaha',
      price: 40,
      icon: '🌶️',
      description: 'Aromatic blend with traditional Indian spices'
    },
    {
      id: 2,
      name: 'Kadak Chaha',
      price: 35,
      icon: '☕',
      description: 'Strong and bold, perfect for tea lovers'
    },
    {
      id: 3,
      name: 'Adrak Chaha',
      price: 45,
      icon: '🫚',
      description: 'Fresh ginger tea for warmth and wellness'
    },
    {
      id: 4,
      name: 'Elaichi Chaha',
      price: 50,
      icon: '✨',
      description: 'Fragrant cardamom-infused premium tea'
    },
    {
      id: 5,
      name: 'Special Abhang Chaha',
      price: 60,
      icon: '👑',
      description: 'Our signature blend - a tea lover\'s delight'
    }
  ];

  const addToCart = (item) => {
    const existing = cartItems.find(i => i.id === item.id);
    if (existing) {
      setCartItems(cartItems.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(i => i.id !== itemId));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Handle order success
  const handleOrderSuccess = (order) => {
    // Clear cart after successful order
    setCartItems([]);
    setShowCheckout(false);
    setShowCart(false);
    console.log('Order placed:', order);
    // Optional: Show toast notification or redirect
  };

  return (
    <section id="menu" className="menu">
      <motion.div 
        className="menu-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.h2 
          className="section-title"
          variants={sectionRevealVariants}
        >
          <i className="fas fa-mug-hot"></i> Our Menu
        </motion.h2>

        {/* Menu Grid with staggered card animations */}
        <motion.div 
          className="menu-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {teaItems.map((item, idx) => (
            <motion.div 
              key={item.id}
              className="menu-card"
              variants={cardFadeInVariants}
              custom={idx}
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
                <div className="menu-icon">
                  <motion.span
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {item.icon}
                  </motion.span>
                </div>
                <h3>{item.name}</h3>
                <p className="menu-description">{item.description}</p>
                
                {/* Price with hover scale */}
                <motion.p 
                  className="menu-price"
                  whileHover={{ scale: 1.15 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  ₹{item.price}
                </motion.p>
                
                {/* Add to Cart Button with ripple */}
                <motion.button 
                  className="add-to-cart-btn"
                  variants={buttonRippleVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => addToCart(item)}
                >
                  <i className="fas fa-shopping-cart"></i> Add
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating Cart Button - with bounce on hover */}
        <motion.div 
          className={`floating-cart ${cartItems.length > 0 ? 'active' : ''}`}
          animate={{ scale: cartItems.length > 0 ? 1 : 0 }}
          transition={{ type: 'spring', stiffness: 300 }}
          onClick={() => setShowCart(!showCart)}
          variants={hoverBounceVariants}
          whileHover="hover"
        >
          <motion.i 
            className="fas fa-shopping-bag"
            animate={{ rotate: showCart ? 10 : 0 }}
          ></motion.i>
          {cartItems.length > 0 && (
            <motion.span 
              className="cart-badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              key={cartItems.length}
            >
              {cartItems.length}
            </motion.span>
          )}
        </motion.div>

        {/* Cart Sidebar - Animated slide-in/out */}
        <AnimatePresence>
          {showCart && (
            <motion.div 
              className="cart-sidebar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCart(false)}
            />
          )}
        </AnimatePresence>

        <motion.div 
          className={`cart-sidebar ${showCart ? 'open' : ''}`}
          initial={{ x: 400 }}
          animate={{ x: showCart ? 0 : 400 }}
          exit={{ x: 400 }}
          transition={{ type: 'spring', damping: 20 }}
        >
          <motion.div 
            className="cart-header"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h3>Your Order</h3>
            <motion.button 
              onClick={() => setShowCart(false)}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fas fa-times"></i>
            </motion.button>
          </motion.div>

          <AnimatePresence mode="wait">
            {cartItems.length > 0 ? (
              <>
                <motion.div 
                  className="cart-items"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {cartItems.map((item) => (
                    <motion.div 
                      key={item.id}
                      className="cart-item"
                      layout
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 20, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <div>
                        <p className="cart-item-name">{item.name}</p>
                        <p className="cart-item-price">₹{item.price} × {item.quantity}</p>
                      </div>
                      <motion.button 
                        className="remove-btn" 
                        onClick={() => removeFromCart(item.id)}
                        whileHover={{ scale: 1.2, color: '#E84C3D' }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <i className="fas fa-trash"></i>
                      </motion.button>
                    </motion.div>
                  ))}
                </motion.div>
                
                <motion.div 
                  className="cart-total"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <p>Total: <strong>₹{totalPrice}</strong></p>
                  <motion.button 
                    className="checkout-btn"
                    variants={buttonRippleVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => setShowCheckout(true)}
                  >
                    <i className="fas fa-check"></i> Proceed to Checkout
                  </motion.button>
                </motion.div>
              </>
            ) : (
              <motion.p 
                className="empty-cart"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Your cart is empty
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Checkout Modal */}
        <AnimatePresence>
          {showCheckout && (
            <Checkout
              cartItems={cartItems}
              totalAmount={totalPrice}
              onOrderSuccess={handleOrderSuccess}
              onClose={() => setShowCheckout(false)}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default Menu;
