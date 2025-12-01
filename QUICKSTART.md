# Quick Start Guide - Abhang Chaha

## 🚀 Getting Started

### Prerequisites
✅ Node.js installed (v14+)  
✅ npm installed  
✅ VS Code (recommended)

### Installation Complete! ✨

All dependencies have been installed. The project is ready to run.

## 📦 What's Included

### Components
1. **Navbar** - Fixed navigation with smooth scrolling
2. **Hero** - Landing section with animated heading
3. **About** - Features with hover animations
4. **Gallery** - Responsive image grid (6 items)
5. **Menu** - 5 tea items with pricing
6. **Feedback** - Form with validation
7. **Contact** - Dual-layout with address & form
8. **Footer** - Social media & branding

### Styling
- Modern CSS with mobile-first approach
- Framer Motion animations
- FontAwesome icons
- Tea-themed color palette
- Fully responsive (480px, 768px, 1024px+)

### Features
✅ Smooth scroll navigation  
✅ Form validation (Email, Mobile)  
✅ Success notifications  
✅ Hover animations  
✅ Mobile-friendly  
✅ Cross-browser compatible  

## ▶️ Running the Project

### Option 1: Using VS Code Tasks
1. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
2. Type "Run Task"
3. Select "Start React App"
4. Wait for compilation
5. Opens at `http://localhost:3000`

### Option 2: Using Terminal
```bash
npm start
```

### Production Build
```bash
npm run build
```

## 📂 Project Structure

```
Tea/
├── public/
│   └── index.html
├── src/
│   ├── components/          (8 React components)
│   ├── styles/              (9 CSS files)
│   ├── App.js
│   └── index.js
├── package.json
├── .gitignore
└── README.md
```

## 🎨 Customization

### Colors (src/styles/index.css)
```css
--primary-brown: #8B4513
--dark-brown: #654321
--light-cream: #F5E6D3
--tea-green: #2D5016
```

### Add Your Own Images
Replace Unsplash URLs in `Gallery.js`:
```javascript
url: 'https://your-image-url.jpg'
```

### Update Shop Details
Edit in `Contact.js`:
```javascript
<p>Abhang Chaha, Main Road, Maharashtra</p>
```

### Modify Menu Items
Edit in `Menu.js`:
```javascript
const teaItems = [
  { name: 'Your Tea', price: '₹XX', description: 'Your description' }
];
```

## 🔧 Available Commands

```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run eject      # Eject (one-way operation)
```

## 📱 Testing on Mobile

### Using Browser DevTools
1. Open DevTools (F12)
2. Click device toggle button
3. Select mobile device

### Real Device
1. Note your PC IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Visit: `http://YOUR_IP:3000`

## 🐛 Troubleshooting

### Port 3000 already in use
```bash
# Windows
netstat -ano | findstr :3000

# Mac/Linux
lsof -i :3000
```

### Dependency Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Slow Performance
- Clear browser cache
- Hard refresh (Ctrl+Shift+R)
- Check internet connection

## 📄 File Manifest

### Components (8 files)
- ✅ Navbar.js - Fixed navigation
- ✅ Hero.js - Landing section
- ✅ About.js - Feature cards
- ✅ Gallery.js - Image grid
- ✅ Menu.js - Tea menu
- ✅ Feedback.js - Feedback form
- ✅ Contact.js - Contact form + Map
- ✅ Footer.js - Footer with socials

### Styles (9 files)
- ✅ index.css - Global styles
- ✅ navbar.css - Navigation styling
- ✅ hero.css - Hero section
- ✅ about.css - About cards
- ✅ gallery.css - Gallery grid
- ✅ menu.css - Menu cards
- ✅ feedback.css - Feedback form
- ✅ contact.css - Contact form
- ✅ footer.css - Footer

## ✨ Features Implemented

- [x] Hero section with animations
- [x] Smooth scroll navigation
- [x] About section with cards
- [x] Responsive gallery (6 items)
- [x] Menu with 5 tea items
- [x] Feedback form with validation
- [x] Contact form with validation
- [x] Address card with location
- [x] Footer with social links
- [x] Mobile-responsive design
- [x] Form validation & success messages
- [x] Framer Motion animations
- [x] FontAwesome icons
- [x] Tea-themed color scheme

## 🎯 Next Steps

1. ✅ Replace Unsplash URLs with your images
2. ✅ Update shop address & contact details
3. ✅ Add Google Maps embed
4. ✅ Connect to backend (optional)
5. ✅ Deploy to Netlify/Vercel

## 📞 Support

For issues or questions:
- Check React documentation: https://react.dev
- Framer Motion: https://www.framer.com/motion
- FontAwesome: https://fontawesome.com

---

**Ready to serve some chai! ☕ Enjoy your website!**
