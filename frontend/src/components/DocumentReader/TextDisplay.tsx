import React from 'react';
import { Paper, Typography, Box, LinearProgress } from '@mui/material';

interface TextDisplayProps {
  text: string;
  speechSynthesis: {
    words: string[];
    currentWordIndex: number;
    isPlaying: boolean;
    isPaused: boolean;
  };
  search?: {
    searchQuery: string;
    searchResults: Array<{index: number, text: string}>;
    currentSearchIndex: number;
  };
}

const TextDisplay: React.FC<TextDisplayProps> = ({ text, speechSynthesis, search }) => {
  const { words, currentWordIndex, isPlaying, isPaused } = speechSynthesis;

  const renderHighlightedText = () => {
    if (!text) {
      return text;
    }

    // If we have search results, highlight them
    if (search && search.searchQuery && search.searchResults.length > 0) {
      const query = search.searchQuery.toLowerCase();
      const textLower = text.toLowerCase();
      const parts = [];
      let lastIndex = 0;
      
      // Find all occurrences of the search query
      let startIndex = 0;
      while (true) {
        const index = textLower.indexOf(query, startIndex);
        if (index === -1) break;
        
        // Add text before the match
        if (index > lastIndex) {
          parts.push({
            text: text.substring(lastIndex, index),
            highlight: false,
            isCurrentMatch: false
          });
        }
        
        // Add the matched text
        const isCurrentMatch = search.currentSearchIndex >= 0 && 
          search.searchResults[search.currentSearchIndex]?.index === index;
        
        parts.push({
          text: text.substring(index, index + query.length),
          highlight: true,
          isCurrentMatch
        });
        
        lastIndex = index + query.length;
        startIndex = index + 1;
      }
      
      // Add remaining text
      if (lastIndex < text.length) {
        parts.push({
          text: text.substring(lastIndex),
          highlight: false,
          isCurrentMatch: false
        });
      }
      
      return parts.map((part, index) => (
        <span
          key={index}
          style={{
            backgroundColor: part.highlight 
              ? (part.isCurrentMatch ? '#ff5722' : '#ffeb3b') 
              : 'transparent',
            color: part.highlight ? '#000' : 'inherit',
            padding: part.highlight ? '2px 4px' : '0',
            borderRadius: part.highlight ? '4px' : '0',
            fontWeight: part.isCurrentMatch ? 'bold' : 'normal',
            boxShadow: part.isCurrentMatch ? '0 2px 4px rgba(0,0,0,0.3)' : 'none',
          }}
        >
          {part.text}
        </span>
      ));
    }

    // If we have speech synthesis words, highlight current word
    if (words.length > 0) {
      return words.map((word: string, index: number) => {
        const isCurrentWord = index === currentWordIndex;
        const isHighlighted = isCurrentWord && isPlaying && !isPaused;
        
        return (
          <span
            key={index}
            style={{
              backgroundColor: isHighlighted ? '#ffeb3b' : 'transparent',
              borderRadius: isHighlighted ? '4px' : '0',
              transition: 'all 0.2s ease',
              fontWeight: isHighlighted ? 'bold' : 'normal',
              boxShadow: isHighlighted ? '0 2px 4px rgba(0,0,0,0.2)' : 'none',
            }}
          >
            {word}
            {index < words.length - 1 ? ' ' : ''}
          </span>
        );
      });
    }

    // Default text rendering
    return text;
  };

  return (
    <Paper 
      sx={{ 
        p: 3, 
        maxHeight: '60vh', 
        overflow: 'auto',
        lineHeight: 1.6,
        position: 'relative',
      }}
      role="textbox"
      aria-label="Document content"
      tabIndex={0}
    >
      <Typography variant="body1">
        {renderHighlightedText()}
      </Typography>
      
      {/* Reading Progress Indicator */}
      {isPlaying && words.length > 0 && (
        <Box sx={{ 
          position: 'sticky', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          backgroundColor: 'rgba(255,255,255,0.9)', 
          p: 1, 
          borderTop: '1px solid #e0e0e0',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <LinearProgress 
            variant="determinate" 
            value={((currentWordIndex + 1) / words.length) * 100}
            sx={{ flexGrow: 1 }}
          />
          <Typography variant="caption" color="text.secondary">
            {currentWordIndex + 1} / {words.length} words
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default TextDisplay;
