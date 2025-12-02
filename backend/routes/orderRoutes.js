/**
 * Order Routes
 * Define API endpoints for order operations
 */
const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrderById,
  getAllOrders,
} = require('../controllers/orderController');

/**
 * POST /api/orders
 * Create a new order
 * Body: { items, totalAmount, upiId, paymentStatus, orderStatus }
 */
router.post('/orders', createOrder);

/**
 * GET /api/orders/:id
 * Get a specific order by ID
 */
router.get('/orders/:id', getOrderById);

/**
 * GET /api/orders
 * Get all orders (for admin/testing)
 */
router.get('/orders', getAllOrders);

module.exports = router;
