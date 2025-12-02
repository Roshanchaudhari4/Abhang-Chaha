/**
 * Order Model
 * Stores customer orders with items, payment, and order status
 */
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    // Order items (tea items ordered)
    items: [
      {
        id: {
          type: Number,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        _id: false, // Prevent automatic _id for subdocuments
      },
    ],

    // Total amount for the order
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    // UPI ID used for payment
    upiId: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    // Payment status
    paymentStatus: {
      type: String,
      enum: ['PAID', 'PENDING', 'FAILED'],
      default: 'PAID',
    },

    // Order status
    orderStatus: {
      type: String,
      enum: ['CONFIRMED', 'PROCESSING', 'COMPLETED', 'CANCELLED'],
      default: 'CONFIRMED',
    },

    // Order creation timestamp
    createdAt: {
      type: Date,
      default: Date.now,
    },

    // Order update timestamp
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
  }
);

// Middleware to update updatedAt on save
OrderSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Export Order model
module.exports = mongoose.model('Order', OrderSchema);
