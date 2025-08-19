import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { DocumentData } from '../../types';

interface DocumentSummaryProps {
  document: DocumentData;
}

const DocumentSummary: React.FC<DocumentSummaryProps> = ({ document }) => {
  const wordCount = document.text.split(/\s+/).filter(word => word.length > 0).length;
  const characterCount = document.text.length;
  const estimatedReadingTime = Math.ceil(wordCount / 200); // Average reading speed: 200 words per minute

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Document Summary
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              File Name:
            </Typography>
            <Typography variant="body2" fontWeight="medium">
              {document.filename}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Word Count:
            </Typography>
            <Chip label={wordCount.toLocaleString()} size="small" />
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Character Count:
            </Typography>
            <Chip label={characterCount.toLocaleString()} size="small" />
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Estimated Reading Time:
            </Typography>
            <Chip 
              label={`${estimatedReadingTime} min${estimatedReadingTime !== 1 ? 's' : ''}`} 
              size="small" 
              color="primary"
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DocumentSummary;
