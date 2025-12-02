/**
 * Checkout Component
 * Handles order placement with UPI payment UI
 * Features:
 * - Order summary
 * - UPI payment method selection
 * - UPI ID input field
 * - QR code display
 * - Order confirmation animation
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  formContainerVariants,
  sectionRevealVariants,
  inputFocusVariants,
  buttonRippleVariants,
  successMessageVariants,
  errorShakeVariants,
  containerVariants,
  cardFadeInVariants,
} from '../animations/variants';
import '../styles/checkout.css';

const Checkout = ({ cartItems = [], totalAmount = 0, onOrderSuccess, onClose }) => {
  const [upiId, setUpiId] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState('');
  const [shakeField, setShakeField] = useState(false);

  // Validate UPI ID format
  const validateUpiId = (id) => {
    const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/;
    return upiRegex.test(id);
  };

  // Handle payment completion
  const handlePaymentComplete = async () => {
    setOrderError('');

    // Validate UPI ID
    if (!upiId.trim()) {
      setOrderError('Please enter your UPI ID');
      setShakeField(true);
      setTimeout(() => setShakeField(false), 400);
      return;
    }

    if (!validateUpiId(upiId)) {
      setOrderError('Invalid UPI ID format. Example: yourname@upi or yourname@bank');
      setShakeField(true);
      setTimeout(() => setShakeField(false), 400);
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      setOrderError('Cart is empty. Add items before checkout.');
      return;
    }

    setLoading(true);

    try {
      // Prepare order payload
      const orderPayload = {
        items: cartItems,
        totalAmount,
        upiId: upiId.toLowerCase(),
        paymentStatus: 'PAID',
        orderStatus: 'CONFIRMED',
      };

      // Send order to backend API
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Order placed successfully
        setOrderSuccess(true);
        setUpiId('');

        // Callback for parent component
        if (onOrderSuccess) {
          setTimeout(() => {
            onOrderSuccess(data.order);
          }, 2000);
        }

        // Auto-close modal after 3 seconds
        setTimeout(() => {
          if (onClose) onClose();
        }, 3000);
      } else {
        setOrderError(data.message || 'Failed to place order');
      }
    } catch (error) {
      console.error('Order placement error:', error);
      setOrderError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Generate QR code (using a placeholder service)
  const generateQRCode = (text) => {
    // Using QR server API for dynamic QR generation
    const encoded = encodeURIComponent(text);
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encoded}`;
  };

  const qrCodeUrl = generateQRCode(`upi://pay?pa=${upiId || 'example@upi'}`);

  return (
    <AnimatePresence>
      <motion.div
        className="checkout-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="checkout-modal"
          variants={formContainerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <motion.button
            className="checkout-close"
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fas fa-times"></i>
          </motion.button>

          {/* Success State */}
          {orderSuccess ? (
            <motion.div
              className="order-success"
              variants={successMessageVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="success-icon"
              >
                <i className="fas fa-check-circle"></i>
              </motion.div>
              <h2>Order Placed Successfully!</h2>
              <p>Your order has been confirmed and will be processed soon.</p>
              <motion.p
                className="order-message"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Thank you for ordering from Abhang Chaha! ☕
              </motion.p>
            </motion.div>
          ) : (
            <>
              {/* Header */}
              <motion.h2
                className="checkout-title"
                variants={sectionRevealVariants}
              >
                <i className="fas fa-shopping-cart"></i> Order Summary & Payment
              </motion.h2>

              {/* Order Items Summary */}
              <motion.div
                className="order-summary"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <h3>Order Items</h3>
                <motion.div className="summary-items">
                  {cartItems && cartItems.length > 0 ? (
                    cartItems.map((item, idx) => (
                      <motion.div
                        key={`${item.id}-${idx}`}
                        className="summary-item"
                        variants={cardFadeInVariants}
                        custom={idx}
                      >
                        <div className="item-details">
                          <p className="item-name">{item.name}</p>
                          <p className="item-qty">Qty: {item.quantity}</p>
                        </div>
                        <p className="item-price">
                          ₹{item.price * item.quantity}
                        </p>
                      </motion.div>
                    ))
                  ) : (
                    <p className="empty-cart">No items in cart</p>
                  )}
                </motion.div>

                {/* Total Amount */}
                <motion.div
                  className="summary-total"
                  variants={cardFadeInVariants}
                >
                  <span>Total Amount:</span>
                  <span className="total-price">₹{totalAmount}</span>
                </motion.div>
              </motion.div>

              {/* Payment Method Section */}
              <motion.div
                className="payment-section"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <h3>Payment Method</h3>

                {/* UPI Payment Option (Only one option for now) */}
                <motion.div
                  className="payment-option upi-option active"
                  variants={cardFadeInVariants}
                  custom={2}
                >
                  <div className="option-header">
                    <i className="fas fa-mobile-alt"></i>
                    <span>UPI Payment</span>
                  </div>

                  {/* UPI ID Input */}
                  <motion.div
                    className={`upi-input-group ${shakeField ? 'shake' : ''}`}
                    variants={errorShakeVariants}
                    initial="rest"
                    animate={shakeField ? 'shake' : 'rest'}
                  >
                    <label htmlFor="upi-id">Enter UPI ID *</label>
                    <motion.input
                      type="text"
                      id="upi-id"
                      value={upiId}
                      onChange={(e) => {
                        setUpiId(e.target.value);
                        setOrderError(''); // Clear error on input change
                      }}
                      placeholder="example@upi"
                      className={orderError ? 'error' : ''}
                      variants={inputFocusVariants}
                      initial="rest"
                      whileFocus="focus"
                    />
                    {orderError && (
                      <motion.p
                        className="error-message"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        {orderError}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* QR Code Display */}
                  <motion.div
                    className="qr-code-container"
                    variants={cardFadeInVariants}
                    custom={3}
                  >
                    <p className="qr-label">OR Scan QR Code</p>
                    <motion.img
                      src={qrCodeUrl}
                      alt="UPI QR Code"
                      className="qr-code-image"
                      whileHover={{ scale: 1.05 }}
                    />
                    <p className="qr-instruction">
                      Scan with any UPI app or payment app
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                className="checkout-actions"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.button
                  className="cancel-btn"
                  onClick={onClose}
                  variants={buttonRippleVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  disabled={loading}
                >
                  Cancel
                </motion.button>

                <motion.button
                  className="complete-payment-btn"
                  onClick={handlePaymentComplete}
                  variants={buttonRippleVariants}
                  initial="rest"
                  whileHover={!loading ? 'hover' : 'rest'}
                  whileTap={!loading ? 'tap' : 'rest'}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <motion.i
                        className="fas fa-spinner-third"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                      Processing...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-check"></i>
                      I Have Completed Payment
                    </>
                  )}
                </motion.button>
              </motion.div>

              {/* Payment Info */}
              <motion.div
                className="payment-info"
                variants={cardFadeInVariants}
                custom={4}
              >
                <p>
                  <i className="fas fa-lock"></i> Your order will be confirmed
                  after payment verification.
                </p>
              </motion.div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Checkout;
