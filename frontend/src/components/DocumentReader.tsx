import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  LinearProgress,
  Alert,
  IconButton,
  Tooltip,
  Divider,
  TextField,
  Slider,
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Stop as StopIcon,
  VolumeUp as VolumeIcon,
  Bookmark as BookmarkIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { useHotkeys } from 'react-hotkeys-hook';
import Tesseract from 'tesseract.js';

interface DocumentData {
  id: string;
  filename: string;
  fileType: string;
  text: string;
  confidence: number;
  processingTime: number;
  wordCount: number;
}

interface SpeechSettings {
  rate: number;
  volume: number;
}

const DocumentReader: React.FC = () => {
  const [currentDocument, setCurrentDocument] = useState<DocumentData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarks, setBookmarks] = useState<Array<{id: string, text: string, position: number}>>([]);
  const [speechSettings, setSpeechSettings] = useState<SpeechSettings>({
    rate: 1.0,
    volume: 1.0
  });
  
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Initialize speech synthesis
  useEffect(() => {
    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        console.log('Available voices:', voices);
      };
      
      window.speechSynthesis.onvoiceschanged = loadVoices;
      loadVoices();
    }
  }, []);

  // Dropzone configuration with accessibility
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.jpg', '.jpeg', '.png', '.tiff', '.bmp', '.gif']
    },
    maxSize: 50 * 1024 * 1024, // 50MB
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        await processFile(acceptedFiles[0]);
      }
    },
    disabled: isProcessing
  });

  // Process uploaded file with OCR
  const processFile = async (file: File) => {
    setIsProcessing(true);
    setCurrentText('Processing document...');
    
    try {
      let extractedText = '';
      let confidence = 0;
      let processingTime = 0;
      
      const startTime = Date.now();
      
      if (file.type === 'application/pdf') {
        // Handle PDF processing
        extractedText = await processPDF(file);
        confidence = 0.9; // PDF text extraction is typically high confidence
      } else if (file.type.startsWith('image/')) {
        // Handle image processing with Tesseract.js
        const result = await Tesseract.recognize(file, 'eng', {
          logger: m => console.log(m)
        });
        
        extractedText = result.data.text;
        confidence = result.data.confidence / 100;
      }
      
      processingTime = Date.now() - startTime;
      
      const wordCount = extractedText.split(/\s+/).filter(word => word.length > 0).length;
      
      const documentData: DocumentData = {
        id: Date.now().toString(),
        filename: file.name,
        fileType: file.type,
        text: extractedText,
        confidence,
        processingTime,
        wordCount
      };
      
      setCurrentDocument(documentData);
      setCurrentText(extractedText);
      
      // Announce success to screen readers
      announceToScreenReader(`Document processed successfully. Extracted ${wordCount} words with ${Math.round(confidence * 100)}% confidence.`);
      
    } catch (error) {
      console.error('Error processing file:', error);
      setCurrentText('Error processing document. Please try again.');
      announceToScreenReader('Error processing document. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Process PDF files
  const processPDF = async (file: File): Promise<string> => {
    // For now, return a placeholder. In a real implementation, you'd use pdf.js
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        // This is a simplified PDF processing
        // In a real app, you'd use pdf.js to extract text
        resolve('PDF text extraction would be implemented here using pdf.js library.');
      };
      reader.readAsArrayBuffer(file);
    });
  };

  // Text-to-Speech functionality using Web Speech API
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis not supported in this browser');
      return;
    }

    // Stop any current speech
    window.speechSynthesis.cancel();

    // Create new utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speechSettings.rate;
    utterance.volume = speechSettings.volume;

    // Event handlers
    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
      announceToScreenReader('Starting text-to-speech');
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      announceToScreenReader('Text-to-speech completed');
    };

    utterance.onpause = () => {
      setIsPaused(true);
    };

    utterance.onresume = () => {
      setIsPaused(false);
    };

    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const pauseSpeech = () => {
    window.speechSynthesis.pause();
    setIsPaused(true);
  };

  const resumeSpeech = () => {
    window.speechSynthesis.resume();
    setIsPaused(false);
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  // Handle play/pause/stop
  const handlePlay = () => {
    if (isPaused) {
      resumeSpeech();
    } else {
      speakText(currentText);
    }
  };

  const handlePause = () => {
    pauseSpeech();
  };

  const handleStop = () => {
    stopSpeech();
  };

  // Handle bookmark creation
  const handleAddBookmark = () => {
    if (currentText) {
      const bookmark = {
        id: `bookmark_${Date.now()}`,
        text: currentText.substring(0, 100) + '...',
        position: 0
      };
      setBookmarks([...bookmarks, bookmark]);
      announceToScreenReader('Bookmark added');
    }
  };

  // Handle search
  const handleSearch = () => {
    if (searchQuery && currentText) {
      const index = currentText.toLowerCase().indexOf(searchQuery.toLowerCase());
      if (index !== -1) {
        announceToScreenReader(`Found search term at position ${index}`);
      } else {
        announceToScreenReader('Search term not found');
      }
    }
  };

  // Keyboard shortcuts
  useHotkeys('space', (e) => {
    e.preventDefault();
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  });

  useHotkeys('escape', (e) => {
    e.preventDefault();
    handleStop();
  });

  useHotkeys('b', (e) => {
    e.preventDefault();
    handleAddBookmark();
  });

  // Announce to screen readers
  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Accessible Document Reader
      </Typography>
      
      {/* File Upload Area */}
      {!currentDocument && (
        <Paper
          {...getRootProps()}
          sx={{
            p: 4,
            textAlign: 'center',
            border: '2px dashed',
            borderColor: isDragActive ? 'primary.main' : 'grey.300',
            backgroundColor: isDragActive ? 'action.hover' : 'background.paper',
            cursor: isProcessing ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            '&:hover': {
              borderColor: 'primary.main',
              backgroundColor: 'action.hover',
            },
          }}
          role="button"
          tabIndex={0}
          aria-label={isDragActive ? 'Drop your document here' : 'Drag and drop a document here, or click to browse'}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
        >
          <input {...getInputProps()} ref={fileInputRef} />
          <UploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            {isDragActive ? 'Drop your document here' : 'Drag & drop a document here'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Supports PDF, JPG, PNG, TIFF, BMP (Max 50MB)
          </Typography>
          <Button 
            variant="contained" 
            sx={{ mt: 2 }}
            disabled={isProcessing}
            aria-label="Browse files"
          >
            Browse Files
          </Button>
        </Paper>
      )}
      
      {/* Document Display */}
      {currentDocument && (
        <Grid container spacing={3}>
          {/* Document Content */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">
                    {currentDocument.filename}
                  </Typography>
                  <Chip 
                    label={`${currentDocument.wordCount} words`}
                    color="primary"
                  />
                </Box>
                
                {/* Processing Results */}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Confidence: {Math.round(currentDocument.confidence * 100)}%
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={currentDocument.confidence * 100}
                    sx={{ mt: 1 }}
                  />
                </Box>
                
                {/* Text Content */}
                <Paper 
                  sx={{ 
                    p: 3, 
                    maxHeight: '60vh', 
                    overflow: 'auto',
                    lineHeight: 1.6,
                  }}
                  role="textbox"
                  aria-label="Document content"
                  tabIndex={0}
                >
                  <Typography variant="body1">
                    {currentText || 'No text content available'}
                  </Typography>
                </Paper>
                
                {/* Navigation Controls */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                  <Box>
                    <Tooltip title="Add Bookmark (B)" aria-label="Add bookmark">
                      <IconButton onClick={handleAddBookmark}>
                        <BookmarkIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  
                  <Box>
                    <Tooltip title="Search Document" aria-label="Search document">
                      <IconButton onClick={() => setSearchQuery('')}>
                        <SearchIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Controls Panel */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Reading Controls
                </Typography>
                
                {/* Text-to-Speech Controls */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Text-to-Speech
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Tooltip title="Play (Space)" aria-label="Play text-to-speech">
                      <IconButton onClick={handlePlay} color="primary">
                        <PlayIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Pause" aria-label="Pause text-to-speech">
                      <IconButton onClick={handlePause} disabled={!isPlaying}>
                        <PauseIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Stop (Escape)" aria-label="Stop text-to-speech">
                      <IconButton onClick={handleStop} disabled={!isPlaying}>
                        <StopIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  
                  {/* Speech Settings */}
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" gutterBottom>
                      Speech Rate: {speechSettings.rate}x
                    </Typography>
                    <Slider
                      value={speechSettings.rate}
                      onChange={(e, newValue) => setSpeechSettings({...speechSettings, rate: newValue as number})}
                      min={0.5}
                      max={2.0}
                      step={0.1}
                      aria-label="Speech rate"
                    />
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" gutterBottom>
                      Volume: {Math.round(speechSettings.volume * 100)}%
                    </Typography>
                    <Slider
                      value={speechSettings.volume}
                      onChange={(e, newValue) => setSpeechSettings({...speechSettings, volume: newValue as number})}
                      min={0}
                      max={1}
                      step={0.1}
                      aria-label="Volume"
                    />
                  </Box>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                {/* Search */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Search Document
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Search text..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSearch();
                        }
                      }}
                      aria-label="Search document text"
                    />
                    <IconButton onClick={handleSearch} aria-label="Search">
                      <SearchIcon />
                    </IconButton>
                  </Box>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                {/* Bookmarks */}
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Bookmarks ({bookmarks.length})
                  </Typography>
                  {bookmarks.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                      No bookmarks yet. Press 'B' to add one.
                    </Typography>
                  ) : (
                    <Box>
                      {bookmarks.map((bookmark) => (
                        <Chip
                          key={bookmark.id}
                          label={bookmark.text}
                          size="small"
                          sx={{ m: 0.5 }}
                          onClick={() => {/* Navigate to bookmark */}}
                        />
                      ))}
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>
            
            {/* Document Summary */}
            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Document Summary
                </Typography>
                <Typography variant="body2" gutterBottom>
                  File Type: {currentDocument.fileType}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Processing Time: {currentDocument.processingTime}ms
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Estimated Reading Time: {Math.ceil(currentDocument.wordCount / 200)} minutes
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      
      {/* Loading States */}
      {isProcessing && (
        <Alert severity="info" sx={{ mt: 2 }} role="status" aria-live="polite">
          Processing document... This may take a few moments.
        </Alert>
      )}
      
      {/* Error States */}
      {!currentDocument && !isProcessing && (
        <Alert severity="info" sx={{ mt: 2 }}>
          Upload a document to get started with accessible reading.
        </Alert>
      )}
    </Box>
  );
};

export default DocumentReader;
