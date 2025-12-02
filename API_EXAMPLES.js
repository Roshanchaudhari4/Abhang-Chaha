/**
 * ORDER PLACEMENT SYSTEM - API EXAMPLES
 * 
 * Test these endpoints with the order placement system
 * Endpoints: http://localhost:5000/api/
 */

// ============================================
// 1. CREATE ORDER
// ============================================

/**
 * POST /api/orders
 * Create a new order from cart items
 * 
 * REQUIRED FIELDS:
 * - items: Array of cart items
 * - totalAmount: Total price
 * - upiId: User's UPI ID (e.g., user@upi)
 * - paymentStatus: PAID, PENDING, or FAILED
 * - orderStatus: CONFIRMED, PROCESSING, COMPLETED, or CANCELLED
 */

// Example 1: Single item order
POST /api/orders
Content-Type: application/json

{
  "items": [
    {
      "id": 1,
      "name": "Masala Chaha",
      "price": 40,
      "quantity": 1
    }
  ],
  "totalAmount": 40,
  "upiId": "customer@upi",
  "paymentStatus": "PAID",
  "orderStatus": "CONFIRMED"
}

// Response (Success):
{
  "success": true,
  "message": "Order placed successfully!",
  "order": {
    "id": "507f1f77bcf86cd799439011",
    "items": [
      {
        "id": 1,
        "name": "Masala Chaha",
        "price": 40,
        "quantity": 1
      }
    ],
    "totalAmount": 40,
    "upiId": "customer@upi",
    "paymentStatus": "PAID",
    "orderStatus": "CONFIRMED",
    "createdAt": "2025-01-10T10:30:00.000Z"
  }
}


// Example 2: Multiple items order
POST /api/orders
Content-Type: application/json

{
  "items": [
    {
      "id": 1,
      "name": "Masala Chaha",
      "price": 40,
      "quantity": 2
    },
    {
      "id": 3,
      "name": "Adrak Chaha",
      "price": 45,
      "quantity": 1
    }
  ],
  "totalAmount": 125,
  "upiId": "raj@paytm",
  "paymentStatus": "PAID",
  "orderStatus": "CONFIRMED"
}

// Response (Success):
{
  "success": true,
  "message": "Order placed successfully!",
  "order": {
    "id": "507f1f77bcf86cd799439012",
    "items": [...],
    "totalAmount": 125,
    "upiId": "raj@paytm",
    "paymentStatus": "PAID",
    "orderStatus": "CONFIRMED",
    "createdAt": "2025-01-10T10:35:00.000Z"
  }
}


// Example 3: Invalid UPI ID (Error)
POST /api/orders
Content-Type: application/json

{
  "items": [{"id": 1, "name": "Tea", "price": 40, "quantity": 1}],
  "totalAmount": 40,
  "upiId": "invalid-upi",  // Invalid format!
  "paymentStatus": "PAID",
  "orderStatus": "CONFIRMED"
}

// Response (Error):
{
  "success": false,
  "message": "Invalid UPI ID format. Example: example@upi"
}


// Example 4: Empty cart (Error)
POST /api/orders
Content-Type: application/json

{
  "items": [],  // Empty!
  "totalAmount": 0,
  "upiId": "user@upi",
  "paymentStatus": "PAID",
  "orderStatus": "CONFIRMED"
}

// Response (Error):
{
  "success": false,
  "message": "Order must contain at least one item"
}


// ============================================
// 2. RETRIEVE SPECIFIC ORDER
// ============================================

/**
 * GET /api/orders/:id
 * Get order details by order ID
 */

GET /api/orders/507f1f77bcf86cd799439011

// Response (Success):
{
  "success": true,
  "order": {
    "_id": "507f1f77bcf86cd799439011",
    "items": [
      {
        "id": 1,
        "name": "Masala Chaha",
        "price": 40,
        "quantity": 2
      }
    ],
    "totalAmount": 80,
    "upiId": "user@upi",
    "paymentStatus": "PAID",
    "orderStatus": "CONFIRMED",
    "createdAt": "2025-01-10T10:30:00.000Z",
    "updatedAt": "2025-01-10T10:30:00.000Z"
  }
}

// Response (Not Found):
{
  "success": false,
  "message": "Order not found"
}


// ============================================
// 3. RETRIEVE ALL ORDERS
// ============================================

/**
 * GET /api/orders
 * Get list of all orders (for admin)
 */

GET /api/orders

// Response:
{
  "success": true,
  "count": 3,
  "orders": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "items": [...],
      "totalAmount": 80,
      "upiId": "user1@upi",
      "paymentStatus": "PAID",
      "orderStatus": "CONFIRMED",
      "createdAt": "2025-01-10T10:30:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "items": [...],
      "totalAmount": 125,
      "upiId": "user2@paytm",
      "paymentStatus": "PAID",
      "orderStatus": "CONFIRMED",
      "createdAt": "2025-01-10T10:35:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439013",
      "items": [...],
      "totalAmount": 95,
      "upiId": "user3@okaxis",
      "paymentStatus": "PAID",
      "orderStatus": "PROCESSING",
      "createdAt": "2025-01-10T10:40:00.000Z"
    }
  ]
}


// ============================================
// 4. VALID UPI ID FORMATS
// ============================================

// ✅ VALID UPI IDs:
user@upi
john@paytm
customer123@okaxis
test.user@upi
user_123@bank
user-name@service

// ❌ INVALID UPI IDs:
user           (missing @)
user@          (missing bank code)
@upi           (missing username)
user @ upi     (spaces not allowed)
user@123       (bank code must be letters)


// ============================================
// 5. TESTING WITH CURL
// ============================================

/**
 * Create Order
 */
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "id": 1,
        "name": "Masala Chaha",
        "price": 40,
        "quantity": 2
      },
      {
        "id": 3,
        "name": "Adrak Chaha",
        "price": 45,
        "quantity": 1
      }
    ],
    "totalAmount": 125,
    "upiId": "test@upi",
    "paymentStatus": "PAID",
    "orderStatus": "CONFIRMED"
  }'


/**
 * Get All Orders
 */
curl http://localhost:5000/api/orders


/**
 * Get Specific Order (replace with actual order ID)
 */
curl http://localhost:5000/api/orders/507f1f77bcf86cd799439011


// ============================================
// 6. TESTING WITH POSTMAN
// ============================================

/**
 * Setup in Postman:
 * 
 * 1. Create new POST request
 * 2. URL: http://localhost:5000/api/orders
 * 3. Headers:
 *    - Key: Content-Type
 *    - Value: application/json
 * 4. Body (raw, JSON):
 *    {
 *      "items": [...],
 *      "totalAmount": 80,
 *      "upiId": "test@upi",
 *      "paymentStatus": "PAID",
 *      "orderStatus": "CONFIRMED"
 *    }
 * 5. Click Send
 * 6. See response in Response tab
 */


// ============================================
// 7. FRONTEND INTEGRATION
// ============================================

/**
 * JavaScript/React Code to Call API
 */

const createOrder = async (cartItems, totalAmount, upiId) => {
  try {
    const response = await fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: cartItems,
        totalAmount: totalAmount,
        upiId: upiId,
        paymentStatus: 'PAID',
        orderStatus: 'CONFIRMED',
      }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      console.log('Order created:', data.order);
      return data.order;
    } else {
      console.error('Order failed:', data.message);
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Network error:', error);
    throw error;
  }
};

// Usage:
try {
  const order = await createOrder(
    cartItems,
    totalAmount,
    'user@upi'
  );
  console.log('Order ID:', order.id);
} catch (error) {
  console.error('Failed to place order:', error);
}


// ============================================
// 8. ORDER STATUSES
// ============================================

/**
 * Payment Status Options:
 */
PAID        // Payment received
PENDING     // Awaiting payment
FAILED      // Payment failed

/**
 * Order Status Options:
 */
CONFIRMED   // Order confirmed
PROCESSING  // Being prepared
COMPLETED   // Ready for pickup/delivery
CANCELLED   // Order cancelled


// ============================================
// 9. COMMON ERROR RESPONSES
// ============================================

// Error: Empty Items
{
  "success": false,
  "message": "Order must contain at least one item"
}

// Error: Invalid Total Amount
{
  "success": false,
  "message": "Total amount must be greater than 0"
}

// Error: Empty UPI ID
{
  "success": false,
  "message": "UPI ID is required"
}

// Error: Invalid UPI Format
{
  "success": false,
  "message": "Invalid UPI ID format. Example: example@upi or example@bank"
}

// Error: Server Error
{
  "success": false,
  "message": "Failed to create order",
  "error": "Error details here"
}


// ============================================
// 10. FULL REQUEST/RESPONSE EXAMPLE
// ============================================

/**
 * REQUEST:
 */
POST /api/orders HTTP/1.1
Host: localhost:5000
Content-Type: application/json
Content-Length: 247

{
  "items": [
    {
      "id": 1,
      "name": "Masala Chaha",
      "price": 40,
      "quantity": 2
    }
  ],
  "totalAmount": 80,
  "upiId": "customer@upi",
  "paymentStatus": "PAID",
  "orderStatus": "CONFIRMED"
}

/**
 * RESPONSE (Status: 201 Created):
 */
HTTP/1.1 201 Created
Content-Type: application/json

{
  "success": true,
  "message": "Order placed successfully!",
  "order": {
    "id": "507f1f77bcf86cd799439011",
    "items": [
      {
        "id": 1,
        "name": "Masala Chaha",
        "price": 40,
        "quantity": 2
      }
    ],
    "totalAmount": 80,
    "upiId": "customer@upi",
    "paymentStatus": "PAID",
    "orderStatus": "CONFIRMED",
    "createdAt": "2025-01-10T10:30:00.000Z"
  }
}


// ============================================
// END OF EXAMPLES
// ============================================

/**
 * Notes:
 * - All endpoints return JSON responses
 * - Timestamps are in ISO 8601 format
 * - Order ID is MongoDB ObjectId
 * - Validation happens on server side
 * - All errors include success: false
 */
