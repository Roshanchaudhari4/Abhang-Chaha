#!/bin/bash
# Abhang Chaha - Project Verification Script
# This script verifies that all project files are in place

echo "=========================================="
echo "Abhang Chaha - Project Verification"
echo "=========================================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Count files
component_count=$(ls -1 src/components/*.js | wc -l)
style_count=$(ls -1 src/styles/*.css | wc -l)

echo "📊 Project Statistics:"
echo "====================="
echo "✅ Components: $component_count/8"
echo "✅ Stylesheets: $style_count/9"
echo ""

# Verify critical files
echo "📁 Verifying Critical Files:"
echo "============================"

files=(
  "src/App.js"
  "src/index.js"
  "public/index.html"
  "package.json"
  "README.md"
  "QUICKSTART.md"
  ".gitignore"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo -e "${GREEN}✓${NC} $file"
  else
    echo -e "${RED}✗${NC} $file"
  fi
done

echo ""
echo "📚 Components Verification:"
echo "==========================="

components=(
  "src/components/Navbar.js"
  "src/components/Hero.js"
  "src/components/About.js"
  "src/components/Gallery.js"
  "src/components/Menu.js"
  "src/components/Feedback.js"
  "src/components/Contact.js"
  "src/components/Footer.js"
)

for comp in "${components[@]}"; do
  if [ -f "$comp" ]; then
    echo -e "${GREEN}✓${NC} $(basename $comp)"
  else
    echo -e "${RED}✗${NC} $(basename $comp)"
  fi
done

echo ""
echo "🎨 Styles Verification:"
echo "======================="

styles=(
  "src/styles/index.css"
  "src/styles/navbar.css"
  "src/styles/hero.css"
  "src/styles/about.css"
  "src/styles/gallery.css"
  "src/styles/menu.css"
  "src/styles/feedback.css"
  "src/styles/contact.css"
  "src/styles/footer.css"
)

for style in "${styles[@]}"; do
  if [ -f "$style" ]; then
    echo -e "${GREEN}✓${NC} $(basename $style)"
  else
    echo -e "${RED}✗${NC} $(basename $style)"
  fi
done

echo ""
echo "=========================================="
echo "✨ Verification Complete!"
echo "=========================================="
