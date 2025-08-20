# Accessible Document Reader

An AI-powered web application designed to empower visually impaired users by converting scanned documents and images into accessible, readable text with integrated text-to-speech functionality, advanced search capabilities, and comprehensive accessibility features.

## 🎯 Features

### Core Functionality

- **Document Upload**: Support for PDF, JPG, PNG, TIFF, BMP files (up to 50MB)
- **OCR Processing**: Client-side text extraction using Tesseract.js
- **PDF Text Extraction**: Native PDF.js processing for better text quality
- **Text-to-Speech**: Native browser speech synthesis with customizable settings
- **Advanced Search**: Find specific text within documents with highlighting
- **Bookmarking System**: Save important sections for quick access
- **Document Summary**: Word count, character count, and reading time estimates

### Text-to-Speech Features

- **Multi-Voice Support**: Choose from available system voices
- **Adjustable Speech Rate**: 0.5x to 2.0x speed control
- **Volume Control**: Adjustable audio volume (0-100%)
- **Voice Testing**: Test selected voice before reading
- **Word Highlighting**: Visual word-by-word highlighting during speech
- **Reading Progress**: Progress indicator showing current position
- **Keyboard Controls**: Space to play/pause, Escape to stop

### Search & Navigation

- **Full-Text Search**: Search for words, phrases, or partial matches
- **Search Results Navigation**: Navigate between multiple matches
- **Context Preview**: See surrounding text for each search result
- **Visual Highlighting**: Search results highlighted in document
- **Current Match Indicator**: Orange highlight for current match
- **Keyboard Shortcuts**: Ctrl+F to search, F3 for next, Shift+F3 for previous

### Accessibility Features

- **WCAG 2.1 AA Compliant**: Built following modern accessibility standards
- **Screen Reader Support**: Full compatibility with NVDA, JAWS, VoiceOver
- **Keyboard Navigation**: Complete keyboard-only operation
- **High Contrast Mode**: Multiple contrast options for low vision users
- **Focus Indicators**: Clear visual focus management
- **Live Announcements**: Screen reader notifications for status changes
- **ARIA Labels**: Comprehensive accessibility markup

### Keyboard Shortcuts

- **Space**: Play/Pause text-to-speech
- **Escape**: Stop text-to-speech
- **B**: Add bookmark
- **Ctrl+F**: Focus search input
- **F3**: Navigate to next search result
- **Shift+F3**: Navigate to previous search result
- **Tab**: Navigate between elements
- **Enter**: Activate buttons and links
- **Arrow Keys**: Navigate menus and sliders

## 🛠️ Tech Stack

- **Frontend**: React 18+ with TypeScript
- **UI Framework**: Material-UI (MUI) with accessibility-first design
- **OCR Engine**: Tesseract.js for client-side text extraction
- **PDF Processing**: PDF.js for PDF text extraction
- **Text-to-Speech**: Web Speech API (native browser support)
- **File Handling**: HTML5 File API with drag-and-drop support
- **Routing**: React Router for navigation
- **Keyboard Shortcuts**: react-hotkeys-hook for global shortcuts
- **File Upload**: react-dropzone for enhanced file handling

## 📦 Installation

### Prerequisites

- Node.js 16+
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository:**
```bash
git clone <repository-url>
cd Accessible-Document-Reader
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
```sh
http://localhost:3000
```

## 🚀 Usage

### Uploading Documents

1. Click the "Browse Files" button or drag and drop a document onto the upload area
2. Supported formats: PDF, JPG, PNG, TIFF, BMP
3. Maximum file size: 50MB
4. The application will automatically process the document using OCR or PDF extraction

### Reading Documents

1. Once processed, the extracted text will be displayed with document summary
2. Use the text-to-speech controls to have the document read aloud
3. Adjust speech rate and volume using the sliders
4. Choose from available voices in the voice selection dropdown
5. Use bookmarks to save important sections

### Searching Documents

1. Enter search terms in the search box
2. Press Enter or click the search icon to find matches
3. Use Previous/Next buttons to navigate between results
4. Search results are highlighted in the document text
5. Current match is highlighted in orange, other matches in yellow

### Keyboard Navigation

- Use **Tab** to navigate between elements
- Use **Space** to play/pause text-to-speech
- Use **Escape** to stop text-to-speech
- Use **B** to add bookmarks
- Use **Ctrl+F** to focus search
- Use **F3** for next search result
- Use **Shift+F3** for previous search result
- Use **Enter** to activate buttons and links

## 🎨 Accessibility Features

### Visual Accessibility

- **High Contrast Themes**: Normal, High, and Very High contrast options
- **Focus Indicators**: Clear visual focus outlines
- **Search Highlighting**: Visual feedback for search results
- **Reading Progress**: Visual progress indicator during speech

### Audio Accessibility

- **Text-to-Speech**: Native browser speech synthesis
- **Adjustable Speech Rate**: 0.5x to 2.0x speed control
- **Volume Control**: Adjustable audio volume
- **Multiple Voices**: Support for system voices
- **Voice Testing**: Test voice before reading

### Navigation Accessibility

- **Keyboard Navigation**: Full keyboard-only operation
- **Screen Reader Support**: ARIA labels and semantic HTML
- **Live Regions**: Status announcements for screen readers
- **Search Navigation**: Keyboard-accessible search controls

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
- [ ] Text-to-speech functions correctly
- [ ] Document upload and processing works
- [ ] Search functionality is accessible
- [ ] Search results are properly highlighted
- [ ] Voice selection and testing works
- [ ] Bookmarking system functions correctly
- [ ] Document summary displays accurate information

## 📱 Browser Support

- **Chrome**: 90+ (Full support)
- **Firefox**: 88+ (Full support)
- **Safari**: 14+ (Full support)
- **Edge**: 90+ (Full support)

## 🔧 Development

### Project Structure

```ini
frontend/
├── src/
│   ├── components/
│   │   └── DocumentReader/
│   │       ├── index.tsx                 # Main DocumentReader component
│   │       ├── FileUpload.tsx            # File upload with drag & drop
│   │       ├── DocumentDisplay.tsx       # Document display container
│   │       ├── TextDisplay.tsx           # Text rendering with highlighting
│   │       ├── ControlsPanel.tsx         # Main controls container
│   │       ├── SpeechControls.tsx        # TTS controls and settings
│   │       ├── SearchPanel.tsx           # Search functionality
│   │       ├── BookmarkPanel.tsx         # Bookmark management
│   │       └── DocumentSummary.tsx       # Document statistics
│   ├── hooks/
│   │   ├── useDocumentProcessing.ts      # OCR and PDF processing
│   │   ├── useSpeechSynthesis.ts         # TTS functionality
│   │   ├── useSearch.ts                  # Search functionality
│   │   └── useBookmarks.ts               # Bookmark management
│   ├── types/
│   │   └── index.ts                      # TypeScript type definitions
│   ├── App.tsx                           # Main app component
│   └── index.tsx                         # App entry point
├── public/
│   └── index.html                        # HTML template
├── package.json
└── README.md
```

### Key Components

- **DocumentReader**: Main application component with modular architecture
- **FileUpload**: Drag-and-drop file upload with OCR processing
- **TextDisplay**: Text rendering with speech and search highlighting
- **SpeechControls**: Comprehensive TTS controls and voice management
- **SearchPanel**: Advanced search with result navigation
- **BookmarkPanel**: Bookmark management system
- **DocumentSummary**: Document statistics and metadata

### Adding New Features

1. Ensure all new components include proper ARIA labels
2. Test keyboard navigation for new interactive elements
3. Add screen reader announcements for status changes
4. Verify color contrast meets WCAG standards
5. Test with actual screen readers
6. Maintain modular architecture for scalability

## 🐛 Troubleshooting

### Common Issues

**OCR not working:**

- Ensure the image is clear and well-lit
- Try different file formats
- Check browser console for errors
- For PDFs, ensure they contain extractable text

**Text-to-speech not working:**

- Verify browser supports Web Speech API
- Check if speech synthesis is enabled
- Try refreshing the page
- Test with different voices

**Search not working:**

- Ensure document has been processed completely
- Check if search query is entered
- Verify search results are displayed
- Test keyboard navigation for search controls

**Accessibility features not working:**

- Ensure JavaScript is enabled
- Check browser accessibility settings
- Verify screen reader compatibility
- Test keyboard-only navigation

### Performance Optimization

- Large files may take longer to process
- Consider image quality for better OCR results
- Use appropriate file formats for best results
- Search performance optimized for large documents

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Implement accessibility-first design
4. Add comprehensive tests
5. Submit a pull request

### Development Guidelines

- Follow accessibility-first design principles
- Maintain modular component architecture
- Add proper TypeScript types
- Include comprehensive error handling
- Test with multiple screen readers
- Ensure keyboard navigation works

## 📞 Support

For accessibility-related issues or questions:

- Test with multiple screen readers
- Verify keyboard navigation
- Check WCAG compliance
- Document any accessibility barriers found

---

**Building a more accessible world through AI innovation** 🤖♿

*Empowering visually impaired users with advanced document processing and comprehensive accessibility features.*
