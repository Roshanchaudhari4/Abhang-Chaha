/**
 * Order Controller
 * Handles order creation and retrieval
 */
const Order = require('../models/Order');

/**
 * POST /api/orders
 * Create a new order from cart items
 * Required fields: items, totalAmount, upiId, paymentStatus, orderStatus
 */
const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, upiId, paymentStatus, orderStatus } = req.body;

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Order must contain at least one item',
      });
    }

    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Total amount must be greater than 0',
      });
    }

    if (!upiId || !upiId.trim()) {
      return res.status(400).json({
        success: false,
        message: 'UPI ID is required',
      });
    }

    // Validate UPI ID format (basic validation)
    const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/;
    if (!upiRegex.test(upiId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid UPI ID format. Example: example@upi',
      });
    }

    // Create new order
    const newOrder = new Order({
      items,
      totalAmount,
      upiId,
      paymentStatus: paymentStatus || 'PAID',
      orderStatus: orderStatus || 'CONFIRMED',
    });

    // Save order to database
    const savedOrder = await newOrder.save();

    console.log('Order created successfully:', savedOrder._id);

    // Return success response with order details
    return res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      order: {
        id: savedOrder._id,
        items: savedOrder.items,
        totalAmount: savedOrder.totalAmount,
        upiId: savedOrder.upiId,
        paymentStatus: savedOrder.paymentStatus,
        orderStatus: savedOrder.orderStatus,
        createdAt: savedOrder.createdAt,
      },
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message,
    });
  }
};

/**
 * GET /api/orders/:id
 * Retrieve a specific order by ID
 */
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order',
      error: error.message,
    });
  }
};

/**
 * GET /api/orders
 * Retrieve all orders (for admin/testing)
 */
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getOrderById,
  getAllOrders,
};
