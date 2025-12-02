# 🍵 Abhang Chaha - Tea Shop Application

A modern, full-stack tea shop web application with an interactive AI assistant (TeaBot), order management system, and responsive design. Built with React, Node.js, and MongoDB.

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Installation & Setup](#installation--setup)
6. [Running the Application](#running-the-application)
7. [API Documentation](#api-documentation)
8. [Component Documentation](#component-documentation)
9. [Database Schema](#database-schema)
10. [Environment Configuration](#environment-configuration)
11. [Styling & Animations](#styling--animations)
12. [Mobile Responsiveness](#mobile-responsiveness)
13. [Troubleshooting](#troubleshooting)
14. [Contributing](#contributing)
15. [License](#license)

---

## 🎯 Project Overview

**Abhang Chaha** is a comprehensive tea shop application that combines e-commerce functionality with an engaging user experience. The platform features:

- **Interactive Tea Menu** with detailed product listings
- **Shopping Cart & Checkout System** with UPI payment integration
- **Order Management System** with real-time order tracking
- **TeaBot AI Assistant** - An animated, interactive robot that guides users and handles inquiries
- **Contact & Feedback Forms** for customer communication
- **Responsive Design** optimized for all devices

### Project Goals

✅ Provide a seamless tea shopping experience
✅ Implement an engaging interactive assistant (TeaBot)
✅ Manage orders efficiently with MongoDB backend
✅ Ensure mobile-first responsive design
✅ Maintain clean, scalable code architecture

---

## ✨ Features

### Frontend Features

#### 🤖 TeaBot - Interactive AI Assistant
- **Fixed Position**: Non-scrolling, always visible on screen
- **Animations**: Framer Motion-powered smooth animations
- **Speech Bubble**: Real-time messages and responses
- **Interactivity**: 
  - Click to trigger animations (dance, spin, eye expressions)
  - Click counter badge tracking interactions
  - Auto-messages every few seconds
  - Response to user clicks with contextual dialogue
- **Responsive**: Scales on mobile devices
- **Customizable**: Easily adjustable colors, sizes, and animations

#### 🛒 Menu & Shopping
- Browse tea varieties with descriptions and prices
- Add items to cart with quantity selection
- View cart with item totals
- Remove items from cart
- Real-time price calculation

#### 💳 Checkout System
- Enter customer details
- Select payment method
- UPI ID validation
- Order summary review
- Order confirmation

#### 📦 Order Management
- View order history
- Track order status (CONFIRMED, PROCESSING, COMPLETED, CANCELLED)
- Payment status tracking (PAID, PENDING, FAILED)
- Order details retrieval

#### 📝 Contact & Feedback
- Contact form for inquiries
- Feedback submission system
- Email notifications to admin

#### 🎨 UI/UX
- Beautiful gradient backgrounds
- Smooth animations and transitions
- Clean, modern design
- Consistent color scheme
- Professional typography

### Backend Features

- **RESTful API** with Express.js
- **MongoDB** database for data persistence
- **CORS** enabled for cross-origin requests
- **Error Handling** with centralized error handler
- **Data Validation** for all inputs
- **Database Connection** with robust error handling

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Framer Motion** - Animation library
- **CSS3** - Styling with gradients and animations
- **Axios/Fetch API** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Dotenv** - Environment configuration

### Development Tools
- **npm/yarn** - Package manager
- **Git** - Version control
- **VS Code** - Code editor

---

## 📁 Project Structure

```
Tea/
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── About.js
│   │   │   ├── Checkout.js
│   │   │   ├── Contact.js
│   │   │   ├── Feedback.js
│   │   │   ├── Footer.js
│   │   │   ├── Gallery.js
│   │   │   ├── Hero.js
│   │   │   ├── Menu.js
│   │   │   ├── Navbar.js
│   │   │   └── TeaBot.js          # Interactive AI Assistant
│   │   ├── styles/
│   │   │   ├── about.css
│   │   │   ├── checkout.css
│   │   │   ├── contact.css
│   │   │   ├── feedback.css
│   │   │   ├── footer.css
│   │   │   ├── gallery.css
│   │   │   ├── hero.css
│   │   │   ├── index.css
│   │   │   ├── menu.css
│   │   │   ├── navbar.css
│   │   │   └── teabot.css          # TeaBot styling
│   │   ├── animations/
│   │   │   └── variants.js         # Framer Motion variants
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── backend/
│   ├── config/
│   │   └── db.js                   # MongoDB connection
│   ├── controllers/
│   │   ├── formController.js       # Form handling
│   │   └── orderController.js      # Order management
│   ├── models/
│   │   ├── Contact.js              # Contact schema
│   │   ├── Feedback.js             # Feedback schema
│   │   └── Order.js                # Order schema
│   ├── routes/
│   │   ├── formRoutes.js           # Contact/Feedback routes
│   │   └── orderRoutes.js          # Order routes
│   ├── server.js                   # Express server
│   ├── package.json
│   └── .env
│
├── build/                          # Production build
├── public/
├── package.json
└── README_COMPLETE.md              # This file
```

---

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas cloud)
- **Git**

### Step 1: Clone Repository

```bash
git clone https://github.com/Roshanchaudhari4/Abhang-Chaha.git
cd Tea
```

### Step 2: Install Frontend Dependencies

```bash
npm install
```

### Step 3: Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

### Step 4: Configure Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# MongoDB Connection
MONGO_URI=mongodb://127.0.0.1:27017/abhang_chaha
# or for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/abhang_chaha

# Server Port
PORT=5000

# Node Environment
NODE_ENV=development
```

### Step 5: Verify MongoDB Connection

```bash
# For local MongoDB:
mongod

# Or use MongoDB Atlas (cloud)
# Update MONGO_URI in .env with your connection string
```

---

## 🏃 Running the Application

### Option 1: Development Mode (Both Frontend & Backend)

#### Terminal 1 - Start Backend Server

```bash
cd backend
npm start
# Backend runs on http://localhost:5000
```

#### Terminal 2 - Start Frontend App

```bash
npm start
# Frontend runs on http://localhost:3001 (or 3000)
```

### Option 2: Production Build

```bash
# Build frontend
npm run build

# Build and run backend
cd backend
npm start
```

### Accessing the Application

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/ (returns "Abhang Chaha Backend is running")

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Order Endpoints

#### 1. Create Order
```http
POST /api/orders
Content-Type: application/json

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
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Order placed successfully!",
  "order": {
    "id": "507f1f77bcf86cd799439011",
    "items": [...],
    "totalAmount": 80,
    "upiId": "customer@upi",
    "paymentStatus": "PAID",
    "orderStatus": "CONFIRMED",
    "createdAt": "2025-01-10T10:30:00.000Z"
  }
}
```

#### 2. Get All Orders
```http
GET /api/orders
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 3,
  "orders": [...]
}
```

#### 3. Get Specific Order
```http
GET /api/orders/:id
```

**Response (200 OK):**
```json
{
  "success": true,
  "order": {...}
}
```

### Form Endpoints

#### 1. Submit Contact Form
```http
POST /api/forms/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry",
  "message": "I'd like to know about your tea varieties"
}
```

#### 2. Submit Feedback
```http
POST /api/forms/feedback
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Great tea quality!",
  "rating": 5
}
```

### Error Responses

**400 Bad Request:**
```json
{
  "success": false,
  "message": "Invalid UPI ID format. Example: example@upi"
}
```

**404 Not Found:**
```json
{
  "success": false,
  "message": "Order not found"
}
```

**500 Server Error:**
```json
{
  "success": false,
  "message": "Server error",
  "error": "Error details"
}
```

### Valid UPI ID Formats

✅ **Valid:**
- `user@upi`
- `john@paytm`
- `customer123@okaxis`
- `test.user@upi`
- `user_123@bank`

❌ **Invalid:**
- `user` (missing @)
- `user@123` (numbers in bank code)
- `user @ upi` (spaces)

---

## 🎨 Component Documentation

### TeaBot Component

**Location:** `src/components/TeaBot.js`

#### Props
None (uses internal state management)

#### State
- `showBubble` - Show/hide speech bubble
- `bubbleIndex` - Current dialogue index
- `isClickMode` - Click interaction mode
- `isDancing` - Dancing animation active
- `isCrazySpin` - Crazy spin animation active
- `eyesWide` - Wide eyes expression
- `clickCount` - Number of clicks

#### Features
- **Auto-Messages**: Displays random dialogue every 8 seconds
- **Click Responses**: Different messages for clicks
- **Animations**: Dance, spin, eye expressions
- **Click Counter**: Badge showing total clicks
- **Hover Effects**: Interactive hover zone

#### Customization

**Colors:**
```javascript
// In teabot.css
.robot-head { background: linear-gradient(135deg, #f4d03f 0%, #f9e79f 100%); }
.robot-torso { background: linear-gradient(135deg, #d4af37 0%, #f0e68c 50%, #daa520 100%); }
```

**Animations:**
```javascript
// In src/animations/variants.js
export const floatingVariants = {
  animate: { y: [0, -10, 0], transition: { duration: 3, repeat: Infinity } }
};
```

**Messages:**
```javascript
// In TeaBot.js
const dialogues = [
  "Welcome to Abhang Chaha!",
  "Need help with your order?",
  // Add more messages...
];
```

### Other Components

#### Menu.js
- Displays tea menu items
- Handles cart additions
- Shows prices and descriptions

#### Checkout.js
- Customer details form
- Cart review
- UPI payment integration
- Order placement

#### Contact.js
- Contact form submission
- Form validation
- Email integration

#### Feedback.js
- Feedback submission form
- Rating system
- User testimonials

#### Navbar.js
- Navigation menu
- Logo and branding
- Links to sections

#### Footer.js
- Footer information
- Contact details
- Social links

#### Gallery.js
- Product image gallery
- Carousel display
- Image descriptions

#### About.js
- Company information
- Mission statement
- Team details

#### Hero.js
- Landing page banner
- Call-to-action buttons
- Hero image/background

---

## 🗄️ Database Schema

### Order Schema

```javascript
{
  _id: ObjectId,
  items: [
    {
      id: Number,
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  totalAmount: Number,
  upiId: String,
  paymentStatus: String, // PAID, PENDING, FAILED
  orderStatus: String,   // CONFIRMED, PROCESSING, COMPLETED, CANCELLED
  createdAt: Date,
  updatedAt: Date
}
```

### Contact Schema

```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  subject: String,
  message: String,
  createdAt: Date
}
```

### Feedback Schema

```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  message: String,
  rating: Number, // 1-5
  createdAt: Date
}
```

---

## ⚙️ Environment Configuration

### Backend .env File

```env
# MongoDB Configuration
MONGO_URI=mongodb://127.0.0.1:27017/abhang_chaha

# Server Configuration
PORT=5000
NODE_ENV=development

# Optional: For production
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
# NODE_ENV=production
```

### Frontend Configuration

Environment variables in `.env` (if needed):

```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🎭 Styling & Animations

### Framer Motion Animations

**Available Animation Variants:**

1. **floatingVariants** - Smooth floating motion
2. **entranceVariants** - Entry animation
3. **bubbleVariants** - Speech bubble animation
4. **waveVariants** - Wave hand animation
5. **cupVariants** - Cup lift animation
6. **danceVariants** - Dancing animation
7. **crazySpinVariants** - Crazy spin animation
8. **eyesVariants** - Eye expression animations
9. **blinkVariants** - Blinking animation

### CSS Features

- **Gradients**: Linear and radial gradients for depth
- **Shadows**: Box shadows for 3D effects
- **Animations**: Keyframe animations for continuous effects
- **Transforms**: Scale, rotate, translate effects
- **Filters**: Blur, brightness adjustments

### Color Palette

```css
/* Primary Colors */
--gold: #d4af37
--dark-gold: #b8860b
--light-gold: #f0e68c

/* Accent Colors */
--red: #c41e3a
--dark-red: #8b0000

/* Text Colors */
--dark-brown: #5c2e0f
--light-brown: #8b4513
```

---

## 📱 Mobile Responsiveness

### Breakpoints

```css
/* Tablet (768px and below) */
@media (max-width: 768px) {
  .teabot-container { gap: 10px; }
  .robot-head { width: 45px; height: 45px; }
  .teabot-bubble { font-size: 12px; max-width: 140px; }
}

/* Mobile (480px and below) */
@media (max-width: 480px) {
  .teabot-container { bottom: 10px; right: 10px; }
  .robot-head { width: 40px; height: 40px; }
  .teabot-bubble { font-size: 11px; max-width: 120px; }
}
```

### Mobile Optimizations

- TeaBot scales down on mobile
- Speech bubble text becomes smaller
- Touch-friendly clickable areas
- Responsive layout adjustments
- Optimized image sizes

---

## 🔧 Troubleshooting

### Common Issues

#### 1. MongoDB Connection Error

**Problem:** `Failed to connect to MongoDB`

**Solution:**
```bash
# Check MongoDB is running
mongod

# Or verify connection string in .env
MONGO_URI=mongodb://127.0.0.1:27017/abhang_chaha
```

#### 2. CORS Errors

**Problem:** `Access to XMLHttpRequest blocked by CORS`

**Solution:** Backend already has CORS enabled. Verify:
```javascript
// In server.js
app.use(cors());
```

#### 3. Port Already in Use

**Problem:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

#### 4. Frontend Not Loading

**Problem:** Blank page or errors

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

#### 5. CSS Not Applying (TeaBot)

**Problem:** TeaBot appears unstyled

**Solution:**
```bash
# Restart dev server
npm start

# Check CSS file path in App.js
import './styles/teabot.css';
```

### Debug Mode

Enable verbose logging:

```javascript
// In backend/server.js
console.log('Request received:', req.method, req.path);
console.log('Database connected:', MONGO_URI);
```

---

## 📚 Additional Resources

### Useful Links

- [React Documentation](https://react.dev)
- [Framer Motion Guide](https://www.framer.com/motion/)
- [Express.js Docs](https://expressjs.com)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Node.js Documentation](https://nodejs.org/docs/)

### Related Files

- `API_EXAMPLES.js` - API usage examples and curl commands
- `TEABOT_GUIDE.md` - Detailed TeaBot documentation
- `FEATURE_GUIDE.md` - Feature overview
- `QUICKSTART.md` - Quick start guide

---

## 👥 Contributing

### How to Contribute

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Code Standards

- Follow existing code style
- Add comments for complex logic
- Update documentation for new features
- Test changes before submitting PR

---

## 📝 License

This project is open source and available under the **MIT License**.

---

## 📧 Contact & Support

- **Repository**: [Abhang-Chaha](https://github.com/Roshanchaudhari4/Abhang-Chaha)
- **Issues**: Report bugs via GitHub Issues
- **Questions**: Use GitHub Discussions

---

## 🙏 Acknowledgments

- Built with ❤️ by the Abhang Chaha team
- Powered by React, Node.js, and MongoDB
- Icons and designs inspired by modern web applications
- Special thanks to Framer Motion for smooth animations

---

## 📊 Project Statistics

- **Frontend**: React 18 + CSS3
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Components**: 9 main components
- **Routes**: 2 main route modules
- **API Endpoints**: 5+ endpoints
- **Animations**: 9+ Framer Motion variants

---

## 🔐 Security

- Input validation on all forms
- UPI ID format validation
- CORS protection enabled
- Error handling without sensitive data exposure
- Environment variables for sensitive config

---

## 📈 Performance

- Optimized images and assets
- CSS minification in production
- Code splitting for faster load times
- Efficient MongoDB queries
- Caching strategies in place

---

## 🚀 Future Enhancements

- [ ] Payment gateway integration (Razorpay, PayPal)
- [ ] User authentication and accounts
- [ ] Order history and tracking
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] SMS updates for orders
- [ ] Search and filter functionality
- [ ] Product recommendations
- [ ] Loyalty program
- [ ] Multi-language support

---

## Version History

- **v2.0** - TeaBot V2 with enhanced interactivity and visual makeover
- **v1.5** - Added click interactions and counter badge
- **v1.0** - Initial release with core features

---

**Last Updated:** December 2, 2025

**Project Status:** ✅ Active Development

---

## Quick Reference

### Start Commands
```bash
npm install              # Install dependencies
npm start               # Run frontend
cd backend && npm start # Run backend
npm run build           # Build for production
```

### API Endpoints
```
POST   /api/orders          # Create order
GET    /api/orders          # Get all orders
GET    /api/orders/:id      # Get specific order
POST   /api/forms/contact   # Submit contact form
POST   /api/forms/feedback  # Submit feedback
```

### Important Files
```
src/components/TeaBot.js       # Main TeaBot component
src/styles/teabot.css          # TeaBot styling
backend/server.js              # Express server
backend/models/Order.js        # Order data model
backend/.env                   # Configuration
```

---

**Happy coding! 🍵✨**
