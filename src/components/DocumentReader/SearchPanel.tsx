import React from 'react';
import { Box, Typography, TextField, IconButton, Button, Paper } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

interface SearchPanelProps {
  search: {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    searchResults: Array<{index: number, text: string}>;
    currentSearchIndex: number;
    isSearching: boolean;
    handleSearch: (text: string) => void;
    navigateSearchResults: (direction: 'next' | 'prev') => void;
  };
  currentText?: string;
}

const SearchPanel: React.FC<SearchPanelProps> = ({ search, currentText = '' }) => {
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    currentSearchIndex,
    isSearching,
    handleSearch,
    navigateSearchResults
  } = search;

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle2" gutterBottom>
        Search Document
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search text... (Ctrl+F)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch(currentText);
            }
          }}
          aria-label="Search document text"
        />
        <IconButton 
          onClick={() => handleSearch(currentText)} 
          aria-label="Search"
          disabled={isSearching}
        >
          <SearchIcon />
        </IconButton>
      </Box>
      
      {/* Search Results */}
      {searchResults.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="primary" gutterBottom>
            {searchResults.length} match{searchResults.length !== 1 ? 'es' : ''} found
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Button
              size="small"
              variant="outlined"
              onClick={() => navigateSearchResults('prev')}
              disabled={searchResults.length === 0}
            >
              Previous
            </Button>
            <Typography variant="body2">
              {currentSearchIndex + 1} of {searchResults.length}
            </Typography>
            <Button
              size="small"
              variant="outlined"
              onClick={() => navigateSearchResults('next')}
              disabled={searchResults.length === 0}
            >
              Next
            </Button>
          </Box>
          
          {/* Current match preview */}
          <Paper sx={{ p: 1, mt: 1, backgroundColor: 'grey.100' }}>
            <Typography variant="body2" fontSize="0.8rem">
              {searchResults[currentSearchIndex]?.text}
            </Typography>
          </Paper>
        </Box>
      )}
      
      {/* Search shortcuts info */}
      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
        Shortcuts: Ctrl+F to search, F3 for next, Shift+F3 for previous
      </Typography>
    </Box>
  );
};

export default SearchPanel;
