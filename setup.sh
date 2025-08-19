#!/bin/bash

# Accessible Document Reader Setup Script
echo "🚀 Setting up Accessible Document Reader..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version 16+ is required. Current version: $(node -v)"
    echo "Please upgrade Node.js to version 16 or higher."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Failed to install dependencies. Please check your internet connection and try again."
    exit 1
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "To start the development server:"
echo "  npm start"
echo ""
echo "To build for production:"
echo "  npm run build"
echo ""
echo "🌐 The application will be available at: http://localhost:3000"
echo ""
echo "♿ Accessibility Features:"
echo "  - Keyboard navigation (Tab, Enter, Arrow keys)"
echo "  - Screen reader support (NVDA, JAWS, VoiceOver)"
echo "  - High contrast mode"
echo "  - Adjustable font sizes"
echo "  - Text-to-speech functionality"
echo ""
echo "📚 For more information, see README.md"
