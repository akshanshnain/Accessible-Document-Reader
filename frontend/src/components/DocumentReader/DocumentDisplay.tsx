import React from 'react';
import { Card, CardContent, Typography, Box, Chip, IconButton, Tooltip } from '@mui/material';
import { Bookmark as BookmarkIcon, Search as SearchIcon } from '@mui/icons-material';
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
        
        {/* Navigation Controls */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Box>
            <Tooltip title="Add Bookmark (B)" aria-label="Add bookmark">
              <IconButton onClick={() => bookmarks.addBookmark(document.text)}>
                <BookmarkIcon />
              </IconButton>
            </Tooltip>
          </Box>
          
          <Box>
            <Tooltip title="Search Document" aria-label="Search document">
              <IconButton onClick={() => search.setSearchQuery('')}>
                <SearchIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DocumentDisplay;