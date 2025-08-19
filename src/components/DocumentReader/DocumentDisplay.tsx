import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { DocumentData } from '../../types';
import TextDisplay from './TextDisplay.tsx';

interface DocumentDisplayProps {
  document: DocumentData;
  speechSynthesis: any;
  search: any;
  bookmarks: any;
}

const DocumentDisplay: React.FC<DocumentDisplayProps> = ({ 
  document, 
  speechSynthesis, 
  search, 
  bookmarks 
}) => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            {document.filename}
          </Typography>
          <Chip 
            label={`${document.wordCount} words`}
            color="primary"
          />
        </Box>
        
        {/* Text Content */}
        <TextDisplay 
          text={document.text}
          speechSynthesis={speechSynthesis}
          search={search}
        />
        

      </CardContent>
    </Card>
  );
};

export default DocumentDisplay;