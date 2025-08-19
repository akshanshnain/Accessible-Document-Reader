import React from 'react';
import { Card, CardContent, Typography, Divider } from '@mui/material';
import { DocumentData } from '../../types';
import SpeechControls from './SpeechControls.tsx';
import SearchPanel from './SearchPanel.tsx';
import BookmarkPanel from './BookmarkPanel.tsx';
import DocumentSummary from './DocumentSummary.tsx';

interface ControlsPanelProps {
  document: DocumentData;
  speechSynthesis: any;
  search: any;
  bookmarks: any;
}

const ControlsPanel: React.FC<ControlsPanelProps> = ({ 
  document, 
  speechSynthesis, 
  search, 
  bookmarks 
}) => {
  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Reading Controls
          </Typography>
          
          <SpeechControls speechSynthesis={speechSynthesis} documentText={document.text} />
          
          <Divider sx={{ my: 2 }} />
          
          <SearchPanel search={search} currentText={document.text} />
          
          <Divider sx={{ my: 2 }} />
          
          <BookmarkPanel bookmarks={bookmarks} />
        </CardContent>
      </Card>
      
      <DocumentSummary document={document} />
    </>
  );
};

export default ControlsPanel;