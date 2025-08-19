import React from 'react';
import { Box, Typography, Grid, Alert } from '@mui/material';
import { useHotkeys } from 'react-hotkeys-hook';
import FileUpload from './FileUpload.tsx';
import DocumentDisplay from './DocumentDisplay.tsx';
import ControlsPanel from './ControlsPanel.tsx';
import { useDocumentProcessing } from '../../hooks/useDocumentProcessing.ts';
import { useSpeechSynthesis } from '../../hooks/useSpeechSynthesis.ts';
import { useSearch } from '../../hooks/useSearch.ts';
import { useBookmarks } from '../../hooks/useBookmarks.ts';

const DocumentReader: React.FC = () => {
  const { isProcessing, currentDocument, processFile } = useDocumentProcessing();
  const speechSynthesis = useSpeechSynthesis();
  const search = useSearch();
  const bookmarks = useBookmarks();

  // Keyboard shortcuts
  useHotkeys('ctrl+f', (e) => {
    e.preventDefault();
    // Focus search input - this will be handled by SearchPanel
  });

  useHotkeys('f3', (e) => {
    e.preventDefault();
    if (search.searchResults.length > 0) {
      search.navigateSearchResults('next');
    }
  });

  useHotkeys('shift+f3', (e) => {
    e.preventDefault();
    if (search.searchResults.length > 0) {
      search.navigateSearchResults('prev');
    }
  });

  useHotkeys('space', (e) => {
    e.preventDefault();
    if (currentDocument && speechSynthesis.isPlaying) {
      speechSynthesis.pauseSpeech();
    } else if (currentDocument && speechSynthesis.isPaused) {
      speechSynthesis.resumeSpeech();
    } else if (currentDocument) {
      speechSynthesis.speakText(currentDocument.text);
    }
  });

  useHotkeys('escape', (e) => {
    e.preventDefault();
    if (speechSynthesis.isPlaying || speechSynthesis.isPaused) {
      speechSynthesis.stopSpeech();
    }
  });

  useHotkeys('b', (e) => {
    e.preventDefault();
    if (currentDocument) {
      bookmarks.addBookmark(currentDocument.text);
    }
  });

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Accessible Document Reader
      </Typography>
      
      {/* File Upload Area */}
      {!currentDocument && (
        <FileUpload 
          isProcessing={isProcessing}
          onFileUpload={processFile}
        />
      )}
      
      {/* Document Display */}
      {currentDocument && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <DocumentDisplay 
              document={currentDocument}
              speechSynthesis={speechSynthesis}
              search={search}
              bookmarks={bookmarks}
            />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <ControlsPanel 
              document={currentDocument}
              speechSynthesis={speechSynthesis}
              search={search}
              bookmarks={bookmarks}
            />
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
