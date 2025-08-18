# Accessible Document Reader

An AI-powered web application designed to empower visually impaired users by converting scanned documents and images into accessible, readable text with integrated text-to-speech functionality.

## 🎯 Features

### Core Functionality
- **Document Upload**: Support for PDF, JPG, PNG, TIFF, BMP files (up to 50MB)
- **OCR Processing**: Client-side text extraction using Tesseract.js
- **Text-to-Speech**: Native browser speech synthesis with customizable settings
- **Search Functionality**: Find specific text within documents
- **Bookmarking**: Save important sections for quick access

### Accessibility Features
- **WCAG 2.1 AA Compliant**: Built following modern accessibility standards
- **Screen Reader Support**: Full compatibility with NVDA, JAWS, VoiceOver
- **Keyboard Navigation**: Complete keyboard-only operation
- **High Contrast Mode**: Multiple contrast options for low vision users
- **Adjustable Font Sizes**: Small, Medium, Large, and X-Large options
- **Focus Indicators**: Clear visual focus management
- **Reduced Motion**: Option to minimize animations
- **Live Announcements**: Screen reader notifications for status changes

### Keyboard Shortcuts
- **Space**: Play/Pause text-to-speech
- **Escape**: Stop text-to-speech
- **B**: Add bookmark
- **Tab**: Navigate between elements
- **Enter**: Activate buttons and links
- **Arrow Keys**: Navigate menus and sliders

## 🛠️ Tech Stack

- **Frontend**: React 18+ with TypeScript
- **UI Framework**: Material-UI (MUI) with accessibility-first design
- **OCR Engine**: Tesseract.js for client-side text extraction
- **Text-to-Speech**: Web Speech API (native browser support)
- **File Handling**: HTML5 File API with drag-and-drop support
- **Routing**: React Router for navigation

## 📦 Installation

### Prerequisites
- Node.js 16+ 
- npm or yarn package manager

### Setup Instructions

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

## 🚀 Usage

### Uploading Documents
1. Click the "Browse Files" button or drag and drop a document onto the upload area
2. Supported formats: PDF, JPG, PNG, TIFF, BMP
3. Maximum file size: 50MB
4. The application will automatically process the document using OCR

### Reading Documents
1. Once processed, the extracted text will be displayed
2. Use the text-to-speech controls to have the document read aloud
3. Adjust speech rate and volume using the sliders
4. Use bookmarks to save important sections

### Keyboard Navigation
- Use **Tab** to navigate between elements
- Use **Space** to play/pause text-to-speech
- Use **Escape** to stop text-to-speech
- Use **B** to add bookmarks
- Use **Enter** to activate buttons and links

## 🎨 Accessibility Features

### Visual Accessibility
- **High Contrast Themes**: Normal, High, and Very High contrast options
- **Font Size Control**: 4 different font sizes (Small to X-Large)
- **Focus Indicators**: Clear visual focus outlines
- **Reduced Motion**: Option to minimize animations and transitions

### Audio Accessibility
- **Text-to-Speech**: Native browser speech synthesis
- **Adjustable Speech Rate**: 0.5x to 2.0x speed control
- **Volume Control**: Adjustable audio volume
- **Multiple Languages**: Support for 10+ languages

### Navigation Accessibility
- **Keyboard Navigation**: Full keyboard-only operation
- **Screen Reader Support**: ARIA labels and semantic HTML
- **Live Regions**: Status announcements for screen readers
- **Skip Links**: Quick navigation to main content

## 🧪 Testing

### Accessibility Testing
1. **Lighthouse Audit**: Run Lighthouse accessibility audit
2. **Screen Reader Testing**: Test with NVDA, JAWS, or VoiceOver
3. **Keyboard Navigation**: Ensure all features work with keyboard only
4. **Color Contrast**: Verify contrast ratios meet WCAG standards

### Manual Testing Checklist
- [ ] All interactive elements are keyboard accessible
- [ ] Screen reader announces all status changes
- [ ] Focus indicators are visible and clear
- [ ] High contrast mode works correctly
- [ ] Font size changes are applied properly
- [ ] Text-to-speech functions correctly
- [ ] Document upload and processing works
- [ ] Search functionality is accessible

## 📱 Browser Support

- **Chrome**: 90+ (Full support)
- **Firefox**: 88+ (Full support)
- **Safari**: 14+ (Full support)
- **Edge**: 90+ (Full support)

## 🔧 Development

### Project Structure
```
frontend/
├── src/
│   ├── components/
│   │   └── DocumentReader.tsx
│   ├── App.tsx
│   └── index.tsx
├── public/
│   └── index.html
├── package.json
└── README.md
```

### Key Components
- **DocumentReader**: Main OCR and text-to-speech functionality
- **App**: Main application component with theme and routing
- **index.html**: HTML template with accessibility features

### Adding New Features
1. Ensure all new components include proper ARIA labels
2. Test keyboard navigation for new interactive elements
3. Add screen reader announcements for status changes
4. Verify color contrast meets WCAG standards
5. Test with actual screen readers

## 🐛 Troubleshooting

### Common Issues

**OCR not working:**
- Ensure the image is clear and well-lit
- Try different file formats
- Check browser console for errors

**Text-to-speech not working:**
- Verify browser supports Web Speech API
- Check if speech synthesis is enabled
- Try refreshing the page

**Accessibility features not working:**
- Ensure JavaScript is enabled
- Check browser accessibility settings
- Verify screen reader compatibility

### Performance Optimization
- Large files may take longer to process
- Consider image quality for better OCR results
- Use appropriate file formats for best results

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Implement accessibility-first design
4. Add comprehensive tests
5. Submit a pull request

## 📞 Support

For accessibility-related issues or questions:
- Test with multiple screen readers
- Verify keyboard navigation
- Check WCAG compliance
- Document any accessibility barriers found

---

**Building a more accessible world through AI innovation** 🤖♿
