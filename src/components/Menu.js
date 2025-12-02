import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/menu.css';

// Menu section with animated tea item cards
const Menu = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

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
          <i className="fas fa-mug-hot"></i> Our Menu
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
                <span>{item.icon}</span>
              </div>
              <h3>{item.name}</h3>
              <p className="menu-description">{item.description}</p>
              <motion.p 
                className="menu-price"
                whileHover={{ scale: 1.15 }}
              >
                ₹{item.price}
              </motion.p>
              <motion.button 
                className="add-to-cart-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => addToCart(item)}
              >
                <i className="fas fa-shopping-cart"></i> Add
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating Cart Button */}
        <motion.div 
          className={`floating-cart ${cartItems.length > 0 ? 'active' : ''}`}
          animate={{ scale: cartItems.length > 0 ? 1 : 0 }}
          transition={{ type: 'spring', stiffness: 300 }}
          onClick={() => setShowCart(!showCart)}
        >
          <i className="fas fa-shopping-bag"></i>
          {cartItems.length > 0 && (
            <motion.span 
              className="cart-badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              {cartItems.length}
            </motion.span>
          )}
        </motion.div>

        {/* Cart Sidebar */}
        <motion.div 
          className={`cart-sidebar ${showCart ? 'open' : ''}`}
          initial={{ x: 400 }}
          animate={{ x: showCart ? 0 : 400 }}
          transition={{ type: 'spring', damping: 20 }}
        >
          <div className="cart-header">
            <h3>Your Order</h3>
            <button onClick={() => setShowCart(false)}>
              <i className="fas fa-times"></i>
            </button>
          </div>

          {cartItems.length > 0 ? (
            <>
              <div className="cart-items">
                {cartItems.map((item) => (
                  <motion.div 
                    key={item.id}
                    className="cart-item"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 20, opacity: 0 }}
                  >
                    <div>
                      <p className="cart-item-name">{item.name}</p>
                      <p className="cart-item-price">₹{item.price} × {item.quantity}</p>
                    </div>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </motion.div>
                ))}
              </div>
              <div className="cart-total">
                <p>Total: <strong>₹{totalPrice}</strong></p>
                <button className="checkout-btn">
                  <i className="fas fa-check"></i> Proceed
                </button>
              </div>
            </>
          ) : (
            <p className="empty-cart">Your cart is empty</p>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Menu;
